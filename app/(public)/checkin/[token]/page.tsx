'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { bookingsApi } from '@/lib/api/endpoints/bookings';
import { checkInSchema, type CheckInFormData } from '@/features/booking/schemas';

export default function CheckInPage() {
  const params = useParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const token = params.token as string;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema),
  });

  const checkInMutation = useMutation({
    mutationFn: (data: CheckInFormData) => bookingsApi.checkIn(token, data),
    onSuccess: () => {
      enqueueSnackbar('Check-in successful!', { variant: 'success' });
      router.push('/');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Check-in failed';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const onSubmit = (data: CheckInFormData) => {
    checkInMutation.mutate(data);
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold" align="center">
        Device Check-In
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Please provide details about your device
      </Typography>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="device_type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Device Type"
                      fullWidth
                      error={!!errors.device_type}
                      helperText={errors.device_type?.message}
                      placeholder="e.g., Phone, Laptop"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="device_brand"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Brand"
                      fullWidth
                      error={!!errors.device_brand}
                      helperText={errors.device_brand?.message}
                      placeholder="e.g., Apple, Samsung"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="device_model"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Model"
                      fullWidth
                      error={!!errors.device_model}
                      helperText={errors.device_model?.message}
                      placeholder="e.g., iPhone 14 Pro"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="issue_description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Issue Description"
                      multiline
                      rows={4}
                      fullWidth
                      error={!!errors.issue_description}
                      helperText={
                        errors.issue_description?.message ||
                        'Please describe the issue in detail'
                      }
                      placeholder="What's wrong with your device?"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="passcode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Device Passcode (Optional)"
                      fullWidth
                      type="password"
                      helperText="We may need this to test your device after repair"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={checkInMutation.isPending}
              sx={{ mt: 3 }}
            >
              {checkInMutation.isPending ? 'Checking in...' : 'Complete Check-In'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

