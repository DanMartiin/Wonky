'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormData } from '@/lib/validation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create booking');
      }

      toast.success('Booking submitted successfully! Please check your email to verify your booking.');
      reset();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-green-800/90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...register('name')}
          />
          
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email address"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            error={errors.date?.message}
            {...register('date')}
          />
          
          <Input
            label="Time"
            type="time"
            error={errors.time?.message}
            {...register('time')}
          />
        </div>

        <Textarea
          label="Notes (Optional)"
          placeholder="Any special requests or notes..."
          error={errors.notes?.message}
          {...register('notes')}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-green-800 hover:bg-gray-100 font-semibold py-3"
        >
          {isSubmitting ? 'Submitting...' : 'Book Your Nook'}
        </Button>
      </form>
    </div>
  );
}

