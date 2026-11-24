export interface CustomerTestimonial {
  id: string;
  author: string;
  location: string;
  honeyBought: string;
  rating: number;
  quote: string;
  verified: boolean;
}

export const initialTestimonials: CustomerTestimonial[] = [
  {
    id: 'rev-1',
    author: 'Ayesha K.',
    location: 'Mumbai',
    honeyBought: 'Borage Honey',
    rating: 5,
    quote:
      'The honey is absolutely pure, aromatic and tastes just like natural honey should. You can truly feel the quality!',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Rohan Mehta',
    location: 'Bengaluru',
    honeyBought: 'Acacia Honey',
    rating: 5,
    quote:
      'Switched my morning refined sugar with Country Bee Acacia Honey. Delicate floral sweetness, crystal clear, and zero artificial aftertaste.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Dr. Meera Nair',
    location: 'Kochi',
    honeyBought: 'Jamun Honey',
    rating: 5,
    quote:
      'Recommended Jamun Honey to my parents for daily wellness. Subtle berry tang, rich consistency, and genuinely unblended straight from hives.',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Vikramaditya S.',
    location: 'New Delhi',
    honeyBought: 'Sidr Honey',
    rating: 5,
    quote:
      'The Sidr Honey has an extraordinary velvety caramel depth I have never found in supermarket jars. Packaging was safe and arrived fast.',
    verified: true,
  },
  {
    id: 'rev-5',
    author: 'Ananya Deshmukh',
    location: 'Pune',
    honeyBought: 'Thyme Honey',
    rating: 5,
    quote:
      'One spoon of Thyme Honey in warm herbal tea has become our winter ritual. Soothing, fragrant, and 100% authentic forest goodness.',
    verified: true,
  },
  {
    id: 'rev-6',
    author: 'Kabir Malhotra',
    location: 'Chandigarh',
    honeyBought: 'Summer Blossom Honey',
    rating: 5,
    quote:
      'My kids love drizzling Summer Blossom Honey on warm rotis and oats. Pure, clean energy without any chemicals or sugar syrups.',
    verified: true,
  },
];
