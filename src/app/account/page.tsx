import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AccountPageContent } from '@/components/account/AccountPageContent';

export const metadata: Metadata = {
  title: 'My Account | Country Bee',
  description: 'Manage your Country Bee orders, profile and saved address.',
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <AccountPageContent />
      </main>
      <Footer />
    </div>
  );
}
