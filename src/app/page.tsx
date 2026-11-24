import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ShopByHoneyType } from '@/components/sections/ShopByHoneyType';
import { OurHoneyCollection } from '@/components/sections/OurHoneyCollection';
import { HivesToHomeSection } from '@/components/sections/HivesToHomeSection';
import { NaturalGoodnessSection } from '@/components/sections/NaturalGoodnessSection';
import { CertifiedOrganicBanner } from '@/components/sections/CertifiedOrganicBanner';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { RecipesWellnessSection } from '@/components/sections/RecipesWellnessSection';
import { CommunityNewsletterSection } from '@/components/sections/CommunityNewsletterSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ShopByHoneyType />
        <OurHoneyCollection />
        <HivesToHomeSection />
        <NaturalGoodnessSection />
        <CertifiedOrganicBanner />
        <TestimonialsSection />
        <RecipesWellnessSection />
        <CommunityNewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
