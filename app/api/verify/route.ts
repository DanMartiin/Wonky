import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { sendConfirmationEmail, sendAdminNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    const db = await getDatabase();
    
    // Find booking with the verification token
    const booking = await db.get(
      'SELECT * FROM bookings WHERE verification_token = ? AND is_verified = FALSE',
      [token]
    );
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }
    
    // Update booking to verified
    await db.run(
      'UPDATE bookings SET is_verified = TRUE, verification_token = NULL WHERE id = ?',
      [booking.id]
    );
    
    // Send confirmation emails
    try {
      await sendConfirmationEmail({
        name: booking.name,
        email: booking.email,
        date: booking.date,
        time: booking.time,
        notes: booking.notes,
      });
      
      await sendAdminNotification({
        name: booking.name,
        email: booking.email,
        date: booking.date,
        time: booking.time,
        notes: booking.notes,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation emails:', emailError);
      // Continue even if emails fail
    }
    
    return NextResponse.json(
      { message: 'Booking verified successfully!' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

