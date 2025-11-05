import { api } from '@/lib/api/client';
import type { Service, TimeSlot, Appointment } from '@/types';

export const bookingsApi = {
  getServices: async (): Promise<Service[]> => {
    const response = await api.get('/services/');
    return response.data.results || response.data;
  },

  getAvailableSlots: async (serviceId: string, date: string): Promise<TimeSlot[]> => {
    const response = await api.get(`/services/${serviceId}/available-slots/`, {
      params: { date },
    });
    return response.data;
  },

  createAppointment: async (data: {
    service_id: string;
    scheduled_time: string;
    notes?: string;
  }): Promise<Appointment> => {
    const response = await api.post('/appointments/', data);
    return response.data;
  },

  getAppointment: async (id: string): Promise<Appointment> => {
    const response = await api.get(`/appointments/${id}/`);
    return response.data;
  },

  cancelAppointment: async (id: string): Promise<void> => {
    await api.post(`/appointments/${id}/cancel/`);
  },

  checkIn: async (token: string, deviceInfo: any): Promise<Appointment> => {
    const response = await api.post(`/appointments/check-in/${token}/`, deviceInfo);
    return response.data;
  },
};

