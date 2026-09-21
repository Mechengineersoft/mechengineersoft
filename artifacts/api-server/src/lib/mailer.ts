import { ReplitConnectors } from "@replit/connectors-sdk";
import { db } from "@workspace/db";
import { websiteSettings } from "@workspace/db/schema";

type EmailInput = {
  subject: string;
  html: string;
};

async function getNotificationRecipient() {
  const [settings] = await db.select({ businessEmail: websiteSettings.businessEmail }).from(websiteSettings).limit(1);
  return settings?.businessEmail?.trim() || "";
}

export async function sendBusinessNotification(input: EmailInput) {
  const from = process.env.EMAIL_FROM;
  const to = await getNotificationRecipient();

  if (!from || !to) {
    return { sent: false, reason: "Email notifications are not configured." };
  }

  const payload = JSON.stringify({ from, to: [to], subject: input.subject, html: input.html });
  let providerError = "Email provider rejected the notification.";

  try {
    const response = await new ReplitConnectors().proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
    if (response.ok) return { sent: true };
    providerError = `Connected Resend rejected the notification (${response.status}): ${(await response.text()).slice(0, 300)}`;
  } catch (error) {
    providerError = error instanceof Error ? error.message : providerError;
  }

  const apiKey = process.env.EMAIL_API_KEY;
  if (apiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: payload,
    });
    if (response.ok) return { sent: true };
    providerError = `Resend rejected the notification (${response.status}): ${(await response.text()).slice(0, 300)}`;
  }

  throw new Error(providerError);
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}