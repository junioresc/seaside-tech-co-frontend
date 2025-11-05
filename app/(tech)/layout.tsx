'use client';

import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { TechNav } from '@/components/layout/TechNav';

interface TechLayoutProps {
  children: ReactNode;
}

export default function TechLayout({ children }: TechLayoutProps) {
  return (
    <ProtectedRoute requiredRole="technician">
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <TechNav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: { xs: 2, md: 3 },
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}

