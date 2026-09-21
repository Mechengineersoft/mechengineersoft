import { Router } from "express";
import { db } from "@workspace/db";
import { eq } from "drizzle-orm";
import { aboutPages, blogPosts, portfolioItems, services, testimonials, websiteSettings } from "@workspace/db/schema";
import { defaultAboutContent } from "../lib/default-content";

const router = Router();

const defaults = {
  companyName: "Mech Engineer Soft",
  tagline: "Engineering Business Solutions Through Software",
  businessEmail: "",
  phone: "",
  address: "",
  socialLinks: {},
  primaryColor: "#2563EB",
  maintenanceMode: false,
};

router.get("/site/settings", async (_req, res): Promise<void> => {
  const [settings] = await db.select().from(websiteSettings).limit(1);
  res.setHeader("Cache-Control", "no-store");
  res.json(settings || defaults);
});

const publicCollections = {
  services,
  portfolio: portfolioItems,
  insights: blogPosts,
  testimonials,
  about: aboutPages,
} as const;

router.get("/site/content/:collection", async (req, res): Promise<void> => {
  const table = publicCollections[req.params.collection as keyof typeof publicCollections];
  if (!table) {
    res.status(404).json({ message: "Content collection not found." });
    return;
  }
  const items = await db.select().from(table as any).where(eq((table as any).status, "published"));
  res.setHeader("Cache-Control", "no-store");
  res.json({ items: req.params.collection === "about" && items.length === 0 ? [{ slug: "about", content: defaultAboutContent, status: "published" }] : items });
});

export default router;