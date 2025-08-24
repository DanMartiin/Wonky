import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Cancel token is required' },
        { status: 400 }
      );
    }

    // Find booking by cancel token
    const booking = await prisma.booking.findUnique({
      where: { cancelToken: token },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Invalid cancel token' },
        { status: 404 }
      );
    }

    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        { error: 'Booking is already cancelled' },
        { status: 400 }
      );
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'CANCELLED' },
    });

    return NextResponse.json({
      message: 'Booking cancelled successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
} 