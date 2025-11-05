'use client';

import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Seaside Tech Co
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Professional device repair and technical services
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={Link} href="/book" color="text.secondary" underline="hover">
                Book Appointment
              </MuiLink>
              <MuiLink component={Link} href="/products" color="text.secondary" underline="hover">
                Products
              </MuiLink>
              <MuiLink
                component={Link}
                href="/repairs/track"
                color="text.secondary"
                underline="hover"
              >
                Track Repair
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@seasidetech.co
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (555) 123-4567
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Seaside Tech Co. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

