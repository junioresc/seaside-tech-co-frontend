import { api } from '@/lib/api/client';
import type { Repair, LineItem } from '@/types';

export const repairsApi = {
  trackByToken: async (token: string): Promise<Repair> => {
    const response = await api.get(`/repairs/track/${token}/`);
    return response.data;
  },

  getRepair: async (id: string): Promise<Repair> => {
    const response = await api.get(`/repairs/${id}/`);
    return response.data;
  },

  listRepairs: async (params?: { status?: string; technician?: string }): Promise<Repair[]> => {
    const response = await api.get('/repairs/', { params });
    return response.data.results || response.data;
  },

  updateStatus: async (id: string, status: string): Promise<Repair> => {
    const response = await api.patch(`/repairs/${id}/`, { status });
    return response.data;
  },

  assignTechnician: async (id: string, technicianId: string): Promise<Repair> => {
    const response = await api.patch(`/repairs/${id}/assign/`, {
      technician_id: technicianId,
    });
    return response.data;
  },

  addLineItem: async (repairId: string, lineItem: Omit<LineItem, 'id'>): Promise<LineItem> => {
    const response = await api.post(`/repairs/${repairId}/line-items/`, lineItem);
    return response.data;
  },

  updateLineItem: async (
    repairId: string,
    lineItemId: string,
    data: Partial<LineItem>
  ): Promise<LineItem> => {
    const response = await api.patch(`/repairs/${repairId}/line-items/${lineItemId}/`, data);
    return response.data;
  },

  deleteLineItem: async (repairId: string, lineItemId: string): Promise<void> => {
    await api.delete(`/repairs/${repairId}/line-items/${lineItemId}/`);
  },
};

