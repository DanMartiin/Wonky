import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, bookingId, bookingData } = await request.json();

    if (!email || !bookingId) {
      return NextResponse.json(
        { error: 'Email and booking ID are required' },
        { status: 400 }
      );
    }

    // Use the complete dynamic data passed from the frontend
    const emailData = {
      ...bookingData,
      // Generate new tokens for security on each resend
      confirmationToken: Math.random().toString(36).substring(2, 15),
      editToken: Math.random().toString(36).substring(2, 15),
      cancelToken: Math.random().toString(36).substring(2, 15),
    };

    // Send the confirmation email using your existing function
    await sendBookingConfirmationEmail(emailData);

    return NextResponse.json({
      message: 'Confirmation email sent successfully',
      bookingId,
    });

  } catch (error) {
    console.error('Error resending confirmation email:', error);
    return NextResponse.json(
      { error: 'Failed to resend confirmation email' },
      { status: 500 }
    );
  }
} 