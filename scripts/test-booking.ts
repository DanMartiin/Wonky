import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function testBooking() {
  try {
    // Test 1: Create a booking
    console.log('🧪 Testing booking creation...');
    
    const booking = await prisma.booking.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'resurreccionjohnalesi@gmail.com',
        mobileNumber: '+1234567890',
        notes: 'Test booking',
        guestCount: 2,
        date: new Date('2025-10-07'),
        checkInTime: '10:00',
        checkOutTime: '12:00',
      },
    });

    console.log('✅ Booking created:', booking);
    console.log('�� Confirmation token:', booking.confirmationToken);
    console.log('✏️ Edit token:', booking.editToken);
    console.log('❌ Cancel token:', booking.cancelToken);

    // Test 2: Fetch bookings
    console.log('\n🧪 Testing booking retrieval...');
    
    const bookings = await prisma.booking.findMany({
      include: {
        confirmedBooking: true,
      },
    });

    console.log('✅ Found bookings:', bookings.length);

    // Test 3: Confirm booking
    console.log('\n🧪 Testing booking confirmation...');
    
    const confirmedBooking = await prisma.confirmedBooking.create({
      data: {
        bookingId: booking.id,
      },
    });

    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'CONFIRMED' },
    });

    console.log('✅ Booking confirmed:', confirmedBooking);

    // Test 4: Update booking
    console.log('\n🧪 Testing booking update...');
    
    const updatedBooking = await prisma.booking.update({
      where: { editToken: booking.editToken },
      data: {
        guestCount: 3,
        notes: 'Updated test booking',
      },
    });

    console.log('✅ Booking updated:', updatedBooking);

    // Test 5: Cancel booking
    console.log('\n🧪 Testing booking cancellation...');
    
    const cancelledBooking = await prisma.booking.update({
      where: { cancelToken: booking.cancelToken },
      data: { status: 'CANCELLED' },
    });

    console.log('✅ Booking cancelled:', cancelledBooking);

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testBooking(); 