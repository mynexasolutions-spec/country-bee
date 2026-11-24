import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const Footer = () => {
  return (
    <footer className="relative w-full bg-cream text-white overflow-hidden">
      {/* =====================================================================
          UNIQUE ASYMMETRIC ORGANIC TOP WAVE SILHOUETTE
          Left crest rises up smoothly to cradle the Country Bee emblem,
          gliding across the center with Golden Honeycomb accents at top-right.
          ===================================================================== */}
      <div className="relative w-full leading-none select-none pointer-events-none">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 88"
          preserveAspectRatio="none"
          className="block w-full h-9 xs:h-11 sm:h-14 lg:h-[72px] -mb-px"
        >
          <path
            d="M0,16 C82,-6 175,4 258,36 C332,64 435,54 680,54 C965,54 1215,58 1440,34 L1440,88 L0,88 Z"
            fill="#0A3117"
          />
          <path
            d="M240,30 C330,62 455,50 710,50 C985,50 1225,54 1440,30"
            fill="none"
            stroke="#FFF7EA"
            strokeWidth="3"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* =====================================================================
          MAIN DEEP FOREST FOOTER BODY
          ===================================================================== */}
      <div className="relative w-full bg-gradient-to-b from-[#0A3117] to-[#072410] pt-4 sm:pt-6 pb-8 overflow-x-clip">
        {/* Top-Right Golden Honeycomb Hexagon Accent (100% unclipped & responsive) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 156 96"
          fill="none"
          className="pointer-events-none absolute top-2 right-2 sm:right-4 lg:right-6 w-16 xs:w-20 sm:w-28 lg:w-36 h-auto opacity-85 sm:opacity-95"
        >
          <polygon
            points="44,24 76,24 92,52 76,80 44,80 28,52"
            fill="#F5B400"
            stroke="#0A3117"
            strokeWidth="3"
          />
          <polygon
            points="92,8 124,8 140,36 124,64 92,64 76,36"
            fill="#FFCA28"
            stroke="#0A3117"
            strokeWidth="3"
          />
        </svg>

        <div className="relative z-10 cb-container">
          {/* 5-Column Responsive Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-8">
            {/* 1. Country Bee White & Gold Brand Mark + Tagline */}
            <div className="sm:col-span-2 lg:col-span-3 space-y-3.5">
              <Link
                href="/"
                aria-label="Country Bee Home"
                className="inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded-lg"
              >
                {/* Golden Bee Emblem */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 56 52"
                  className="w-11 h-11 shrink-0 transition-transform duration-300 group-hover:scale-105"
                  fill="none"
                >
                  <ellipse
                    cx="20"
                    cy="16"
                    rx="11"
                    ry="6"
                    transform="rotate(-28 20 16)"
                    fill="#FFF7EA"
                    stroke="#F5B400"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="33"
                    cy="15"
                    rx="10"
                    ry="5.5"
                    transform="rotate(24 33 15)"
                    fill="#FFF7EA"
                    stroke="#F5B400"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="27"
                    cy="30"
                    rx="13"
                    ry="9.5"
                    transform="rotate(-18 27 30)"
                    fill="#F5B400"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M21 24L25 37M27 22L31 35"
                    stroke="#092D17"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  <circle cx="15" cy="33" r="4.5" fill="#FFCA28" />
                </svg>

                <div className="leading-none">
                  <span className="block font-serif italic font-extrabold text-[27px] sm:text-[30px] text-white tracking-tight">
                    Country
                  </span>
                  <span className="block font-serif italic font-extrabold text-[25px] sm:text-[28px] text-honey-yellow pl-5 -mt-1">
                    Bee
                  </span>
                </div>
              </Link>

              <p className="font-sans text-xs sm:text-[13.5px] text-cream/85 leading-relaxed max-w-[230px]">
                Pure, natural and organic honey, straight from our hives to your home.
              </p>
            </div>

            {/* 2. Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-sans font-bold text-sm sm:text-[15px] text-white tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-1.5 font-sans text-xs sm:text-[13.5px] text-cream/80">
                <li>
                  <Link href="/" className="hover:text-honey-yellow transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-honey-yellow transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-honey-yellow transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className="hover:text-honey-yellow transition-colors">
                    Our Process
                  </Link>
                </li>
                <li>
                  <Link href="/#benefits" className="hover:text-honey-yellow transition-colors">
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link href="/bulk-orders" className="hover:text-honey-yellow transition-colors">
                    Bulk Orders
                  </Link>
                </li>
                <li>
                  <Link href="/recipes" className="hover:text-honey-yellow transition-colors">
                    Recipes
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. Help */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-sans font-bold text-sm sm:text-[15px] text-white tracking-wide">
                Help
              </h3>
              <ul className="space-y-1.5 font-sans text-xs sm:text-[13.5px] text-cream/80">
                <li>
                  <Link href="/contact" className="hover:text-honey-yellow transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-honey-yellow transition-colors">
                    Shipping &amp; Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-honey-yellow transition-colors">
                    Returns &amp; Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-honey-yellow transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-honey-yellow transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* 4. Get in Touch */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-sans font-bold text-sm sm:text-[15px] text-white tracking-wide">
                Get in Touch
              </h3>
              <ul className="space-y-2.5 font-sans text-xs sm:text-[13.5px] text-cream/85">
                <li>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2.5 hover:text-honey-yellow transition-colors"
                  >
                    <Phone className="w-4 h-4 text-white/90 shrink-0" />
                    <span>+91 98765 43210</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@countrybee.in"
                    className="inline-flex items-center gap-2.5 hover:text-honey-yellow transition-colors"
                  >
                    <Mail className="w-4 h-4 text-white/90 shrink-0" />
                    <span>support@countrybee.in</span>
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-white/90 shrink-0" />
                  <span>India</span>
                </li>
              </ul>
            </div>

            {/* 5. Follow Us */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-sans font-bold text-sm sm:text-[15px] text-white tracking-wide">
                Follow Us
              </h3>
              <div className="flex items-center gap-3.5 pt-0.5">
                {/* Instagram */}
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Country Bee on Instagram"
                  className="text-white hover:text-honey-yellow transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded-lg"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <rect x="6" y="6" width="36" height="36" rx="10" />
                    <circle cx="24" cy="24" r="8" />
                    <circle cx="35" cy="13" r="2.2" fill="currentColor" stroke="none" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Country Bee on Facebook"
                  className="text-white hover:text-honey-yellow transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded-lg"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M27.5 43V25.5h6.2l1-7.2h-7.2v-4.4c0-2.1.7-3.6 3.7-3.6H35V3.8c-.7-.1-3-.3-5.7-.3-5.6 0-9.5 3.4-9.5 9.7v5.1H13.5v7.2h6.3V43h7.7Z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Country Bee on YouTube"
                  className="text-white hover:text-honey-yellow transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded-lg"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M43.2 14.8a5.4 5.4 0 0 0-3.8-3.8C36 10 24 10 24 10s-12 0-15.4 1a5.4 5.4 0 0 0-3.8 3.8C4 18.2 4 24 4 24s0 5.8.8 9.2a5.4 5.4 0 0 0 3.8 3.8C12 38 24 38 24 38s12 0 15.4-1a5.4 5.4 0 0 0 3.8-3.8C44 29.8 44 24 44 24s0-5.8-.8-9.2ZM20 30V18l10.5 6L20 30Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Subtle Bottom Bar */}
          <div className="pt-5 border-t border-white/100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white font-sans ">
            <p className='text-white'>© {new Date().getFullYear()} Country Bee. All rights reserved.</p>
            <p className='text-white'>100% Pure, Raw &amp; Sustainably Harvested in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
