'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Eye } from 'lucide-react';
import { type HoneyProduct, formatINR } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export interface HoneyProductCardProps {
  product: HoneyProduct;
  onQuickView?: (product: HoneyProduct) => void;
}

export const HoneyProductCard = ({ product, onQuickView }: HoneyProductCardProps) => {
  const { addItem } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>(product.defaultWeight);
  const [hasExplicitWeightChoice, setHasExplicitWeightChoice] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const activeVariant =
    product.variants.find((v) => v.weight === selectedWeight) ?? product.variants[0];

  // Show exact range (e.g. ₹320.00 – ₹600.00 on Acacia Honey) until user explicitly toggles size
  const displayedPrice =
    hasExplicitWeightChoice || !product.maxPrice
      ? formatINR(activeVariant.price)
      : product.priceDisplay;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, activeVariant.weight, activeVariant.price, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1300);
  };

  const badgeStyles = {
    honey: 'bg-honey text-charcoal border border-honey-yellow/80',
    forest: 'bg-forest-dark/95 text-white border border-forest-light/70',
    leaf: 'bg-leaf text-white border border-leaf-light/70',
  }[product.badgeTone];

  return (
    <article className="group relative flex flex-col bg-white rounded-[5px] p-1.5 sm:p-2.5 border border-beige/90 hover:border-honey/80 shadow-soft hover:shadow-[0_14px_30px_-8px_rgba(18,61,32,0.16)]">
      {/* Compact Product Image Container — strictly rounded-[5px] */}
      <div className="relative w-full aspect-[3/3.2] sm:aspect-[2.5/2] rounded-[5px] overflow-hidden bg-cream">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name} details`}
          className="block relative w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
        >
          <Image
            src={product.imageUrl}
            alt={`${product.name} - 100% Pure Country Bee Natural Honey`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-[center_30%] transition-transform duration-700 ease-out hover:scale-105"
          />

          {/* Subtle Warm Sunlight Shimmer Sweep on Hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        </Link>

        {/* Top-Left Product Badge — strictly rounded-[5px] */}
        <span
          className={cn(
            'absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-[5px] text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wide shadow-soft-sm backdrop-blur-xs',
            badgeStyles
          )}
        >
          {product.badge}
        </span>

        {/* Top-Right Quick View Button — strictly rounded-[5px] */}
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 flex items-center gap-1">
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label={`Quick view ${product.name}`}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-[5px] bg-white/95 hover:bg-honey text-forest-dark border border-beige flex items-center justify-center shadow-soft-sm opacity-100 lg:opacity-0 lg:translate-y-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 focus-visible:opacity-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
            >
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Compact Product Details Body */}
      <div className="pt-2 sm:pt-4 pb-0.5 px-1 flex-1 flex flex-col justify-between lg:gap-2.5">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="block font-sans font-bold text-[13px] xs:text-[14px] sm:text-[15.5px] text-forest-dark group-hover:text-forest transition-colors leading-tight line-clamp-1 focus-visible:outline-none focus-visible:underline"
          >
            {product.name}
          </Link>

          {/* Rating (strictly 0.0 (0)) + Compact Weight Pills */}
          <div className="mt-1 flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 min-w-0">
              <svg
                className="w-3.5 h-3.5 text-honey shrink-0"
                viewBox="0 0 48 48"
                fill="#F5B400"
                stroke="#F4AE00"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m24 4 6 13 14 2-10 10 2 14-12-7-12 7 2-14L4 19l14-2Z" />
              </svg>
              <span className="font-sans text-[11px] sm:text-xs font-medium text-charcoal/75 truncate">
                {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0" role="group" aria-label="Select jar weight">
              {product.variants.map((variant) => {
                const isSelected = selectedWeight === variant.weight;
                return (
                  <button
                    key={variant.weight}
                    type="button"
                    onClick={() => {
                      setSelectedWeight(variant.weight);
                      setHasExplicitWeightChoice(true);
                    }}
                    className={cn(
                      'px-1 sm:px-1.5 py-0.5 rounded-[5px] text-[9px] sm:text-[10px] font-sans font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-honey',
                      isSelected
                        ? 'bg-beige text-forest-dark border border-honey/60'
                        : 'bg-cream/80 text-charcoal/65 hover:bg-beige/60 border border-transparent'
                    )}
                  >
                    {variant.weight}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Price + Working Add to Cart Button Row */}
        <div className="mt-2 flex items-center justify-between gap-1.5">
          <div className="font-sans font-extrabold text-[13px] xs:text-[14.5px] sm:text-[16px] text-forest-dark tracking-tight leading-tight truncate">
            {displayedPrice}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} (${activeVariant.weight}) to cart`}
            className={cn(
              'relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-[5px] shadow-forest transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey shrink-0',
              justAdded
                ? 'bg-leaf text-white'
                : 'bg-forest-dark hover:bg-forest text-honey-yellow'
            )}
          >
            {justAdded ? (
              <Check className="w-4 h-4 stroke-[2.8] animate-in zoom-in duration-200" />
            ) : (
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 9h5l4 21h21l5-15H12" />
                <circle cx="18" cy="39" r="2.8" fill="currentColor" />
                <circle cx="33" cy="39" r="2.8" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
