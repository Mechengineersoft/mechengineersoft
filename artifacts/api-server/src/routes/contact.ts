import { Router } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { db } from "@workspace/db";
import { contactMessages } from "@workspace/db/schema";
import { escapeHtml, sendBusinessNotification } from "../lib/mailer";

const router = Router();

router.post("/contact", async (req, res) => {
  const payload = SubmitContactBody.safeParse(req.body);
  if (!payload.success) {
    return res.status(400).json({ message: "Please review the required contact details and try again." });
  }

  try {
    const enquiry = payload.data;
    const [savedEnquiry] = await db.insert(contactMessages).values({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      company: enquiry.company,
      meetingType: enquiry.meetingType,
      preferredDate: enquiry.date || null,
      preferredTime: enquiry.time || null,
      projectSummary: enquiry.projectSummary,
    }).returning();
    try {
      await sendBusinessNotification({
        subject: `New consultation enquiry from ${enquiry.name}`,
        html: `<h2>New consultation enquiry</h2><p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p><p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p><p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p><p><strong>Company:</strong> ${escapeHtml(enquiry.company)}</p><p><strong>Meeting:</strong> ${escapeHtml(enquiry.meetingType)}</p><p><strong>Project summary:</strong></p><p>${escapeHtml(enquiry.projectSummary).replaceAll("\n", "<br />")}</p><p><strong>Inquiry ID:</strong> ${savedEnquiry.id}</p>`,
      });
    } catch (emailError) {
      req.log.error({ err: emailError }, "Contact enquiry saved but notification email failed");
    }
    return res.status(201).json({ ok: true, message: "Your consultation request has been received." });
  } catch (error) {
    req.log.error({ err: error }, "Failed to save contact enquiry");
    return res.status(503).json({ message: "The enquiry service is not connected yet. Please contact us again later." });
  }
});

export default router;