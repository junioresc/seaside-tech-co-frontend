'use client';

import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { CustomerNav } from '@/components/layout/CustomerNav';

interface CustomerLayoutProps {
  children: ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <ProtectedRoute requiredRole="customer">
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CustomerNav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
          }}
        >
          <Container maxWidth="lg">{children}</Container>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}

