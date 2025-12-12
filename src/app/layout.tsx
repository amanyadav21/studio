import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from 'react-hot-toast';

// Optimize Inter font with next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Coderkart 🌱 Free Resource ',
  description: 'Open Powerful Tools, Right From Your Browser — No Login. No Delay.',
  icons: {
    icon: [
      { url: '/fevicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/fevicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/fevicon/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/fevicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <link rel="icon" href="/fevicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/fevicon/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/fevicon/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/fevicon/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/Headerfont/Panchang_Complete/Fonts/WEB/css/panchang.css" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
              success: {
                iconTheme: {
                  primary: 'hsl(var(--primary))',
                  secondary: 'hsl(var(--primary-foreground))',
                },
              },
              error: {
                iconTheme: {
                  primary: 'hsl(var(--destructive))',
                  secondary: 'hsl(var(--destructive-foreground))',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
