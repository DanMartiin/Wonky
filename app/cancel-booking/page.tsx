'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

type CancelState = 'idle' | 'loading' | 'success' | 'error';

export default function CancelBookingPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [status, setStatus] = useState<CancelState>('idle');
  const [message, setMessage] = useState<string>('');

  const cancelBooking = async () => {
    if (!token) {
      setStatus('error');
      setMessage('Missing cancellation token.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Your booking has been cancelled.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to cancel booking.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    cancelBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-600">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200">1</span>
          <span>Booking details</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white">2</span>
          <span>Booking Cancelled</span>
        </div>

        <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="mx-auto mb-4 w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-600 animate-spin" />
              <h1 className="text-lg font-semibold text-gray-900">Cancelling booking...</h1>
              <p className="mt-2 text-sm text-gray-500">Please wait a moment.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Booking Cancelled</h1>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
              <Link href="/" className="mt-6 inline-block bg-green-700 text-white px-5 py-2.5 rounded hover:bg-green-800">
                Return to Home
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-7 h-7 text-red-600" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Cancellation Failed</h1>
              <p className="mt-2 text-sm text-red-700">{message || 'Invalid or expired token.'}</p>
              <div className="mt-6 flex gap-2 justify-center">
                <button
                  onClick={cancelBooking}
                  className="bg-gray-800 text-white px-5 py-2.5 rounded hover:bg-gray-900"
                >
                  Try Again
                </button>
                <Link href="/" className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded hover:bg-gray-300">
                  Return to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}