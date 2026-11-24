import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ForgotPasswordContent } from '@/components/auth/ForgotPasswordContent';

export const metadata: Metadata = {
  title: 'Reset Password | Country Bee',
  description: 'Reset the password for your Country Bee account.',
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <ForgotPasswordContent />
      </main>
      <Footer />
    </div>
  );
}
