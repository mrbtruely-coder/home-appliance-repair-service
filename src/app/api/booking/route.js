import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getTransporter() {
  let host = process.env.BOOKINGS_EMAIL_HOST || process.env.SMTP_HOST || 'mail.goexpertsapps.com';
  // mail.doorstephub.com DNS maps to a web server that drops SMTP traffic; route to actual mail server
  if (host === 'mail.doorstephub.com' || host === 'doorstephub.com') {
    host = 'mail.goexpertsapps.com';
  }
  const port = Number(process.env.BOOKINGS_EMAIL_PORT || process.env.SMTP_PORT) || 587;
  const user = process.env.BOOKINGS_EMAIL_USER || process.env.SMTP_USER || 'bookings@doorstephub.com';
  const pass = process.env.BOOKINGS_EMAIL_PASS || process.env.SMTP_PASS || 'jwT6NlDRBYh5';

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
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

function generateCustomerEmailHtml({ bookingRef, name, phone, email, appliance, subcategory, price, area, address, dateStr }) {
  const cleanPhone = String(phone || '').replace(/\D/g, '');
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Service Booking Confirmed - Doorstep Hub Hyderabad</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
    .email-wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #06183B 0%, #0A2558 55%, #163B7C 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
    .header h1 { margin: 8px 0 0 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; }
    .brand-tag { display: inline-block; background: rgba(255,107,0,0.25); color: #FFD6B8; padding: 4px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border: 1px solid rgba(255,107,0,0.4); }
    .content { padding: 32px 28px; }
    .status-badge { display: inline-flex; align-items: center; gap: 6px; background: #FFF4EC; color: #E55A00; font-weight: 700; font-size: 13px; padding: 6px 14px; border-radius: 999px; border: 1px solid #FFCCA3; margin-bottom: 20px; }
    .hero-text { font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 24px; }
    .details-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 28px; }
    .timeline { margin: 24px 0; padding: 18px; background: #FFF4EC; border-radius: 12px; border-left: 4px solid #FF6B00; font-size: 13px; color: #475569; }
    .timeline h3 { margin: 0 0 8px 0; font-size: 14px; color: #0A2558; font-weight: 700; }
    .action-btn { display: block; width: 100%; text-align: center; box-sizing: border-box; background: linear-gradient(135deg, #FF6B00 0%, #E55A00 100%); color: #ffffff !important; text-decoration: none; font-weight: 800; padding: 14px 24px; border-radius: 10px; font-size: 15px; margin: 12px 0 24px 0; box-shadow: 0 4px 14px rgba(255,107,0,0.3); }
    .footer { background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; line-height: 1.6; }
    .footer a { color: #FF6B00; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <span class="brand-tag">Doorstep Hub Hyderabad</span>
      <h1>Booking Confirmed: Doorstep Repair Dispatch</h1>
    </div>
    <div class="content">
      <div class="status-badge">
        ✓ Dispatch Confirmed · Technician Arriving Within 90 Mins
      </div>

      <p class="hero-text">
        Dear <strong>${name}</strong>,<br>
        Thank you for choosing <strong>Doorstep Hub</strong>. Your service booking has been successfully registered. Our certified technician is being dispatched to your location in <strong>${area}, Hyderabad</strong>.
      </p>

      <div class="details-box">
        <h3 style="margin: 0 0 14px 0; font-size: 15px; color: #0A2558; font-weight: 800; border-bottom: 2px solid #FF6B00; padding-bottom: 6px; display: inline-block;">
          BOOKING &amp; SERVICE DETAILS
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Service Ticket ID:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 800; color: #FF6B00; font-size: 15px;">#${bookingRef}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Customer Name:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #0A2558; font-size: 14px; border-top: 1px solid #f1f5f9;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Customer Mobile:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 800; color: #0A2558; font-size: 14px; border-top: 1px solid #f1f5f9;">
              <a href="tel:${cleanPhone}" style="color: #0A2558; text-decoration: none;">+91 ${cleanPhone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Customer Email:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #2563EB; font-size: 14px; border-top: 1px solid #f1f5f9;">
              <a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Appliance Service:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #0A2558; font-size: 14px; border-top: 1px solid #f1f5f9;">${appliance}</td>
          </tr>
          ${subcategory ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Sub-Category / Issue:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #334155; font-size: 14px; border-top: 1px solid #f1f5f9;">${subcategory}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Service Locality:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0A2558; font-size: 14px; border-top: 1px solid #f1f5f9;">${area}, Hyderabad</td>
          </tr>
          ${address ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Detailed Address / Landmark:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 500; color: #475569; font-size: 13px; border-top: 1px solid #f1f5f9;">${address}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Diagnostic Fee:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #059669; font-size: 14px; border-top: 1px solid #f1f5f9;">${price || 'From ₹299'} (Pay Only After Service)</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Doorstep Visit:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #16a34a; font-size: 14px; border-top: 1px solid #f1f5f9;">FREE (₹0 Booking Registration)</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Service Warranty:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0A2558; font-size: 14px; border-top: 1px solid #f1f5f9;">Up to 90 Days Service Warranty with Genuine Parts</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Expected Arrival:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 800; color: #d97706; font-size: 14px; border-top: 1px solid #f1f5f9;">Within 90 Minutes</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Booking Time:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 500; color: #64748b; font-size: 13px; border-top: 1px solid #f1f5f9;">${dateStr}</td>
          </tr>
        </table>
      </div>

      <div class="timeline">
        <h3>What Happens Next?</h3>
        <p style="margin: 0; line-height: 1.6;">
          1. Our Hyderabad central dispatch assigns the nearest certified technician.<br>
          2. The technician will call your mobile (<strong>+91 ${cleanPhone}</strong>) prior to arrival.<br>
          3. Clear inspection &amp; transparent upfront diagnostic quote before starting repairs.
        </p>
      </div>

      <a href="tel:9515661677" class="action-btn">
        📞 Official Support Helpline: +91 9515661677
      </a>

      <p style="font-size: 13px; color: #64748b; text-align: center; margin: 0;">
        Need to update your address or preferred time? Call or WhatsApp us directly on <strong>+91 9515661677</strong>.
      </p>
    </div>

    <div class="footer">
      © 2026 Doorstep Hub Hyderabad. All rights reserved.<br>
      Same-Day Doorstep Appliance Repair in Hyderabad (Ameerpet, Chanda Nagar, Alwal, Suchitra &amp; all surrounding areas).
    </div>
  </div>
</body>
</html>
  `;
}

function generateTeamEmailHtml({ bookingRef, name, phone, email, appliance, subcategory, price, area, address, dateStr }) {
  const cleanPhone = String(phone || '').replace(/\D/g, '');
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; line-height: 1.6; max-width: 600px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="background: #0A2558; color: #ffffff; padding: 20px 24px; border-radius: 8px; margin-bottom: 20px;">
        <span style="background: #FF6B00; color: #ffffff; padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">New Dispatch Request</span>
        <h2 style="margin: 8px 0 4px; font-size: 20px; font-weight: 800;">New Customer Booking Dispatched</h2>
        <p style="margin: 0; font-size: 13px; color: #FFD6B8;">Doorstep Hub • Hyderabad Home Appliance Dispatch System</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px 0; color: #64748b; width: 150px; border-bottom: 1px solid #f1f5f9;">Booking Ref:</td>
          <td style="padding: 10px 0; font-weight: 800; color: #FF6B00; border-bottom: 1px solid #f1f5f9; font-size: 15px;">#${bookingRef}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Customer Name:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #0A2558; border-bottom: 1px solid #f1f5f9;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Customer Mobile:</td>
          <td style="padding: 10px 0; font-weight: 800; color: #0A2558; border-bottom: 1px solid #f1f5f9;">
            <a href="tel:${cleanPhone}" style="color: #0A2558; text-decoration: underline; font-size: 15px;">+91 ${cleanPhone}</a> (Click to Call)
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Customer Email:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #2563EB; border-bottom: 1px solid #f1f5f9;">
            <a href="mailto:${email}" style="color: #2563EB; text-decoration: underline;">${email || 'Not provided'}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Service Category:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #0A2558; border-bottom: 1px solid #f1f5f9;">${appliance}</td>
        </tr>
        ${subcategory ? `
        <tr>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Sub-Category / Issue:</td>
          <td style="padding: 10px 0; font-weight: 600; color: #334155; border-bottom: 1px solid #f1f5f9;">${subcategory}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Pricing Tier:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #059669; border-bottom: 1px solid #f1f5f9;">${price || 'From ₹299'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Service Locality:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #0A2558; border-bottom: 1px solid #f1f5f9;">${area}, Hyderabad</td>
        </tr>
        ${address ? `
        <tr>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Detailed Address / GPS:</td>
          <td style="padding: 10px 0; font-weight: 600; color: #334155; border-bottom: 1px solid #f1f5f9;">${address}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Booking Time:</td>
          <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">${dateStr}</td>
        </tr>
      </table>

      <div style="background: #FFF4EC; border: 1px solid #FFCCA3; border-radius: 8px; padding: 14px 18px; margin-top: 22px; font-size: 13px; color: #9A3412;">
        ⚡ <strong>Action for Team:</strong> Call customer <a href="tel:${cleanPhone}" style="color: #C2410C; font-weight: 800;">+91 ${cleanPhone}</a> and assign local technician to arrive within 90 minutes.
      </div>
    </div>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, appliance, subcategory, fullService, price, area, address } = body;

    if (!name || !phone || !area) {
      return NextResponse.json(
        { success: false, error: 'Name, phone number, and service area are required.' },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, '');
    const bookingRef = body.bookingRef || 'DS-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const transporter = getTransporter();
    const senderEmail = process.env.BOOKINGS_EMAIL_USER || process.env.SMTP_USER || 'bookings@doorstephub.com';
    const doorstepTeamEmail = process.env.ADMIN_NOTIFY_EMAIL || 'doorstephub@gmail.com';

    let userEmailSent = false;
    let teamEmailSent = false;
    let emailError = null;

    const dynamicBookingPayload = {
      bookingRef,
      name: name.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : '',
      appliance: fullService || appliance || 'Home Appliance Service',
      subcategory: subcategory || '',
      price: price || 'From ₹299',
      area,
      address: address || `${area}, Hyderabad`,
      dateStr,
    };

    // 1. Send confirmation email to the customer if email is provided
    if (email && email.includes('@')) {
      try {
        const customerHtml = generateCustomerEmailHtml(dynamicBookingPayload);

        await transporter.sendMail({
          from: `"Doorstep Hub" <${senderEmail}>`,
          to: email.trim(),
          replyTo: doorstepTeamEmail,
          subject: `✓ Booking Confirmed: ${dynamicBookingPayload.appliance} [${bookingRef}] - Doorstep Hub`,
          html: customerHtml,
        });
        userEmailSent = true;
      } catch (err) {
        console.error('Failed to send customer confirmation email:', err);
        emailError = err.message;
      }
    }

    // 2. Send email of customer booked to doorstep teams doorstephub@gmail.com
    try {
      const teamHtml = generateTeamEmailHtml(dynamicBookingPayload);

      await transporter.sendMail({
        from: `"Doorstep Hub Bookings" <${senderEmail}>`,
        to: doorstepTeamEmail,
        replyTo: (email && email.includes('@')) ? email.trim() : senderEmail,
        subject: `[NEW BOOKING] #${bookingRef} - ${dynamicBookingPayload.appliance} in ${area} (${name} - ${cleanPhone})`,
        text: `New Service Booking Received:\n\nReference: #${bookingRef}\nCustomer: ${name}\nPhone: +91 ${cleanPhone}\nEmail: ${email || 'Not provided'}\nAppliance: ${dynamicBookingPayload.appliance}\nSubcategory/Issue: ${subcategory || 'Standard Service'}\nPricing: ${price || 'From ₹299'}\nArea: ${area}, Hyderabad\nAddress: ${address || area}\nTime: ${dateStr}\nExpected Arrival: Within 90 minutes\n`,
        html: teamHtml,
      });
      teamEmailSent = true;
    } catch (teamErr) {
      console.error('Failed to send doorstep team notification email to doorstephub@gmail.com:', teamErr);
    }

    return NextResponse.json({
      success: true,
      bookingRef,
      userEmailSent,
      teamEmailSent,
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
