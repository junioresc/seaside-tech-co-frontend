'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { format, addDays, parseISO } from 'date-fns';
import { bookingsApi } from '@/lib/api/endpoints/bookings';
import { bookingSchema, type BookingFormData } from '@/features/booking/schemas';
import type { Service, TimeSlot } from '@/types';

export default function BookPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service_id: '',
      scheduled_time: '',
      notes: '',
    },
  });

  const selectedServiceId = watch('service_id');

  // Fetch services
  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: bookingsApi.getServices,
  });

  // Fetch available slots
  const { data: slots, isLoading: slotsLoading } = useQuery<TimeSlot[]>({
    queryKey: ['slots', selectedServiceId, selectedDate],
    queryFn: () => bookingsApi.getAvailableSlots(selectedServiceId, selectedDate),
    enabled: !!selectedServiceId && !!selectedDate,
  });

  // Create appointment mutation
  const createMutation = useMutation({
    mutationFn: bookingsApi.createAppointment,
    onSuccess: (data) => {
      enqueueSnackbar('Appointment booked successfully!', { variant: 'success' });
      router.push(`/appointments/${data.id}`);
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to book appointment';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    createMutation.mutate(data);
  };

  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i);
    return format(date, 'yyyy-MM-dd');
  });

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold" align="center">
        Book an Appointment
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Choose a service and available time slot
      </Typography>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Service Selection */}
            <FormControl fullWidth margin="normal" error={!!errors.service_id}>
              <InputLabel>Service</InputLabel>
              <Controller
                name="service_id"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Service">
                    {servicesLoading && (
                      <MenuItem disabled>
                        <CircularProgress size={20} />
                      </MenuItem>
                    )}
                    {services?.map((service) => (
                      <MenuItem key={service.id} value={service.id}>
                        {service.name} - {service.duration_minutes} min
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.service_id && (
                <FormHelperText>{errors.service_id.message}</FormHelperText>
              )}
            </FormControl>

            {/* Date Selection */}
            {selectedServiceId && (
              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="600">
                  Select Date
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {availableDates.map((date) => (
                    <Chip
                      key={date}
                      label={format(parseISO(date), 'MMM dd')}
                      onClick={() => setSelectedDate(date)}
                      color={selectedDate === date ? 'primary' : 'default'}
                      variant={selectedDate === date ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Time Slot Selection */}
            {selectedServiceId && selectedDate && (
              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="600">
                  Available Time Slots
                </Typography>
                {slotsLoading ? (
                  <CircularProgress />
                ) : (
                  <Grid container spacing={1}>
                    <Controller
                      name="scheduled_time"
                      control={control}
                      render={({ field }) => (
                        <>
                          {slots?.map((slot) => (
                            <Grid item xs={6} sm={4} md={3} key={slot.start_time}>
                              <Button
                                fullWidth
                                variant={
                                  field.value === slot.start_time ? 'contained' : 'outlined'
                                }
                                disabled={!slot.available}
                                onClick={() => field.onChange(slot.start_time)}
                              >
                                {format(parseISO(slot.start_time), 'h:mm a')}
                              </Button>
                            </Grid>
                          ))}
                          {(!slots || slots.length === 0) && (
                            <Grid item xs={12}>
                              <Typography color="text.secondary" align="center">
                                No available slots for this date
                              </Typography>
                            </Grid>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                )}
                {errors.scheduled_time && (
                  <FormHelperText error>{errors.scheduled_time.message}</FormHelperText>
                )}
              </Box>
            )}

            {/* Notes */}
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Additional Notes (Optional)"
                  multiline
                  rows={3}
                  fullWidth
                  margin="normal"
                  placeholder="Any specific requests or information we should know?"
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={createMutation.isPending}
              sx={{ mt: 3 }}
            >
              {createMutation.isPending ? 'Booking...' : 'Book Appointment'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

