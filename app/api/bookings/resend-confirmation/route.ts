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

    // Use the ORIGINAL tokens from the booking data, don't generate new ones
    const emailData = {
      ...bookingData,
      // Keep the original tokens - don't generate new ones
      confirmationToken: bookingData.confirmationToken,
      editToken: bookingData.editToken,
      cancelToken: bookingData.cancelToken,
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