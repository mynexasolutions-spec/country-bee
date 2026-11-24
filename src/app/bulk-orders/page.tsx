import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BulkOrdersPageContent } from '@/components/sections/BulkOrdersPageContent';

export const metadata: Metadata = {
  title: 'Bulk Honey Orders & Wholesale | Country Bee — Kashmir Honey Since 1988',
  description:
    'Order pure, raw, unprocessed honey in 5 kg, 10 kg, and 30 kg bulk buckets directly from Country Bee for retailers, wholesalers, exporters, manufacturers, and hotels.',
};

export default function BulkOrdersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <BulkOrdersPageContent />
      </main>
      <Footer />
    </div>
  );
}
