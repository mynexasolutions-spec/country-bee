export interface WhyChooseItem {
  id: 'purity' | 'experience' | 'kashmir';
  title: string;
  description: string;
}

export interface OrganicBenefitItem {
  id: 'antioxidants' | 'taste' | 'immunity' | 'family' | 'eco';
  label: string;
}

export const aboutPageData = {
  hero: {
    eyebrow: 'ABOUT US',
    titleLine1: 'About',
    titleLine2: 'Country Bee',
    subtitle:
      'A family legacy in beekeeping since 1988, bringing you pure, natural and authentic honey from the valleys of Kashmir.',
    imageUrl: '/images/others/abouts_hero_section.png',
  },
  whyChooseUs: [
    {
      id: 'purity',
      title: 'Purity Guarantee',
      description:
        '100% raw, unprocessed, unheated honey. No sugar, no additives, no adulteration. Every jar is hand-checked for authentic taste, texture & ripeness.',
    },
    {
      id: 'experience',
      title: '35+ Years Experience',
      description:
        'Family legacy since March 1988. Second-generation master beekeepers from Kashmir. Former vendor to Dabur India in the 1990s.',
    },
    {
      id: 'kashmir',
      title: 'Kashmir Sourced',
      description:
        'Pure nectar from high-altitude valleys & meadows of Jammu & Kashmir. Unique wildflowers & blossoms create authentic regional flavors. Harvested with care to preserve natural goodness.',
    },
  ] as WhyChooseItem[],
  certification: {
    title: 'Organic Certified',
    description:
      'Our honey is proudly certified organic by Aditi – a trusted authority in natural & organic certification.',
    ribbonText: 'This means:',
    points: [
      'No chemical pesticides or fertilizers used in bee forage areas',
      'No antibiotics or synthetic treatments in hives',
      'Sustainable, eco-friendly beekeeping practices',
    ],
    beekeeperImageUrl: '/images/others/Sunlit_.png',
    sealImageUrl: '/images/others/Certified_Organic_Seal.png',
  },
  organicBenefitsStrip: {
    heading: 'Benefits of choosing our certified organic honey:',
    items: [
      {
        id: 'antioxidants',
        label: 'Rich in natural antioxidants, enzymes & vitamins',
      },
      {
        id: 'taste',
        label: 'Better taste, aroma & texture – judged by real experience',
      },
      {
        id: 'immunity',
        label: 'Supports immunity, digestion & overall wellness',
      },
      {
        id: 'family',
        label: 'Safe for daily use, children & health-conscious families',
      },
      {
        id: 'eco',
        label: 'Environmentally responsible – protects bees & nature',
      },
    ] as OrganicBenefitItem[],
  },
  standsFor: [
    '100% pure, raw, unprocessed honey',
    'No added sugar, no heating, no adulteration',
    'Authentic regional flavors from across India',
    'Generations of beekeeping knowledge',
    'Transparency and trust from hive to jar',
  ],
  whatsapp: {
    phone: '919876543210',
    message:
      'Hello Country Bee! I would like to inquire about your pure Kashmir honey varieties or bulk orders.',
    promptText:
      'Feel free to reach out via WhatsApp for any inquiry, bulk orders, or to know more about our journey and varieties.',
    heading: 'Contact us today',
    ctaLabel: 'Contact Us on WhatsApp',
  },
};
