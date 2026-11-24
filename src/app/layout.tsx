import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'Country Bee | 100% Pure Natural Forest Honey',
  description:
    'Sustainably harvested raw organic honey, comb, and bee products straight from wild natural forest apiaries to your home.',
  keywords: [
    'Country Bee',
    'Pure Honey',
    'Raw Honey',
    'Natural Honey',
    'Organic Honeycomb',
    'Forest Honey',
    'Wild Honey',
  ],
  authors: [{ name: 'Country Bee' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-charcoal font-sans antialiased selection:bg-honey selection:text-charcoal">
        <AuthProvider>
          <CartProvider>
            {children}
            <ScrollToTopButton />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
