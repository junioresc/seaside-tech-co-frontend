import { styled } from '@mui/material/styles';
import { AppBar, Drawer, Box } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  elevation: 1,
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  display: { xs: 'block', md: 'none' },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: 240,
  },
}));

export const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const DrawerContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
}));

export const LogoText = styled('a')(({ theme }) => ({
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
  fontWeight: 700,
  fontSize: '1.25rem',
  cursor: 'pointer',
}));

