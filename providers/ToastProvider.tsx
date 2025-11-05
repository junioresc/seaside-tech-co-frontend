'use client';

import { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={4000}
    >
      {children}
    </SnackbarProvider>
  );
}

