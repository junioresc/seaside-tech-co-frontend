import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const LoadingWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));
