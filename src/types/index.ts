export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'raw-honey' | 'honeycomb' | 'infused-honey' | 'bee-pollen' | 'gift-sets';
  price: number;
  originalPrice?: number;
  weight: string;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  shortDescription: string;
  description: string;
  origin: string;
  harvestSeason: string;
  floralSource: string;
  tasteNotes: string[];
  imageUrl: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  itemCount: number;
  imageUrl: string;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  prepTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  honeyType: string;
  summary: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  verified: boolean;
}
