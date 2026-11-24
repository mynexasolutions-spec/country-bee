export interface HoneyRecipeItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  prepTime: string;
  recommendedHoneySlug: string;
  recommendedHoneyName: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
}

export const honeyRecipesData: HoneyRecipeItem[] = [
  {
    id: 'honey-pancakes',
    title: 'Honey Pancakes',
    slug: 'honey-pancakes',
    shortDesc: 'A wholesome and naturally sweet breakfast.',
    prepTime: '15 mins',
    recommendedHoneySlug: 'summer-blossom-honey',
    recommendedHoneyName: 'Summer Blossom Honey',
    imageUrl: '/images/recipes/img1.png',
    ingredients: [
      '1 cup whole wheat or oat flour',
      '3/4 cup warm milk & 1 farm egg (or mashed banana)',
      '2 tbsp Country Bee Summer Blossom Honey',
      'Fresh berries & warm butter to serve',
    ],
    steps: [
      'Whisk flour, milk, and a pinch of cinnamon into a smooth, airy batter.',
      'Cook golden pancakes on a lightly buttered skillet for 2 minutes per side.',
      'Stack warm and drizzle generously with raw Country Bee Summer Blossom Honey and fresh berries.',
    ],
  },
  {
    id: 'honey-lemon-tea',
    title: 'Honey Lemon Tea',
    slug: 'honey-lemon-tea',
    shortDesc: 'A soothing and immunity-boosting drink.',
    prepTime: '5 mins',
    recommendedHoneySlug: 'thyme-honey',
    recommendedHoneyName: 'Thyme Honey',
    imageUrl: '/images/recipes/img2.png',
    ingredients: [
      '1 cup warm filtered water (around 45°C — not boiling)',
      'Half a freshly squeezed organic lemon',
      '1 tbsp raw Country Bee Thyme or Sidr Honey',
      'Optional: 2 slices fresh ginger or tulsi leaves',
    ],
    steps: [
      'Steep fresh ginger or tulsi in warm water for 2 minutes, then let it cool slightly to lukewarm.',
      'Squeeze in fresh lemon juice so vitamin C stays vibrant.',
      'Stir in raw Country Bee Honey just before sipping to keep all live natural enzymes intact.',
    ],
  },
  {
    id: 'honey-yogurt-bowl',
    title: 'Honey Yogurt Bowl',
    slug: 'honey-yogurt-bowl',
    shortDesc: 'A healthy and delicious snack for any time of the day.',
    prepTime: '5 mins',
    recommendedHoneySlug: 'acacia-honey',
    recommendedHoneyName: 'Acacia Honey',
    imageUrl: '/images/recipes/img3.png',
    ingredients: [
      '1 cup thick Greek yogurt or homemade hung curd',
      'Handful of strawberries, blueberries & mango cubes',
      '1.5 tbsp Country Bee Acacia or Borage Honey',
      'Toasted almonds, pumpkin seeds & chia',
    ],
    steps: [
      'Spoon chilled creamy yogurt into a wide ceramic bowl.',
      'Arrange fresh seasonal berries, mango cubes, and crunchy toasted seeds on top.',
      'Finish with a slow golden swirl of pure Country Bee Acacia Honey and enjoy immediately.',
    ],
  },
];
