import type { RepairStatus, AppointmentStatus } from '@/types';
import { StyledStatusChip, getStatusColor } from './styles';

interface StatusBadgeProps {
  status: RepairStatus | AppointmentStatus | string;
}

const formatLabel = (status: string): string => {
  return status.replace(/_/g, ' ').toUpperCase();
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <StyledStatusChip
      label={formatLabel(status)}
      color={getStatusColor(status)}
      size="small"
      statustype={status}
    />
  );
}

