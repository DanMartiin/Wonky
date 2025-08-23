'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CalendarDays, Users } from 'lucide-react';

export default function BookingInterface() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  const handleCheckAvailability = () => {
    // This would typically open a modal or navigate to the full booking form
    console.log('Check availability clicked', { checkIn, checkOut, guests });
  };

  return (
    <div className="bg-[#112921] backdrop-blur-sm rounded-lg shadow-xl max-w-6xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center">
        {/* CHECK-IN Section */}
        <div className="md:col-span-1 p-8">
          <div className="flex items-center space-x-3 text-white">
            <CalendarDays />
            <span className="text-sm uppercase tracking-wide font-nunito">CHECK-IN</span>
          </div>
          <div className="text-white/70 text-sm ml-9 font-nunito">Select Date</div>
        </div>

        {/* CHECK-OUT Section */}
        <div className="md:col-span-1 p-8">
          <div className="flex items-center space-x-3 text-white">
            <CalendarDays />
            <span className="text-sm uppercase tracking-wide font-nunito">CHECK-OUT</span>
          </div>
          <div className="text-white/70 text-sm ml-9 font-nunito">Select Date</div>
        </div>

        {/* GUESTS Section */}
        <div className="md:col-span-1 p-8">
          <div className="flex items-center space-x-3 text-white">
            <Users />
            <span className="text-sm uppercase tracking-wide font-nunito">GUESTS</span>
          </div>
          <div className="text-white/70 text-sm ml-9 font-nunito">Select number of guest</div>
        </div>

        {/* CHECK AVAILABILITY Button - Full height and width of the last column */}
        <div className="md:col-span-1 h-full">
          <Button
            onClick={handleCheckAvailability}
            className="w-full h-full bg-[#E9F3F3] text-[#112921] hover:bg-[#BBBBBB] font-bold py-6 px-8 text-sm uppercase tracking-[0.24em] flex items-center justify-center rounded-none font-nunito"
          >
            check availability
          </Button>
        </div>
      </div>
    </div>
  );
}

