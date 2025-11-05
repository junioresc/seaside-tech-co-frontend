import { z } from 'zod';

export const bookingSchema = z.object({
  service_id: z.string().min(1, 'Please select a service'),
  scheduled_time: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
});

export const checkInSchema = z.object({
  device_type: z.string().min(1, 'Device type is required'),
  device_brand: z.string().min(1, 'Device brand is required'),
  device_model: z.string().min(1, 'Device model is required'),
  issue_description: z.string().min(10, 'Please provide a detailed description (min 10 characters)'),
  passcode: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type CheckInFormData = z.infer<typeof checkInSchema>;

