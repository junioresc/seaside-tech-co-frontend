"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { useCurrentUser } from '@/providers/AuthBootstrap';
import { LoadingWrap } from './styles';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'customer' | 'technician' | 'admin';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { data: user, isLoading, error } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && (!user || error)) {
      router.push('/login');
    } else if (user && requiredRole && user.role !== requiredRole && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, isLoading, error, requiredRole, router]);

  if (isLoading) {
    return (
      <LoadingWrap>
        <CircularProgress />
      </LoadingWrap>
    );
  }

  if (!user || error) {
    return null;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}
