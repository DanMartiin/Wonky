'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function ConfirmBooking() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'already-confirmed' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No confirmation token provided');
      return;
    }

    const confirmBooking = async () => {
      try {
        const response = await fetch('/api/bookings/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Your booking has been confirmed successfully!');
          setBooking(data.booking);
        } else if (response.status === 400 && data.error === 'Booking is already confirmed') {
          // Handle already confirmed booking
          setStatus('already-confirmed');
          setMessage('This booking has already been confirmed.');
          // Try to fetch booking details to show
          try {
            const bookingResponse = await fetch(
              `/api/bookings/by-token/${encodeURIComponent(token)}`,
              { cache: 'no-store' }
            );
            if (bookingResponse.ok) {
              const bookingData = await bookingResponse.json();
              setBooking(bookingData);
            }
          } catch (error) {
            console.error('Error fetching booking details:', error);
          }
        } else {
          setStatus('error');
          setMessage(data.error || 'Failed to confirm booking');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred while confirming your booking');
      }
    };

    confirmBooking();
  }, [token]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 mx-4">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Confirming your booking...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              
              {booking && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Booking Details:</h3>
                  <p className="text-sm text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Time: {booking.checkInTime} - {booking.checkOutTime}</p>
                  <p className="text-sm text-gray-600">Guests: {booking.guestCount}</p>
                  <p className="text-sm text-gray-600">Name: {booking.firstName} {booking.lastName}</p>
                </div>
              )}
              
              <Link
                href="/"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Return to Home
              </Link>
            </div>
          )}

          {status === 'already-confirmed' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Already Confirmed</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              
              {booking && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Your Confirmed Booking:</h3>
                  <p className="text-sm text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Time: {booking.checkInTime} - {booking.checkOutTime}</p>
                  <p className="text-sm text-gray-600">Guests: {booking.guestCount}</p>
                  <p className="text-sm text-gray-600">Name: {booking.firstName} {booking.lastName}</p>
                </div>
              )}
              
              <Link
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Return to Home
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <Link
                href="/"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 