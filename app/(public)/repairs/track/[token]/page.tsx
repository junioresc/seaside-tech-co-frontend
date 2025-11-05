'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { formatDateTime } from '@/lib/utils/datetime';
import { formatCurrency } from '@/lib/utils/format';
import { repairsApi } from '@/lib/api/endpoints/repairs';
import type { Repair, RepairStatus } from '@/types';

const statusSteps: RepairStatus[] = [
  'received',
  'diagnosing',
  'approved',
  'repairing',
  'ready',
  'completed',
];

export default function TrackRepairPage() {
  const params = useParams();
  const token = params.token as string;

  const { data: repair, isLoading, error } = useQuery<Repair>({
    queryKey: ['repairs', 'track', token],
    queryFn: () => repairsApi.trackByToken(token),
  });

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography>Loading repair status...</Typography>
      </Container>
    );
  }

  if (error || !repair) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography color="error">Unable to find repair with this tracking number</Typography>
      </Container>
    );
  }

  const activeStep = statusSteps.indexOf(repair.status);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold" align="center">
        Repair Status
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Ticket #{repair.ticket_number}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {statusSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label.replace('_', ' ').toUpperCase()}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight="600">
            Device Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Device
              </Typography>
              <Typography variant="body1" fontWeight="600">
                {repair.device_brand} {repair.device_model}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Type
              </Typography>
              <Typography variant="body1" fontWeight="600">
                {repair.device_type}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Issue
              </Typography>
              <Typography variant="body1">{repair.issue_description}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Received
              </Typography>
              <Typography variant="body1">{formatDateTime(repair.created_at)}</Typography>
            </Grid>

            {repair.estimated_cost && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Estimated Cost
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  {formatCurrency(repair.estimated_cost)}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {repair.line_items && repair.line_items.length > 0 && (
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Repair Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {repair.line_items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.description}
                      {item.is_labor && (
                        <Chip label="Labor" size="small" sx={{ ml: 1 }} />
                      )}
                    </TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(item.unit_price)}</TableCell>
                    <TableCell align="right">{formatCurrency(item.total_price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {repair.final_cost && (
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Typography variant="h6" fontWeight="bold">
                  Total: {formatCurrency(repair.final_cost)}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {repair.notes && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Notes
            </Typography>
            <Typography variant="body2">{repair.notes}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

