import { api } from '@/lib/api/client';
import type { Product, PaginatedResponse } from '@/types';

export const productsApi = {
  listProducts: async (params?: {
    category?: string;
    search?: string;
  }): Promise<Product[]> => {
    const response = await api.get('/products/', { params });
    return response.data.results || response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories/');
    return response.data;
  },
};

