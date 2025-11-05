import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, TextField } from '@mui/material';

export const QuantityContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

export const QuantityInput = styled(TextField)(({ theme }) => ({
  '& input': {
    textAlign: 'center',
    width: '60px',
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  flexGrow: 1,
  minHeight: 48,
}));

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

