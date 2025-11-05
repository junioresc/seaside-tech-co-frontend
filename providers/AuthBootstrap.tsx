'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress } from '@mui/material';
import { api } from '@/lib/api/client';
import { setAccessToken } from '@/lib/auth/tokenStore';
import type { User } from '@/types';

interface AuthBootstrapProps {
  children: ReactNode;
}

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  // Attempt to refresh token on mount
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const response = await api.post('/auth/refresh/');
        setAccessToken(response.data.access);
      } catch (error) {
        // No valid refresh token, user needs to log in
        console.log('No valid session found');
      } finally {
        setIsBootstrapping(false);
      }
    };

    bootstrap();
  }, []);

  if (isBootstrapping) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}

// Hook to get current user
export function useCurrentUser() {
  return useQuery<User>({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const response = await api.get('/auth/me/');
      return response.data;
    },
    retry: false,
    staleTime: Infinity,
  });
}

