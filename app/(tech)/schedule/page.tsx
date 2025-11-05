'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { bookingsApi } from '@/lib/api/endpoints/bookings';
import { formatTime } from '@/lib/utils/datetime';
import type { Appointment } from '@/types';

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: ['appointments', 'schedule', selectedDate],
    queryFn: async () => {
      // This would typically call an endpoint to get appointments for the date
      const response = await bookingsApi.getServices(); // Placeholder
      return [];
    },
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
      scheduled: 'primary',
      checked_in: 'warning',
      in_progress: 'warning',
      completed: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Schedule
      </Typography>

      <Card sx={{ mb: 3 }}>
        <Tabs
          value={selectedDate}
          onChange={(_, newValue) => setSelectedDate(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dateStr = format(date, 'yyyy-MM-dd');
            return (
              <Tab
                key={dateStr}
                label={format(date, 'MMM dd')}
                value={dateStr}
              />
            );
          })}
        </Tabs>
      </Card>

      {isLoading ? (
        <Typography>Loading schedule...</Typography>
      ) : (
        <Grid container spacing={2}>
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Grid item xs={12} md={6} key={appointment.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                  component={Link}
                  href={`/appointments/${appointment.id}`}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" fontWeight="600">
                        {formatTime(appointment.scheduled_time)}
                      </Typography>
                      <Chip
                        label={appointment.status.toUpperCase()}
                        color={getStatusColor(appointment.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body1" gutterBottom>
                      {appointment.service.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appointment.customer.first_name} {appointment.customer.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {appointment.service.duration_minutes} min
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography align="center" color="text.secondary">
                    No appointments scheduled for this date
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}

