export interface ProductVariant {
  weight: string;
  price: number;
}

export interface HoneyProduct {
  id: string;
  name: string;
  slug: string;
  honeyType: 'floral' | 'herbal' | 'single-origin';
  badge: string;
  badgeTone: 'forest' | 'honey' | 'leaf';
  price: number;
  maxPrice?: number;
  priceDisplay: string;
  defaultWeight: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  origin: string;
  harvestSeason: string;
  floralSource: string;
  shortDescription: string;
  description: string;
  tasteNotes: string[];
  benefits: string[];
  imageUrl: string;
  inStock: boolean;
}

export const honeyProducts: HoneyProduct[] = [
  {
    id: 'cb-borage-honey',
    name: 'Borage Honey',
    slug: 'borage-honey',
    honeyType: 'floral',
    badge: 'Bestseller',
    badgeTone: 'honey',
    price: 320,
    priceDisplay: '₹320.00',
    defaultWeight: '250g',
    variants: [
      { weight: '250g', price: 320 },
      { weight: '500g', price: 600 },
    ],
    rating: 0,
    reviewCount: 0,
    origin: 'Kashmir Valley Apiaries',
    harvestSeason: 'Late Spring Harvest',
    floralSource: 'Wild Starflower (Borage) Blossoms',
    shortDescription:
      'Exquisite single-origin Kashmir honey harvested from vibrant blue-violet borage starflowers.',
    description:
      'Sourced from pristine high-altitude Kashmir meadows where bees forage on wild borage starflowers. Minimally strained and never heated, preserving delicate floral enzymes, natural pollen, and a light, refreshing sweetness.',
    tasteNotes: ['Delicate Floral', 'Light Herbal Finish', 'Silky Smooth'],
    benefits: ['Rich in natural antioxidants', 'Soothing for throat & seasonal wellness', '100% raw & unblended'],
    imageUrl: '/images/products/Country_Bee_Borage_Honey.png',
    inStock: true,
  },
  {
    id: 'cb-acacia-honey',
    name: 'Acacia Honey',
    slug: 'acacia-honey',
    honeyType: 'floral',
    badge: 'Pure Floral',
    badgeTone: 'forest',
    price: 320,
    maxPrice: 600,
    priceDisplay: '₹320.00 – ₹600.00',
    defaultWeight: '250g',
    variants: [
      { weight: '250g', price: 320 },
      { weight: '500g', price: 600 },
    ],
    rating: 0,
    reviewCount: 0,
    origin: 'Himalayan Foothill Groves',
    harvestSeason: 'Early Summer',
    floralSource: 'White Acacia (Robinia) Blossoms',
    shortDescription:
      'Crystal-clear golden nectar with mild vanilla-floral notes that stays liquid naturally for longer.',
    description:
      'Harvested during the brief blooming window of fragrant white acacia blossoms. Loved for its ultra-clean, mild sweetness that pairs effortlessly with teas, artisanal cheeses, and morning wellness rituals without overpowering flavors.',
    tasteNotes: ['Mild Vanilla Hint', 'Clean Crisp Sweetness', 'Ultra-Light Aroma'],
    benefits: ['Naturally gentle on digestion', 'Slow crystallization profile', 'Zero additives or syrups'],
    imageUrl: '/images/products/Country_Bee_Acacia_Honey.png',
    inStock: true,
  },
  {
    id: 'cb-sidr-honey',
    name: 'Sidr Honey',
    slug: 'sidr-honey',
    honeyType: 'single-origin',
    badge: 'Royal Grade',
    badgeTone: 'honey',
    price: 210,
    priceDisplay: '₹210.00',
    defaultWeight: '250g',
    variants: [
      { weight: '250g', price: 210 },
      { weight: '500g', price: 400 },
    ],
    rating: 0,
    reviewCount: 0,
    origin: 'Arid Wild Jujube Forests',
    harvestSeason: 'Autumn Harvest',
    floralSource: 'Sacred Sidr (Ziziphus) Blossoms',
    shortDescription:
      'Rich, velvety amber monofloral honey prized for centuries for its deep caramel-like complexity.',
    description:
      'Collected from bees foraging exclusively on wild Sidr (Jujube) trees. Renowned for its thick, luxurious texture, warm butterscotch-amber aroma, and dense concentration of natural minerals and live enzymes.',
    tasteNotes: ['Warm Butterscotch', 'Rich Velvety Body', 'Earthy Caramel'],
    benefits: ['Supports daily immunity & vitality', 'High natural mineral content', 'Unpasteurized & cold-extracted'],
    imageUrl: '/images/products/Country_Bee_Sidar_honey.png',
    inStock: true,
  },
  {
    id: 'cb-jamun-honey',
    name: 'Jamun Honey',
    slug: 'jamun-honey',
    honeyType: 'herbal',
    badge: 'Low GI • Pure',
    badgeTone: 'leaf',
    price: 210,
    priceDisplay: '₹210.00',
    defaultWeight: '250g',
    variants: [
      { weight: '250g', price: 210 },
      { weight: '500g', price: 400 },
    ],
    rating: 0,
    reviewCount: 0,
    origin: 'Western Ghats & Forest Orchards',
    harvestSeason: 'Pre-Monsoon',
    floralSource: 'Wild Indian Blackberry (Jamun) Blossoms',
    shortDescription:
      'Deep dark-amber honey with a balanced tangy-sweet finish and naturally lower glycemic profile.',
    description:
      'Foraged from wild Jamun orchards in full bloom. Distinctly dark, aromatic, and less cloyingly sweet than conventional honey, with a signature hint of berry tanginess prized in traditional Ayurvedic wellness.',
    tasteNotes: ['Subtle Berry Tang', 'Deep Molasses Finish', 'Balanced Sweetness'],
    benefits: ['Naturally lower glycemic index', 'Rich in iron & polyphenols', 'Ideal for mindful daily wellness'],
    imageUrl: '/images/products/Country_Bee_Jamun_Honey.png',
    inStock: true,
  },
  {
    id: 'cb-thyme-honey',
    name: 'Thyme Honey',
    slug: 'thyme-honey',
    honeyType: 'herbal',
    badge: 'Herbal Aroma',
    badgeTone: 'forest',
    price: 210,
    priceDisplay: '₹210.00',
    defaultWeight: '250g',
    variants: [
      { weight: '250g', price: 210 },
      { weight: '500g', price: 400 },
    ],
    rating: 0,
    reviewCount: 0,
    origin: 'Sunlit Mountain Slopes',
    harvestSeason: 'Mid-Summer',
    floralSource: 'Wild Mountain Thyme Blossoms',
    shortDescription:
      'Aromatic herbal honey infused naturally by bees foraging on wild blooming mountain thyme.',
    description:
      'When wild thyme carpets the hillsides in purple blossoms, our bees produce a boldly aromatic, copper-gold honey packed with natural thymol compounds, herbal warmth, and an unforgettable lingering finish.',
    tasteNotes: ['Warm Botanical Herb', 'Spiced Floral', 'Bold Lingering Finish'],
    benefits: ['Traditional respiratory & winter comfort', 'Packed with natural botanical oils', 'Raw & chemical-free'],
    imageUrl: '/images/products/Country_Bee_Thyme_honey.png',
    inStock: true,
  },
  {
    id: 'cb-summer-blossom-honey',
    name: 'Summer Blossom Honey',
    slug: 'summer-blossom-honey',
    honeyType: 'floral',
    badge: 'Wild Harvest',
    badgeTone: 'leaf',
    price: 200,
    priceDisplay: '₹200.00',
    defaultWeight: '250g',
    variants: [
      { weight: '250g', price: 200 },
      { weight: '500g', price: 380 },
    ],
    rating: 0,
    reviewCount: 0,
    origin: 'Natural Meadow Apiaries',
    harvestSeason: 'Peak Summer',
    floralSource: 'Sun-Kissed Wild Summer Meadow Flowers',
    shortDescription:
      'Bright, cheerful golden honey capturing the vibrant nectar of a hundred blooming summer wildflowers.',
    description:
      'An everyday family favorite harvested at the height of summer bloom. Bursting with sunny floral aroma and well-rounded golden sweetness—perfect drizzled over warm toast, smoothies, oatmeal, or herbal infusions.',
    tasteNotes: ['Sunny Wildflower', 'Rounded Golden Sweet', 'Fresh Meadow Aroma'],
    benefits: ['Natural everyday energy source', 'Unblended & antibiotic-free', 'Kid-friendly smooth floral taste'],
    imageUrl: '/images/products/Country_Bee_Summer_blossom_honey.png',
    inStock: true,
  },
];

export function getProductBySlug(slug: string): HoneyProduct | undefined {
  return honeyProducts.find((p) => p.slug === slug);
}

export function formatINR(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}
