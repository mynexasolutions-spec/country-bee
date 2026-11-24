export type HoneyTypeIconId = 'floral' | 'herbal' | 'single-origin' | 'all-honey' | 'gift-packs';

export interface HoneyTypeItem {
  id: HoneyTypeIconId;
  line1: string;
  line2: string;
  href: string;
  iconSrc: string;
  defaultActive?: boolean;
}

export const honeyTypeItems: HoneyTypeItem[] = [
  {
    id: 'floral',
    line1: 'Floral',
    line2: 'Honey',
    href: '/shop?category=floral-honey',
    iconSrc: '/icons/country_bee_svg_icons/flower.svg',
    defaultActive: true,
  },
  {
    id: 'herbal',
    line1: 'Herbal',
    line2: 'Honey',
    href: '/shop?category=herbal-honey',
    iconSrc: '/icons/country_bee_svg_icons/herbal-leaf.svg',
  },
  {
    id: 'single-origin',
    line1: 'Single-',
    line2: 'Origin',
    href: '/shop?category=single-origin',
    iconSrc: '/icons/country_bee_svg_icons/honeycomb.svg',
  },
  {
    id: 'all-honey',
    line1: 'All',
    line2: 'Honey',
    href: '/shop',
    iconSrc: '/icons/country_bee_svg_icons/jar.svg',
  },
  {
    id: 'gift-packs',
    line1: 'Gift',
    line2: 'Packs',
    href: '/shop?category=gift-sets',
    iconSrc: '/icons/country_bee_svg_icons/gift.svg',
  },
];
