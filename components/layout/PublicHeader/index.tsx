'use client';

import { useState } from 'react';
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Link from 'next/link';
import { useThemeMode } from '@/providers/ThemeProvider';
import {
  StyledAppBar,
  StyledDrawer,
  NavContainer,
  DrawerContent,
  LogoText,
} from './styles';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Book Appointment', href: '/book' },
  { label: 'Track Repair', href: '/repairs/track' },
  { label: 'Login', href: '/login' },
];

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleTheme } = useThemeMode();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <DrawerContent onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Seaside Tech Co
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerContent>
  );

  return (
    <>
      <StyledAppBar>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <LogoText as={Link} href="/">
            Seaside Tech Co
          </LogoText>

          <NavContainer>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
          </NavContainer>

          <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </StyledDrawer>
    </>
  );
}

