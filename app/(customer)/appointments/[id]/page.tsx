'use client';

import { Box, Typography, Card, CardContent, Button, Chip, Divider, Grid } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { formatDateTime } from '@/lib/utils/datetime';
import { bookingsApi } from '@/lib/api/endpoints/bookings';
import type { Appointment } from '@/types';

export default function AppointmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const appointmentId = params.id as string;

  const { data: appointment, isLoading } = useQuery<Appointment>({
    queryKey: ['appointments', appointmentId],
    queryFn: () => bookingsApi.getAppointment(appointmentId),
  });

  const cancelMutation = useMutation({
    mutationFn: () => bookingsApi.cancelAppointment(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', appointmentId] });
      enqueueSnackbar('Appointment cancelled', { variant: 'info' });
      router.push('/account');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to cancel appointment';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  if (isLoading) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!appointment) {
    return (
      <Box>
        <Typography>Appointment not found</Typography>
      </Box>
    );
  }

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
        Appointment Details
      </Typography>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
            <Box>
              <Typography variant="h5" gutterBottom fontWeight="600">
                {appointment.service.name}
              </Typography>
              <Chip
                label={appointment.status.replace('_', ' ').toUpperCase()}
                color={getStatusColor(appointment.status)}
                size="small"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Scheduled Time
              </Typography>
              <Typography variant="body1" fontWeight="600">
                {formatDateTime(appointment.scheduled_time)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Duration
              </Typography>
              <Typography variant="body1" fontWeight="600">
                {appointment.service.duration_minutes} minutes
              </Typography>
            </Grid>

            {appointment.notes && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Notes
                </Typography>
                <Typography variant="body1">{appointment.notes}</Typography>
              </Grid>
            )}

            {appointment.check_in_token && appointment.status === 'scheduled' && (
              <Grid item xs={12}>
                <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Check-in Link
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {window.location.origin}/checkin/{appointment.check_in_token}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => {
                      router.push(`/checkin/${appointment.check_in_token}`);
                    }}
                  >
                    Check In Now
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>

          {appointment.status === 'scheduled' && (
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => cancelMutation.mutate()}
                disabled={cancelMutation.isPending}
              >
                {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Appointment'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

