import { styled } from '@mui/material/styles';
import { Box, Container, Grid } from '@mui/material';

import type { BoxProps, GridProps, ContainerProps } from '@mui/material';

export const FooterContainer = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  marginTop: 'auto',
}));

export const FooterInner = styled(Container)<ContainerProps>(({ theme }) => ({}));

export const FooterSection = styled(Grid)<GridProps>(({ theme }) => ({}));

export const LinksColumn = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const FooterBottom = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: theme.spacing(4),
  paddingTop: theme.spacing(4),
  borderTop: `1px solid ${theme.palette.divider}`,
  textAlign: 'center',
}));
