import { NextResponse } from 'next/server';
import { z } from 'zod';
import { adminCookieName, createAdminSession, isAdminConfigured, matchesAdminPassword } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const data = z.object({ password: z.string().min(1).max(512) }).safeParse(await request.json());
  if (!data.success) return NextResponse.json({ message: 'Enter your password to continue.' }, { status: 400 });
  if (!isAdminConfigured()) return NextResponse.json({ message: 'Admin access has not been configured yet. Add ADMIN_PASSWORD and ADMIN_AUTH_SECRET to the deployment environment.' }, { status: 503 });
  if (!matchesAdminPassword(data.data.password)) return NextResponse.json({ message: 'That password is not correct.' }, { status: 401 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, createAdminSession(), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 8, path: '/' });
  return response;
}
