'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';

const JOURNEY_GALLERY = [
  {
    id: 'golden-honey-jar',
    src: '/images/followourj/img1.png',
    alt: 'Pure golden Country Bee honey jar with dipper and honeycomb on rustic wood',
  },
  {
    id: 'foraging-bee',
    src: '/images/followourj/img2.png',
    alt: 'Honeybee foraging nectar on fresh white orchard blossoms',
  },
  {
    id: 'meadow-hives',
    src: '/images/followourj/img3.png',
    alt: 'Sunlit green meadow apiary wooden beehives surrounded by mountains',
  },
  {
    id: 'blossom-flight',
    src: '/images/followourj/img4.png',
    alt: 'Honeybee with pollen flying toward sunlit white spring flowers',
  },
] as const;

/**
 * Exact 4 Trust Icons matching Image 2 (Pan India Delivery, Secure Payments,
 * Dedicated Support, Sustainable & Ethical)
 */
const TrustFeatureIcon = ({
  type,
}: {
  type: 'delivery' | 'secure' | 'support' | 'sustainable';
}) => {
  switch (type) {
    case 'delivery':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-110"
          fill="none"
        >
          {/* Cargo box & cab filled in warm Honey Gold with crisp dark stroke */}
          <rect
            x="4"
            y="12"
            width="24"
            height="21"
            rx="2.5"
            fill="#F5B400"
            stroke="#29251F"
            strokeWidth="2.2"
          />
          <path
            d="M28 19H36.5L43 26.5V33H28V19Z"
            fill="#FFCA28"
            stroke="#29251F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M31.5 22.5H35.5L39 26.5H31.5V22.5Z"
            fill="#FFF7EA"
            stroke="#29251F"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="13.5" cy="34.5" r="4.5" fill="#FFF7EA" stroke="#29251F" strokeWidth="2.2" />
          <circle cx="13.5" cy="34.5" r="1.5" fill="#29251F" />
          <circle cx="35.5" cy="34.5" r="4.5" fill="#FFF7EA" stroke="#29251F" strokeWidth="2.2" />
          <circle cx="35.5" cy="34.5" r="1.5" fill="#29251F" />
        </svg>
      );

    case 'secure':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-110"
          fill="none"
        >
          <path
            d="M24 5.5C19 8.8 14 10.2 9.5 10.5V22.5C9.5 32.5 16 39.5 24 43C32 39.5 38.5 32.5 38.5 22.5V10.5C34 10.2 29 8.8 24 5.5Z"
            fill="#F5B400"
            stroke="#29251F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 24L22 28.5L30.8 19"
            stroke="#29251F"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'support':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-110"
          fill="none"
        >
          <path
            d="M9 26V23C9 14.7 15.7 8 24 8C32.3 8 39 14.7 39 23V26"
            stroke="#E59E00"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <rect
            x="6.5"
            y="23"
            width="6.5"
            height="12"
            rx="3.2"
            fill="#F5B400"
            stroke="#29251F"
            strokeWidth="2"
          />
          <rect
            x="35"
            y="23"
            width="6.5"
            height="12"
            rx="3.2"
            fill="#F5B400"
            stroke="#29251F"
            strokeWidth="2"
          />
          <path
            d="M38 35C37.5 39.5 33.5 41.5 27.5 41.5"
            stroke="#29251F"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect x="21.5" y="39" width="6" height="4.5" rx="2.2" fill="#F5B400" stroke="#29251F" strokeWidth="1.8" />
        </svg>
      );

    case 'sustainable':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-110"
          fill="none"
        >
          <path
            d="M38 9C22 9 11 16 10 29.5C10 36 14.5 40.5 21 39.5C35 37.5 39 23 38 9Z"
            fill="#F5B400"
            fillOpacity="0.22"
            stroke="#E59E00"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 39.5C16.5 29.5 24 23.5 34 16"
            stroke="#E59E00"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

export const CommunityNewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section
      aria-label="Newsletter, Community Journey & Service Guarantees"
      className="relative w-full bg-cream pt-4 pb-12 sm:pb-16 overflow-x-clip"
    >
      {/* Bottom-Right Decorative 3D Golden Honeycomb Cluster (100% unclipped & responsive) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 156 156"
        className="pointer-events-none absolute right-1 sm:right-3 lg:right-5 bottom-1 sm:bottom-2 w-14 xs:w-16 sm:w-24 lg:w-32 h-auto opacity-85 sm:opacity-95"
        fill="none"
      >
        <polygon
          points="72,8 104,26 104,62 72,80 40,62 40,26"
          fill="#FFCA28"
          stroke="#E59E00"
          strokeWidth="2"
        />
        <polygon
          points="108,64 140,82 140,118 108,136 76,118 76,82"
          fill="#F5B400"
          stroke="#D98A00"
          strokeWidth="2"
        />
        <polygon
          points="42,74 74,92 74,128 42,146 10,128 10,92"
          fill="#FED966"
          stroke="#E59E00"
          strokeWidth="2"
        />
      </svg>

      <div className="relative z-10 cb-container space-y-10 sm:space-y-12">
        {/* =================================================================
            1. STAY UPDATED NEWSLETTER PILL BANNER
            ================================================================= */}
        <div className="rounded-[22px] lg:rounded-full bg-gradient-to-r from-[#124220] via-[#0D3619] to-[#082812] border border-forest-light/80 shadow-forest px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-8">
            {/* Left Envelope Icon + Heading */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-honey/35 flex items-center justify-center shrink-0">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="#F5B400"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7"
                >
                  <rect x="5" y="10" width="38" height="28" rx="5" />
                  <path d="m7 13 17 13 17-13" />
                </svg>
              </div>
              <div>
                <h2 className="font-sans font-bold text-lg sm:text-xl text-white leading-snug">
                  Stay Updated with Country Bee
                </h2>
                <p className="font-sans text-xs sm:text-[13.5px] text-cream/85 mt-0.5">
                  Get new product updates, health tips and exclusive offers.
                </p>
              </div>
            </div>

            {/* Right Working Subscription Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3 w-full lg:w-auto lg:min-w-[460px] xl:min-w-[510px]"
            >
              <label htmlFor="cb-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="cb-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  subscribed
                    ? 'Thank you for subscribing to Country Bee!'
                    : 'Enter your email address'
                }
                className="flex-1 px-5 py-3 sm:py-3.5 rounded-full bg-white text-charcoal placeholder:text-charcoal/45 font-sans text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-honey"
              />

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#FFE066] via-honey-yellow to-honey hover:from-honey hover:to-honey-amber text-charcoal font-sans font-bold text-sm shadow-honey transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0 cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={2.8} />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* =================================================================
            2. FOLLOW OUR JOURNEY (4 Social Gallery Strip Cards)
            ================================================================= */}
        <div className="space-y-5 sm:space-y-6">
          <h3 className="text-center font-serif font-extrabold text-2xl sm:text-[28px] lg:text-[32px] text-forest-dark tracking-tight pb-6">
            Follow Our Journey
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 ">
            {JOURNEY_GALLERY.map((item) => (
              <a
                key={item.id}
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View on Instagram: ${item.alt}`}
                className="group relative aspect-[16/10] sm:aspect-[16/9] rounded-[14px] overflow-hidden border border-beige shadow-soft-sm block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-forest-dark/0 group-hover:bg-forest-dark/25 transition-colors duration-300"
                />
                {/* Top-Right Instagram Camera Outline */}
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-charcoal/35 backdrop-blur-sm text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                >
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  >
                    <rect x="6" y="6" width="36" height="36" rx="10" />
                    <circle cx="24" cy="24" r="8" />
                    <circle cx="35" cy="13" r="2.2" fill="currentColor" stroke="none" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* =================================================================
            3. BOTTOM 4 TRUST FEATURE ICONS STRIP
            ================================================================= */}
        <div className="pt-2 grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 lg:gap-0">
          {[
            { type: 'delivery' as const, line1: 'Pan India', line2: 'Delivery' },
            { type: 'secure' as const, line1: 'Secure', line2: 'Payments' },
            { type: 'support' as const, line1: 'Dedicated', line2: 'Support' },
            { type: 'sustainable' as const, line1: 'Sustainable', line2: '& Ethical' },
          ].map((badge, index) => (
            <div
              key={badge.type}
              className={`group flex items-center justify-center gap-3 px-3 ${
                index < 3 ? 'lg:border-r lg:border-beige-dark/60' : ''
              }`}
            >
              <TrustFeatureIcon type={badge.type} />
              <div className="font-sans font-bold text-xs sm:text-[13.5px] leading-[1.22] text-charcoal">
                <span className="block">{badge.line1}</span>
                <span className="block">{badge.line2}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
