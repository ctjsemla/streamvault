import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/resend";

export async function POST(request: Request) {
  const body = await request.json();
  await sendNotificationEmail({
    subject: `[StreamVault] Brand Inquiry — ${body.companyName ?? "Unknown"}`,
    html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
  });
  return NextResponse.json({ ok: true });
}
