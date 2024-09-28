import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send mail to coverlettered@gmail.com
    await transporter.sendMail({
      from: '"Coverlettered Contact Form" <coverlettered@gmail.com>',
      to: "coverlettered@gmail.com",
      subject: "New Contact Form Submission",
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email, // Set reply-to as the user's email
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: '"Coverlettered" <no-reply@coverlettered.com>',
      to: email,
      subject: "We've Received Your Message - Coverlettered",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to Coverlettered. We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p>${message}</p>
        <p><strong>Important:</strong> Please do not reply to this email. This inbox is not monitored. If you need to provide additional information or have any questions, please use the contact form on our website.</p>
        <p>Best regards,</p>
        <p>The Coverlettered Team</p>
      `,
    });

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}