import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RegisterPageContent } from '@/components/auth/RegisterPageContent';

export const metadata: Metadata = {
  title: 'Create Account | Country Bee',
  description: 'Create a Country Bee account to save your address and track your honey orders.',
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="cb-container py-20 text-center font-serif text-xl text-forest-dark">Loading…</div>}>
          <RegisterPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
