import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { bookingSchema } from '@/lib/validation';
import { sendVerificationEmail } from '@/lib/email';
import { generateVerificationToken } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = bookingSchema.parse(body);
    
    const db = await getDatabase();
    
    // Check if email already exists
    const existingBooking = await db.get(
      'SELECT id FROM bookings WHERE email = ?',
      [validatedData.email]
    );
    
    if (existingBooking) {
      return NextResponse.json(
        { error: 'A booking with this email already exists' },
        { status: 400 }
      );
    }
    
    // Generate verification token
    const verificationToken = generateVerificationToken();
    
    // Insert the booking
    const result = await db.run(
      `INSERT INTO bookings (name, email, date, time, notes, verification_token) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        validatedData.name,
        validatedData.email,
        validatedData.date,
        validatedData.time,
        validatedData.notes || '',
        verificationToken,
      ]
    );
    
    // Send verification email
    try {
      await sendVerificationEmail(validatedData.email, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue with the booking even if email fails
    }
    
    return NextResponse.json(
      { 
        message: 'Booking created successfully. Please check your email to verify your booking.',
        bookingId: result.lastID 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Booking creation error:', error);
    
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid booking data' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    
    const bookings = await db.all(
      'SELECT * FROM bookings WHERE is_verified = TRUE ORDER BY created_at DESC'
    );
    
    return NextResponse.json(bookings);
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

