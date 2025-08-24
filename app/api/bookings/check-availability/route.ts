import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma/index';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, guestCount } = body;

    // Validate required fields
    if (!checkIn || !checkOut || !guestCount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Check for existing bookings in the date range
    const existingBookings = await prisma.booking.findMany({
      where: {
        AND: [
          {
            date: {
              gte: checkInDate,
              lt: checkOutDate,
            },
          },
          {
            status: {
              in: ['PENDING', 'CONFIRMED'],
            },
          },
        ],
      },
    });

    // Calculate total guests for the date range
    const totalGuests = existingBookings.reduce((sum, booking) => sum + booking.guestCount, 0);
    const requestedGuests = parseInt(guestCount);

    // Define capacity (you can adjust this based on your business rules)
    const maxCapacity = 20; // Maximum guests per day
    const isAvailable = (totalGuests + requestedGuests) <= maxCapacity;

    // Check if the specific dates are available
    const conflictingDates = existingBookings.map(booking => 
      new Date(booking.date).toLocaleDateString()
    );

    let message = '';
    if (isAvailable) {
      message = `Great! We have availability for ${requestedGuests} guest${requestedGuests > 1 ? 's' : ''} from ${new Date(checkIn).toLocaleDateString()} to ${new Date(checkOut).toLocaleDateString()}.`;
    } else {
      message = `Sorry, we don't have availability for ${requestedGuests} guest${requestedGuests > 1 ? 's' : ''} on the selected dates. Current capacity: ${totalGuests}/${maxCapacity} guests.`;
      
      if (conflictingDates.length > 0) {
        message += ` Conflicting dates: ${conflictingDates.join(', ')}`;
      }
    }

    return NextResponse.json({
      available: isAvailable,
      message,
      totalGuests,
      maxCapacity,
      requestedGuests,
      conflictingDates,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
} 