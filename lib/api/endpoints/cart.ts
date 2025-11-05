import { api } from '@/lib/api/client';
import type { Cart, CartItem } from '@/types';

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/cart/');
    return response.data;
  },

  addItem: async (productId: string, quantity: number = 1): Promise<Cart> => {
    const response = await api.post('/cart/items/', {
      product_id: productId,
      quantity,
    });
    return response.data;
  },

  updateItem: async (itemId: string, quantity: number): Promise<Cart> => {
    const response = await api.patch(`/cart/items/${itemId}/`, { quantity });
    return response.data;
  },

  removeItem: async (itemId: string): Promise<Cart> => {
    const response = await api.delete(`/cart/items/${itemId}/`);
    return response.data;
  },

  clearCart: async (): Promise<void> => {
    await api.delete('/cart/clear/');
  },
};

