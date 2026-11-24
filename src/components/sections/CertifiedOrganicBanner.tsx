'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, X, CheckCircle2, Sparkles } from 'lucide-react';

const ORGANIC_PROMISES = [
  'No pesticides or synthetic fertilizers',
  'No antibiotics or harmful chemicals',
  'Environmentally responsible beekeeping',
] as const;

export const CertifiedOrganicBanner = () => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  return (
    <section
      id="our-story"
      aria-labelledby="certified-organic-heading"
      className="relative w-full bg-cream py-10 sm:py-14 lg:py-16 overflow-hidden mt-[-40px]"
    >
      <div className="cb-container space-y-10 sm:space-y-12 lg:space-y-14">
        {/* =====================================================================
            1. CERTIFIED ORGANIC BANNER
            ===================================================================== */}
        <div className="relative">
          {/* Decorative Top-Right Botanical Leaf Sprig */}
          <svg
            aria-hidden="true"
            viewBox="0 0 110 110"
            fill="none"
            className="hidden sm:block pointer-events-none absolute -top-5 right-2 lg:right-3 z-20 w-16 lg:w-20 h-auto drop-shadow-sm"
          >
            <path
              d="M104 72C86 52 68 34 44 16"
              stroke="#5A7D2A"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path d="M68 34C58 14 38 6 18 10C26 30 46 40 68 34Z" fill="#8EAE56" />
            <path d="M84 54C96 36 106 20 104 4C86 10 76 30 84 54Z" fill="#789B40" />
            <path d="M76 58C56 54 42 66 38 84C58 86 72 74 76 58Z" fill="#638233" />
          </svg>

          {/* Main Rounded Deep-Forest Banner */}
          <div className="group relative w-full rounded-[5px] bg-[#103E1D] border border-forest-light/70 shadow-forest overflow-hidden">
            {/* Desktop & Tablet Horizontal Composite (md and above) */}
            <div className="hidden md:flex relative items-center min-h-[210px] lg:min-h-[232px]">
              {/* Left Macro Bee & White Blossom Photo melting seamlessly into #103E1D */}
              <div className="absolute inset-y-0 left-0 w-[47%] lg:w-[45%] pointer-events-none select-none overflow-hidden">
                <Image
                  src="/images/others/White_Flower.png"
                  alt="Honeybees gathering pure organic nectar from blooming white wildflowers"
                  fill
                  sizes="(max-width: 1280px) 48vw, 580px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Seamless Multi-Stop Right Edge Feather into #103E1D */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 right-0 w-[48%] bg-gradient-to-r from-transparent via-[#103E1D]/70 to-[#103E1D]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0B2E15]/35 via-transparent to-[#0B2E15]/20"
                />
              </div>

              {/* Subtle Ambient Right Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-[60%] bg-[radial-gradient(ellipse_at_70%_50%,rgba(120,155,64,0.16)_0%,transparent_70%)]"
              />

              {/* Foreground Grid */}
              <div className="relative z-10 w-full flex items-center justify-end pr-6 lg:pr-12 xl:pr-16 py-5 pl-[36%] lg:pl-[37%] gap-6 lg:gap-9 xl:gap-11">
                {/* Center Certified Organic Seal */}
                <div className="relative w-[130px] h-[130px] lg:w-[170px] lg:h-[170px] shrink-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.32)] transition-transform duration-500 ease-out group-hover:scale-105">
                  <Image
                    src="/images/others/Certified_Organic_Seal.png"
                    alt="Certified Organic Honey Seal"
                    fill
                    sizes="156px"
                    className="object-contain"
                  />
                </div>

                {/* Vertical White Divider Line */}
                <div
                  aria-hidden="true"
                  className="w-px h-28 lg:h-32 bg-white/30 shrink-0"
                />

                {/* Right Heading + 3 Checkmark Promises */}
                <div className="flex-1 max-w-md space-y-3">
                  <h2
                    id="certified-organic-heading"
                    className="font-serif font-bold text-[23px] lg:text-[28px] xl:text-[31px] leading-[1.16] tracking-tight text-white"
                  >
                    <span className="block">Certified Organic &amp;</span>
                    <span className="block">Naturally Pure</span>
                  </h2>

                  <ul className="space-y-1.5 pt-0.5">
                    {ORGANIC_PROMISES.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 font-sans text-xs lg:text-[14px] xl:text-[14.5px] font-medium text-cream/95"
                      >
                        <span
                          aria-hidden="true"
                          className="w-[18px] h-[18px] rounded-full bg-[#F7E9B8] text-forest-dark flex items-center justify-center shrink-0 shadow-xs"
                        >
                          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                            <path
                              d="M3.5 8.3L6.5 11.3L12.5 4.8"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile Responsive Layout (< md) */}
            <div className="md:hidden relative flex flex-col">
              {/* Top Bee & Blossom Photo Header */}
              <div className="relative w-full h-44 xs:h-52 overflow-hidden select-none pointer-events-none">
                <Image
                  src="/images/others/White_Flower.png"
                  alt="Honeybees gathering pure organic nectar from blooming white wildflowers"
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
                {/* Seamless Bottom Melt into #103E1D */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#103E1D]/75 to-[#103E1D]"
                />
              </div>

              {/* Overlapping Certified Organic Seal + Text Content */}
              <div className="relative z-10 px-5 pb-6 -mt-12 flex flex-col xs:flex-row xs:items-center gap-4">
                <div className="relative w-24 h-24 xs:w-28 xs:h-28 mx-auto xs:mx-0 shrink-0 drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/images/others/Certified_Organic_Seal.png"
                    alt="Certified Organic Honey Seal"
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 text-center xs:text-left space-y-2.5 xs:border-l xs:border-white/25 xs:pl-4">
                  <p
                    role="heading"
                    aria-level={2}
                    className="font-serif font-bold text-[21px] xs:text-[23px] leading-[1.15] text-white"
                  >
                    <span className="block">Certified Organic &amp;</span>
                    <span className="block">Naturally Pure</span>
                  </p>

                  <ul className="space-y-1.5 inline-block text-left">
                    {ORGANIC_PROMISES.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-sans text-xs xs:text-[13px] font-medium text-cream/95"
                      >
                        <span
                          aria-hidden="true"
                          className="w-4 h-4 rounded-full bg-[#F7E9B8] text-forest-dark flex items-center justify-center shrink-0"
                        >
                          <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5">
                            <path
                              d="M3.5 8.3L6.5 11.3L12.5 4.8"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            2. OUR STORY & ETHICAL BEEKEEPING SHOWCASE (Integrated)
            ===================================================================== */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-9 lg:gap-10 xl:gap-12">
          {/* Left: Sunlit Beekeeper Video Preview Card */}
          <div className="w-full md:w-[48%] lg:w-[45%] shrink-0">
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(true)}
              aria-label="Watch Country Bee ethical beekeeping story"
              className="group relative block w-full aspect-[1672/941] rounded-[5px] overflow-hidden shadow-soft-lg border border-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2 cursor-pointer"
            >
              <Image
                src="/images/others/Sunlit_.png"
                alt="Country Bee beekeeper gently inspecting a golden honeycomb frame in sunlit forest apiaries"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 48vw, 560px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle Warm Vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-75"
              />

              {/* Center Frosted Dark Play Button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-charcoal/60 group-hover:bg-forest-dark/85 backdrop-blur-xs border-2 border-white/85 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:scale-110">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current ml-1"
                  >
                    <path d="M7 5.2v13.6L18.2 12 7 5.2z" />
                  </svg>
                </span>
              </span>
            </button>
          </div>

          {/* Center: Story Content + CTA Button */}
          <div className="relative z-10 w-full md:flex-1 space-y-3.5 sm:space-y-4 text-left">
            <span className="block font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-charcoal/80">
              OUR STORY
            </span>

            <h3
              className="font-serif font-extrabold text-[28px] xs:text-[32px] sm:text-[36px] xl:text-[40px] leading-[1.12] tracking-tight text-forest-dark"
            >
              <span className="block">Care, Commitment</span>
              <span className="block">and Pure Honey</span>
            </h3>

            <p className="font-sans text-sm sm:text-[15px] text-charcoal/85 leading-[1.64] max-w-[440px]">
              We are passionate beekeepers dedicated to producing high-quality, natural honey. With
              a focus on bee health, sustainable practices, and minimal processing, we bring you
              honey in its purest and most natural form.
            </p>

            {/* CTA Row + Mobile Golden Bee Artwork */}
            <div className="pt-1.5 flex items-center justify-between gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#FFE066] via-honey-yellow to-honey hover:from-honey hover:to-honey-amber text-charcoal font-sans font-bold text-xs sm:text-sm shadow-honey hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 shrink-0"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Mobile Golden Bee & Blossoms Accent */}
              <div className="lg:hidden relative w-24 xs:w-28 sm:w-32 aspect-[1377/1142] shrink-0 pointer-events-none select-none">
                <Image
                  src="/images/others/Golde_bee_Blossoms.png"
                  alt=""
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right: Golden Bee & Blossoms Artwork (Desktop) */}
          <div className="hidden lg:block relative w-[220px] xl:w-[265px] aspect-[1377/1142] shrink-0 pointer-events-none select-none">
            <Image
              src="/images/others/Golde_bee_Blossoms.png"
              alt="Golden illustrated honeybee hovering above blooming wildflowers"
              fill
              sizes="265px"
              className="object-contain drop-shadow-[0_6px_16px_rgba(245,180,0,0.12)]"
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          INTERACTIVE APIARY STORY SHOWCASE MODAL
          ===================================================================== */}
      {isStoryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsStoryModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-cream-light rounded-[5px] border border-beige shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(false)}
              aria-label="Close story modal"
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-charcoal/70 hover:bg-forest-dark text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full aspect-[16/9] bg-forest-dark">
              <Image
                src="/images/others/Sunlit_.png"
                alt="Country Bee Apiary Story"
                fill
                sizes="(max-width: 640px) 100vw, 576px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/25 to-transparent flex flex-col justify-end p-5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-honey-yellow">
                  <Sparkles className="w-3.5 h-3.5" /> Ethical Forest Beekeeping
                </span>
                <h3
                  id="story-modal-title"
                  className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5"
                >
                  Crafted by Nature, Protected by Care
                </h3>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="font-sans text-xs sm:text-sm text-charcoal/85 leading-relaxed">
                Every jar of Country Bee honey begins in chemical-free wild meadows and forest
                groves. We never feed artificial sugar syrups to our colonies, never harvest unripe
                nectar, and never heat-pasteurize our honey—keeping every natural enzyme alive.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-forest-dark">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf shrink-0" />
                  <span>Cruelty-Free Bee Stewardship</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-leaf shrink-0" />
                  <span>Cold-Extracted &amp; Unblended</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-beige">
                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-charcoal/75 hover:bg-beige/60 transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/about"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-forest hover:bg-forest-dark text-white text-xs font-bold transition-colors"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-honey" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
