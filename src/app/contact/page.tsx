import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactPageContent } from '@/components/sections/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us | Country Bee — Pure Kashmir Honey & Bulk Orders',
  description:
    'Get in touch with Country Bee in Qazigund, Anantnag (Kashmir) for pure raw honey inquiries, wholesale bulk orders, or WhatsApp support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <ContactPageContent />
      </main>
      <Footer />
    </div>
  );
}
