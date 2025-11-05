'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { authApi } from '@/lib/api/endpoints/auth';
import { setAccessToken, clearAccessToken } from '@/lib/auth/tokenStore';
import type { LoginCredentials, RegisterData } from '@/types';
import { useCurrentUser } from '@/providers/AuthBootstrap';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { data: user, isLoading } = useCurrentUser();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAccessToken(data.access);
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      enqueueSnackbar('Login successful!', { variant: 'success' });
      router.push('/account');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Login failed';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAccessToken(data.access);
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      enqueueSnackbar('Registration successful!', { variant: 'success' });
      router.push('/account');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Registration failed';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAccessToken();
      queryClient.setQueryData(['user', 'me'], null);
      queryClient.clear();
      enqueueSnackbar('Logged out successfully', { variant: 'info' });
      router.push('/');
    },
    onError: () => {
      // Even on error, clear local state
      clearAccessToken();
      queryClient.setQueryData(['user', 'me'], null);
      queryClient.clear();
      router.push('/');
    },
  });

  const requestPasswordResetMutation = useMutation({
    mutationFn: (email: string) => authApi.requestPasswordReset(email),
    onSuccess: () => {
      enqueueSnackbar('Password reset email sent!', { variant: 'success' });
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to send reset email';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.resetPassword(token, password),
    onSuccess: () => {
      enqueueSnackbar('Password reset successful!', { variant: 'success' });
      router.push('/login');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Password reset failed';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: (credentials: LoginCredentials) => loginMutation.mutate(credentials),
    register: (data: RegisterData) => registerMutation.mutate(data),
    logout: () => logoutMutation.mutate(),
    requestPasswordReset: (email: string) => requestPasswordResetMutation.mutate(email),
    resetPassword: (token: string, password: string) =>
      resetPasswordMutation.mutate({ token, password }),
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}

