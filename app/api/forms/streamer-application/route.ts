import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/resend";

export async function POST(request: Request) {
  const body = await request.json();
  await sendNotificationEmail({
    subject: `[StreamVault] Streamer Application — ${body.name ?? "Unknown"}`,
    html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
  });
  if (body.email) {
    await sendNotificationEmail({
      subject: "StreamVault — Application Received",
      html: `<p>Hi ${body.name},</p><p>We received your application and will be in touch within 5 business days.</p>`,
    });
  }
  return NextResponse.json({ ok: true });
}
