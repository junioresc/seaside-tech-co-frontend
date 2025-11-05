import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import type { RepairStatus, AppointmentStatus } from '@/types';

type StatusType = RepairStatus | AppointmentStatus | string;

interface StyledStatusChipProps {
  statustype: StatusType;
}

const getStatusColor = (
  status: string
): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' => {
  const colorMap: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = {
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

export const StyledStatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'statustype',
})<StyledStatusChipProps>(({ theme, statustype }) => ({
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

export { getStatusColor };

