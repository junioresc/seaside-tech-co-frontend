'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils/format';
import { useCart } from '@/features/cart/hooks/useCart';

export default function CartPage() {
  const router = useRouter();
  const { cart, isLoading, updateItem, removeItem } = useCart();

  if (isLoading) {
    return <Typography>Loading cart...</Typography>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Shopping Cart
        </Typography>
        <Card>
          <CardContent>
            <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
              Your cart is empty
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Button variant="contained" onClick={() => router.push('/products')}>
                Continue Shopping
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateItem(itemId, newQuantity);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Shopping Cart
      </Typography>

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography variant="body1" fontWeight="600">
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.product.brand}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(item.product.price)}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      inputProps={{
                        min: 1,
                        max: item.product.stock_quantity,
                        style: { textAlign: 'center', width: '60px' },
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(parseFloat(item.product.price) * item.quantity)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => removeItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Box sx={{ minWidth: 300 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">{formatCurrency(cart.total)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {formatCurrency(cart.total)}
                </Typography>
              </Box>
              <Button variant="contained" fullWidth size="large">
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

