import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma/index';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, checkInTime, checkOutTime, guests } = body;

    // Validate required fields
    if (!date || !checkInTime || !checkOutTime || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const requestedGuests = parseInt(guests);

    // Validate guest count
    if (requestedGuests < 1 || requestedGuests > 10) {
      return NextResponse.json(
        { error: 'Guest count must be between 1 and 10' },
        { status: 400 }
      );
    }

    // Check for existing bookings on the same date with CONFIRMED or PENDING status
    const existingBookings = await prisma.booking.findMany({
      where: {
        date: selectedDate,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    // Check for time conflicts
    const conflictingBookings = existingBookings.filter(booking => {
      const existingCheckIn = new Date(`2000-01-01T${booking.checkInTime}`);
      const existingCheckOut = new Date(`2000-01-01T${booking.checkOutTime}`);
      const newCheckIn = new Date(`2000-01-01T${checkInTime}`);
      const newCheckOut = new Date(`2000-01-01T${checkOutTime}`);


      // Check if time ranges overlap
      const hasConflict = (
        (newCheckIn < existingCheckOut && newCheckOut > existingCheckIn) ||
        (existingCheckIn < newCheckOut && existingCheckOut > newCheckIn)
      );

      return hasConflict;
    });


    // Calculate total guests for conflicting time slots
    const totalConflictingGuests = conflictingBookings.reduce(
      (sum, booking) => sum + booking.guestCount, 
      0
    );

    // Define capacity for the time slot
    const maxCapacity = 20; // Maximum guests during any time slot
    const isAvailable = (totalConflictingGuests + requestedGuests) <= maxCapacity;

    let message = '';
    if (isAvailable && conflictingBookings.length === 0) {
      message = `Great! We have availability for ${requestedGuests} guest${requestedGuests > 1 ? 's' : ''} on ${selectedDate.toLocaleDateString()} from ${checkInTime} to ${checkOutTime}.`;
    } else {
      message = `Sorry, we don't have availability for ${requestedGuests} guest${requestedGuests > 1 ? 's' : ''} during the selected time slot.`;
      
      if (conflictingBookings.length > 0) {
        const conflictingTimes = conflictingBookings.map(booking => 
          `${booking.checkInTime}-${booking.checkOutTime} (${booking.guestCount} guests)`
        );
        message += ` Conflicting bookings: ${conflictingTimes.join(', ')}`;
      }
    }

    return NextResponse.json({
      available: isAvailable && conflictingBookings.length === 0,
      message,
      totalConflictingGuests,
      maxCapacity,
      requestedGuests,
      conflictingBookings: conflictingBookings.length,
      debug: {
        existingBookings: existingBookings.length,
        selectedDate: selectedDate.toISOString().split('T')[0],
        conflictingBookings: conflictingBookings.map(b => ({
          id: b.id,
          time: `${b.checkInTime}-${b.checkOutTime}`,
          guests: b.guestCount,
          status: b.status
        }))
      }
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
} 