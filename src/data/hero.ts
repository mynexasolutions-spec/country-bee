export interface HeroFeature {
  id: 'natural' | 'no-chemicals' | 'nutrients' | 'sustainable';
  line1: string;
  line2: string;
}

export interface HeroContent {
  badgeItems: string[];
  headingLine1: string;
  headingLine2Prefix: string;
  headingLine2Highlight: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  features: HeroFeature[];
}

export const heroData: HeroContent = {
  badgeItems: ['PURE', 'NATURAL', 'ORGANIC'],
  headingLine1: 'Nature’s',
  headingLine2Prefix: 'Pure ',
  headingLine2Highlight: 'Honey',
  description:
    'Sourced from our own beehives, minimally processed to keep the natural goodness intact.',
  primaryCta: {
    label: 'Shop Honey Collection',
    href: '/shop',
  },
  secondaryCta: {
    label: 'Our Story',
    href: '/about',
  },
  features: [
    {
      id: 'natural',
      line1: '100%',
      line2: 'Natural',
    },
    {
      id: 'no-chemicals',
      line1: 'No',
      line2: 'Chemicals',
    },
    {
      id: 'nutrients',
      line1: 'Rich in',
      line2: 'Nutrients',
    },
    {
      id: 'sustainable',
      line1: 'Sustainably',
      line2: 'Sourced',
    },
  ],
};
