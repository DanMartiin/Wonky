import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';
import { sendBookingConfirmationEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      notes,
      guestCount,
      date,
      checkInTime,
      checkOutTime,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !mobileNumber || !guestCount || !date || !checkInTime || !checkOutTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        firstName,
        lastName,
        email,
        mobileNumber,
        notes: notes || '',
        guestCount: parseInt(guestCount),
        date: new Date(date),
        checkInTime,
        checkOutTime,
      },
    });

    // Send confirmation email
    await sendBookingConfirmationEmail(booking);

    return NextResponse.json(
      { 
        message: 'Booking created successfully',
        bookingId: booking.id,
        confirmationToken: booking.confirmationToken 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    let where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (date) {
      where.date = {
        gte: new Date(date),
        lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000), // Next day
      };
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        confirmedBooking: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

