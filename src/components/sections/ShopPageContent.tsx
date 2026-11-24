'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ChevronUp,
  ChevronDown,
  SlidersHorizontal,
  RotateCcw,
  X,
  Check,
  Sparkles,
  ShieldCheck,
  Plus,
  Minus,
} from 'lucide-react';
import { honeyProducts, type HoneyProduct, formatINR } from '@/data/products';
import { HoneyProductCard } from '@/components/products/HoneyProductCard';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

interface CategoryFilterOption {
  id: string;
  label: string;
  count: number;
}

const TOP_TRUST_ITEMS = [
  { id: 'pure', title: '100% Pure & Raw', sub: 'No added sugar' },
  { id: 'kashmir', title: 'Kashmir Sourced', sub: 'High-altitude nectar.' },
  { id: 'years', title: '35+ Years Experience', sub: 'Since 1988' },
  { id: 'organic', title: 'Organic Certified', sub: 'By Aditi' },
] as const;

const BOTTOM_GUARANTEES = [
  { id: 'delivery', title: 'Pan India Delivery', sub: 'Safe & secure shipping' },
  { id: 'quality', title: 'Quality Assured', sub: 'Purity & authenticity checked' },
  { id: 'packaging', title: 'Secure Packaging', sub: 'Hygienic & leak-proof jars' },
  { id: 'support', title: 'Support', sub: 'Need help? Contact us anytime' },
] as const;

const TopTrustIcon = ({ id }: { id: (typeof TOP_TRUST_ITEMS)[number]['id'] }) => {
  const cls = 'w-5 h-5 text-forest-dark';
  switch (id) {
    case 'pure':
    case 'organic':
      return (
        <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M25.5 6.5C15 6.5 8 11 7.5 20.5C7.5 24.8 10.5 27.6 14.8 27C23.8 25.6 26.2 16 25.5 6.5Z" />
          <path d="M7.5 27C12 20.2 16.8 16 23.2 11" />
        </svg>
      );
    case 'kashmir':
      return (
        <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M3.5 24.5L11.5 10.5L17.5 20.5L21.5 14L28.5 24.5" />
          <path d="M9.5 14L11.8 16L13.8 14.5" strokeWidth="1.7" />
        </svg>
      );
    case 'years':
      return (
        <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <circle cx="16" cy="13" r="6.5" />
          <path d="M12.5 18.5L11 27.5L16 24.8L21 27.5L19.5 18.5" />
        </svg>
      );
  }
};

const BottomGuaranteeIcon = ({ id }: { id: (typeof BOTTOM_GUARANTEES)[number]['id'] }) => {
  const cls = 'w-8 h-8 text-forest-dark shrink-0';
  switch (id) {
    case 'delivery':
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M5 14h23v19H5zM28 20h8l6 6v7H28z" />
          <circle cx="14" cy="35" r="3.5" />
          <circle cx="35" cy="35" r="3.5" />
        </svg>
      );
    case 'quality':
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M24 6C19 9.2 14.2 10.5 9.5 10.8V22.5C9.5 32.2 15.8 39.2 24 42.5C32.2 39.2 38.5 32.2 38.5 22.5V10.8C33.8 10.5 29 9.2 24 6Z" />
          <path d="M17.5 24.2L22 28.8L30.8 19.2" strokeWidth="2.6" />
        </svg>
      );
    case 'packaging':
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M38 9C22 9 11 16 10 29.5C10 36 14.5 40.5 21 39.5C35 37.5 39 23 38 9Z" />
          <path d="M10 39.5C16.5 29.5 24 23.5 34 16" />
        </svg>
      );
    case 'support':
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M9 26v-3a15 15 0 0 1 30 0v3" />
          <rect x="7" y="24" width="6" height="11" rx="3" />
          <rect x="35" y="24" width="6" height="11" rx="3" />
          <path d="M38 35c-.5 4-4 6-10 6h-3" />
        </svg>
      );
  }
};

export const ShopPageContent = () => {
  const searchParams = useSearchParams();
  const { addItem } = useCart();

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Accordion & Mobile Drawer States
  const [catOpen, setCatOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [weightOpen, setWeightOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<HoneyProduct | null>(null);
  const [modalWeight, setModalWeight] = useState<string>('250g');
  const [modalQty, setModalQty] = useState<number>(1);
  const [modalAdded, setModalAdded] = useState<boolean>(false);

  // Sync URL query params (?category=... or ?search=...) on load
  useEffect(() => {
    const catParam = searchParams.get('category')?.toLowerCase() ?? '';
    const searchParam = searchParams.get('search') ?? '';

    if (searchParam) {
      setSearchTerm(searchParam);
    }

    if (catParam.includes('floral')) {
      setSelectedCategories(['floral']);
    } else if (catParam.includes('herbal') || catParam.includes('jamun') || catParam.includes('infused')) {
      setSelectedCategories(['herbal']);
    } else if (catParam.includes('single') || catParam.includes('sidr')) {
      setSelectedCategories(['single-origin']);
    } else if (catParam.includes('kashmir') || catParam.includes('acacia')) {
      setSelectedCategories(['kashmir']);
    }
  }, [searchParams]);

  const categoryOptions: CategoryFilterOption[] = useMemo(
    () => [
      { id: 'all', label: 'All Honey', count: honeyProducts.length },
      {
        id: 'floral',
        label: 'Floral Honey',
        count: honeyProducts.filter((p) => p.honeyType === 'floral').length,
      },
      {
        id: 'herbal',
        label: 'Herbal Honey',
        count: honeyProducts.filter((p) => p.honeyType === 'herbal').length,
      },
      {
        id: 'single-origin',
        label: 'Single-Origin',
        count: honeyProducts.filter((p) => p.honeyType === 'single-origin').length,
      },
      {
        id: 'kashmir',
        label: 'Kashmir & Himalayan',
        count: honeyProducts.filter(
          (p) =>
            p.origin.toLowerCase().includes('kashmir') ||
            p.origin.toLowerCase().includes('himalayan')
        ).length,
      },
    ],
    []
  );

  const toggleCategory = (id: string) => {
    if (id === 'all') {
      setSelectedCategories(['all']);
      return;
    }
    setSelectedCategories((prev) => {
      const withoutAll = prev.filter((item) => item !== 'all');
      if (withoutAll.includes(id)) {
        const next = withoutAll.filter((item) => item !== id);
        return next.length === 0 ? ['all'] : next;
      }
      return [...withoutAll, id];
    });
  };

  const toggleWeight = (weight: string) => {
    setSelectedWeights((prev) =>
      prev.includes(weight) ? prev.filter((w) => w !== weight) : [...prev, weight]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories(['all']);
    setMaxPrice(600);
    setSelectedWeights([]);
    setSearchTerm('');
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    let list = [...honeyProducts];

    // Search query filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.floralSource.toLowerCase().includes(q) ||
          p.badge.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (!selectedCategories.includes('all')) {
      list = list.filter((p) => {
        if (selectedCategories.includes(p.honeyType)) return true;
        if (
          selectedCategories.includes('kashmir') &&
          (p.origin.toLowerCase().includes('kashmir') ||
            p.origin.toLowerCase().includes('himalayan'))
        ) {
          return true;
        }
        return false;
      });
    }

    // Price range filter
    list = list.filter((p) => p.price <= maxPrice);

    // Weight filter
    if (selectedWeights.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => selectedWeights.includes(v.weight))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [selectedCategories, maxPrice, selectedWeights, sortBy, searchTerm]);

  const activeFilterCount =
    (selectedCategories.includes('all') ? 0 : selectedCategories.length) +
    (maxPrice < 600 ? 1 : 0) +
    selectedWeights.length +
    (searchTerm.trim() ? 1 : 0);

  const openQuickView = (product: HoneyProduct) => {
    setQuickViewProduct(product);
    setModalWeight(product.defaultWeight);
    setModalQty(1);
    setModalAdded(false);
  };

  const activeModalVariant =
    quickViewProduct?.variants.find((v) => v.weight === modalWeight) ??
    quickViewProduct?.variants[0];

  /* Shared Filter Panel UI (used in Desktop Sidebar & Mobile Drawer) */
  const renderFilterControls = (onAfterApply?: () => void) => (
    <div className="space-y-5">
      {/* Sidebar Heading + Curved Golden Line */}
      <div>
        <h2 className="font-serif font-extrabold text-xl text-forest-dark leading-tight">
          Shop Our Honey
        </h2>
        <svg
          aria-hidden="true"
          viewBox="0 0 120 10"
          fill="none"
          className="w-24 h-2.5 text-honey mt-1"
        >
          <path
            d="M2 6C30 1 65 9 118 4"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Categories Accordion */}
      <div className="border-t border-beige/80 pt-4">
        <button
          type="button"
          onClick={() => setCatOpen(!catOpen)}
          className="w-full flex items-center justify-between font-sans font-bold text-sm text-forest-dark"
        >
          <span>Categories</span>
          {catOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {catOpen && (
          <div className="mt-3 space-y-2">
            {categoryOptions.map((cat) => {
              const checked = selectedCategories.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className="flex items-center gap-2.5 cursor-pointer group select-none"
                >
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      'w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0',
                      checked
                        ? 'bg-honey border-honey text-charcoal'
                        : 'bg-white border-beige-dark group-hover:border-honey'
                    )}
                  >
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <span
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      'font-sans text-xs sm:text-[13px] transition-colors',
                      checked
                        ? 'font-bold text-forest-dark'
                        : 'font-medium text-charcoal/80 group-hover:text-forest'
                    )}
                  >
                    {cat.label}{' '}
                    <span className="text-charcoal/50 font-normal">({cat.count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range Accordion */}
      <div className="border-t border-beige/80 pt-4">
        <button
          type="button"
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full flex items-center justify-between font-sans font-bold text-sm text-forest-dark"
        >
          <span>Price Range</span>
          {priceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {priceOpen && (
          <div className="mt-3 space-y-2.5">
            <input
              type="range"
              min={200}
              max={600}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum honey price"
              className="w-full accent-[#F5B400] cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs font-sans font-bold text-forest-dark">
              <span>₹200</span>
              <span className="px-2 py-0.5 rounded-[5px] bg-beige/70">
                Up to ₹{maxPrice}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Jar Weight Accordion */}
      <div className="border-t border-beige/80 pt-4">
        <button
          type="button"
          onClick={() => setWeightOpen(!weightOpen)}
          className="w-full flex items-center justify-between font-sans font-bold text-sm text-forest-dark"
        >
          <span>Weight</span>
          {weightOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {weightOpen && (
          <div className="mt-3 space-y-2">
            {[
              { weight: '250g', count: honeyProducts.length },
              { weight: '500g', count: honeyProducts.length },
            ].map((item) => {
              const checked = selectedWeights.includes(item.weight);
              return (
                <label
                  key={item.weight}
                  className="flex items-center gap-2.5 cursor-pointer group select-none"
                >
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggleWeight(item.weight)}
                    className={cn(
                      'w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0',
                      checked
                        ? 'bg-honey border-honey text-charcoal'
                        : 'bg-white border-beige-dark group-hover:border-honey'
                    )}
                  >
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <span
                    onClick={() => toggleWeight(item.weight)}
                    className="font-sans text-xs sm:text-[13px] font-medium text-charcoal/85"
                  >
                    {item.weight}{' '}
                    <span className="text-charcoal/50">({item.count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-beige/80 space-y-2">
        <button
          type="button"
          onClick={() => onAfterApply?.()}
          className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#134222] to-[#0D3219] hover:from-[#0D3219] hover:to-[#134222] text-white font-sans font-bold text-xs sm:text-[13px] shadow-forest flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-honey" />
          <span>Apply Filters</span>
        </button>

        <button
          type="button"
          onClick={() => {
            clearAllFilters();
            onAfterApply?.();
          }}
          className="w-full py-2 px-3 rounded-full text-xs font-sans font-semibold text-charcoal/75 hover:text-forest-dark hover:bg-beige/50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-cream text-charcoal overflow-x-clip">
      {/* =====================================================================
          1. SHOP HERO BANNER — Pure & Natural Honey (Kashmir Valley Backdrop)
          ===================================================================== */}
      <section
        aria-labelledby="shop-hero-heading"
        className="relative w-full min-h-[260px] sm:min-h-[330px] lg:min-h-[370px] flex items-center overflow-hidden"
      >
        <Image
          src="/images/others/abouts_hero_section.png"
          alt="Pure and natural raw Kashmir honey jars surrounded by mountain blossoms"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#072412]/92 via-[#092D17]/68 sm:via-[#092D17]/48 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#092D17]/40 to-transparent"
        />

        <div className="relative z-10 cb-container py-10 sm:py-14">
          <div className="max-w-xl space-y-2.5 sm:space-y-3.5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="block font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.26em] text-cream/95">
              OUR SHOP
            </span>

            <h1
              id="shop-hero-heading"
              className="font-serif font-extrabold text-[34px] xs:text-[40px] sm:text-5xl lg:text-[54px] leading-[1.06] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
            >
              <span className="text-white">Pure &amp; Natural </span>
              <span className="text-honey">Honey</span>
            </h1>

            <svg
              aria-hidden="true"
              viewBox="0 0 240 14"
              fill="none"
              className="w-40 sm:w-52 h-3 text-honey"
            >
              <path
                d="M2 8C48 1 100 13 152 6C188 1.5 215 5 238 8"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>

            <p className="font-sans text-xs xs:text-sm sm:text-base text-cream/95 leading-relaxed max-w-md pt-0.5">
              Explore our range of 100% pure, raw and unprocessed honeys from Kashmir &amp; across
              India.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. TOP 4-ITEM PURITY TRUST STRIP
          ===================================================================== */}
      <section aria-label="Purity Highlights" className="pt-5 sm:pt-6">
        <div className="cb-container">
          <div className="rounded-[14px] bg-[#FAF1E1] border border-beige/90 px-4 py-3.5 sm:py-4 shadow-soft-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-3 lg:gap-0 lg:divide-x lg:divide-beige-dark/60">
              {TOP_TRUST_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 lg:px-4"
                >
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FCE9A8]/85 border border-honey/40 flex items-center justify-center shrink-0">
                    <TopTrustIcon id={item.id} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans font-bold text-xs sm:text-[13px] text-forest-dark leading-tight">
                      {item.title}
                    </p>
                    <p className="font-sans text-[11px] text-charcoal/75 leading-tight mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. MAIN SHOP CATALOG (Sticky Filter Sidebar + Responsive Product Grid)
          ===================================================================== */}
      <section aria-label="Shop Honey Products" className="py-7 sm:py-10">
        <div className="cb-container">
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-7">
            {/* ----------------- DESKTOP STICKY FILTER SIDEBAR ----------------- */}
            <aside className="hidden lg:block w-[245px] xl:w-[260px] shrink-0 sticky top-28 rounded-[14px] bg-[#FFFDF8] border border-beige/95 p-5 shadow-soft-sm">
              {renderFilterControls()}
            </aside>

            {/* ----------------- RIGHT: CATALOG HEADER + PRODUCT GRID ----------------- */}
            <div className="flex-1 w-full min-w-0">
              {/* Header & Sort Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-5 border-b border-beige/70 mb-5">
                <div>
                  <h2 className="font-serif font-extrabold text-[26px] sm:text-[32px] leading-tight tracking-tight text-forest-dark">
                    Our Honey <span className="text-[#D48D15]">Collection</span>
                  </h2>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 180 12"
                    fill="none"
                    className="w-36 h-2.5 text-honey mt-0.5"
                  >
                    <path
                      d="M2 7C42 1 88 11 178 4"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Mobile Filter Button + Sort Dropdown */}
                <div className="flex items-center justify-between sm:justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-white border border-beige-dark/80 text-xs font-sans font-bold text-forest-dark shadow-soft-sm hover:border-honey transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-honey-amber" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-honey text-charcoal text-[10px] font-extrabold leading-none">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="shop-sort-select"
                      className="text-xs font-sans font-semibold text-charcoal/75 whitespace-nowrap"
                    >
                      Sort By:
                    </label>
                    <select
                      id="shop-sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-3 py-2 rounded-[8px] bg-white border border-beige-dark/80 text-xs sm:text-[13px] font-sans font-semibold text-forest-dark shadow-soft-sm focus:outline-none focus:border-honey cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Search / Filter Feedback Strip */}
              {searchTerm.trim() && (
                <div className="mb-4 flex items-center justify-between px-3.5 py-2 rounded-[5px] bg-honey/15 border border-honey/40 text-xs font-sans">
                  <span>
                    Showing results for <strong className="text-forest-dark">&ldquo;{searchTerm}&rdquo;</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="font-bold text-forest-dark hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}

              {/* Product Cards Grid — Exact Same Homepage Products (2 col mobile, 3 col sm/lg, 3–4 desktop) */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {filteredProducts.map((product) => (
                    <HoneyProductCard
                      key={product.id}
                      product={product}
                      onQuickView={openQuickView}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[12px] bg-white border border-beige p-10 text-center space-y-3">
                  <p className="font-serif text-xl font-bold text-forest-dark">
                    No honey jars match those filters
                  </p>
                  <p className="font-sans text-sm text-charcoal/75">
                    Try adjusting your price range or clearing category filters to see all pure
                    Country Bee varieties.
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-forest-dark hover:bg-forest text-white font-sans font-bold text-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-honey" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. BOTTOM 4-ITEM SERVICE GUARANTEE CARD
          ===================================================================== */}
      <section aria-label="Shopping Guarantees" className="pb-12 sm:pb-16">
        <div className="cb-container">
          <div className="rounded-[16px] bg-[#FFFDF8] border border-beige/95 px-4 py-5 sm:px-6 sm:py-6 shadow-soft-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4 lg:gap-0 lg:divide-x lg:divide-beige-dark/60">
              {BOTTOM_GUARANTEES.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-start sm:justify-center gap-3 lg:px-4"
                >
                  <BottomGuaranteeIcon id={item.id} />
                  <div className="min-w-0">
                    <h3 className="font-sans font-bold text-xs sm:text-sm text-forest-dark leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs text-charcoal/75 leading-snug mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. MOBILE SLIDE-OVER FILTER DRAWER (< lg)
          ===================================================================== */}
      {mobileFiltersOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter honey products"
          className="fixed inset-0 z-50 lg:hidden flex justify-start bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            className="w-[300px] max-w-[85vw] bg-[#FFFDF8] h-full shadow-2xl p-5 overflow-y-auto animate-in slide-in-from-left duration-300 border-r border-beige"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-end mb-2">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="w-8 h-8 rounded-full bg-cream hover:bg-beige text-charcoal flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {renderFilterControls(() => setMobileFiltersOpen(false))}
          </div>
        </div>
      )}

      {/* =====================================================================
          6. COMPACT RESPONSIVE QUICK VIEW MODAL (Same as Homepage)
          ===================================================================== */}
      {quickViewProduct && activeModalVariant && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shop-quick-view-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[86vh] overflow-y-auto bg-cream-light rounded-[5px] border border-beige shadow-2xl grid grid-cols-1 sm:grid-cols-[210px_1fr] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close quick view"
              className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-[5px] bg-white/95 hover:bg-beige text-charcoal flex items-center justify-center shadow-soft-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-40 xs:h-44 sm:h-full sm:min-h-[250px] bg-cream">
              <Image
                src={quickViewProduct.imageUrl}
                alt={quickViewProduct.name}
                fill
                sizes="(max-width: 640px) 100vw, 220px"
                className="object-cover object-center"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[5px] bg-honey text-charcoal text-[10px] font-bold uppercase tracking-wider shadow-soft-sm">
                {quickViewProduct.badge}
              </span>
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col justify-between gap-2.5">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-leaf-dark">
                  <Sparkles className="w-3 h-3 text-honey" />
                  {quickViewProduct.origin}
                </span>

                <h3
                  id="shop-quick-view-title"
                  className="font-serif text-lg sm:text-xl font-bold text-forest-dark leading-tight pr-6"
                >
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-center gap-1.5 text-[11px] text-charcoal/75">
                  <span className="text-honey font-bold">★ 0.0 (0)</span>
                  <span>•</span>
                  <span className="truncate">{quickViewProduct.floralSource}</span>
                </div>

                <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-2">
                  {quickViewProduct.shortDescription}
                </p>

                <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.weight}
                      type="button"
                      onClick={() => setModalWeight(v.weight)}
                      className={cn(
                        'px-2.5 py-1 rounded-[5px] text-[11px] font-bold transition-all border',
                        modalWeight === v.weight
                          ? 'bg-forest-dark text-white border-forest-dark'
                          : 'bg-white text-charcoal border-beige hover:border-honey'
                      )}
                    >
                      {v.weight} — {formatINR(v.price)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 border-t border-beige space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-lg sm:text-xl font-extrabold text-forest-dark">
                    {formatINR(activeModalVariant.price * modalQty)}
                  </span>

                  <div className="inline-flex items-center rounded-[5px] border border-beige bg-white h-8">
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="px-2 h-full text-charcoal hover:bg-beige/50 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-forest-dark">{modalQty}</span>
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="px-2 h-full text-charcoal hover:bg-beige/50 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addItem(
                        quickViewProduct,
                        activeModalVariant.weight,
                        activeModalVariant.price,
                        modalQty
                      );
                      setModalAdded(true);
                      setTimeout(() => setModalAdded(false), 1400);
                    }}
                    className={cn(
                      'flex-1 py-2 px-3.5 rounded-[5px] font-sans font-bold text-xs sm:text-[13px] flex items-center justify-center gap-1.5 transition-all shadow-honey',
                      modalAdded
                        ? 'bg-leaf text-white'
                        : 'bg-honey hover:bg-honey-yellow text-charcoal'
                    )}
                  >
                    {modalAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>Add to Basket</>
                    )}
                  </button>

                  <Link
                    href={`/products/${quickViewProduct.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="py-2 px-3 rounded-[5px] border border-beige bg-white hover:bg-beige/50 text-forest-dark font-sans font-bold text-xs transition-colors"
                  >
                    Details
                  </Link>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-forest font-medium">
                  <ShieldCheck className="w-3 h-3 text-leaf shrink-0" />
                  <span>100% Pure, Unblended &amp; NMR Tested</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
