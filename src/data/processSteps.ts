export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  caption: string;
  imageUrl: string;
  alt: string;
}

export interface HivesToHomeData {
  headingLine1: string;
  headingLine2Prefix: string;
  headingLine2Highlight: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  steps: ProcessStep[];
}

export const hivesToHomeData: HivesToHomeData = {
  headingLine1: 'From Our Hives',
  headingLine2Prefix: 'to ',
  headingLine2Highlight: 'Your Home',
  description:
    'A simple, natural and transparent journey — from caring for our bees to delivering pure honey to your table.',
  ctaLabel: 'See Our Process',
  ctaHref: '/about#process',
  steps: [
    {
      id: 'our-hives',
      stepNumber: '01',
      title: 'Our Hives',
      caption: 'Healthy, happy bees',
      imageUrl: '/images/others/imge_01.png',
      alt: 'Wooden beehives nestled in sunlit green meadows',
    },
    {
      id: 'pure-honeycomb',
      stepNumber: '02',
      title: 'Pure Honeycomb',
      caption: 'Bees make honey from nectar.',
      imageUrl: '/images/others/imge_02.png',
      alt: 'Honeybees crafting golden hexagonal honeycomb from floral nectar',
    },
    {
      id: 'gentle-extraction',
      stepNumber: '03',
      title: 'Gentle Extraction',
      caption: 'Minimally processed',
      imageUrl: '/images/others/imge_03.png',
      alt: 'Cold-extracted golden raw honey flowing gently without heat',
    },
    {
      id: 'to-your-table',
      stepNumber: '04',
      title: 'To Your Table',
      caption: 'Pure, natural honey in every jar.',
      imageUrl: '/images/others/imge_04.png',
      alt: 'Pure Country Bee honey jar ready for your family table',
    },
  ],
};
