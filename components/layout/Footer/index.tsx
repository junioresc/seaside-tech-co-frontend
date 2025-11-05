'use client';

import Link from 'next/link';
import { Typography, Grid, Link as MuiLink } from '@mui/material';
import { FooterContainer, FooterInner, FooterSection, FooterBottom, LinksColumn } from './styles';

export function Footer() {
  return (
    <FooterContainer component="footer">
      <FooterInner maxWidth="lg">
        <Grid container spacing={4}>
          <FooterSection item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Seaside Tech Co
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Professional device repair and technical services
            </Typography>
          </FooterSection>

          <FooterSection item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Services
            </Typography>
            <LinksColumn>
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
            </LinksColumn>
          </FooterSection>

          <FooterSection item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@seasidetech.co
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (555) 123-4567
            </Typography>
          </FooterSection>
        </Grid>

        <FooterBottom>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Seaside Tech Co. All rights reserved.
          </Typography>
        </FooterBottom>
      </FooterInner>
    </FooterContainer>
  );
}
