import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(
  _req: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params; // no request.url access
    if (!token) return NextResponse.json({ error: 'Token is required' }, { status: 400 });

    const booking = await prisma.booking.findUnique({
      where: { confirmationToken: token },
      include: { confirmedBooking: true },
    });

    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    return NextResponse.json(booking, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
  }
} 