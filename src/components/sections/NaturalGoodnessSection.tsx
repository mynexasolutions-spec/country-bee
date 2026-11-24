'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { honeyBenefitsData, type HoneyBenefitId } from '@/data/benefits';
import { cn } from '@/lib/utils';

/**
 * Smoothly rounded flat-top hexagon inside viewBox "0 0 210 186"
 */
const BENEFIT_HEX_PATH =
  'M 68,8 L 142,8 Q 158,8 166,22 L 198,79 Q 206,93 198,107 L 166,164 Q 158,178 142,178 L 68,178 Q 52,178 44,164 L 12,107 Q 4,93 12,79 L 44,22 Q 52,8 68,8 Z';

/**
 * Pixel-accurate custom SVG icons matching the exact reference artwork:
 * 1. Heraldic crest shield with checkmark (Boosts Immunity)
 * 2. Anatomical dual-tube stomach silhouette (Supports Digestion)
 * 3. Outlined lightning bolt (Natural Energy)
 * 4. Serene spa/beauty face with parted hair & ears (Good for Skin & Hair)
 * 5. Connected multi-node antioxidant molecule (Rich in Antioxidants)
 * 6. Symmetrical 5-petal blooming lotus without base line (Overall Wellness)
 */
const ExactBenefitIcon = ({
  id,
  iconSrc,
  isActive,
}: {
  id: HoneyBenefitId;
  iconSrc: string;
  isActive: boolean;
}) => {
  const iconClass = cn(
    'w-10 h-10  sm:w-12 sm:h-12 transition-all duration-500 ease-out',
    isActive
      ? 'text-[#D99000] scale-110 drop-shadow-[0_4px_10px_rgba(245,180,0,0.35)]'
      : 'text-[#E59E00] group-hover:text-[#D99000] group-hover:scale-110'
  );

  switch (id) {
    case 'immunity':
      return (
        <svg
          data-icon-src={iconSrc}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={iconClass}
        >
          {/* Classic curved crest shield */}
          <path
            d="M24 6C19 9.2 14.2 10.5 9.5 10.8V22.5C9.5 32.2 15.8 39.2 24 42.5C32.2 39.2 38.5 32.2 38.5 22.5V10.8C33.8 10.5 29 9.2 24 6Z"
            fill="currentColor"
            fillOpacity={isActive ? '0.14' : '0.05'}
          />
          <path d="M17.5 24.2L22 28.8L30.8 19.2" strokeWidth="3" />
        </svg>
      );

    case 'digestion':
      return (
        <svg
          data-icon-src={iconSrc}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={iconClass}
        >
          {/* True anatomical stomach contour matching reference */}
          <path
            d="M23 7V13.5C23 16.5 20.8 19.5 18.8 22.5C16.8 25.5 16.5 29 14.2 31.2C11.8 33.4 9.8 35.8 10 39.5M27.5 7V12.2C31.5 11.2 36.2 13.5 38.2 18.5C40.5 24.2 38.8 32.2 33.2 36.8C28.2 40.8 21.2 40.8 17.5 37.5C15.5 35.8 14.8 36.8 14 40.5"
            fill="currentColor"
            fillOpacity={isActive ? '0.12' : '0.04'}
          />
          <path d="M32.5 18.5C34.5 21.5 34.8 26.2 32.2 30.5" strokeWidth="2" opacity="0.65" />
        </svg>
      );

    case 'energy':
      return (
        <svg
          data-icon-src={iconSrc}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={iconClass}
        >
          {/* Crisp outlined lightning bolt */}
          <path
            d="M26.8 5.5L12.5 26H23.2L19.5 42.5L35.5 21.5H24.8L26.8 5.5Z"
            fill="currentColor"
            fillOpacity={isActive ? '0.16' : '0.05'}
          />
        </svg>
      );

    case 'skin-hair':
      return (
        <svg
          data-icon-src={iconSrc}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={iconClass}
        >
          {/* Crown hair / spa wrap */}
          <path
            d="M13 23.5C13 13.2 17.6 7.5 24 7.5C30.4 7.5 35 13.2 35 23.5"
            fill="currentColor"
            fillOpacity={isActive ? '0.14' : '0.05'}
          />
          {/* Parted hairline sweep */}
          <path d="M13.5 22C17.2 17.2 21.2 15.8 24 17.5C26.8 15.8 30.8 17.2 34.5 22" />
          {/* Side ears */}
          <path d="M13.5 23.5C11.2 23.5 11.2 28.5 13.8 28.8" />
          <path d="M34.5 23.5C36.8 23.5 36.8 28.5 34.2 28.8" />
          {/* Smooth face contour */}
          <path d="M13.8 23.5C13.8 33.2 18.2 40.5 24 40.5C29.8 40.5 34.2 33.2 34.2 23.5" />
          {/* Forehead glow dot */}
          <circle cx="24" cy="12.2" r="0.9" fill="currentColor" stroke="none" />
          {/* Calm eyes, soft nose & smile */}
          <path d="M18.2 25.5C19.2 24.6 20.6 24.6 21.5 25.5" />
          <path d="M26.5 25.5C27.4 24.6 28.8 24.6 29.8 25.5" />
          <path d="M23.3 29.2Q24 30 24.7 29.2" />
          <path d="M20.8 33.5Q24 35.8 27.2 33.5" />
        </svg>
      );

    case 'antioxidants':
      return (
        <svg
          data-icon-src={iconSrc}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={iconClass}
        >
          {/* Central hub + 4 radiating molecular bond stems & hollow atom rings */}
          <circle
            cx="23.5"
            cy="25.5"
            r="3.8"
            fill="currentColor"
            fillOpacity={isActive ? '0.25' : '0.1'}
          />
          {/* Top atom */}
          <circle cx="21.5" cy="9.5" r="3.5" />
          <path d="M22 13L23 21.7" />
          {/* Top-right atom */}
          <circle cx="35.5" cy="16.5" r="3.5" />
          <path d="M32.6 18.6L26.6 23.2" />
          {/* Left atom */}
          <circle cx="10.5" cy="28.5" r="3.5" />
          <path d="M14 27.7L19.8 26.3" />
          {/* Bottom-right atom */}
          <circle cx="33.5" cy="38.5" r="3.8" />
          <path d="M26 28.6L31.1 35.4" />
        </svg>
      );

    case 'wellness':
      return (
        <svg
          data-icon-src={iconSrc}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={iconClass}
        >
          {/* Outer lower left & right lotus petals */}
          <path d="M24 37.5C13.5 37.5 7.2 31.8 5.8 23.2C12.2 22.8 17.5 26.5 20.5 34.2" />
          <path d="M24 37.5C34.5 37.5 40.8 31.8 42.2 23.2C35.8 22.8 30.5 26.5 27.5 34.2" />
          {/* Mid left & right lotus petals */}
          <path d="M24 37.5C15.5 33.8 12.2 24.5 14.8 15.2C19.8 18 22.2 24.2 22.2 33" />
          <path d="M24 37.5C32.5 33.8 35.8 24.5 33.2 15.2C28.2 18 25.8 24.2 25.8 33" />
          {/* Center upright lotus petal */}
          <path
            d="M24 10.5C18.8 18.2 18.8 29.2 24 37.5C29.2 29.2 29.2 18.2 24 10.5Z"
            fill="currentColor"
            fillOpacity={isActive ? '0.16' : '0.06'}
          />
        </svg>
      );
  }
};

export const NaturalGoodnessSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Trigger staggered entrance animation when scrolled into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Gentle auto-spotlight cycle across the 6 benefits when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % honeyBenefitsData.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeBenefit = honeyBenefitsData[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="benefits"
      aria-labelledby="natural-goodness-heading"
      className="relative w-full bg-cream py-10 sm:py-14 lg:py-16 overflow-hidden mt-[-40px]"
    >
      {/* Subtle Ambient Warm Honey Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[260px] bg-honey/10 rounded-full blur-3xl"
      />

      {/* Left Margin Decorative Botanical Leaf Sprig */}
      <svg
        aria-hidden="true"
        viewBox="0 0 110 170"
        fill="none"
        className="hidden md:block pointer-events-none absolute -left-3 top-1/2 -translate-y-1/2 w-16 lg:w-20 h-auto opacity-95"
      >
        <path
          d="M0 115C24 96 42 74 56 44"
          stroke="#5A7D2A"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M16 74C10 52 20 32 40 24C44 46 34 66 16 74Z" fill="#789B40" />
        <path d="M36 68C48 48 68 42 88 48C74 66 54 74 36 68Z" fill="#638233" />
        <path d="M14 108C34 98 56 104 68 122C48 128 26 122 14 108Z" fill="#8EAE56" />
        <path d="M6 132C24 128 40 138 46 156C28 158 12 148 6 132Z" fill="#789B40" />
      </svg>

      <div className="relative z-10 cb-container">
        {/* Heading Row with Twin Botanical Leaves */}
        <div
          className={cn(
            'text-center max-w-3xl mx-auto mb-8 sm:mb-11 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <div className="inline-flex items-center justify-center gap-2.5 sm:gap-4">
            <svg
              aria-hidden="true"
              viewBox="0 0 56 32"
              className="w-7 xs:w-8 sm:w-11 h-auto shrink-0"
              fill="none"
            >
              <path d="M4 10C18 4 36 8 46 20C32 26 14 22 4 10Z" fill="#789B40" />
              <path
                d="M6 11C22 14 36 17 52 19"
                stroke="#4E6E24"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <h2
              id="natural-goodness-heading"
              className="font-serif font-extrabold text-[22px] xs:text-[26px] sm:text-[34px] lg:text-[42px] leading-tight tracking-tight text-forest-dark"
            >
              The Natural Goodness of <span className="text-honey">Honey</span>
            </h2>

            <svg
              aria-hidden="true"
              viewBox="0 0 56 32"
              className="w-7 xs:w-8 sm:w-11 h-auto shrink-0"
              fill="none"
            >
              <path d="M52 10C38 4 20 8 10 20C24 26 42 22 52 10Z" fill="#789B40" />
              <path
                d="M50 11C34 14 20 17 4 19"
                stroke="#4E6E24"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 6 Animated Rounded-Hexagon Benefit Cards
            - Mobile (<475px): 2 columns (3 rows)
            - Large Mobile & Tablet (xs..md): 3 columns (2 rows)
            - Desktop (lg+): 6 equal columns in one sleek row */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-3 xs:gap-3.5 sm:gap-5 lg:gap-3.5 xl:gap-5 items-center"
        >
          {honeyBenefitsData.map((benefit, index) => {
            const isActive = activeIndex === index;
            const gradId = `cb-benefit-hex-${benefit.id}`;
            const glowGradId = `cb-benefit-glow-${benefit.id}`;

            return (
              <button
                key={benefit.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => {
                  setIsPaused(true);
                  setActiveIndex(index);
                }}
                onBlur={() => setIsPaused(false)}
                onClick={() => setActiveIndex(index)}
                style={{ transitionDelay: isVisible ? `${index * 75}ms` : '0ms' }}
                className={cn(
                  'group relative flex items-center justify-center w-full focus-visible:outline-none transition-all duration-500 ease-out cursor-pointer',
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
                )}
              >
                <div
                  className={cn(
                    'relative w-full max-w-[172px] sm:max-w-[186px] lg:max-w-none aspect-[210/186] flex items-center justify-center transition-all duration-500 ease-out',
                    isActive
                      ? '-translate-y-2 scale-[1.03] drop-shadow-[0_16px_26px_rgba(245,180,0,0.26)]'
                      : 'hover:-translate-y-1.5 drop-shadow-[0_10px_18px_rgba(41,37,31,0.08)]'
                  )}
                >
                  {/* Rounded Flat-Top Hexagon Background SVG */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 210 186"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <defs>
                      <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#FAF0E1" />
                      </linearGradient>
                      <radialGradient id={glowGradId} cx="50%" cy="42%" r="55%">
                        <stop offset="0%" stopColor="#FFFBEB" />
                        <stop offset="70%" stopColor="#FFF6DF" />
                        <stop offset="100%" stopColor="#F8EBD4" />
                      </radialGradient>
                    </defs>
                    <path
                      d={BENEFIT_HEX_PATH}
                      fill={isActive ? `url(#${glowGradId})` : `url(#${gradId})`}
                      stroke={isActive ? '#F5B400' : '#ECE0CA'}
                      strokeWidth={isActive ? '3' : '2'}
                      className="transition-all duration-400 group-hover:stroke-honey"
                    />
                  </svg>

                  {/* Centered Icon + Two-Line Label */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center px-3.5 py-2.5">
                    <div className="mb-2 sm:mb-2.5">
                      <ExactBenefitIcon
                        id={benefit.id}
                        iconSrc={benefit.iconSrc}
                        isActive={isActive}
                      />
                    </div>
                    <h3
                      className={cn(
                        'font-sans font-bold text-[12px] xs:text-[12.5px] sm:text-[14px] lg:text-[13px] xl:text-[14.5px] leading-[1.22] transition-colors duration-300',
                        isActive
                          ? 'text-forest-dark'
                          : 'text-charcoal group-hover:text-forest-dark'
                      )}
                    >
                      <span className="block">{benefit.line1}</span>
                      <span className="block">{benefit.line2}</span>
                    </h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modern Interactive Wellness Insight Pill Bar */}
        <div className="mt-7 sm:mt-9 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3 rounded-[5px] bg-white/85 backdrop-blur-xs border border-beige shadow-soft-sm transition-all duration-300">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className="hidden sm:inline-flex w-7 h-7 rounded-[5px] bg-honey/20 text-honey-amber items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-honey" />
              </span>
              <p className="font-sans text-xs sm:text-[13.5px] text-charcoal/85 leading-relaxed">
                <strong className="text-forest-dark font-bold">
                  {activeBenefit.line1} {activeBenefit.line2}:
                </strong>{' '}
                {activeBenefit.highlight}
              </p>
            </div>

            {/* Interactive Progress Dots */}
            <div className="flex items-center gap-1.5 shrink-0" role="tablist" aria-label="Select honey benefit">
              {honeyBenefitsData.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  onClick={() => {
                    setIsPaused(true);
                    setActiveIndex(idx);
                  }}
                  aria-label={`${item.line1} ${item.line2}`}
                  aria-selected={activeIndex === idx}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    activeIndex === idx
                      ? 'w-5 bg-honey'
                      : 'w-1.5 bg-beige-dark hover:bg-honey/60'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
