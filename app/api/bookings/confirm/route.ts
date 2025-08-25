import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma/index';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { token } = await req.json();


    if (!token) {
      return NextResponse.json(
        { error: 'Confirmation token is required' },
        { status: 400 }
      );
    }

    // Find booking by confirmation token
    const booking = await prisma.booking.findUnique({
      where: { confirmationToken: token },
      include: { confirmedBooking: true },
    });


    if (!booking) {

      return NextResponse.json(
        { error: 'Invalid confirmation token' },
        { status: 404 }
      );
    }


    if (booking.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Booking is already confirmed or cancelled' },
        { status: 400 }
      );
    }

    // Check if already confirmed
    if (booking.confirmedBooking) {
      return NextResponse.json(
        { error: 'Booking is already confirmed' },
        { status: 400 }
      );
    }

    // Idempotent confirm
    const result = await prisma.$transaction(async (tx) => {
      // Upsert confirmation record (avoids unique constraint race)
      await tx.confirmedBooking.upsert({
        where: { bookingId: booking.id },   // bookingId must be unique in schema
        create: { bookingId: booking.id },
        update: {},                         // no changes if it exists
      });

      // Mark booking as confirmed (safe to set again)
      const updated = await tx.booking.update({
        where: { id: booking.id },
        data: { status: 'CONFIRMED' },
      });

      return updated;
    });

    return NextResponse.json({ message: 'Booking confirmed successfully', booking: result });
  } catch (error: any) {
    console.error('Error confirming booking:', error);
    
    // Check if it's a unique constraint error
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Booking is already confirmed' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to confirm booking. Please try again.' },
      { status: 500 }
    );
  }
}
