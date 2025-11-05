'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { formatDateTime } from '@/lib/utils/datetime';
import { formatCurrency, formatPhoneNumber } from '@/lib/utils/format';
import { repairsApi } from '@/lib/api/endpoints/repairs';
import { useUpdateRepairStatus } from '@/features/repairs/hooks/useUpdateRepairStatus';
import { useAddLineItem } from '@/features/repairs/hooks/useAddLineItem';
import type { Repair, RepairStatus } from '@/types';

export default function RepairDetailPage() {
  const params = useParams();
  const repairId = params.id as string;
  const [lineItemDialogOpen, setLineItemDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: repair, isLoading } = useQuery<Repair>({
    queryKey: ['repairs', repairId],
    queryFn: () => repairsApi.getRepair(repairId),
  });

  const updateStatusMutation = useUpdateRepairStatus();
  const addLineItemMutation = useAddLineItem(repairId);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      description: '',
      quantity: 1,
      unit_price: '',
      is_labor: false,
    },
  });

  const handleStatusChange = (newStatus: RepairStatus) => {
    updateStatusMutation.mutate({ id: repairId, status: newStatus });
  };

  const handleAddLineItem = (data: any) => {
    addLineItemMutation.mutate(
      {
        description: data.description,
        quantity: parseInt(data.quantity),
        unit_price: data.unit_price,
        total_price: (parseInt(data.quantity) * parseFloat(data.unit_price)).toString(),
        is_labor: data.is_labor,
      },
      {
        onSuccess: () => {
          setLineItemDialogOpen(false);
          reset();
        },
      }
    );
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!repair) {
    return <Typography>Repair not found</Typography>;
  }

  const statusOptions: RepairStatus[] = [
    'received',
    'diagnosing',
    'awaiting_approval',
    'approved',
    'repairing',
    'waiting_parts',
    'ready',
    'completed',
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
      received: 'primary',
      diagnosing: 'primary',
      awaiting_approval: 'warning',
      approved: 'info',
      repairing: 'warning',
      waiting_parts: 'warning',
      ready: 'success',
      completed: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Repair #{repair.ticket_number}
          </Typography>
          <Chip
            label={repair.status.replace('_', ' ').toUpperCase()}
            color={getStatusColor(repair.status)}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Device Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Device Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Device
                  </Typography>
                  <Typography variant="body1" fontWeight="600">
                    {repair.device_brand} {repair.device_model}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Type
                  </Typography>
                  <Typography variant="body1">{repair.device_type}</Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Issue
                  </Typography>
                  <Typography variant="body1">{repair.issue_description}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Customer Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1" fontWeight="600">
                    {repair.customer.first_name} {repair.customer.last_name}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{repair.customer.email}</Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">
                    {formatPhoneNumber(repair.customer.phone)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Status Management */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Status Management
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    variant={repair.status === status ? 'contained' : 'outlined'}
                    onClick={() => handleStatusChange(status)}
                    size="small"
                    disabled={updateStatusMutation.isPending}
                  >
                    {status.replace('_', ' ')}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Items */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="600">
                  Line Items
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  size="small"
                  onClick={() => setLineItemDialogOpen(true)}
                >
                  Add Item
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {repair.line_items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.description}
                        {item.is_labor && <Chip label="Labor" size="small" sx={{ ml: 1 }} />}
                      </TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{formatCurrency(item.unit_price)}</TableCell>
                      <TableCell align="right">{formatCurrency(item.total_price)}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {repair.line_items.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography color="text.secondary">No line items added yet</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {repair.line_items.length > 0 && (
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total: {formatCurrency(repair.final_cost || '0')}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Line Item Dialog */}
      <Dialog open={lineItemDialogOpen} onClose={() => setLineItemDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(handleAddLineItem)}>
          <DialogTitle>Add Line Item</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  {...register('description')}
                  label="Description"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('quantity')}
                  label="Quantity"
                  type="number"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('unit_price')}
                  label="Unit Price"
                  type="number"
                  fullWidth
                  required
                  inputProps={{ step: '0.01' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select {...register('is_labor')} label="Type" defaultValue={false}>
                    <MenuItem value="false">Part</MenuItem>
                    <MenuItem value="true">Labor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLineItemDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

