import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import Link from 'next/link';
import { productsApi } from '@/lib/api/endpoints/products';
import { formatCurrency } from '@/lib/utils/format';
import type { Product } from '@/types';

export const revalidate = 3600; // Revalidate every hour (ISR)

async function getProducts(): Promise<Product[]> {
  try {
    return await productsApi.listProducts();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold" align="center">
        Products
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
      >
        Browse our selection of quality devices and accessories
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {product.image_url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image_url}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="600">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={product.category} size="small" />
                  <Chip label={product.brand} size="small" variant="outlined" />
                </Box>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {formatCurrency(product.price)}
                </Typography>
                {product.stock_quantity > 0 ? (
                  <Typography variant="body2" color="success.main">
                    In Stock ({product.stock_quantity} available)
                  </Typography>
                ) : (
                  <Typography variant="body2" color="error.main">
                    Out of Stock
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  href={`/products/${product.id}`}
                  fullWidth
                  variant="contained"
                  disabled={product.stock_quantity === 0}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {products.length === 0 && (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary">
              No products available at this time
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

