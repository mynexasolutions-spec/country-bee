import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { hivesToHomeData } from '@/data/processSteps';

/**
 * Mathematically symmetric flat-top rounded hexagon path inside viewBox "0 0 200 176"
 * Produces smooth quadratic-bezier rounded vertices and crisp uniform white stroke.
 */
const ROUNDED_HEX_PATH =
  'M 66,8 L 134,8 Q 148,8 155,21 L 185,75 Q 192,88 185,101 L 155,155 Q 148,168 134,168 L 66,168 Q 52,168 45,155 L 15,101 Q 8,88 15,75 L 45,21 Q 52,8 66,8 Z';

/**
 * Normalized (objectBoundingBox 0..1) equivalent of ROUNDED_HEX_PATH
 * so responsive Next.js <Image /> frames clip cleanly at any breakpoint.
 */
const ROUNDED_HEX_CLIP_PATH =
  'M 0.33,0.04545 L 0.67,0.04545 Q 0.74,0.04545 0.775,0.11932 L 0.925,0.42614 Q 0.96,0.5 0.925,0.57386 L 0.775,0.88068 Q 0.74,0.95455 0.67,0.95455 L 0.33,0.95455 Q 0.26,0.95455 0.225,0.88068 L 0.075,0.57386 Q 0.04,0.5 0.075,0.42614 L 0.225,0.11932 Q 0.26,0.04545 0.33,0.04545 Z';

const GoldenStepChevron = ({ className = '' }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    className={`w-4 h-4 xl:w-5 xl:h-5 text-honey-yellow shrink-0 ${className}`}
  >
    <path
      d="M9 5.5L15.5 12L9 18.5"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HivesToHomeSection = () => {
  return (
    <section
      id="process"
      aria-labelledby="hives-to-home-heading"
      className="relative w-full bg-cream py-4 sm:py-6 lg:py-8 overflow-hidden"
    >
      {/* =====================================================================
          MODERN FLUID S-WAVE TOP CAP (Decoupled height = zero mobile distortion)
          ===================================================================== */}
      <div className="relative w-full leading-none select-none pointer-events-none">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 84"
          preserveAspectRatio="none"
          className="block w-full h-7 xs:h-9 sm:h-12 md:h-14 lg:h-[68px] -mb-px"
        >
          <defs>
            <linearGradient id="cbTopHoneyRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5B400" stopOpacity="0" />
              <stop offset="25%" stopColor="#FFCA28" stopOpacity="0.55" />
              <stop offset="75%" stopColor="#F5B400" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F5B400" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,62 C260,6 540,10 830,48 C1090,82 1285,30 1440,12 L1440,84 L0,84 Z"
            fill="#0C351B"
          />
          <path
            d="M0,62 C260,6 540,10 830,48 C1090,82 1285,30 1440,12"
            fill="none"
            stroke="url(#cbTopHoneyRim)"
            strokeWidth="2.2"
          />
        </svg>
      </div>

      {/* =====================================================================
          MODERN DEEP-FOREST CORE WITH AMBIENT GLOW & HONEYCOMB MESH
          ===================================================================== */}
      <div className="relative w-full bg-[#0C351B] overflow-hidden">
        {/* Ambient Emerald & Golden Honey Studio Glows (fading cleanly inside bounds) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_24%_50%,rgba(33,107,58,0.52)_0%,transparent_70%),radial-gradient(ellipse_48%_65%_at_76%_48%,rgba(245,180,0,0.10)_0%,transparent_72%)]"
        />

        {/* Subtle Modern Honeycomb Geometric Watermark */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.055]"
        >
          <defs>
            <pattern
              id="cbModernHexMesh"
              width="56"
              height="96"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M28 0L56 16V48L28 64L0 48V16L28 0ZM28 64V96M0 48L-28 64M56 48L84 64"
                fill="none"
                stroke="#FFCA28"
                strokeWidth="1.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cbModernHexMesh)" />
        </svg>

        {/* Foreground Content */}
        <div className="relative z-10 cb-container py-7 sm:py-9 lg:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-10 lg:gap-8 xl:gap-10">
            {/* Left Story Column */}
            <div className="w-full lg:w-[32%] xl:w-[31%] text-center lg:text-left space-y-3.5 sm:space-y-4 shrink-0">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-white/10 border border-honey/30 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-honey-yellow">
                Pure Hive-to-Jar Journey
              </span>

              <h2
                id="hives-to-home-heading"
                className="font-serif font-extrabold text-[28px] xs:text-[32px] sm:text-[38px] xl:text-[42px] leading-[1.1] tracking-tight"
              >
                <span className="block text-white">{hivesToHomeData.headingLine1}</span>
                <span className="block mt-1">
                  <span className="text-white">{hivesToHomeData.headingLine2Prefix}</span>
                  <span className="text-honey">{hivesToHomeData.headingLine2Highlight}</span>
                </span>
              </h2>

              <p className="font-sans text-xs xs:text-sm sm:text-[15px] text-cream/90 leading-relaxed max-w-md mx-auto lg:mx-0">
                {hivesToHomeData.description}
              </p>

              <div className="pt-1">
                <Link
                  href={hivesToHomeData.ctaHref}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#FFE066] via-honey-yellow to-honey hover:from-honey-yellow hover:to-honey-amber text-charcoal font-sans font-bold text-xs sm:text-sm shadow-[0_6px_20px_rgba(245,180,0,0.32),inset_0_1px_1px_rgba(255,255,255,0.65)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest-dark"
                >
                  <span>{hivesToHomeData.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right 4 Rounded-Hexagon Journey Steps
                - Mobile (< sm): Symmetrical 2x2 grid
                - Tablet & Desktop (sm+): 4-column horizontal flow with golden '›' connectors */}
            <div className="w-full lg:flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 xs:gap-x-4 gap-y-6 sm:gap-x-3 lg:gap-x-2 xl:gap-x-3 items-start">
                {hivesToHomeData.steps.map((step, index) => {
                  const clipId = `cb-hex-clip-${step.id}`;
                  const isLast = index === hivesToHomeData.steps.length - 1;

                  return (
                    <div
                      key={step.id}
                      className="group relative flex flex-col items-center text-center"
                    >
                      {/* Hexagon Frame + Connector Row */}
                      <div className="relative w-full flex items-center justify-center">
                        <div className="relative aspect-[200/176] w-[124px] xs:w-[142px] sm:w-[132px] md:w-[148px] lg:w-[140px] xl:w-[158px] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03] drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]">
                          <div
                            className="relative w-full h-full overflow-hidden"
                            style={{ clipPath: `url(#${clipId})` }}
                          >
                            <Image
                              src={step.imageUrl}
                              alt={step.alt}
                              fill
                              sizes="(max-width: 474px) 124px, (max-width: 639px) 142px, (max-width: 767px) 132px, (max-width: 1023px) 148px, (max-width: 1279px) 140px, 158px"
                              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          </div>

                          <svg
                            viewBox="0 0 200 176"
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
                          >
                            <defs>
                              <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                                <path d={ROUNDED_HEX_CLIP_PATH} />
                              </clipPath>
                            </defs>

                            <path
                              d={ROUNDED_HEX_PATH}
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="4.5"
                              className="transition-colors duration-300 group-hover:stroke-honey-yellow"
                            />
                          </svg>

                          {/* Subtle Modern Step Number Pill */}
                          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-10 px-2 py-0.5 rounded-full bg-forest-dark/95 border border-honey/70 text-[9px] font-sans font-extrabold text-honey-yellow tracking-wider shadow-sm">
                            {step.stepNumber}
                          </span>
                        </div>

                        {/* Golden '›' Connector Between Steps */}
                        {!isLast && (
                          <span
                            className={`absolute -right-2.5 sm:-right-2 lg:-right-2 xl:-right-2.5 top-1/2 -translate-y-1/2 z-20 ${
                              index % 2 === 1 ? 'hidden sm:inline-flex' : 'inline-flex'
                            }`}
                          >
                            <GoldenStepChevron />
                          </span>
                        )}

                        {/* Trailing Golden '›' on Desktop */}
                        {isLast && (
                          <span className="hidden xl:inline-flex absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                            <GoldenStepChevron />
                          </span>
                        )}
                      </div>

                      {/* Step Title & Subtitle */}
                      <div className="mt-2.5 sm:mt-3 px-1 max-w-[155px]">
                        <h3 className="font-sans font-bold text-[14px] xs:text-[15px] sm:text-base text-white leading-snug group-hover:text-honey-yellow transition-colors">
                          {step.title}
                        </h3>
                        <p className="mt-0.5 sm:mt-1 font-sans text-[11.5px] sm:text-[12.5px] text-cream/85 leading-[1.4]">
                          {step.caption}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODERN FLUID S-WAVE BOTTOM CAP (Decoupled height = zero mobile distortion)
          ===================================================================== */}
      <div className="relative w-full leading-none select-none pointer-events-none">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 84"
          preserveAspectRatio="none"
          className="block w-full h-7 xs:h-9 sm:h-12 md:h-14 lg:h-[68px] -mt-px"
        >
          <defs>
            <linearGradient id="cbBottomHoneyRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5B400" stopOpacity="0" />
              <stop offset="30%" stopColor="#F5B400" stopOpacity="0.45" />
              <stop offset="75%" stopColor="#FFCA28" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F5B400" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 L1440,0 L1440,70 C1190,20 910,12 610,50 C340,84 145,56 0,18 Z"
            fill="#0C351B"
          />
          <path
            d="M1440,70 C1190,20 910,12 610,50 C340,84 145,56 0,18"
            fill="none"
            stroke="url(#cbBottomHoneyRim)"
            strokeWidth="2.2"
          />
        </svg>
      </div>
    </section>
  );
};
