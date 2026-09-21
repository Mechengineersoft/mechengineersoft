import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, isDatabaseConfigured } from '@/db';
import { newsletterSubscribers } from '@/db/schema';

const newsletterSchema = z.object({
  email: z.string().trim().email().max(255),
});

export async function POST(request: Request) {
  try {
    const payload = newsletterSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!db || !isDatabaseConfigured) {
      return NextResponse.json(
        { message: 'The newsletter service is not connected yet. Please try again later.' },
        { status: 503 }
      );
    }

    await db
      .insert(newsletterSubscribers)
      .values({ email: payload.data.email.toLowerCase() })
      .onConflictDoNothing({ target: newsletterSubscribers.email });

    return NextResponse.json({ ok: true, message: 'You are subscribed. Thank you.' }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'We could not subscribe you. Please try again.' }, { status: 400 });
  }
}
