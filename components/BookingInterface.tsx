'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CalendarDays, Users, Clock } from 'lucide-react';

export default function BookingInterface() {
  const [selectedDate, setSelectedDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [guests, setGuests] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePickers, setShowTimePickers] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<any>(null);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    setShowTimePickers(true);
  };

  const handleCheckAvailability = async () => {
    if (!selectedDate || !checkInTime || !checkOutTime || !guests) {
      alert('Please fill in all fields (Date, Check-in Time, Check-out Time, and Guests)');
      return;
    }

    // Validate times
    const checkIn = new Date(`2000-01-01T${checkInTime}`);
    const checkOut = new Date(`2000-01-01T${checkOutTime}`);
    
    if (checkOut <= checkIn) {
      alert('Check-out time must be after check-in time');
      return;
    }

    setLoading(true);
    setAvailability(null);

    try {
      const response = await fetch('/api/bookings/check-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          checkInTime,
          checkOutTime,
          guests: parseInt(guests),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAvailability(data);
      } else {
        alert(data.error || 'Failed to check availability');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      alert('Error checking availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (selectedDate) params.set('date', selectedDate);
      if (checkInTime) params.set('checkInTime', checkInTime);
      if (checkOutTime) params.set('checkOutTime', checkOutTime);
      if (guests) params.set('guests', guests);
      const url = `/booking${params.toString() ? `?${params.toString()}` : ''}`;
      window.location.assign(url);
    }
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const guestOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* Main Booking Interface */}
      <div className="bg-[#112921] max-w-[1010px] mx-auto rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 items-stretch">
          {/* DATE Section */}
          <div className="md:col-span-1 px-6 py-3 md:px-8 md:py-0 flex flex-col justify-center md:h-[89px] border-b border-white/10 md:border-b-0">
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <CalendarDays className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs sm:text-sm uppercase tracking-wide font-nunito">DATE</span>
            </div>
            <div 
              className="text-white/70 text-xs sm:text-sm ml-7 md:ml-9 font-nunito cursor-pointer hover:text-white transition-colors"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Select Date'}
            </div>
          </div>

          {/* CHECK-IN TIME Section */}
          <div className="md:col-span-1 px-6 py-3 md:px-8 md:py-0 flex flex-col justify-center md:h-[89px] border-b border-white/10 md:border-b-0">
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs sm:text-sm uppercase tracking-wide font-nunito">CHECK-IN</span>
            </div>
            <div 
              className="text-white/70 text-xs sm:text-sm ml-7 md:ml-9 font-nunito cursor-pointer hover:text-white transition-colors"
              onClick={() => setShowTimePickers(!showTimePickers)}
            >
              {checkInTime || 'Select Time'}
            </div>
          </div>

          {/* CHECK-OUT TIME Section */}
          <div className="md:col-span-1 px-6 py-3 md:px-8 md:py-0 flex flex-col justify-center md:h-[89px] border-b border-white/10 md:border-b-0">
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs sm:text-sm uppercase tracking-wide font-nunito">CHECK-OUT</span>
            </div>
            <div 
              className="text-white/70 text-xs sm:text-sm ml-7 md:ml-9 font-nunito cursor-pointer hover:text-white transition-colors"
              onClick={() => setShowTimePickers(!showTimePickers)}
            >
              {checkOutTime || 'Select Time'}
            </div>
          </div>

          {/* GUESTS Section */}
          <div className="md:col-span-1 px-6 py-3 md:px-8 md:py-0 flex flex-col justify-center md:h-[89px] md:border-r border-white/20">
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs sm:text-sm uppercase tracking-wide font-nunito">GUESTS</span>
            </div>
            <div className="text-white/70 text-xs sm:text-sm ml-7 md:ml-9 font-nunito">
              {guests ? `${guests} Guest${parseInt(guests) > 1 ? 's' : ''}` : 'Select number of guest'}
            </div>
          </div>

          {/* CHECK AVAILABILITY Button */}
          <div className="md:col-span-1">
            <Button
              onClick={handleCheckAvailability}
              disabled={loading}
              className="w-full h-12 md:h-[89px] bg-[#E9F3F3] text-[#112921] hover:bg-[#BBBBBB] font-bold px-6 md:px-8 text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.24em] flex items-center justify-center rounded-none md:rounded-r-lg font-nunito disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'check availability'}
            </Button>
          </div>
        </div>
      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-black">
            <h3 className="text-lg font-semibold mb-4">Select Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateSelect(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDatePicker(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guest Selection Modal */}
      {showGuestPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-black">
            <h3 className="text-lg font-semibold mb-4">Select Number of Guests</h3>
            <select
              value={guests}
              onChange={(e) => {
                setGuests(e.target.value);
                setShowGuestPicker(false);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select guests</option>
              {guestOptions.map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowGuestPicker(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Availability Result */}
      {availability && (
        <div className="max-w-6xl mx-auto mt-4 px-4 sm:px-0">
          <div className={`rounded-lg p-6 shadow-lg ${
            availability.available 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              {availability.available ? (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <h3 className={`text-lg font-semibold ${
                availability.available ? 'text-green-800' : 'text-red-800'
              }`}>
                {availability.available ? 'Available!' : 'Not Available'}
              </h3>
            </div>
            
            <p className={`mb-4 ${
              availability.available ? 'text-green-700' : 'text-red-700'
            }`}>
              {availability.message}
            </p>

            {availability.available && (
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  onClick={handleBookNow}
                  className="bg-green-600 text-white hover:bg-green-700 font-bold py-3 px-6 rounded"
                >
                  Book Now
                </Button>
                <Button
                  onClick={() => setAvailability(null)}
                  className="bg-gray-600 text-white hover:bg-gray-700 font-bold py-3 px-6 rounded"
                >
                  Check Different Times
                </Button>
              </div>
            )}

            {!availability.available && (
              <button
                onClick={() => setAvailability(null)}
                className="bg-gray-600 text-white hover:bg-gray-700 font-bold py-3 px-6 rounded"
              >
                Try Different Times
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}