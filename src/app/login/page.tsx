import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LoginPageContent } from '@/components/auth/LoginPageContent';

export const metadata: Metadata = {
  title: 'Log In | Country Bee',
  description: 'Log in to your Country Bee account for faster checkout and order history.',
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="cb-container py-20 text-center font-serif text-xl text-forest-dark">Loading…</div>}>
          <LoginPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
