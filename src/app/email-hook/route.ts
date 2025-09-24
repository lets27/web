import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const signature = req.headers.get("X-Sanity-Webhook-Signature");

  // Verify the secret
  if (signature !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { ok: false, reason: "unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { _type, active, title, tagline } = body;

  // Only trigger when a sale is published & active
  if (_type !== "sale" || !active) {
    return NextResponse.json({ ok: false, reason: "not active sale" });
  }

  try {
    await resend.emails.send({
      from: "Shop <no-reply@yourdomain.com>",
      to: ["letsomogwera61@gmail.com"],
      subject: `🔥 Sale Alert: ${title}`,
      html: `<h1>${title}</h1><p>${tagline}</p><p><a href="${process.env.VERCEL_URL}">Shop Now</a></p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend send error:", error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
