import { Router } from "express";
import { SubscribeNewsletterBody } from "@workspace/api-zod";
import { db } from "@workspace/db";
import { newsletterSubscribers } from "@workspace/db/schema";
import { escapeHtml, sendBusinessNotification } from "../lib/mailer";

const router = Router();

router.post("/newsletter", async (req, res) => {
  const payload = SubscribeNewsletterBody.safeParse(req.body);
  if (!payload.success) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  try {
    const email = payload.data.email.toLowerCase();
    await db.insert(newsletterSubscribers)
      .values({ email })
      .onConflictDoNothing({ target: newsletterSubscribers.email });
    try {
      await sendBusinessNotification({
        subject: "New newsletter subscriber",
        html: `<h2>New newsletter subscriber</h2><p>${escapeHtml(email)}</p>`,
      });
    } catch (emailError) {
      req.log.error({ err: emailError }, "Newsletter subscription saved but notification email failed");
    }
    return res.status(201).json({ ok: true, message: "You are subscribed. Thank you." });
  } catch (error) {
    req.log.error({ err: error }, "Failed to save newsletter subscription");
    return res.status(503).json({ message: "The newsletter service is not connected yet. Please try again later." });
  }
});

export default router;