import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getTransporter() {
  const host = process.env.SMTP_HOST || 'mail.goexperts.in';
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || 'helpdesk@goexperts.in';
  const pass = process.env.SMTP_PASS || '7tT?Nc-]PfwF7.Cj';

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

function generateCustomerEmailHtml({ bookingRef, name, phone, email, appliance, area, dateStr }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Service Booking Confirmed - Doorstep Service Hyderabad</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
    .email-wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #06183B 0%, #0A2558 55%, #163B7C 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
    .header h1 { margin: 8px 0 0 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .brand-tag { display: inline-block; background: rgba(255,107,0,0.25); color: #FFD6B8; padding: 4px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border: 1px solid rgba(255,107,0,0.4); }
    .content { padding: 32px 28px; }
    .status-badge { display: inline-flex; align-items: center; gap: 6px; background: #FFF4EC; color: #E55A00; font-weight: 700; font-size: 13px; padding: 6px 14px; border-radius: 999px; border: 1px solid #FFCCA3; margin-bottom: 20px; }
    .hero-text { font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 24px; }
    .details-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 28px; }
    .details-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .details-row:last-child { border-bottom: none; }
    .details-label { color: #64748b; font-weight: 500; }
    .details-val { font-weight: 600; color: #0A2558; text-align: right; }
    .timeline { margin: 28px 0; padding: 20px; background: #FFF4EC; border-radius: 12px; border-left: 4px solid #FF6B00; }
    .timeline h3 { margin: 0 0 10px 0; font-size: 15px; color: #0A2558; font-weight: 700; }
    .timeline p { margin: 0; font-size: 13px; color: #475569; line-height: 1.5; }
    .action-btn { display: inline-block; width: 100%; text-align: center; box-sizing: border-box; background: linear-gradient(135deg, #FF6B00 0%, #E55A00 100%); color: #ffffff !important; text-decoration: none; font-weight: 800; padding: 14px 24px; border-radius: 10px; font-size: 15px; margin: 12px 0 24px 0; box-shadow: 0 4px 14px rgba(255,107,0,0.3); }
    .footer { background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; line-height: 1.5; }
    .footer a { color: #FF6B00; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <span class="brand-tag">Doorstep Service Hyderabad</span>
      <h1>Repair Technician Dispatched!</h1>
    </div>
    <div class="content">
      <div class="status-badge">
        ✓ Dispatch Confirmed · Within 90 Mins
      </div>

      <p class="hero-text">
        Dear <strong>${name}</strong>,<br>
        Thank you for choosing <strong>Doorstep Service</strong>. Your service request has been logged successfully, and an expert local technician is being dispatched to your location in <strong>${area}, Hyderabad</strong>.
      </p>

      <div class="details-box">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 14px;">Booking Reference:</td>
            <td style="padding: 9px 0; text-align: right; font-weight: 700; color: #1d4ed8; font-size: 15px;">${bookingRef}</td>
          </tr>
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Appliance Service:</td>
            <td style="padding: 9px 0; text-align: right; font-weight: 600; color: #0f172a; font-size: 14px; border-top: 1px solid #f1f5f9;">${appliance}</td>
          </tr>
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Customer Name:</td>
            <td style="padding: 9px 0; text-align: right; font-weight: 600; color: #0f172a; font-size: 14px; border-top: 1px solid #f1f5f9;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Contact Number:</td>
            <td style="padding: 9px 0; text-align: right; font-weight: 600; color: #0f172a; font-size: 14px; border-top: 1px solid #f1f5f9;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Location:</td>
            <td style="padding: 9px 0; text-align: right; font-weight: 600; color: #0f172a; font-size: 14px; border-top: 1px solid #f1f5f9;">${area}, Hyderabad</td>
          </tr>
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Booking Fee:</td>
            <td style="padding: 9px 0; text-align: right; font-weight: 700; color: #16a34a; font-size: 14px; border-top: 1px solid #f1f5f9;">₹0 (Free Registration)</td>
          </tr>
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Expected Arrival:</td>
            <td style="padding: 9px 0; text-align: right; font-weight: 700; color: #d97706; font-size: 14px; border-top: 1px solid #f1f5f9;">Within 90 Minutes</td>
          </tr>
        </table>
      </div>

      <div class="timeline">
        <h3>What Happens Next?</h3>
        <p>1. Our Hyderabad dispatch center will route the closest certified technician.<br>
        2. The technician will call your mobile (<strong>${phone}</strong>) prior to arrival.<br>
        3. Clear inspection & transparent diagnostic quote before any repair work.</p>
      </div>

      <a href="tel:9515661677" class="action-btn">
        📞 Call Support: 9515661677
      </a>

      <p style="font-size: 13px; color: #64748b; text-align: center; margin: 0;">
        Need to adjust your address or preferred time? Simply call or WhatsApp us on <strong>9515661677</strong>.
      </p>
    </div>

    <div class="footer">
      © 2026 Doorstep Service Hyderabad. All rights reserved.<br>
      Same-Day Doorstep Appliance Repair in Hyderabad (Ameerpet Main Road, Chanda Nagar, Alwal, Suchitra).
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, appliance, area } = body;

    if (!name || !phone || !area) {
      return NextResponse.json(
        { success: false, error: 'Name, phone number, and service area are required.' },
        { status: 400 }
      );
    }

    const bookingRef = body.bookingRef || 'DS-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const transporter = getTransporter();
    const fromAddress = process.env.SMTP_FROM || 'servicedesk@goexperts.in';
    const helpdeskEmail = process.env.SMTP_USER || 'helpdesk@goexperts.in';

    let userEmailSent = false;
    let emailError = null;

    // Send confirmation email to the user if email is provided
    if (email && email.includes('@')) {
      try {
        const customerHtml = generateCustomerEmailHtml({
          bookingRef,
          name,
          phone,
          email,
          appliance: appliance || 'Home Appliance Service',
          area,
          dateStr,
        });

        await transporter.sendMail({
          from: `"Doorstep Service Hyderabad" <${fromAddress}>`,
          to: email.trim(),
          replyTo: helpdeskEmail,
          subject: `✓ Service Dispatched: ${appliance || 'Appliance Repair'} [${bookingRef}] - Doorstep Service`,
          html: customerHtml,
        });
        userEmailSent = true;
      } catch (err) {
        console.error('Failed to send customer confirmation email:', err);
        emailError = err.message;
      }
    }

    // Also notify the helpdesk / admin about new booking
    try {
      await transporter.sendMail({
        from: `"Doorstep Bookings" <${fromAddress}>`,
        to: helpdeskEmail,
        subject: `[NEW BOOKING] ${bookingRef} - ${appliance} in ${area} (${name})`,
        text: `New Service Booking Received:\n\nReference: ${bookingRef}\nCustomer: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nAppliance: ${appliance}\nArea: ${area}, Hyderabad\nTime: ${dateStr}\nExpected Arrival: Within 90 minutes\n`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; line-height: 1.5;">
            <h2 style="color: #1d4ed8;">New Service Booking Logged</h2>
            <p><strong>Booking Ref:</strong> ${bookingRef}</p>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            <p><strong>Appliance:</strong> ${appliance}</p>
            <p><strong>Area:</strong> ${area}, Hyderabad</p>
            <p><strong>Timestamp:</strong> ${dateStr}</p>
            <p style="background: #eff6ff; padding: 12px; border-radius: 8px;"><strong>Status:</strong> Technician dispatch requested (within 90 minutes)</p>
          </div>
        `,
      });
    } catch (adminErr) {
      console.error('Failed to send admin notification email:', adminErr);
    }

    return NextResponse.json({
      success: true,
      bookingRef,
      userEmailSent,
      emailError: emailError || null,
      message: userEmailSent
        ? `Booking confirmed! Confirmation email sent to ${email}.`
        : `Booking registered with reference ${bookingRef}.`,
    });
  } catch (error) {
    console.error('Booking API handler error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing booking.' },
      { status: 500 }
    );
  }
}
