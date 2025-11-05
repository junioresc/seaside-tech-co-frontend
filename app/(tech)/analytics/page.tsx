'use client';

import { Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';

export default function AnalyticsPage() {
  // Placeholder data - in real app, fetch from API
  const stats = [
    {
      title: 'Total Repairs',
      value: '142',
      change: '+12%',
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      color: 'primary.main',
    },
    {
      title: 'Revenue (MTD)',
      value: '$8,450',
      change: '+18%',
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      color: 'success.main',
    },
    {
      title: 'Active Customers',
      value: '89',
      change: '+5%',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: 'info.main',
    },
    {
      title: 'Avg. Turnaround',
      value: '2.3 days',
      change: '-8%',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: 'warning.main',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Analytics Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Overview of repair shop performance
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                  <Box
                    sx={{
                      bgcolor: 'success.light',
                      color: 'success.dark',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {stat.change}
                  </Box>
                </Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Repair Volume by Status
              </Typography>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.default',
                  borderRadius: 1,
                }}
              >
                <Typography color="text.secondary">
                  Chart placeholder - integrate with charting library
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Top Services
              </Typography>
              <Box sx={{ mt: 2 }}>
                {['Screen Repair', 'Battery Replacement', 'Water Damage', 'Software Issue'].map(
                  (service, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                        pb: 2,
                        borderBottom: i < 3 ? 1 : 0,
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant="body2">{service}</Typography>
                      <Typography variant="body2" fontWeight="600">
                        {25 - i * 5}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Recent Activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Activity log placeholder - show recent repair updates, new bookings, etc.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

