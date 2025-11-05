'use client';

import { useEffect } from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import QRCode from 'react-qr-code';
import { formatDateTime } from '@/lib/utils/datetime';
import { repairsApi } from '@/lib/api/endpoints/repairs';
import type { Repair } from '@/types';

export default function PrintLabelPage() {
  const params = useParams();
  const repairId = params.id as string;

  const { data: repair, isLoading } = useQuery<Repair>({
    queryKey: ['repairs', repairId],
    queryFn: () => repairsApi.getRepair(repairId),
  });

  useEffect(() => {
    // Auto-print when page loads and repair data is available
    if (repair && !isLoading) {
      const timer = setTimeout(() => {
        window.print();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [repair, isLoading]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!repair) {
    return <Typography>Repair not found</Typography>;
  }

  const trackingUrl = `${window.location.origin}/repairs/track/${repair.ticket_number}`;

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: '4in',
        mx: 'auto',
        '@media print': {
          p: 0,
          maxWidth: 'none',
        },
      }}
    >
      <Box sx={{ border: 2, borderColor: 'divider', p: 2 }}>
        {/* Header */}
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Seaside Tech Co
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Repair Service
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* Ticket Number */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h3" fontWeight="bold">
            #{repair.ticket_number}
          </Typography>
        </Box>

        {/* QR Code */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <QRCode value={trackingUrl} size={150} />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Device Info */}
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Typography variant="body2" fontWeight="600">
              Device:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body2">
              {repair.device_brand} {repair.device_model}
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography variant="body2" fontWeight="600">
              Customer:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body2">
              {repair.customer.first_name} {repair.customer.last_name}
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography variant="body2" fontWeight="600">
              Received:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body2">{formatDateTime(repair.created_at)}</Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography variant="body2" fontWeight="600">
              Status:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body2" sx={{ textTransform: 'uppercase' }}>
              {repair.status.replace('_', ' ')}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Issue */}
        <Typography variant="body2" fontWeight="600" gutterBottom>
          Issue:
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {repair.issue_description}
        </Typography>

        {/* Footer */}
        <Typography variant="caption" align="center" display="block" sx={{ mt: 2 }}>
          Scan QR code to track repair status
        </Typography>
      </Box>

      {/* Print instructions (hidden when printing) */}
      <Box
        sx={{
          mt: 3,
          textAlign: 'center',
          '@media print': {
            display: 'none',
          },
        }}
      >
        <Typography variant="body2" color="text.secondary">
          The print dialog should open automatically. If not, use your browser's print function
          (Cmd/Ctrl + P).
        </Typography>
      </Box>
    </Box>
  );
}

