'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

type BookingSummary = {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  checkInTime?: string;
  checkOutTime?: string;
};

export default function BookingDetailsPanel({
  summary,
  showSteps = true,
}: {
  summary: BookingSummary;
  showSteps?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(searchParams.get('date') || summary?.checkIn || '');
  const [checkInTime, setCheckInTime] = useState(searchParams.get('checkInTime') || summary?.checkInTime || '');
  const [checkOutTime, setCheckOutTime] = useState(searchParams.get('checkOutTime') || summary?.checkOutTime || '');
  const [guests, setGuests] = useState(
    searchParams.get('guests') || 
    (typeof summary?.guests === 'number' ? String(summary?.guests) : '')
  );
  const [loading, setLoading] = useState(false);

  // Calculate duration in hours
  const calculateDuration = () => {
    if (!checkInTime || !checkOutTime) return 0;
    const checkIn = new Date(`2000-01-01T${checkInTime}`);
    const checkOut = new Date(`2000-01-01T${checkOutTime}`);
    const diffMs = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60)); // Convert to hours
  };

  const duration = calculateDuration();
  const hourlyRate = 100;
  const cleaningFee = 10;
  const serviceFee = 10;
  const subtotal = duration * hourlyRate;
  const total = subtotal + cleaningFee + serviceFee;

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !phone || !date || !checkInTime || !checkOutTime || !guests) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobileNumber: phone,
          notes,
          guestCount: parseInt(guests),
          date,
          checkInTime,
          checkOutTime,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to confirmation sent page
        const params = new URLSearchParams();
        params.set('email', email);
        params.set('bookingId', data.bookingId);
        router.push(`/confirmation-sent?${params.toString()}`);
      } else {
        alert(data.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setNotes('');
  };

  const isFormComplete = Boolean(
    firstName &&
    lastName &&
    email &&
    phone &&
    date &&
    checkInTime &&
    checkOutTime &&
    guests
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {showSteps && (
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-600">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-700 text-white">1</span>
          <span>Booking details</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200">2</span>
          <span>Confirm and Pay</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="md:col-span-2 bg-white border rounded-md p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Book a slot</h2>

          <section className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Details</h3>
            <p className="text-xs text-gray-500 mb-4">
              Please provide your information. We will never share your details.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className="border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <textarea
                className="w-full border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                placeholder="Additional notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Booking details</h3>
            <p className="text-[11px] text-red-600 mb-4">
              Note: Please ensure the dates are correct before moving forward.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-gray-700 text-xs mb-1">Date</div>
                <input
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <div className="text-gray-700 text-xs mb-1">Check-in Time</div>
                <input
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                  type="time"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                />
              </div>
              <div>
                <div className="text-gray-700 text-xs mb-1">Check-out Time</div>
                <input
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                  type="time"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                />
              </div>
              <div>
                <div className="text-gray-700 text-xs mb-1">Guests</div>
                <select
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value="">Select</option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} Guest{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button 
                className="bg-gray-900 text-white" 
                onClick={handleSubmit}
                disabled={loading || !isFormComplete}
              >
                {loading ? 'Creating Booking...' : 'SUBMIT'}
              </Button>
              <Button variant="secondary" onClick={handleClear}>CLEAR</Button>
            </div>
          </section>
        </div>

        {/* Right: Summary Card */}
        <aside className="bg-white border rounded-md p-6 shadow-sm h-fit">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Booking details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="border rounded-md p-3">
              <div className="text-gray-700 text-xs mb-1">Date</div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span>{date ? new Date(date).toLocaleDateString() : 'No selected date'}</span>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-gray-700 text-xs mb-1">Check-in</div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <span>{checkInTime || 'No selected time'}</span>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-gray-700 text-xs mb-1">Check-out</div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <span>{checkOutTime || 'No selected time'}</span>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-gray-700 text-xs mb-1">Guests</div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="3" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>{guests || 'No entered guests'}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}