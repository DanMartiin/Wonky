import nodemailer from 'nodemailer';

// Configure email transporter (you'll need to set up your own email service)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
});

export interface EmailData {
  name: string;
  email: string;
  date: string;
  time: string;
  notes?: string;
}

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@wonkymalden.com',
    to: email,
    subject: 'Verify Your Booking - Wonky Malden Book Nook',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #166534;">Wonky Malden Book Nook</h2>
        <p>Thank you for your booking request!</p>
        <p>Please click the link below to verify your email address and confirm your booking:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #166534; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
          Verify Email Address
        </a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Wonky Malden Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendConfirmationEmail(data: EmailData): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@wonkymalden.com',
    to: data.email,
    subject: 'Booking Confirmed - Wonky Malden Book Nook',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #166534;">Booking Confirmed!</h2>
        <p>Dear ${data.name},</p>
        <p>Your booking has been confirmed. Here are the details:</p>
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
        </div>
        <p>We look forward to welcoming you to Wonky Malden Book Nook!</p>
        <p>Best regards,<br>The Wonky Malden Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendAdminNotification(data: EmailData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@wonkymalden.com';
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@wonkymalden.com',
    to: adminEmail,
    subject: 'New Booking - Wonky Malden Book Nook',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #166534;">New Booking Received</h2>
        <p>A new booking has been confirmed:</p>
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

