import { NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/db';

export async function GET() {
  return NextResponse.json({
    databaseConfigured: isDatabaseConfigured,
    authenticationConfigured: Boolean(process.env.ADMIN_AUTH_SECRET),
    emailConfigured: Boolean(process.env.EMAIL_FROM && process.env.EMAIL_API_KEY),
  });
}
