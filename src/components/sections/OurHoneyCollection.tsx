'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Check, ShieldCheck, Sparkles, ArrowRight, Plus, Minus } from 'lucide-react';
import { honeyProducts, type HoneyProduct, formatINR } from '@/data/products';
import { HoneyProductCard } from '@/components/products/HoneyProductCard';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

type FilterTab = 'all' | 'floral' | 'herbal' | 'single-origin';

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All Honey (6)' },
  { id: 'floral', label: 'Floral Honey' },
  { id: 'herbal', label: 'Herbal Honey' },
  { id: 'single-origin', label: 'Single-Origin' },
];

export const OurHoneyCollection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<HoneyProduct | null>(null);
  const [modalWeight, setModalWeight] = useState<string>('250g');
  const [modalQty, setModalQty] = useState<number>(1);
  const [modalAdded, setModalAdded] = useState<boolean>(false);

  const { addItem } = useCart();

  const filteredProducts =
    activeFilter === 'all'
      ? honeyProducts
      : honeyProducts.filter((p) => p.honeyType === activeFilter);

  const openQuickView = (product: HoneyProduct) => {
    setQuickViewProduct(product);
    setModalWeight(product.defaultWeight);
    setModalQty(1);
    setModalAdded(false);
  };

  const activeModalVariant =
    quickViewProduct?.variants.find((v) => v.weight === modalWeight) ??
    quickViewProduct?.variants[0];

  return (
    <section
      id="collection"
      aria-labelledby="honey-collection-heading"
      className="relative w-full bg-cream pt-12 sm:pt-14 lg:pt-16 pb-8 overflow-hidden mt-[-40px]"
    >
      {/* Decorative Subtle Golden Honeycomb Outlines (Top-Left & Bottom-Right matching reference) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 140 160"
        fill="none"
        className="pointer-events-none absolute top-6 -left-4 w-28 sm:w-36 h-auto text-honey/35"
      >
        <path
          d="M52 8L86 28V68L52 88L18 68V28L52 8Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M34 74L68 94V134L34 154L0 134V94L34 74Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 140 160"
        fill="none"
        className="pointer-events-none absolute bottom-8 -right-4 w-28 sm:w-36 h-auto text-honey/35"
      >
        <path
          d="M88 8L122 28V68L88 88L54 68V28L88 8Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M106 74L140 94V134L106 154L72 134V94L106 74Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>

      <div className="relative z-10 cb-container">
        {/* Section Heading with Twin Botanical Leaves */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center gap-2.5 sm:gap-4">
            {/* Left Botanical Leaf Ornament */}
            <svg
              aria-hidden="true"
              viewBox="0 0 56 32"
              className="w-8 sm:w-12 h-auto shrink-0"
              fill="none"
            >
              <path
                d="M4 10C18 4 36 8 46 20C32 26 14 22 4 10Z"
                fill="#789B40"
              />
              <path
                d="M6 11C22 14 36 17 52 19"
                stroke="#4E6E24"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <h2
              id="honey-collection-heading"
              className="font-serif font-extrabold text-[28px] xs:text-[32px] sm:text-[40px] lg:text-[44px] leading-tight tracking-tight text-forest-dark"
            >
              Our <span className="text-honey">Honey</span> Collection
            </h2>

            {/* Right Botanical Leaf Ornament */}
            <svg
              aria-hidden="true"
              viewBox="0 0 56 32"
              className="w-8 sm:w-12 h-auto shrink-0"
              fill="none"
            >
              <path
                d="M52 10C38 4 20 8 10 20C24 26 42 22 52 10Z"
                fill="#789B40"
              />
              <path
                d="M50 11C34 14 20 17 4 19"
                stroke="#4E6E24"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="mt-3 font-sans text-[12.5px] sm:text-[16px] text-charcoal/80 leading-relaxed max-w-xl mx-auto">
            A range of pure, unblended, single-origin honey, each with its own unique flavor, aroma
            and natural benefits.
          </p>

          {/* Interactive Filter Tabs — strictly rounded-[5px] */}
          <div
            role="tablist"
            aria-label="Filter honey collection by type"
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            {FILTER_TABS.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    'px-4 py-2 rounded-[5px] font-sans text-xs sm:text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey',
                    isSelected
                      ? 'bg-forest-dark text-white shadow-soft-sm'
                      : 'bg-white/85 hover:bg-beige/70 text-charcoal border border-beige'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Product Grid: 2 cols on mobile -> 3 cols on md -> 4 cols on lg */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {filteredProducts.map((product) => (
            <HoneyProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>

        {/* Bottom View Full Shop CTA — strictly rounded-[5px] */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/shop"
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-[5px] bg-forest hover:bg-forest-dark text-white font-sans font-bold text-sm shadow-forest transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2"
          >
            <span>Explore Full Honey Catalog</span>
            <ArrowRight className="w-4 h-4 text-honey transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* =====================================================================
          COMPACT, LOW-HEIGHT RESPONSIVE QUICK VIEW MODAL — strictly rounded-[5px]
          ===================================================================== */}
      {quickViewProduct && activeModalVariant && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[86vh] overflow-y-auto bg-cream-light rounded-[5px] border border-beige shadow-2xl grid grid-cols-1 sm:grid-cols-[210px_1fr] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close quick view"
              className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-[5px] bg-white/95 hover:bg-beige text-charcoal flex items-center justify-center shadow-soft-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Compact Product Photo (short banner on mobile, sleek side panel on sm+) */}
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

            {/* Compact Right Product Details */}
            <div className="p-3.5 sm:p-4 flex flex-col justify-between gap-2.5">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-leaf-dark">
                  <Sparkles className="w-3 h-3 text-honey" />
                  {quickViewProduct.origin}
                </span>

                <div className="flex items-center justify-between gap-2 pr-6">
                  <h3
                    id="quick-view-title"
                    className="font-serif text-lg sm:text-xl font-bold text-forest-dark leading-tight"
                  >
                    {quickViewProduct.name}
                  </h3>
                </div>

                {/* Rating strictly 0.0 (0) */}
                <div className="flex items-center gap-1.5 text-[11px] text-charcoal/75">
                  <span className="text-honey font-bold">★ 0.0 (0)</span>
                  <span>•</span>
                  <span className="truncate">{quickViewProduct.floralSource}</span>
                </div>

                <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-2">
                  {quickViewProduct.shortDescription}
                </p>

                {/* Inline Weight Selector */}
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

              {/* Compact Price + Quantity + Add to Basket Row */}
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
                  <span>100% Pure, Unblended & NMR Tested</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
