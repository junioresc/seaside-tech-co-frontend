import { api } from '@/lib/api/client';
import type { User, LoginCredentials, RegisterData, AuthTokens } from '@/types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthTokens> => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthTokens> => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout/');
  },

  refresh: async (): Promise<AuthTokens> => {
    const response = await api.post('/auth/refresh/');
    return response.data;
  },

  me: async (): Promise<User> => {
    const response = await api.get('/auth/me/');
    return response.data;
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    await api.post('/auth/password-reset/', { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await api.post('/auth/password-reset/confirm/', { token, password });
  },
};

