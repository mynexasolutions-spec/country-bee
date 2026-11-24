import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShopPageContent } from '@/components/sections/ShopPageContent';

export const metadata: Metadata = {
  title: 'Shop Pure & Natural Honey | Country Bee',
  description:
    'Browse our collection of 100% pure, raw, single-origin honeys from Kashmir & across India — Borage, Acacia, Sidr, Jamun, Thyme & Summer Blossom Honey.',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="cb-container py-20 text-center font-serif text-xl text-forest-dark">
              Loading pure honey collection...
            </div>
          }
        >
          <ShopPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
