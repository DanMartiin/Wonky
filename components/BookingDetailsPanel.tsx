'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

type BookingSummary = {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  time?: string;
};

export default function BookingDetailsPanel({
  summary,
  onBookNow,
  onCancel,
  showSteps = true,
}: {
  summary: BookingSummary;
  onBookNow?: () => void;
  onCancel?: () => void;
  showSteps?: boolean;
}) {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(summary?.checkIn || '');
  const [checkOut, setCheckOut] = useState(summary?.checkOut || '');
  const [time, setTime] = useState(summary?.time || '');
  const [guests, setGuests] = useState(
    typeof summary?.guests === 'number' ? String(summary?.guests) : ''
  );

  const proceedToPayment = () => {
    const query = new URLSearchParams();
    if (checkIn) query.set('checkIn', checkIn);
    if (checkOut) query.set('checkOut', checkOut);
    if (time) query.set('time', time);
    if (guests) query.set('guests', guests);
    router.push(`/booking/payment${query.toString() ? `?${query.toString()}` : ''}`);
  };

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCheckIn('');
    setCheckOut('');
    setTime('');
    setGuests('');
  };

  const isFormComplete = Boolean(
    firstName &&
    lastName &&
    email &&
    phone &&
    checkIn &&
    checkOut &&
    time &&
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
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Booking details</h3>
            <p className="text-[11px] text-red-600 mb-4">
              Note: Please ensure the dates are correct before moving forward.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-gray-700 text-xs mb-1">Check In</div>
                <input
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <div className="text-gray-700 text-xs mb-1">Check Out</div>
                <input
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <div className="text-gray-700 text-xs mb-1">Time</div>
                <input
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              {onBookNow ? (
                <Button className="bg-gray-900 text-white" onClick={onBookNow}>SUBMIT</Button>
              ) : (
                <Button className="bg-gray-900 text-white" onClick={proceedToPayment}>SUBMIT</Button>
              )}
              <Button variant="secondary" onClick={handleClear}>CLEAR</Button>
            </div>
          </section>
        </div>

        {/* Right: Summary Card styled as 2x2 cards with icons */}
        <aside className="bg-white border rounded-md p-6 shadow-sm h-fit">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Booking details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="border rounded-md p-3">
              <div className="text-gray-700 text-xs mb-1">Check In</div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span>{checkIn || 'No selected date'}</span>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-gray-700 text-xs mb-1">Check Out</div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span>{checkOut || 'No selected date'}</span>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-gray-700 text-xs mb-1">Time</div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <span>{time || 'No selected time'}</span>
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

          {/* Payment summary */}
          {isFormComplete && (
          <div className="mt-6 border-t pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Payment</h4>
            <div className="text-sm divide-y">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">$100 / hr × 2</span>
                <span className="text-gray-900">$200</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600 underline decoration-dotted">Cleaning fee</span>
                <span className="text-gray-900">$10</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Service fee</span>
                <span className="text-gray-900">$10</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 py-3 border-t">
              <span className="text-sm font-semibold text-gray-900">Total</span>
              <span className="text-base font-semibold text-gray-900">$220</span>
            </div>

            <div className="mt-4 space-y-3">
              <button
                className="w-full border rounded px-4 py-2 text-sm"
                onClick={proceedToPayment}
              >
                BOOK NOW
              </button>
              <button
                className="w-full border rounded px-4 py-2 text-sm"
                onClick={() => router.push('/')}
              >
                CANCEL
              </button>
            </div>
          </div>
          )}
        </aside>
      </div>
    </div>
  );
}


