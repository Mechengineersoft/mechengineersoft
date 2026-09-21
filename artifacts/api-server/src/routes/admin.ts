import { Router } from "express";
import { count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@workspace/db";
import { blogPosts, contactMessages, portfolioItems, services, websiteSettings } from "@workspace/db/schema";
import { adminCookieName, createAdminSession, isAdminConfigured, isValidAdminSession, matchesAdminPassword, matchesAdminUsername } from "../lib/admin-auth";

const router = Router();
const defaultSettings = {
  companyName: "Mech Engineer Soft",
  tagline: "Engineering Business Solutions Through Software",
  businessEmail: "",
  phone: "",
  address: "",
  primaryColor: "#2563EB",
  maintenanceMode: false,
};
const isAuthorized = (req: Parameters<typeof router.get>[1] extends (arg: infer T, ...args: any[]) => any ? T : never) => {
  const cookieToken = req.cookies?.[adminCookieName] as string | undefined;
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice("Bearer ".length)
    : undefined;
  const headerToken = req.headers["x-admin-session"] as string | undefined;
  return isValidAdminSession(cookieToken) || isValidAdminSession(bearerToken) || isValidAdminSession(headerToken);
};

router.post("/admin/login", (req, res) => {
  const input = z.object({ username: z.string().min(1).max(120), password: z.string().min(1).max(512) }).safeParse(req.body);
  if (!input.success) return res.status(400).json({ message: "Enter your username and password to continue." });
  if (!isAdminConfigured()) return res.status(503).json({ message: "Admin access has not been configured yet. Add ADMIN_PASSWORD and ADMIN_AUTH_SECRET to the deployment environment." });
  if (!matchesAdminUsername(input.data.username) || !matchesAdminPassword(input.data.password)) return res.status(401).json({ message: "That username or password is not correct." });
  const session = createAdminSession();
  res.setHeader("Cache-Control", "no-store");
  res.cookie(adminCookieName, session, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8 * 1000, path: "/" });
  return res.json({ ok: true, session });
});

router.post("/admin/logout", (_req, res) => {
  res.cookie(adminCookieName, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 0, path: "/" });
  return res.json({ ok: true });
});

router.get("/admin/status", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  return res.json({
    databaseConfigured: Boolean(process.env.DATABASE_URL),
    authenticationConfigured: isAdminConfigured(),
    emailConfigured: Boolean(process.env.EMAIL_FROM && (process.env.EMAIL_API_KEY || process.env.REPLIT_CONNECTORS_HOSTNAME)),
    authenticated: isAuthorized(req),
  });
});

router.get("/admin/metrics", async (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ message: "Unauthorized" });
  const [inquiries, serviceCount, portfolioCount, postCount] = await Promise.all([
    db.select({ value: count() }).from(contactMessages),
    db.select({ value: count() }).from(services),
    db.select({ value: count() }).from(portfolioItems),
    db.select({ value: count() }).from(blogPosts),
  ]);
  return res.json({ databaseConfigured: true, counts: { inquiries: Number(inquiries[0]?.value || 0), services: Number(serviceCount[0]?.value || 0), portfolio: Number(portfolioCount[0]?.value || 0), posts: Number(postCount[0]?.value || 0) } });
});

async function loadSettings() {
  const [existing] = await db.select().from(websiteSettings).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(websiteSettings).values(defaultSettings).returning();
  return created;
}

const settingsSchema = z.object({
  companyName: z.string().trim().min(2).max(120),
  tagline: z.string().trim().min(5).max(180),
  businessEmail: z.string().trim().max(255),
  phone: z.string().trim().max(48),
  address: z.string().trim().max(1000),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  maintenanceMode: z.boolean(),
});

router.get("/admin/settings", async (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ message: "Unauthorized" });
  return res.json({ settings: await loadSettings() });
});

router.put("/admin/settings", async (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ message: "Unauthorized" });
  const input = settingsSchema.safeParse(req.body);
  if (!input.success) return res.status(400).json({ message: "Please review the website settings." });
  const current = await loadSettings();
  if (!current) return res.status(500).json({ message: "Unable to load website settings." });
  const [settings] = await db.update(websiteSettings).set({ ...input.data, updatedAt: new Date() }).where(eq(websiteSettings.id, current.id)).returning();
  return res.json({ settings });
});

router.get("/admin/inquiries", async (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ message: "Unauthorized" });
  const enquiries = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(30);
  return res.json({ enquiries });
});

router.patch("/admin/inquiries", async (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ message: "Unauthorized" });
  const input = z.object({ id: z.string().uuid(), status: z.enum(["new", "in_progress", "replied", "archived"]).optional(), internalNotes: z.string().max(4000).optional() }).safeParse(req.body);
  if (!input.success) return res.status(400).json({ message: "Invalid inquiry update." });
  const updates = { ...(input.data.status ? { status: input.data.status } : {}), ...(input.data.internalNotes !== undefined ? { internalNotes: input.data.internalNotes } : {}), updatedAt: new Date() };
  const [enquiry] = await db.update(contactMessages).set(updates).where(eq(contactMessages.id, input.data.id)).returning();
  return res.json({ enquiry });
});

export default router;