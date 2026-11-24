import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RecipesWellnessSection } from '@/components/sections/RecipesWellnessSection';
import { CommunityNewsletterSection } from '@/components/sections/CommunityNewsletterSection';

export default function RecipesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <RecipesWellnessSection />
        <CommunityNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
