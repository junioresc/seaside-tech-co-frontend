import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { notFound } from 'next/navigation';
import { productsApi } from '@/lib/api/endpoints/products';
import { formatCurrency } from '@/lib/utils/format';
import type { Product } from '@/types';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

export const revalidate = 3600; // Revalidate every hour (ISR)

async function getProduct(id: string): Promise<Product | null> {
  try {
    return await productsApi.getProduct(id);
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {product.image_url ? (
            <Box
              component="img"
              src={product.image_url}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: 400,
                bgcolor: 'background.default',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography color="text.secondary">No Image Available</Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Chip label={product.category} />
            <Chip label={product.brand} variant="outlined" />
          </Box>

          <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
            {formatCurrency(product.price)}
          </Typography>

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            {product.stock_quantity > 0 ? (
              <Chip label={`${product.stock_quantity} in stock`} color="success" />
            ) : (
              <Chip label="Out of Stock" color="error" />
            )}
          </Box>

          <AddToCartButton product={product} />
        </Grid>
      </Grid>
    </Container>
  );
}

