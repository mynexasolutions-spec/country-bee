import React from 'react';
import Image from 'next/image';
import { ArrowRight, Tag } from 'lucide-react';

const WHATSAPP_NUMBER = '918825065419';

const BULK_HIGHLIGHTS = [
  {
    id: 'experience',
    title: '35+ Years',
    subtitle: 'of Experience',
  },
  {
    id: 'trusted',
    title: 'Trusted Quality',
    subtitle: '(Former vendor to Dabur India)',
  },
  {
    id: 'pure',
    title: '100% Pure & Raw',
    subtitle: 'No processing, no additives',
  },
  {
    id: 'businesses',
    title: 'For Businesses',
    subtitle: 'Retailers, wholesalers, exporters, manufacturers & hotels',
  },
] as const;

const HighlightIcon = ({ id }: { id: (typeof BULK_HIGHLIGHTS)[number]['id'] }) => {
  switch (id) {
    case 'experience':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-forest-dark"
        >
          <path d="M16 4.5C12.8 6.6 9.5 7.4 6.5 7.6V15.2C6.5 21.6 10.6 26.2 16 28.4C21.4 26.2 25.5 21.6 25.5 15.2V7.6C22.5 7.4 19.2 6.6 16 4.5Z" />
          <path d="M11.8 16.2L14.8 19.2L20.5 13.2" />
        </svg>
      );
    case 'trusted':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-forest-dark"
        >
          <path d="M16 3.5L19 5.8L22.8 5.4L24.5 8.8L28 10.8L27.2 14.5L28.8 18L26.2 20.8L25.8 24.6L22.2 25.6L19.5 28.4L16 27L12.5 28.4L9.8 25.6L6.2 24.6L5.8 20.8L3.2 18L4.8 14.5L4 10.8L7.5 8.8L9.2 5.4L13 5.8Z" />
          <path d="M12 16.2L14.8 19L20.2 13.4" strokeWidth="2.2" />
        </svg>
      );
    case 'pure':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-forest-dark"
        >
          <path d="M25.5 6.5C15 6.5 8 11 7.5 20.5C7.5 24.8 10.5 27.6 14.8 27C23.8 25.6 26.2 16 25.5 6.5Z" />
          <path d="M7.5 27C12 20.2 16.8 16 23.2 11" />
        </svg>
      );
    case 'businesses':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#925A14"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M16 4.5L26.5 10.2V21.8L16 27.5L5.5 21.8V10.2Z" />
          <path d="M5.5 10.2L16 16L26.5 10.2M16 16V27.5M10.8 7.3L21.2 13.1" />
        </svg>
      );
  }
};

const WhatsAppBadgeIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="w-6 h-6 text-white shrink-0">
    <path
      d="M16 3.5C9.1 3.5 3.5 8.9 3.5 15.6C3.5 18.1 4.3 20.4 5.6 22.3L3.9 28.5L10.3 26.8C12 27.7 14 28.2 16 28.2C22.9 28.2 28.5 22.8 28.5 16.1C28.5 8.9 22.9 3.5 16 3.5Z"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinejoin="round"
    />
    <path
      d="M12.3 10.8C11.9 10.8 11.4 11 11.1 11.4C10.5 12 10 13 10 14.3C10 15.9 11.2 17.5 12.7 19C14.3 20.5 16.2 21.5 17.9 21.7C19.3 21.8 20.4 21.3 21 20.6C21.4 20.2 21.6 19.6 21.6 19.2C21.6 18.8 21.3 18.5 20.9 18.3L18.9 17.4C18.5 17.2 18.1 17.3 17.8 17.6L17.1 18.4C16.8 18.7 16.4 18.8 16 18.6C15.1 18.2 13.8 17 13.3 16C13.1 15.6 13.2 15.2 13.5 14.9L14.2 14.2C14.5 13.9 14.6 13.5 14.4 13.1L13.5 11.2C13.3 10.9 12.9 10.8 12.3 10.8Z"
      fill="currentColor"
    />
  </svg>
);

export const BulkOrdersPageContent = () => {
  const bulkHoneyWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Country Bee! I would like to inquire about Bulk Honey Orders (5 kg / 10 kg / 30 kg buckets) pricing and availability.'
  )}`;

  const acvWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Country Bee! I would like to inquire about Bulk Pricing & Availability for Country Bee Apple Cider Vinegar.'
  )}`;

  return (
    <div className="relative w-full bg-cream text-charcoal overflow-x-clip">
      {/* =====================================================================
          1. HERO BANNER — Same Kashmir Valley Hero Section as About Us
          ===================================================================== */}
      <section
        aria-labelledby="bulk-hero-heading"
        className="relative w-full min-h-[210px] xs:min-h-[230px] sm:min-h-[245px] md:min-h-[260px] lg:min-h-[270px] xl:min-h-[290px] 2xl:min-h-[310px] flex items-center overflow-hidden bg-[#092D17]"
      >
        <Image
          src="/images/others/abouts_hero_section.png"
          alt="Kashmir valleys with Country Bee pure raw bulk honey and natural honeycomb"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[76%_52%] sm:object-[70%_52%] lg:object-center"
        />

        {/* Deep Forest Left Readability Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#072412]/90 via-[#092D17]/65 sm:via-[#092D17]/42 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#092D17]/45 to-transparent"
        />

        <div className="relative z-10 cb-container py-5 sm:py-7 lg:py-8">
          <div className="max-w-xl space-y-2.5 sm:space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="block font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.26em] text-cream/95">
              BULK ORDERS
            </span>

            <h1
              id="bulk-hero-heading"
              className="font-serif font-extrabold text-3xl xs:text-[38px] sm:text-[44px] lg:text-[50px] leading-[1.06] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
            >
              <span className="text-white">Bulk </span>
              <span className="text-honey">Honey</span>
              <span className="text-white"> Orders</span>
            </h1>

            {/* Delicate Golden Wavy Underline Accent */}
            <svg
              aria-hidden="true"
              viewBox="0 0 260 16"
              fill="none"
              className="w-40 sm:w-52 h-3 text-honey"
            >
              <path
                d="M2 10C48 2 102 15 156 8C198 2.5 232 6 258 9"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>

            <p className="font-sans text-xs xs:text-sm sm:text-[15px] lg:text-base text-cream/95 leading-relaxed max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              Pure, raw &amp; unprocessed honey in larger quantities for your business.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. MAIN TWO-COLUMN BULK HONEY ORDERS SECTION
          Left: 4 Credibility Highlights | Right: Details, Packaging/MOQ Box & WhatsApp CTA
          ===================================================================== */}
      <section aria-labelledby="bulk-details-heading" className="relative py-10 sm:py-14">
        {/* Decorative Right Margin Botanical Leaf Sprig */}
        <svg
          aria-hidden="true"
          viewBox="0 0 90 120"
          fill="none"
          className="hidden xl:block pointer-events-none absolute right-0 top-16 w-16 h-auto opacity-90"
        >
          <path d="M88 84C66 64 46 44 26 22" stroke="#5A7D2A" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M54 44C48 24 32 14 14 16C20 36 36 48 54 44Z" fill="#789B40" />
          <path d="M62 66C44 62 28 70 20 84C38 88 54 80 62 66Z" fill="#8EAE56" />
        </svg>

        <div className="cb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ----------------- LEFT COLUMN: 4 CREDIBILITY HIGHLIGHTS ----------------- */}
            <div className="lg:col-span-4 lg:border-r lg:border-beige-dark/60 lg:pr-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 divide-y divide-beige/90 sm:divide-y-0 sm:gap-4 lg:gap-0 lg:divide-y">
                {BULK_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-4 py-4 sm:p-4 sm:rounded-[12px] sm:bg-[#FFFDF8] sm:border sm:border-beige lg:p-0 lg:py-5 lg:bg-transparent lg:border-0 lg:rounded-none first:lg:pt-1"
                  >
                    <div className="w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-full bg-gradient-to-b from-[#FCE9A8] to-[#F7D774] border-2 border-[#FFF8E3] shadow-soft-sm flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <HighlightIcon id={item.id} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif font-extrabold text-lg sm:text-[19px] text-forest-dark leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-[13.5px] text-charcoal/80 leading-snug mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ----------------- RIGHT COLUMN: BULK DETAILS & PACKAGING BOX ----------------- */}
            <div className="lg:col-span-8 space-y-5">
              <h2
                id="bulk-details-heading"
                className="font-serif font-extrabold text-3xl sm:text-[36px] lg:text-[40px] leading-tight tracking-tight text-forest-dark"
              >
                Bulk Honey Orders – <span className="text-[#D48D15]">Country Bee</span>
              </h2>

              <div className="space-y-3 font-sans text-sm sm:text-[15.5px] text-charcoal/90 leading-relaxed">
                <p>
                  Looking for high-quality honey in larger quantities?{' '}
                  <strong className="text-forest-dark">Country Bee</strong> supplies pure, raw,
                  unprocessed honey in bulk to retailers, wholesalers, exporters, manufacturers, and
                  hotels.
                </p>
                <p>
                  All bulk orders are tested for <strong className="text-forest-dark">purity</strong>{' '}
                  and packed with care.
                </p>
              </div>

              {/* Warm Beige Split Packaging Options & MOQ Card */}
              <div className="rounded-[14px] bg-[#FAF0DC]/90 border border-beige-dark/60 p-4 sm:p-5 shadow-soft-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-beige-dark/70 gap-4 sm:gap-0">
                  {/* Packaging Options */}
                  <div className="flex items-start gap-3.5 sm:pr-5">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="#8C5A1E"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-10 h-10 shrink-0 mt-0.5"
                    >
                      <ellipse cx="20" cy="11" rx="11" ry="3.5" />
                      <path d="M9 11L11.5 31C11.8 33 15.5 34.5 20 34.5C24.5 34.5 28.2 33 28.5 31L31 11" />
                      <path d="M10.5 18.5C13 20 27 20 29.5 18.5" strokeWidth="1.6" />
                    </svg>
                    <div>
                      <h3 className="font-sans font-bold text-sm sm:text-[15px] text-forest-dark">
                        Packaging Options:
                      </h3>
                      <p className="mt-0.5 font-sans text-xs sm:text-[13.5px] text-charcoal/85 leading-relaxed">
                        5 kg, 10 kg, 30 kg buckets, or custom sizes.
                      </p>
                    </div>
                  </div>

                  {/* Minimum Order Quantity */}
                  <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:pl-5">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="#8C5A1E"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-10 h-10 shrink-0 mt-0.5"
                    >
                      <path d="M15 13V10.5C15 8 17.2 6 20 6C22.8 6 25 8 25 10.5V13" />
                      <path d="M11 13H29L32.5 31.5C32.7 32.8 31.7 34 30.4 34H9.6C8.3 34 7.3 32.8 7.5 31.5L11 13Z" />
                    </svg>
                    <div>
                      <h3 className="font-sans font-bold text-sm sm:text-[15px] text-forest-dark">
                        Minimum Order Quantity:
                      </h3>
                      <p className="mt-0.5 font-sans text-xs sm:text-[13.5px] text-charcoal/85 leading-relaxed">
                        <strong className="text-forest-dark">50 kg</strong> (negotiable for regular
                        clients)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitive Pricing Note */}
              <div className="flex items-center gap-2.5 font-sans text-xs sm:text-sm font-medium text-charcoal/90 pt-0.5">
                <Tag className="w-4 h-4 text-forest-dark shrink-0" />
                <span>Pricing is competitive and based on current market + quantity.</span>
              </div>

              {/* Working Deep Forest WhatsApp Inquiry Pill CTA */}
              <div className="pt-2">
                <a
                  href={bulkHoneyWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#134222] via-[#1B542E] to-[#0D3219] hover:from-[#0E331B] hover:to-[#134222] text-honey-yellow font-sans font-bold text-sm sm:text-[15.5px] shadow-forest hover:shadow-soft-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2"
                >
                  <WhatsAppBadgeIcon />
                  <span>Inquire for Bulk Pricing &amp; Availability</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-honey-yellow transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. APPLE CIDER VINEGAR BULK SHOWCASE CARD
          ===================================================================== */}
      <section aria-labelledby="acv-heading" className="pb-12 sm:pb-16">
        <div className="cb-container">
          <div className="group relative rounded-[5px] bg-gradient-to-r from-[#F9F3E5] via-[#FFFDF8] to-[#F5F1E4] border border-beige shadow-soft overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              {/* Left Sunlit Apple Cider Vinegar Visual */}
              <div className="md:col-span-5 relative w-full aspect-[3/2] md:aspect-auto md:self-stretch md:min-h-[350px] lg:min-h-[370px] overflow-hidden bg-[#F3E9D2]">
                <Image
                  src="/images/others/apple-cider-vinegar.png"
                  alt="Country Bee Raw Unfiltered Apple Cider Vinegar With Mother with fresh Kashmir red apples"
                  fill
                  sizes="(max-width: 767px) 100vw, 45vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Right Content Block */}
              <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 text-center flex flex-col items-center justify-center space-y-3.5 sm:space-y-4">
                <div className="inline-flex items-center gap-3">
                  <span className="w-8 sm:w-12 h-[1.5px] bg-honey/75" aria-hidden="true" />
                  <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-forest-dark/80">
                    COUNTRY BEE
                  </span>
                  <span className="w-8 sm:w-12 h-[1.5px] bg-honey/75" aria-hidden="true" />
                </div>

                <h2
                  id="acv-heading"
                  className="font-serif font-extrabold text-3xl xs:text-[34px] sm:text-[40px] lg:text-[44px] leading-tight tracking-tight text-forest-dark"
                >
                  Apple Cider Vinegar
                </h2>

                <p className="font-sans text-[12.5px] sm:text-[16px] text-charcoal/85 leading-relaxed max-w-md">
                  Click the WhatsApp chat button below to send us an inquiry about Apple Cider
                  Vinegar.
                </p>

                <div className="pt-2 w-full sm:w-auto">
                  <a
                    href={acvWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#134222] via-[#1B542E] to-[#0D3219] hover:from-[#0E331B] hover:to-[#134222] text-honey-yellow font-sans font-bold text-xs xs:text-sm sm:text-[15px] shadow-forest hover:shadow-soft-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2"
                  >
                    <WhatsAppBadgeIcon />
                    <span>Inquire for Bulk Pricing &amp; Availability</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-honey-yellow transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
