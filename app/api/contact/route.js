import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const rateMap = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry) {
    rateMap.set(ip, { count: 1, start: now });
    return false;
  }
  if (now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, service, location, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Francesco Bugugnoli <noreply@francescobugugnoli.com>',
      to: ['bugugnolifrancesco@gmail.com'],
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ''}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; color: #18150F;">
          <h2 style="font-size: 1.25rem; font-weight: 500; margin-bottom: 1.5rem;">New enquiry via francescobugugnoli.com</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9375rem;">
            <tr><td style="padding: 0.5rem 0; color: #8A7E6B; width: 100px;">Name</td><td style="padding: 0.5rem 0;">${name}</td></tr>
            <tr><td style="padding: 0.5rem 0; color: #8A7E6B;">Email</td><td style="padding: 0.5rem 0;">${email}</td></tr>
            ${service ? `<tr><td style="padding: 0.5rem 0; color: #8A7E6B;">Service</td><td style="padding: 0.5rem 0;">${service}</td></tr>` : ''}
            ${location ? `<tr><td style="padding: 0.5rem 0; color: #8A7E6B;">Location</td><td style="padding: 0.5rem 0;">${location}</td></tr>` : ''}
          </table>
          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #E8E0D0;">
            <p style="color: #8A7E6B; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.5rem;">Message</p>
            <p style="line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
