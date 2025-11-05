import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { AuthBootstrap } from '@/providers/AuthBootstrap';
import { ToastProvider } from '@/providers/ToastProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seaside Tech Co',
  description: 'Professional device repair and technical services',
  manifest: '/manifest.json',
  themeColor: '#0077cc',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <QueryProvider>
              <ToastProvider>
                <AuthBootstrap>{children}</AuthBootstrap>
              </ToastProvider>
            </QueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

