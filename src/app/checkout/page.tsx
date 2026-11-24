import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckoutPageContent } from '@/components/checkout/CheckoutPageContent';

export const metadata: Metadata = {
  title: 'Checkout | Country Bee',
  description: 'Complete your Country Bee honey order with pan-India delivery.',
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <CheckoutPageContent />
      </main>
      <Footer />
    </div>
  );
}
