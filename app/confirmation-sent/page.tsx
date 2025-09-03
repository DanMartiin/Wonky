'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function ConfirmationSentPage() {
  const searchParams = useSearchParams();
  
  // Get ALL data from URL parameters
  const email = searchParams.get('email');
  const bookingId = searchParams.get('bookingId');
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const date = searchParams.get('date');
  const checkInTime = searchParams.get('checkInTime');
  const checkOutTime = searchParams.get('checkOutTime');
  const guests = searchParams.get('guests');
  const notes = searchParams.get('notes');
  const confirmationToken = searchParams.get('confirmationToken');
  const editToken = searchParams.get('editToken');
  const cancelToken = searchParams.get('cancelToken');

  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Create complete booking data object from URL parameters
  const bookingData = {
    id: bookingId,
    email,
    firstName,
    lastName,
    date,
    checkInTime,
    checkOutTime,
    guests: guests ? parseInt(guests) : 0,
    notes,
    confirmationToken,
    editToken,
    cancelToken,
  };

  // Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, canResend]);

  const handleResendEmail = async () => {
    if (!email || !bookingId) {
      setResendMessage('Missing email or booking information');
      return;
    }

    setIsResending(true);
    setResendMessage('');

    try {
      const response = await fetch('/api/bookings/resend-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          bookingId,
          bookingData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendMessage('Confirmation email resent successfully!');
        // Start countdown and disable resend
        setCountdown(60); // 60 seconds = 1 minute
        setCanResend(false);
      } else {
        setResendMessage(data.error || 'Failed to resend email');
      }
    } catch (error) {
      console.error('Error resending email:', error);
      setResendMessage('Error resending email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  // Format countdown display
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Confirmation Email Sent!
            </h1>
            
            <p className="text-gray-600 mb-6">
              A booking confirmation has been sent to your email address. 
              Please check your inbox and click the confirmation link to finalize your booking.
            </p>

            {email && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  Email sent to: <span className="font-semibold text-gray-900">{email}</span>
                </p>
                {bookingData && (
                  <div className="mt-2 text-xs text-gray-500">
                    <p><strong>Name:</strong> {firstName} {lastName}</p>
                    <p><strong>Date:</strong> {date ? new Date(date).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Time:</strong> {checkInTime} - {checkOutTime}</p>
                    <p><strong>Guests:</strong> {guests}</p>
                    {notes && <p><strong>Notes:</strong> {notes}</p>}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Return to Home
              </Link>
              
              <button
                onClick={handleResendEmail}
                disabled={isResending || !canResend}
                className={`block w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                  canResend 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                } disabled:opacity-50`}
              >
                {isResending 
                  ? 'Sending...' 
                  : !canResend 
                    ? `Resend in ${formatCountdown(countdown)}`
                    : 'Resend Confirmation Email'
                }
              </button>
            </div>

            {/* Show resend message */}
            {resendMessage && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                resendMessage.includes('successfully') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {resendMessage}
              </div>
            )}

            <div className="mt-6 text-xs text-gray-500">
              <p>Didn't receive the email? Check your spam folder or contact us for assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 