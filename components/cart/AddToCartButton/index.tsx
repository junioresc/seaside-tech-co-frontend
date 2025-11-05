'use client';

import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { cartApi } from '@/lib/api/endpoints/cart';
import type { Product } from '@/types';
import {
  Container,
  QuantityContainer,
  QuantityInput,
  StyledIconButton,
  AddButton,
} from './styles';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  // Optimistic update mutation
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= product.stock_quantity) {
      setQuantity(val);
    }
  };

  return (
    <Container>
      <QuantityContainer>
        <StyledIconButton onClick={handleDecrement} disabled={quantity <= 1}>
          <RemoveIcon />
        </StyledIconButton>
        <QuantityInput
          value={quantity}
          onChange={handleQuantityChange}
          inputProps={{
            min: 1,
            max: product.stock_quantity,
          }}
          variant="standard"
          InputProps={{ disableUnderline: true }}
        />
        <StyledIconButton onClick={handleIncrement} disabled={quantity >= product.stock_quantity}>
          <AddIcon />
        </StyledIconButton>
      </QuantityContainer>

      <AddButton
        variant="contained"
        size="large"
        startIcon={<ShoppingCartIcon />}
        onClick={() => addToCartMutation.mutate()}
        disabled={product.stock_quantity === 0 || addToCartMutation.isPending}
      >
        {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
      </AddButton>
    </Container>
  );
}

