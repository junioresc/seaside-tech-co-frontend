import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ErrorWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  textAlign: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

export const IconStyles = {
  fontSize: 80,
};
