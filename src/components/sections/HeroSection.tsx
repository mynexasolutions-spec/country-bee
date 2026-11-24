import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { heroData, type HeroFeature } from '@/data/hero';

const FeatureIcon = ({
  id,
  className = 'w-4 h-4 sm:w-5 sm:h-5 text-forest',
}: {
  id: HeroFeature['id'];
  className?: string;
}) => {
  switch (id) {
    case 'natural':
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M38 9C22 9 11 15 10 29c0 6.5 4.5 11 11 10 14-2 18-16 17-30Z" />
          <path d="M10 39c6.5-10 14-15.5 24-23" />
        </svg>
      );
    case 'no-chemicals':
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8h12M21 8v11L11.5 36.5a3.8 3.8 0 0 0 3.4 5.5h18.2a3.8 3.8 0 0 0 3.4-5.5L27 19V8" />
          <path d="M15.5 32h17" />
          <path d="m21.5 26 5 5m0-5-5 5" strokeWidth="2.2" className="text-leaf-dark" />
        </svg>
      );
    case 'nutrients':
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M24 39.5s-14-8.8-14-19.2A8.3 8.3 0 0 1 24 14.5a8.3 8.3 0 0 1 14 5.8c0 10.4-14 19.2-14 19.2Z" />
          <path d="m19.5 24.5 3.2 3.2 6.3-6.4" className="text-leaf-dark" />
        </svg>
      );
    case 'sustainable':
      return (
        <svg
          className={className.includes('text-') ? className : `${className} text-honey-amber`}
          viewBox="0 0 48 48"
          fill="currentColor"
          stroke="#123D20"
          strokeWidth="2"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m24 8 7 4v8l-7 4-7-4v-8Z" fillOpacity="0.35" />
          <path d="m17 20 7 4v8l-7 4-7-4v-8Z" fillOpacity="0.35" />
          <path d="m31 20 7 4v8l-7 4-7-4v-8Z" fillOpacity="0.35" />
          <path
            d="M14 38c3 2.5 7 3.5 10 3.5s7-1 10-3.5"
            fill="none"
            stroke="#638233"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

export const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-[#FAF5EC] border-b border-beige/60"
    >
      <div className="relative max-w-[1600px] mx-auto">
        {/* =====================================================================
            1. DESKTOP & TABLET HERO (md and above)
            Full-bleed background: /images/hero/Golden_Honey_dextop.png
            ===================================================================== */}
        <div className="hidden md:block relative w-full min-h-[560px] lg:h-[calc(100vh-114px)] lg:min-h-[600px] lg:max-h-[700px] overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full min-w-[1060px] aspect-[1668/943] pointer-events-none select-none">
            <Image
              src="/images/hero/Golden_Honey_dextop.png"
              alt="Pure golden Country Bee forest honey dripping from a wooden honey dipper into a glass jar surrounded by blossoms"
              fill
              priority
              quality={95}
              sizes="(min-width: 1600px) 1600px, 100vw"
              className="object-cover object-center"
            />

            {/* Country Bee Jar Label locked to desktop jar coordinates */}
            <div
              aria-hidden="true"
              className="absolute left-[74.2%] top-[64.5%] -translate-x-1/2 -translate-y-1/2 w-[16%] max-w-[210px] aspect-[2/1.5] rounded-full bg-gradient-to-br from-[#FFF9EA] via-[#FDF3DE] to-[#F5DFB2] shadow-[0_6px_22px_rgba(41,37,31,0.28),0_0_0_1.5px_rgba(232,198,130,0.85),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center p-2.5 z-20 pointer-events-none"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/country-bee-logo.png"
                  alt="Country Bee Pure Honey"
                  fill
                  sizes="210px"
                  priority
                  className="object-contain drop-shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Left Readability Veil for mid-sized screens */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[62%] lg:w-[50%] bg-gradient-to-r from-[#FAF5EC] via-[#FAF5EC]/85 lg:via-[#FAF5EC]/40 to-transparent pointer-events-none"
          />

          {/* Decorative Bottom-Left Botanical Sprig */}
          <svg
            aria-hidden="true"
            viewBox="0 0 120 140"
            className="hidden lg:block absolute -left-3 bottom-6 w-24 h-28 text-leaf pointer-events-none opacity-90"
            fill="none"
          >
            <path
              d="M2 120C24 98 46 86 76 80"
              stroke="#5A7D2A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M18 96C12 72 24 52 46 46C48 68 38 88 18 96Z"
              fill="#789B40"
              fillOpacity="0.88"
            />
            <path
              d="M38 88C48 66 70 58 92 64C78 82 58 92 38 88Z"
              fill="#638233"
              fillOpacity="0.9"
            />
            <path
              d="M28 106C46 102 64 110 74 126C54 128 36 120 28 106Z"
              fill="#8EAE56"
              fillOpacity="0.85"
            />
          </svg>

          {/* Desktop Left Content Column */}
          <div className="relative z-10 h-full cb-container flex items-center">
            <div className="w-full max-w-[540px] lg:max-w-[560px] py-10 lg:py-12 space-y-5 lg:space-y-6">
              <div>
                <span className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-[#F3EAD8]/95 border border-[#E2D4BC] shadow-soft-sm text-[11px] lg:text-xs font-sans font-bold uppercase tracking-[0.18em] text-forest-dark">
                  {heroData.badgeItems.map((item, idx) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      {idx < heroData.badgeItems.length - 1 && (
                        <span className="text-forest/70 text-[10px]" aria-hidden="true">
                          •
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </span>
              </div>

              <div className="space-y-1">
                <h1
                  id="hero-heading"
                  className="font-serif font-extrabold text-[46px] lg:text-[60px] xl:text-[66px] leading-[1.05] tracking-[-0.02em]"
                >
                  <span className="block text-charcoal">{heroData.headingLine1}</span>
                  <span className="block mt-0.5">
                    <span className="text-forest-dark">{heroData.headingLine2Prefix}</span>
                    <span className="relative inline-block text-leaf-dark">
                      {heroData.headingLine2Highlight}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 240 26"
                        fill="none"
                        className="absolute -bottom-3 left-0 w-[105%] h-4 lg:h-5 text-honey pointer-events-none"
                      >
                        <path
                          d="M6 14.5C58 5.5 148 5.5 234 21.5C168 13.5 76 12.5 12 19.5C7 20 3.5 15 6 14.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </span>
                </h1>
              </div>

              <p className="font-sans text-base lg:text-[18px] text-charcoal/90 leading-[1.58] max-w-[395px] pt-1">
                {heroData.description}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 lg:gap-4 pt-1">
                <Link
                  href={heroData.primaryCta.href}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 lg:px-7 py-3.5 rounded-full bg-gradient-to-b from-honey-yellow to-honey hover:from-honey hover:to-honey-amber text-charcoal font-sans font-bold text-sm lg:text-[15px] shadow-honey hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
                >
                  <svg
                    className="w-[18px] h-[18px] text-charcoal shrink-0"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 9h5l4 21h21l5-15H12" />
                    <circle cx="18" cy="39" r="2.8" />
                    <circle cx="33" cy="39" r="2.8" />
                  </svg>
                  <span>{heroData.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href={heroData.secondaryCta.href}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FFFBF4]/90 hover:bg-white border-[1.5px] border-charcoal/75 hover:border-forest text-charcoal font-sans font-bold text-sm lg:text-[15px] shadow-soft-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2"
                >
                  <span className="w-5 h-5 rounded-full border-[1.8px] border-current flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                    <svg
                      className="w-2.5 h-2.5 ml-0.5 fill-current"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
                    </svg>
                  </span>
                  <span>{heroData.secondaryCta.label}</span>
                </Link>
              </div>

              <div className="pt-3 lg:pt-5 flex items-center gap-5 lg:gap-7 ">
                {heroData.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-2.5 group pl-2 pr-8 py-1.5 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-[#E6D7BE] shadow-2xs max-w-full">
                    <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#FFFDF9]/100 border border-leaf/45 ring-2 ring-leaf/10 shadow-soft-sm flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                      <FeatureIcon id={feature.id} />
                    </div>
                    <div className="font-sans text-[12.5px] sm:text-[14px] font-semibold leading-[1.25] text-charcoal">
                      <span className="block">{feature.line1}</span>
                      <span className="block">{feature.line2}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            2. MOBILE HERO (< md) — COMPACT, RESPONSIVE, BACKGROUND ARTWORK
            Uses /images/hero/Golden_Honey_mobile.png directly as the background
            with clean typography, compact buttons, fully visible background artwork,
            no artificial overlay logo, and sleek horizontal trust badges.
            ===================================================================== */}
        <div className="md:hidden relative w-full min-h-[430px] xs:min-h-[460px] sm:min-h-[490px] py-6 xs:py-7 flex flex-col justify-center overflow-hidden">
          {/* Full-Bleed Mobile Background Artwork Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <Image
              src="/images/hero/Golden_Honey_mobile.png"
              alt="Pure Country Bee natural forest honey"
              fill
              priority
              quality={95}
              sizes="100vw"
              className="object-cover object-[78%_center] xs:object-[82%_center]"
            />

            {/* Subtle soft gradient on the left so typography is crisp while the right honey artwork glows */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#FAF5EC]/95 via-[#FAF5EC]/65 via-50% to-transparent pointer-events-none"
            />
          </div>

          {/* Mobile Content Overlay */}
          <div className="relative z-10 cb-container space-y-3">
            {/* Pill Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EDE0]/95 backdrop-blur-md border border-[#DFD0B8] shadow-2xs text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-forest-dark">
                {heroData.badgeItems.map((item, idx) => (
                  <React.Fragment key={item}>
                    <span>{item}</span>
                    {idx < heroData.badgeItems.length - 1 && (
                      <span className="text-forest/70 text-[9px]" aria-hidden="true">
                        •
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </span>
            </div>

            {/* Mobile Serif Display Heading */}
            <div>
              <p
                role="heading"
                aria-level={2}
                className="font-serif font-extrabold text-[32px] xs:text-[36px] sm:text-[40px] leading-[1.08] tracking-[-0.02em] drop-shadow-[0_1px_1px_rgba(255,250,240,0.85)]"
              >
                <span className="block text-charcoal">{heroData.headingLine1}</span>
                <span className="block mt-0.5">
                  <span className="text-forest-dark">{heroData.headingLine2Prefix}</span>
                  <span className="relative inline-block text-leaf-dark">
                    {heroData.headingLine2Highlight}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 240 26"
                      fill="none"
                      className="absolute -bottom-2 left-0 w-[104%] h-3 text-honey pointer-events-none"
                    >
                      <path
                        d="M6 14.5C58 5.5 148 5.5 234 21.5C168 13.5 76 12.5 12 19.5C7 20 3.5 15 6 14.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </span>
              </p>
            </div>

            {/* Mobile Description */}
            <p className="font-sans text-[14px] sm:text-[16px] font-medium text-charcoal/90 leading-[1.45] max-w-[270px] xs:max-w-[310px]">
              {heroData.description}
            </p>

            {/* Modern Compact Side-by-Side Pill CTAs */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Link
                href={heroData.primaryCta.href}
                className="group inline-flex items-center justify-center gap-1.5 px-4 xs:px-5 py-2.5 rounded-full bg-gradient-to-b from-honey-yellow to-honey active:from-honey active:to-honey-amber text-charcoal font-sans font-bold text-xs xs:text-[13px] shadow-honey transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <svg
                  className="w-3.5 h-3.5 text-charcoal shrink-0"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 9h5l4 21h21l5-15H12" />
                  <circle cx="18" cy="39" r="2.8" />
                  <circle cx="33" cy="39" r="2.8" />
                </svg>
                <span>{heroData.primaryCta.label}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href={heroData.secondaryCta.href}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 xs:px-4 py-2.5 rounded-full bg-[#FFFDF8]/90 backdrop-blur-md border border-charcoal/60 text-charcoal font-sans font-bold text-xs xs:text-[13px] shadow-2xs transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              >
                <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-current flex items-center justify-center shrink-0">
                  <svg
                    className="w-2 h-2 ml-0.5 fill-current"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
                  </svg>
                </span>
                <span>{heroData.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Mobile Sleek Trust Badges Row */}
            <div className="pt-3 flex items-center gap-2 flex-wrap pb-1">
              {heroData.features.map((feature) => (
                <div
                  key={feature.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-[#E6D7BE] shrink-0 shadow-2xs"
                >
                  <div className="w-5 h-5 rounded-full bg-cream border border-leaf/40 flex items-center justify-center shrink-0">
                    <FeatureIcon id={feature.id} className="w-3 h-3" />
                  </div>
                  <span className="font-sans text-[13px] font-bold text-charcoal/90 whitespace-nowrap">
                    {feature.line1} {feature.line2}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Organic Cream Bottom Wave Transition */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 36"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-4 sm:h-6 text-cream fill-current pointer-events-none z-20"
      >
        <path d="M0 24C280 38 560 4 880 18C1140 30 1320 14 1440 8V36H0V24Z" />
      </svg>
    </section>
  );
};
