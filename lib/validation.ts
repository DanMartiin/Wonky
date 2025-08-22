import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .refine((email) => {
      const testEmails = [
        'test@test.com',
        'abc@abc.com',
        'test@example.com',
        'user@test.com',
        'demo@demo.com',
        'sample@sample.com',
        'fake@fake.com',
        'dummy@dummy.com',
        'example@example.com',
        'admin@admin.com',
      ];
      return !testEmails.includes(email.toLowerCase());
    }, 'Please use a real email address'),
  date: z
    .string()
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'Date cannot be in the past'),
  time: z.string().min(1, 'Please select a time'),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isTestEmail(email: string): boolean {
  const testEmails = [
    'test@test.com',
    'abc@abc.com',
    'test@example.com',
    'user@test.com',
    'demo@demo.com',
    'sample@sample.com',
    'fake@fake.com',
    'dummy@dummy.com',
    'example@example.com',
    'admin@admin.com',
  ];
  return testEmails.includes(email.toLowerCase());
}

export function isDateInPast(date: string): boolean {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate < today;
}
