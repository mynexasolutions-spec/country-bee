'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { honeyTypeItems, type HoneyTypeIconId } from '@/data/honeyTypes';
import { cn } from '@/lib/utils';

/**
 * Renders the exact vector artwork from public/icons/country_bee_svg_icons/
 * styled with Country Bee's high-contrast brand palette so each icon shines
 * vibrantly against the deep forest-green banner.
 */
const HoneyCategoryIcon = ({ id, iconSrc }: { id: HoneyTypeIconId; iconSrc: string }) => {
  switch (id) {
    case 'floral':
      // Exact geometry from /icons/country_bee_svg_icons/flower.svg
      return (
        <svg
          data-icon-src={iconSrc}
          className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 48 48"
          fill="#FFFFFF"
          stroke="#F3E5D0"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <g>
            <ellipse cx="24" cy="12" rx="5" ry="8" />
            <ellipse cx="24" cy="36" rx="5" ry="8" />
            <ellipse cx="12" cy="24" rx="8" ry="5" />
            <ellipse cx="36" cy="24" rx="8" ry="5" />
            <ellipse cx="15.5" cy="15.5" rx="5" ry="8" transform="rotate(-45 15.5 15.5)" />
            <ellipse cx="32.5" cy="32.5" rx="5" ry="8" transform="rotate(-45 32.5 32.5)" />
            <ellipse cx="32.5" cy="15.5" rx="5" ry="8" transform="rotate(45 32.5 15.5)" />
            <ellipse cx="15.5" cy="32.5" rx="5" ry="8" transform="rotate(45 15.5 32.5)" />
            <circle cx="24" cy="24" r="5.5" fill="#F5B400" stroke="#FFCA28" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 'herbal':
      // Exact geometry from /icons/country_bee_svg_icons/herbal-leaf.svg
      return (
        <svg
          data-icon-src={iconSrc}
          className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-[0_2px_6px_rgba(0,0,0,0.22)] transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 48 48"
          fill="#789B40"
          stroke="#8EAE56"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M24 43V10m0 17C15 25 10 19 9 10c9 0 15 5 15 17Zm0-5c1-9 7-15 16-16-1 9-7 15-16 16Zm0 17c-8-1-13-6-15-14 9 0 14 5 15 14Z" />
        </svg>
      );

    case 'single-origin':
      // Exact geometry from /icons/country_bee_svg_icons/honeycomb.svg
      return (
        <svg
          data-icon-src={iconSrc}
          className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-[0_2px_8px_rgba(245,180,0,0.28)] transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 48 48"
          fill="#F5B400"
          fillOpacity="0.88"
          stroke="#FFCA28"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m24 4 10 6v12l-10 6-10-6V10Z M14 22 4 28v12l10 6 10-6V28Zm20 0 10 6v12l-10 6-10-6V28Z" />
        </svg>
      );

    case 'all-honey':
      // Exact geometry from /icons/country_bee_svg_icons/jar.svg
      return (
        <svg
          data-icon-src={iconSrc}
          className="w-10 h-10 sm:w-11 sm:h-11 text-honey drop-shadow-[0_2px_6px_rgba(245,180,0,0.22)] transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 8h18v6H15zM12 17h24v23H12z" fill="#F5B400" fillOpacity="0.14" />
          <path d="M17 22h14M17 27h14M17 34h10" />
        </svg>
      );

    case 'gift-packs':
      // Exact geometry from /icons/country_bee_svg_icons/gift.svg
      return (
        <svg
          data-icon-src={iconSrc}
          className="w-10 h-10 sm:w-11 sm:h-11 text-honey drop-shadow-[0_2px_6px_rgba(245,180,0,0.22)] transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 20h34v24H7zM4 13h40v8H4z" fill="#F5B400" fillOpacity="0.14" />
          <path d="M24 13v31" />
          <path d="M24 13C9 15 7 5 15 5c5 0 8 8 9 8Zm0 0c15 2 17-8 9-8-5 0-8 8-9 8Z" />
        </svg>
      );
  }
};

// Quadruple items for seamless, mathematically infinite continuous marquee
const CAROUSEL_ITEMS = [
  ...honeyTypeItems,
  ...honeyTypeItems,
  ...honeyTypeItems,
  ...honeyTypeItems,
];

export const ShopByHoneyType = () => {
  const [activeId, setActiveId] = useState<HoneyTypeIconId>('floral');

  return (
    <section
      aria-labelledby="shop-by-honey-type-heading"
      className="relative w-full bg-cream py-10 sm:py-14 lg:py-16 overflow-hidden"
    >
      <div className="cb-container">
        {/* Main Deep Forest Banner */}
        <div className="relative w-full rounded-[5px] bg-gradient-to-r from-[#092D17] via-[#123D20] to-[#0B3219] border border-forest-light/80 shadow-forest px-4 py-5 sm:px-6 sm:py-6 lg:px-9 lg:py-6 overflow-hidden">
          {/* Ambient Warm Honey Glow Accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 left-1/4 w-80 h-80 bg-honey/15 blur-3xl rounded-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 right-1/4 w-80 h-80 bg-honey/15 blur-3xl rounded-full"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 lg:gap-8">
            {/* Left Heading + Golden Chevron Action */}
            <div className="flex items-center justify-between lg:justify-start gap-4 sm:gap-6 shrink-0">
              <h2
                id="shop-by-honey-type-heading"
                className="font-serif font-bold text-[26px] xs:text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.2] tracking-tight"
              >
                <span className="block text-white">Shop by</span>
                <span className="block text-honey mt-0.5">Honey Type</span>
              </h2>

              <Link
                href="/shop"
                aria-label="Browse all honey types"
                className="group inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-[5px] bg-honey-light hover:bg-honey-yellow text-forest-dark shadow-soft-sm transition-all duration-200 hover:translate-x-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2 focus-visible:ring-offset-forest-dark shrink-0"
              >
                <Image
                  src="/icons/country_bee_svg_icons/chevron-right.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Right Side Infinite Continuous Carousel Track (Right to Left) */}
            <div className="relative flex-1 lg:max-w-[760px] xl:max-w-[820px] overflow-hidden rounded-[5px]">
              {/* Left & Right Ambient Gradient Fade Masks */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-20 bg-gradient-to-r from-[#092D17] to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-20 bg-gradient-to-l from-[#0B3219] to-transparent"
              />

              {/* Infinite Continuous Scrolling Track */}
              <div className="animate-honey-marquee gap-2.5 sm:gap-3 py-1">
                {CAROUSEL_ITEMS.map((item, index) => {
                  const isActive = activeId === item.id;
                  return (
                    <Link
                      key={`${item.id}-${index}`}
                      href={item.href}
                      onMouseEnter={() => setActiveId(item.id)}
                      onFocus={() => setActiveId(item.id)}
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        'group relative flex flex-col items-center justify-center text-center rounded-[5px] px-3 py-3 sm:py-3.5 w-[114px] xs:w-[124px] sm:w-[136px] min-h-[104px] sm:min-h-[114px] shrink-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey select-none',
                        isActive
                          ? 'bg-[#174927]/95 border-[1.5px] border-honey-yellow shadow-[0_0_24px_rgba(245,180,0,0.45),inset_0_0_14px_rgba(245,180,0,0.15)] -translate-y-0.5'
                          : 'bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 hover:border-honey/60 shadow-[0_4px_14px_rgba(0,0,0,0.2)]'
                      )}
                    >
                      {/* Subtle Top Rim Light */}
                      <span
                        aria-hidden="true"
                        className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
                      />

                      {/* Category SVG Icon */}
                      <div className="mb-2 flex items-center justify-center">
                        <HoneyCategoryIcon id={item.id} iconSrc={item.iconSrc} />
                      </div>

                      {/* Two-Line DM Sans Label */}
                      <span className="font-sans font-semibold text-xs sm:text-[13px] leading-[1.2] text-white tracking-wide">
                        <span className="block">{item.line1}</span>
                        <span className="block">{item.line2}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
