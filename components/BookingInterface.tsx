'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function BookingInterface() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  const handleCheckAvailability = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault();
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (checkIn) params.set('checkIn', checkIn);
      if (checkOut) params.set('checkOut', checkOut);
      if (guests) params.set('guests', guests);
      const url = `/booking${params.toString() ? `?${params.toString()}` : ''}`;
      window.location.assign(url);
    }
  };

  return (
    <div className="bg-green-800/90 backdrop-blur-sm rounded-lg p-4 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* CHECK-IN Section */}
        <div className="flex-1 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-white mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-bold text-sm uppercase">CHECK-IN</span>
          </div>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:border-white/50"
            placeholder="Select Date"
          />
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-12 bg-white/30"></div>

        {/* CHECK-OUT Section */}
        <div className="flex-1 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-white mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-bold text-sm uppercase">CHECK-OUT</span>
          </div>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:border-white/50"
            placeholder="Select Date"
          />
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-12 bg-white/30"></div>

        {/* GUESTS Section */}
        <div className="flex-1 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-white mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span className="font-bold text-sm uppercase">GUESTS</span>
          </div>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-white/50"
          >
            <option value="" className="text-gray-800">Select number of guest</option>
            <option value="1" className="text-gray-800">1 Guest</option>
            <option value="2" className="text-gray-800">2 Guests</option>
            <option value="3" className="text-gray-800">3 Guests</option>
            <option value="4" className="text-gray-800">4 Guests</option>
            <option value="5" className="text-gray-800">5+ Guests</option>
          </select>
        </div>

        {/* CHECK AVAILABILITY Button */}
        <div className="w-full md:w-auto">
          <Button
            type="button"
            onClick={handleCheckAvailability}
            className="w-full md:w-auto bg-white text-green-800 hover:bg-gray-100 font-bold py-3 px-6 rounded"
          >
            CHECK AVAILABILITY
          </Button>
        </div>
      </div>
    </div>
  );
}

