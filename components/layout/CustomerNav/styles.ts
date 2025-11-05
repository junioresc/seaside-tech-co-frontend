import { styled } from '@mui/material/styles';
import { Drawer, Box, Toolbar } from '@mui/material';

export const drawerWidth = 240;

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

export const ScrollArea = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  flexGrow: 1,
}));

export const FooterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));
