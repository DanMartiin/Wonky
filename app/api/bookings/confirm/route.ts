import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma/index';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

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

    // Update booking status and create confirmed booking
    const [updatedBooking, confirmedBooking] = await prisma.$transaction([
      prisma.booking.update({
        where: { id: booking.id },
        data: { status: 'CONFIRMED' },
      }),
      prisma.confirmedBooking.create({
        data: { bookingId: booking.id },
      }),
    ]);

    return NextResponse.json({
      message: 'Booking confirmed successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    return NextResponse.json(
      { error: 'Failed to confirm booking' },
      { status: 500 }
    );
  }
}
