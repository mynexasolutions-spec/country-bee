export type HoneyBenefitId =
  | 'immunity'
  | 'digestion'
  | 'energy'
  | 'skin-hair'
  | 'antioxidants'
  | 'wellness';

export interface HoneyBenefitItem {
  id: HoneyBenefitId;
  line1: string;
  line2: string;
  highlight: string;
  iconSrc: string;
}

export const honeyBenefitsData: HoneyBenefitItem[] = [
  {
    id: 'immunity',
    line1: 'Boosts',
    line2: 'Immunity',
    highlight:
      'Raw enzymes, bee pollen, and natural phytonutrients help strengthen your daily immune defense.',
    iconSrc: '/icons/country_bee_svg_icons/shield.svg',
  },
  {
    id: 'digestion',
    line1: 'Supports',
    line2: 'Digestion',
    highlight:
      'Unheated prebiotic compounds gently soothe the stomach lining and nourish healthy gut flora.',
    iconSrc: '/icons/country_bee_svg_icons/stomach.svg',
  },
  {
    id: 'energy',
    line1: 'Natural',
    line2: 'Energy',
    highlight:
      'Wholesome natural glucose and fructose deliver clean, sustained vitality without refined sugar crashes.',
    iconSrc: '/icons/country_bee_svg_icons/lightning.svg',
  },
  {
    id: 'skin-hair',
    line1: 'Good for',
    line2: 'Skin & Hair',
    highlight:
      'Natural humectant properties lock in moisture for radiant, hydrated skin and nourished hair.',
    iconSrc: '/icons/country_bee_svg_icons/face.svg',
  },
  {
    id: 'antioxidants',
    line1: 'Rich in',
    line2: 'Antioxidants',
    highlight:
      'Packed with wild floral flavonoids and polyphenols that help protect cells from oxidative stress.',
    iconSrc: '/icons/country_bee_svg_icons/molecule.svg',
  },
  {
    id: 'wellness',
    line1: 'Overall',
    line2: 'Wellness',
    highlight:
      'Time-honored Ayurvedic daily nectar supporting holistic balance, restful sleep, and seasonal comfort.',
    iconSrc: '/icons/country_bee_svg_icons/lotus.svg',
  },
];
