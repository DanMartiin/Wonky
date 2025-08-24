'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { bookingSchema, type BookingFormData } from '../lib/validation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      date: '',
      time: '',
      notes: '',
    },
  });

  const onSubmit = async (values: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Failed to create booking');
      }
      toast.success(result?.message || 'Booking created successfully. Check your email to verify.');
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="Name"
          placeholder="John Doe"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          type="email"
          label="Email"
          placeholder="john@example.com"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          type="date"
          label="Date"
          {...register('date')}
          error={errors.date?.message}
        />
        <Input
          type="time"
          label="Time"
          {...register('time')}
          error={errors.time?.message}
        />
      </div>

      <Textarea
        label="Notes (optional)"
        placeholder="Any special requests or notes..."
        {...register('notes')}
        error={errors.notes?.message}
      />

      <div className="flex items-center gap-2">
        <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
          {isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => reset()}
          disabled={isSubmitting}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}
