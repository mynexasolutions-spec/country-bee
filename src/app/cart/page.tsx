import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartPageContent } from '@/components/checkout/CartPageContent';

export const metadata: Metadata = {
  title: 'Your Basket | Country Bee',
  description: 'Review the pure Kashmir honey in your basket before checkout.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <CartPageContent />
      </main>
      <Footer />
    </div>
  );
}
