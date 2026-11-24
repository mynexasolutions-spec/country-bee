import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OrderConfirmationContent } from '@/components/checkout/OrderConfirmationContent';

export const metadata: Metadata = {
  title: 'Order Confirmed | Country Bee',
  description: 'Thank you for your Country Bee honey order.',
  robots: { index: false, follow: true },
};

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="cb-container py-20 text-center font-serif text-xl text-forest-dark">Loading…</div>}>
          <OrderConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
