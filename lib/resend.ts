import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export async function sendNotificationEmail(options: {
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.info("[Resend mock]", options.subject, options.html.slice(0, 200));
    return { id: "mock-email-id" };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const to = process.env.RESEND_TO_EMAIL;
  if (!to) throw new Error("RESEND_TO_EMAIL is not configured");

  return resend.emails.send({
    from,
    to,
    subject: options.subject,
    html: options.html,
  });
}
