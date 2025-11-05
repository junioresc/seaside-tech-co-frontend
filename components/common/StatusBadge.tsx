import { Chip } from '@mui/material';
import type { RepairStatus, AppointmentStatus } from '@/types';

interface StatusBadgeProps {
  status: RepairStatus | AppointmentStatus | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getColor = (
    status: string
  ): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' => {
    const colorMap: Record<
      string,
      'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
    > = {
      // Repair statuses
      received: 'primary',
      diagnosing: 'primary',
      awaiting_approval: 'warning',
      approved: 'info',
      repairing: 'warning',
      waiting_parts: 'warning',
      ready: 'success',
      completed: 'success',
      cancelled: 'error',
      // Appointment statuses
      scheduled: 'primary',
      checked_in: 'warning',
      in_progress: 'warning',
    };
    return colorMap[status] || 'default';
  };

  const formatLabel = (status: string): string => {
    return status.replace(/_/g, ' ').toUpperCase();
  };

  return <Chip label={formatLabel(status)} color={getColor(status)} size="small" />;
}

