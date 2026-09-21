import { NextRequest, NextResponse } from 'next/server';
import { count } from 'drizzle-orm';
import { db, isDatabaseConfigured } from '@/db';
import { blogPosts, contactMessages, portfolioItems, services } from '@/db/schema';
import { isAdminRequest } from '@/lib/admin-request';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (!db || !isDatabaseConfigured) return NextResponse.json({ databaseConfigured: false, counts: null });
  const [inquiries, serviceCount, portfolioCount, postCount] = await Promise.all([
    db.select({ value: count() }).from(contactMessages),
    db.select({ value: count() }).from(services),
    db.select({ value: count() }).from(portfolioItems),
    db.select({ value: count() }).from(blogPosts),
  ]);
  return NextResponse.json({ databaseConfigured: true, counts: { inquiries: Number(inquiries[0]?.value || 0), services: Number(serviceCount[0]?.value || 0), portfolio: Number(portfolioCount[0]?.value || 0), posts: Number(postCount[0]?.value || 0) } });
}
