'use client';

import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testCreateBooking = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Test',
          lastName: 'User',
          email: 'resurreccionjohnalesi@gmail.com',
          mobileNumber: '+1234567890',
          notes: 'Test booking from UI',
          guestCount: 2,
          date: '2025-10-07',
          checkInTime: '10:00',
          checkOutTime: '12:00',
        }),
      });

      const data = await response.json();
      setResult({ type: 'Create Booking', data });
    } catch (error) {
      setResult({ type: 'Create Booking', error: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const testGetBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setResult({ type: 'Get Bookings', data });
    } catch (error) {
      setResult({ type: 'Get Bookings', error: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const testConfirmBooking = async () => {
    if (!result?.data?.confirmationToken) {
      alert('Please create a booking first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/bookings/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: result.data.confirmationToken,
        }),
      });

      const data = await response.json();
      setResult({ type: 'Confirm Booking', data });
    } catch (error) {
      setResult({ type: 'Confirm Booking', error: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Booking System Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={testCreateBooking}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Create Booking'}
          </button>
          
          <button
            onClick={testGetBookings}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Get Bookings'}
          </button>
          
          <button
            onClick={testConfirmBooking}
            disabled={loading || !result?.data?.confirmationToken}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Confirm Booking'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Result: {result.type}</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result.data || result.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 