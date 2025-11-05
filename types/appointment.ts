import type { User } from './user';

export type AppointmentStatus = 'scheduled' | 'checked_in' | 'in_progress' | 'completed' | 'cancelled';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price?: string;
  category: string;
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  customer: User;
  service: Service;
  status: AppointmentStatus;
  scheduled_time: string;
  check_in_token?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

