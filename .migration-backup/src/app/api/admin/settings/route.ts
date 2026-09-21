import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db, isDatabaseConfigured } from '@/db';
import { websiteSettings } from '@/db/schema';
import { isAdminRequest } from '@/lib/admin-request';

const settingsSchema = z.object({
  companyName: z.string().trim().min(2).max(120),
  tagline: z.string().trim().min(5).max(180),
  businessEmail: z.string().trim().max(255),
  phone: z.string().trim().max(48),
  address: z.string().trim().max(1000),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  maintenanceMode: z.boolean(),
});

const defaultSettings = { companyName: 'Mech Engineer Soft', tagline: 'Engineering Business Solutions Through Software', businessEmail: '--------', phone: '--------', address: '--------', primaryColor: '#2563EB', maintenanceMode: false };
async function loadSettings() {
  if (!db) return null;
  const [existing] = await db.select().from(websiteSettings).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(websiteSettings).values(defaultSettings).returning();
  return created;
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (!isDatabaseConfigured || !db) return NextResponse.json({ message: 'Database is not configured.' }, { status: 503 });
  return NextResponse.json({ settings: await loadSettings() });
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (!isDatabaseConfigured || !db) return NextResponse.json({ message: 'Database is not configured.' }, { status: 503 });
  const input = settingsSchema.safeParse(await request.json());
  if (!input.success) return NextResponse.json({ message: 'Please review the website settings.' }, { status: 400 });
  const current = await loadSettings();
  if (!current) return NextResponse.json({ message: 'Unable to load website settings.' }, { status: 500 });
  const [settings] = await db.update(websiteSettings).set({ ...input.data, updatedAt: new Date() }).where(eq(websiteSettings.id, current.id)).returning();
  return NextResponse.json({ settings });
}
