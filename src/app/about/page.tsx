import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AboutPageContent } from '@/components/sections/AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us | Country Bee — Pure Kashmir Honey Legacy Since 1988',
  description:
    'Second-generation master beekeepers from Kashmir since 1988. Certified organic by Aditi, delivering 100% raw, unprocessed, unheated honey straight from our hives.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <AboutPageContent />
      </main>
      <Footer />
    </div>
  );
}
