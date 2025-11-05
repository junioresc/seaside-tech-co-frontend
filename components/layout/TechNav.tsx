'use client';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BuildIcon from '@mui/icons-material/Build';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';

const drawerWidth = 240;

const navItems = [
  { label: 'Schedule', href: '/schedule', icon: <CalendarMonthIcon /> },
  { label: 'Repairs', href: '/repairs', icon: <BuildIcon /> },
  { label: 'Analytics', href: '/analytics', icon: <BarChartIcon /> },
];

export function TechNav() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Tech Portal
        </Typography>
      </Toolbar>
      <Divider />
      
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <List>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isActive}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {user?.first_name} {user?.last_name}
        </Typography>
        <IconButton onClick={logout} color="primary" size="small">
          <LogoutIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Logout
          </Typography>
        </IconButton>
      </Box>
    </Drawer>
  );
}

