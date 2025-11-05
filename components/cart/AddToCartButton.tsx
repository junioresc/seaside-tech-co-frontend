'use client';

import { useState } from 'react';
import { Button, Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { cartApi } from '@/lib/api/endpoints/cart';
import type { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const addToCartMutation = useMutation({
    mutationFn: () => cartApi.addItem(product.id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      enqueueSnackbar('Added to cart!', { variant: 'success' });
      setQuantity(1);
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to add to cart';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const handleIncrement = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
          <RemoveIcon />
        </IconButton>
        <TextField
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 1 && val <= product.stock_quantity) {
              setQuantity(val);
            }
          }}
          inputProps={{
            style: { textAlign: 'center', width: '60px' },
            min: 1,
            max: product.stock_quantity,
          }}
          variant="standard"
          InputProps={{ disableUnderline: true }}
        />
        <IconButton onClick={handleIncrement} disabled={quantity >= product.stock_quantity}>
          <AddIcon />
        </IconButton>
      </Box>

      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingCartIcon />}
        onClick={() => addToCartMutation.mutate()}
        disabled={product.stock_quantity === 0 || addToCartMutation.isPending}
        sx={{ flexGrow: 1 }}
      >
        {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
      </Button>
    </Box>
  );
}

