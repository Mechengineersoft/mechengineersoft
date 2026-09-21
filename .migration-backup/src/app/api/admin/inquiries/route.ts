import { NextRequest, NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db, isDatabaseConfigured } from '@/db';
import { contactMessages } from '@/db/schema';
import { isAdminRequest } from '@/lib/admin-request';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (!isDatabaseConfigured || !db) return NextResponse.json({ message: 'Database is not configured.' }, { status: 503 });
  const enquiries = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(30);
  return NextResponse.json({ enquiries });
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (!isDatabaseConfigured || !db) return NextResponse.json({ message: 'Database is not configured.' }, { status: 503 });
  const input = z.object({ id: z.string().uuid(), status: z.enum(['new', 'in_progress', 'replied', 'archived']) }).safeParse(await request.json());
  if (!input.success) return NextResponse.json({ message: 'Invalid inquiry update.' }, { status: 400 });
  const [enquiry] = await db.update(contactMessages).set({ status: input.data.status, updatedAt: new Date() }).where(eq(contactMessages.id, input.data.id)).returning();
  return NextResponse.json({ enquiry });
}
