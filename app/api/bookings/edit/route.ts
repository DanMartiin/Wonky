import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, ...updateData } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Edit token is required' },
        { status: 400 }
      );
    }

    // Find booking by edit token
    const booking = await prisma.booking.findUnique({
      where: { editToken: token },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Invalid edit token' },
        { status: 404 }
      );
    }

    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        { error: 'Cannot edit a cancelled booking' },
        { status: 400 }
      );
    }

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        ...updateData,
        guestCount: updateData.guestCount ? parseInt(updateData.guestCount) : undefined,
        date: updateData.date ? new Date(updateData.date) : undefined,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Booking updated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
} 