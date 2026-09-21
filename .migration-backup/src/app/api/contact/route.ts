import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, isDatabaseConfigured } from '@/db';
import { contactMessages } from '@/db/schema';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(48),
  company: z.string().trim().min(2).max(180),
  date: z.string().trim().max(24).optional().or(z.literal('')),
  time: z.string().trim().max(32).optional().or(z.literal('')),
  meetingType: z.string().trim().min(2).max(100),
  projectSummary: z.string().trim().min(30).max(6000),
});

export async function POST(request: Request) {
  try {
    const payload = contactSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json({ message: 'Please review the required contact details and try again.' }, { status: 400 });
    }
    if (!db || !isDatabaseConfigured) {
      return NextResponse.json({ message: 'The enquiry service is not connected yet. Please contact us again once the site owner completes setup.' }, { status: 503 });
    }

    const enquiry = payload.data;
    await db.insert(contactMessages).values({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      company: enquiry.company,
      meetingType: enquiry.meetingType,
      preferredDate: enquiry.date || null,
      preferredTime: enquiry.time || null,
      projectSummary: enquiry.projectSummary,
    });

    // A transactional email provider can be invoked here after deployment credentials are configured.
    return NextResponse.json({ ok: true, message: 'Your consultation request has been received.' }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'We could not submit the request. Please try again.' }, { status: 400 });
  }
}
