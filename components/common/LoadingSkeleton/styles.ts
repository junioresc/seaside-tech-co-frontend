import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const TableSkeletonRow = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  height: 60,
}));

export const ListItemRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const ListItemText = styled(Box)(({ theme }) => ({
  flex: 1,
}));
