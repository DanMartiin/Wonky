'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

export default function ConfirmationSentPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const bookingId = searchParams.get('bookingId');

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                onClick={() => window.location.reload()}
                className="block w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                Resend Confirmation Email
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p>Didn't receive the email? Check your spam folder or contact us for assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 