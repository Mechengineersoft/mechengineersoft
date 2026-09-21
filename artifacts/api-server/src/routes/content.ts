import { Router } from "express";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@workspace/db";
import { aboutPages, blogPosts, portfolioItems, services, testimonials } from "@workspace/db/schema";
import { adminCookieName, isValidAdminSession } from "../lib/admin-auth";

const router = Router();
const collectionNames = ["services", "portfolio", "insights", "testimonials", "about"] as const;
type CollectionName = (typeof collectionNames)[number];

const serviceSchema = z.object({
  slug: z.string().trim().min(2).max(140),
  title: z.string().trim().min(2).max(180),
  summary: z.string().trim().min(10).max(2000),
  icon: z.string().trim().min(1).max(80),
  features: z.array(z.string().trim().min(1).max(200)).max(30),
  displayOrder: z.string().trim().max(20),
  status: z.enum(["draft", "published"]),
});
const portfolioSchema = z.object({
  slug: z.string().trim().min(2).max(140),
  title: z.string().trim().min(2).max(180),
  category: z.string().trim().min(2).max(100),
  summary: z.string().trim().min(10).max(2000),
  content: z.string().trim().min(10).max(12000),
  technologies: z.array(z.string().trim().min(1).max(100)).max(30),
  metadata: z.object({
    tags: z.array(z.string().trim().min(1).max(100)).max(30).optional(),
    features: z.array(z.string().trim().min(1).max(300)).max(40).optional(),
    challenge: z.string().trim().max(4000).optional(),
    solution: z.string().trim().max(4000).optional(),
    benefits: z.array(z.string().trim().min(1).max(300)).max(30).optional(),
    futureScope: z.array(z.string().trim().min(1).max(300)).max(30).optional(),
    clientType: z.string().trim().max(180).optional(),
    coverColor: z.string().trim().max(180).optional(),
    accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
    icon: z.string().trim().max(20).optional(),
    mockupType: z.enum(["desktop", "laptop", "tablet", "mobile", "dashboard"]).optional(),
    demoUrl: z.string().trim().max(2000).optional(),
    githubUrl: z.string().trim().max(2000).optional(),
  }).optional(),
  coverImage: z.string().trim().max(2000).nullable().optional(),
  featured: z.boolean(),
  status: z.enum(["draft", "published"]),
});
const insightSchema = z.object({
  slug: z.string().trim().min(2).max(160),
  title: z.string().trim().min(2).max(220),
  excerpt: z.string().trim().min(10).max(2000),
  content: z.string().trim().min(10).max(20000),
  category: z.string().trim().min(2).max(100),
  coverImage: z.string().trim().max(2000).nullable().optional(),
  seoTitle: z.string().trim().max(220).nullable().optional(),
  seoDescription: z.string().trim().max(2000).nullable().optional(),
  status: z.enum(["draft", "published"]),
});
const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(160),
  company: z.string().trim().min(2).max(160),
  role: z.string().trim().max(160).nullable().optional(),
  quote: z.string().trim().min(10).max(3000),
  photo: z.string().trim().max(2000).nullable().optional(),
  displayOrder: z.string().trim().max(20),
  status: z.enum(["draft", "published"]),
});
const aboutSchema = z.object({
  slug: z.string().trim().min(2).max(80),
  content: z.record(z.unknown()),
  status: z.enum(["draft", "published"]),
});

const definitions = {
  services: { table: services, schema: serviceSchema },
  portfolio: { table: portfolioItems, schema: portfolioSchema },
  insights: { table: blogPosts, schema: insightSchema },
  testimonials: { table: testimonials, schema: testimonialSchema },
  about: { table: aboutPages, schema: aboutSchema },
} as const;

function isAuthorized(req: Parameters<typeof router.get>[1] extends (arg: infer T, ...args: any[]) => any ? T : never) {
  const cookieToken = req.cookies?.[adminCookieName] as string | undefined;
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice("Bearer ".length)
    : undefined;
  const headerToken = req.headers["x-admin-session"] as string | undefined;
  return isValidAdminSession(cookieToken) || isValidAdminSession(bearerToken) || isValidAdminSession(headerToken);
}

function getDefinition(value: unknown) {
  const parsed = z.enum(collectionNames).safeParse(value);
  return parsed.success ? definitions[parsed.data] : null;
}

router.get("/admin/content/:collection", async (req, res): Promise<void> => {
  if (!isAuthorized(req)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const definition = getDefinition(req.params.collection);
  if (!definition) {
    res.status(404).json({ message: "Content collection not found." });
    return;
  }
  const items = await db.select().from(definition.table as any).orderBy(desc((definition.table as any).createdAt));
  res.json({ items });
});

router.post("/admin/content/:collection", async (req, res): Promise<void> => {
  if (!isAuthorized(req)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const definition = getDefinition(req.params.collection);
  if (!definition) {
    res.status(404).json({ message: "Content collection not found." });
    return;
  }
  const input = definition.schema.safeParse(req.body);
  if (!input.success) {
    res.status(400).json({ message: "Please complete the required content fields." });
    return;
  }
  try {
    const inserted = (await db.insert(definition.table as any).values(input.data as any).returning()) as any[];
    const item = inserted[0];
    res.status(201).json({ item });
  } catch (error) {
    req.log.error({ err: error, collection: req.params.collection }, "Failed to create content item");
    res.status(400).json({ message: "This content could not be created. Check that its slug is unique." });
  }
});

router.patch("/admin/content/:collection/:id", async (req, res): Promise<void> => {
  if (!isAuthorized(req)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const definition = getDefinition(req.params.collection);
  const id = z.string().uuid().safeParse(req.params.id);
  if (!definition) {
    res.status(404).json({ message: "Content collection not found." });
    return;
  }
  if (!id.success) {
    res.status(400).json({ message: "Invalid content item." });
    return;
  }
  const input = definition.schema.partial().safeParse(req.body);
  if (!input.success) {
    res.status(400).json({ message: "Please complete the required content fields." });
    return;
  }
  try {
    const [item] = await db.update(definition.table as any)
      .set({ ...(input.data as any), updatedAt: new Date() })
      .where(eq((definition.table as any).id, id.data))
      .returning();
    if (!item) {
      res.status(404).json({ message: "Content item not found." });
      return;
    }
    res.json({ item });
  } catch (error) {
    req.log.error({ err: error, collection: req.params.collection }, "Failed to update content item");
    res.status(400).json({ message: "This content could not be updated. Check that its slug is unique." });
  }
});

router.delete("/admin/content/:collection/:id", async (req, res): Promise<void> => {
  if (!isAuthorized(req)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const definition = getDefinition(req.params.collection);
  const id = z.string().uuid().safeParse(req.params.id);
  if (!definition) {
    res.status(404).json({ message: "Content collection not found." });
    return;
  }
  if (!id.success) {
    res.status(400).json({ message: "Invalid content item." });
    return;
  }
  const deleted = (await db.delete(definition.table as any).where(eq((definition.table as any).id, id.data)).returning()) as any[];
  const item = deleted[0];
  if (!item) {
    res.status(404).json({ message: "Content item not found." });
    return;
  }
  res.status(204).send();
});

export default router;