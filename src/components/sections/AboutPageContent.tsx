"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  aboutPageData,
  type WhyChooseItem,
  type OrganicBenefitItem,
} from "@/data/about";
import { cn } from "@/lib/utils";

/* ============================================================================
   REUSABLE SCROLL REVEAL WRAPPER (Smooth Staggered Entrance Animations)
   ============================================================================ */
const RevealBlock = ({
  children,
  className = "",
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

/* ============================================================================
   EXACT CUSTOM ICONS FOR "WHY CHOOSE US" CARDS
   ============================================================================ */
const WhyChooseIcon = ({ id }: { id: WhyChooseItem["id"] }) => {
  switch (id) {
    case "purity":
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
    case "experience":
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
          <rect x="5.5" y="7.5" width="21" height="19" rx="2.5" />
          <path d="M5.5 13H26.5M11 4.5V9M21 4.5V9" />
          <path d="M10.5 17.5H12.5M15 17.5H17M19.5 17.5H21.5M10.5 22H12.5M15 22H17" />
        </svg>
      );
    case "kashmir":
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
          <path d="M3.5 24.5L11.5 10.5L17.5 20.5L21.5 14L28.5 24.5" />
          <path d="M9.5 14L11.8 16L13.8 14.5" strokeWidth="1.7" />
          <path d="M19.8 16.8L21.6 18.2L23.4 16.8" strokeWidth="1.7" />
        </svg>
      );
  }
};

/* ============================================================================
   EXACT CUSTOM ICONS FOR THE 5-ITEM ORGANIC BENEFITS STRIP
   ============================================================================ */
const StripBenefitIcon = ({ id }: { id: OrganicBenefitItem["id"] }) => {
  const cls =
    "w-8 h-8 sm:w-9 sm:h-9 mx-auto transition-transform duration-300 group-hover:scale-110";

  switch (id) {
    case "antioxidants":
      return (
        <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className={cls}>
          <path
            d="M20 5.5C16 8 12 9 8.5 9.2V19C8.5 26.8 13.5 32.2 20 34.8C26.5 32.2 31.5 26.8 31.5 19V9.2C28 9 24 8 20 5.5Z"
            stroke="#29251F"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M20 14.5V24.5M15 19.5H25"
            stroke="#D99800"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "taste":
      return (
        <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className={cls}>
          <path
            d="M25.5 14.5L33 7"
            stroke="#8C6239"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect
            x="14.5"
            y="14"
            width="10"
            height="12"
            rx="4.5"
            transform="rotate(45 19.5 20)"
            fill="#F5B400"
            stroke="#8C6239"
            strokeWidth="1.8"
          />
          <path
            d="M16 17L23 24M18.5 14.5L25.5 21.5"
            stroke="#8C6239"
            strokeWidth="1.5"
          />
          <path
            d="M12.5 29.5C12.5 31.8 10.8 33.5 10.8 33.5C10.8 33.5 9 31.8 9 29.5C9 28 10.8 26 10.8 26C10.8 26 12.5 28 12.5 29.5Z"
            fill="#F5B400"
            stroke="#D99800"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "immunity":
      return (
        <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className={cls}>
          <path
            d="M20 5.5C16 8 12 9 8.5 9.2V19C8.5 26.8 13.5 32.2 20 34.8C26.5 32.2 31.5 26.8 31.5 19V9.2C28 9 24 8 20 5.5Z"
            stroke="#D99800"
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="#F5B400"
            fillOpacity="0.12"
          />
          <path
            d="M14.8 20L18.5 23.6L25.8 16"
            stroke="#D99800"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "family":
      return (
        <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className={cls}>
          <circle
            cx="20"
            cy="13.5"
            r="4.2"
            stroke="#D99800"
            strokeWidth="2.1"
          />
          <circle cx="11" cy="17" r="3" stroke="#D99800" strokeWidth="1.9" />
          <circle cx="29" cy="17" r="3" stroke="#D99800" strokeWidth="1.9" />
          <path
            d="M13 31.5V27C13 23.8 16 21.5 20 21.5C24 21.5 27 23.8 27 27V31.5"
            stroke="#D99800"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M6.5 30.5V27.5C6.5 25.2 8.4 23.5 11 23.5M33.5 30.5V27.5C33.5 25.2 31.6 23.5 29 23.5"
            stroke="#D99800"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      );
    case "eco":
      return (
        <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className={cls}>
          <path
            d="M31.5 8.5C18.5 8.5 10 14 9.5 25C9.5 30.2 13 33.8 18.2 33C29.5 31.2 32.5 19.5 31.5 8.5Z"
            stroke="#D99800"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#F5B400"
            fillOpacity="0.12"
          />
          <path
            d="M9.5 33C14.8 25 20.5 20 28.5 14"
            stroke="#D99800"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

const GreenCheckBadge = () => (
  <span
    aria-hidden="true"
    className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full bg-[#2E6B30] text-white inline-flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
  >
    <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5">
      <path
        d="M3.5 8.3L6.6 11.4L12.6 4.8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const WhatsAppSvg = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M16 3C8.8 3 3 8.6 3 15.6C3 18.2 3.8 20.6 5.2 22.6L3.4 29L10.1 27.2C11.9 28.2 13.9 28.7 16 28.7C23.2 28.7 29 23.1 29 16.1C29 8.6 23.2 3 16 3Z"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M12.3 10.7C11.9 10.7 11.4 10.9 11.1 11.3C10.5 11.9 10 12.9 10 14.3C10 15.9 11.2 17.5 12.7 19C14.3 20.5 16.2 21.5 17.9 21.7C19.3 21.8 20.4 21.3 21 20.6C21.4 20.2 21.6 19.6 21.6 19.2C21.6 18.8 21.3 18.5 20.9 18.3L18.9 17.4C18.5 17.2 18.1 17.3 17.8 17.6L17.1 18.4C16.8 18.7 16.4 18.8 16 18.6C15.1 18.2 13.8 17 13.3 16C13.1 15.6 13.2 15.2 13.5 14.9L14.2 14.2C14.5 13.9 14.6 13.5 14.4 13.1L13.5 11.2C13.3 10.9 12.9 10.7 12.3 10.7Z"
      fill="currentColor"
    />
  </svg>
);

export const AboutPageContent = () => {
  const whatsappUrl = `https://wa.me/${aboutPageData.whatsapp.phone}?text=${encodeURIComponent(
    aboutPageData.whatsapp.message,
  )}`;

  return (
    <div className="w-full bg-cream text-charcoal overflow-hidden">
      {/* =====================================================================
          1. HERO BANNER — Scenic Kashmir Valley & Country Bee Honey Jar
          ===================================================================== */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative w-full min-h-[210px] xs:min-h-[230px] sm:min-h-[245px] md:min-h-[260px] lg:min-h-[270px] xl:min-h-[290px] 2xl:min-h-[310px] flex items-center overflow-hidden bg-[#092D17]"
      >
        <Image
          src={aboutPageData.hero.imageUrl}
          alt="Snow-capped valleys of Kashmir with pure golden Country Bee honey jar and honeycomb"
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
          <div className="max-w-lg space-y-2.5 sm:space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Eyebrow + Golden Hairline */}
            <div className="inline-flex items-center gap-3">
              <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.26em] text-honey-light">
                {aboutPageData.hero.eyebrow}
              </span>
              <span
                className="w-12 sm:w-16 h-[1.5px] bg-honey/80"
                aria-hidden="true"
              />
            </div>

            <h1
              id="about-hero-heading"
              className="font-serif font-extrabold text-3xl xs:text-[36px] sm:text-[42px] lg:text-[48px] leading-[1.06] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
            >
              <span className="block">{aboutPageData.hero.titleLine1}</span>
              <span className="block">{aboutPageData.hero.titleLine2}</span>
            </h1>

            <p className="font-sans text-xs xs:text-sm sm:text-[15px] lg:text-base text-cream/95 leading-relaxed max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              {aboutPageData.hero.subtitle}
            </p>
          </div>
        </div>

        {/* Gentle Organic Cream Bottom Wave */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-5 sm:h-7 text-cream fill-current pointer-events-none z-20"
        >
          <path d="M0,18 C340,-4 680,44 1060,24 C1240,14 1360,20 1440,28 L1440,44 L0,44 Z" />
        </svg>
      </section>

      {/* =====================================================================
          2. WHY CHOOSE US — 3 Floating-Icon Heritage Cards
          ===================================================================== */}
      <section
        aria-labelledby="why-choose-heading"
        className="py-10 sm:py-14 lg:py-16"
      >
        <div className="cb-container">
          <RevealBlock className="flex items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14">
            <span
              className="hidden xs:block w-10 sm:w-20 h-px bg-honey/60"
              aria-hidden="true"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 40 24"
              className="w-6 sm:w-8 h-auto shrink-0"
              fill="none"
            >
              <path d="M2 8C14 3 26 6 34 15C24 20 10 17 2 8Z" fill="#789B40" />
            </svg>

            <h2
              id="why-choose-heading"
              className="font-serif font-extrabold text-[26px] xs:text-[30px] sm:text-[36px] lg:text-[40px] tracking-tight text-forest-dark text-center"
            >
              Why <span className="text-[#D48D15]">Choose Us</span>
            </h2>

            <svg
              aria-hidden="true"
              viewBox="0 0 40 24"
              className="w-6 sm:w-8 h-auto shrink-0"
              fill="none"
            >
              <path d="M38 8C26 3 14 6 6 15C16 20 30 17 38 8Z" fill="#789B40" />
            </svg>
            <span
              className="hidden xs:block w-10 sm:w-20 h-px bg-honey/60"
              aria-hidden="true"
            />
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-7">
            {aboutPageData.whyChooseUs.map((card, index) => (
              <RevealBlock
                key={card.id}
                delayMs={index * 100}
                className="h-full"
              >
                <article className="group relative h-full rounded-[5px] bg-[#FFFDF8] border border-beige/95 hover:border-honey/80 pt-10 pb-6 px-5 sm:px-6 text-center shadow-soft hover:shadow-[0_16px_32px_-8px_rgba(18,61,32,0.14)] transition-all duration-400 hover:-translate-y-1.5">
                  {/* Floating Circular Honey-Gold Icon Badge */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-b from-[#FCE9A8] to-[#F7D774] border-4 border-cream shadow-soft-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <WhyChooseIcon id={card.id} />
                  </div>

                  <h3 className="font-serif font-bold text-xl sm:text-[22px] text-forest-dark leading-snug">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-[12.5px] sm:text-[16px] text-charcoal/85 leading-[1.65]">
                    {card.description}
                  </p>
                </article>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ORGANIC CERTIFIED SPLIT — Beekeeper Photo + Aditi Certification Card
          ===================================================================== */}
      <section aria-labelledby="organic-cert-heading" className="pb-8 sm:pb-10">
        <div className="cb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Sunlit Beekeeper Photo */}
            <RevealBlock className="lg:col-span-6">
              <div className="group relative w-full h-full min-h-[250px] xs:min-h-[290px] sm:min-h-[340px] rounded-[5px] overflow-hidden border border-beige shadow-soft">
                <Image
                  src={aboutPageData.certification.beekeeperImageUrl}
                  alt="Country Bee second-generation beekeeper inspecting a golden honeycomb frame"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </RevealBlock>

            {/* Right Organic Certified Card (Soft Sage-Cream Surface) */}
            <RevealBlock delayMs={120} className="lg:col-span-6">
              <div className="h-full rounded-[5px] bg-[#EEF3E5] border border-[#DCE5CC] p-5 sm:p-7 lg:p-8 shadow-soft-sm flex flex-col justify-center space-y-5">
                {/* Seal + Heading Row */}
                <div className="flex flex-col xs:flex-row items-center xs:items-start gap-4 sm:gap-5 text-center xs:text-left">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 drop-shadow-sm transition-transform duration-500 hover:scale-105">
                    <Image
                      src={aboutPageData.certification.sealImageUrl}
                      alt="Aditi Certified Organic Seal"
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </div>

                  <div
                    className="hidden xs:block w-px h-24 bg-forest/20 shrink-0 self-center"
                    aria-hidden="true"
                  />

                  <div className="space-y-1.5 self-center">
                    <h2
                      id="organic-cert-heading"
                      className="font-serif font-extrabold text-2xl sm:text-[28px] text-forest-dark leading-tight"
                    >
                      {aboutPageData.certification.title}
                    </h2>
                    <p className="font-sans text-[12.5px] sm:text-[16px] text-charcoal/85 leading-relaxed">
                      {aboutPageData.certification.description}
                    </p>
                  </div>
                </div>

                {/* Notched Forest Ribbon "This means:" */}
                <div>
                  <span
                    className="inline-block bg-[#245A28] text-white font-sans font-bold text-xs sm:text-sm pl-4 pr-7 py-1.5 shadow-xs"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 91% 50%, 100% 100%, 0 100%)",
                    }}
                  >
                    {aboutPageData.certification.ribbonText}
                  </span>
                </div>

                {/* 3 Checkmark Points */}
                <ul className="space-y-2.5">
                  {aboutPageData.certification.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 font-sans text-[12.5px] sm:text-[16px] font-medium text-charcoal/90"
                    >
                      <GreenCheckBadge />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* =================================================================
              4. HORIZONTAL 5-BENEFIT STRIP ("Benefits of choosing our certified organic honey:")
              ================================================================= */}
          <RevealBlock delayMs={150} className="mt-6 sm:mt-8">
            <div className="rounded-[22px] bg-gradient-to-br from-[#FFFBF3] via-[#FAF2E3] to-[#F5E9D4] border border-beige-dark/60 p-3.5 sm:p-5 lg:p-6 shadow-soft space-y-4 sm:space-y-5">
              {/* Centered Deep Forest Header Pill */}
              <div className="rounded-[14px] bg-gradient-to-r from-[#123D20] via-[#1B542E] to-[#123D20] border border-honey/25 px-4 py-3 sm:py-3.5 text-white flex items-center justify-center gap-2.5 sm:gap-3 shadow-sm">
                <span className="w-8 h-8 rounded-lg bg-white/10 border border-honey/30 flex items-center justify-center shrink-0">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 36 36"
                    className="w-5 h-5 text-honey"
                    fill="currentColor"
                  >
                    <path d="M29 6C17 6 9 11.5 8.5 22C8.5 27 12 30 16.5 29.2C26.5 27.6 29.5 17 29 6Z" />
                    <path
                      d="M9 29C14 21.5 19.5 16.5 26 11"
                      stroke="#123D20"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <p className="font-serif font-bold text-[13px] xs:text-sm sm:text-base leading-snug text-white text-center">
                  {aboutPageData.organicBenefitsStrip.heading}
                </p>
              </div>

              {/* Responsive 5 Benefit Cards (Mobile 2-col + full bottom, Tablet 3+2 balanced, Desktop 5-col) */}
              <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
                {aboutPageData.organicBenefitsStrip.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={cn(
                      "group flex flex-col items-center justify-start text-center rounded-[5px] bg-white/85 hover:bg-white border border-beige/90 hover:border-honey/60 px-3 py-3.5 sm:p-4 shadow-soft-sm hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5",
                      idx < 3
                        ? "sm:col-span-2 lg:col-span-1"
                        : idx === 3
                          ? "sm:col-span-3 lg:col-span-1"
                          : "col-span-2 sm:col-span-3 lg:col-span-1"
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#FFF4D1] to-[#FDE69E] border border-honey/35 flex items-center justify-center mb-4 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <StripBenefitIcon id={item.id} />
                    </div>
                    <p className="font-sans text-[12.5px] sm:text-[16px] font-[500] text-forest-dark/90 leading-[1.4]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* =====================================================================
          5. DETAILED HERITAGE EDITORIAL — "About Country Bee" & "Country Bee stands for:"
          ===================================================================== */}
      <section aria-labelledby="heritage-heading" className="py-10 sm:py-14">
        <div className="cb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Heritage Narrative Column */}
            <RevealBlock className="lg:col-span-6 space-y-4">
              <h2
                id="heritage-heading"
                className="font-serif font-extrabold text-3xl sm:text-[36px] lg:text-[40px] leading-tight tracking-tight text-forest-dark"
              >
                About <span className="text-[#D48D15]">Country Bee</span>
              </h2>

              <div className="space-y-3.5 font-sans text-[12.5px] sm:text-[16px] text-charcoal/90 leading-[1.68]">
                <p>
                  Established in{" "}
                  <strong className="text-forest-dark">1988</strong>, Country
                  Bee is the proud continuation of a family legacy in beekeeping
                  that spans more than three and a half decades.
                </p>
                <p>
                  We are{" "}
                  <strong className="text-forest-dark">
                    second-generation master beekeepers
                  </strong>{" "}
                  from the beautiful valleys of{" "}
                  <strong className="text-forest-dark">Kashmir, India</strong>.
                  Our journey began with passion and hard work, and over the
                  years we have earned deep expertise in every aspect of honey
                  production – from hive management to harvesting and quality
                  assessment.
                </p>
                <p>
                  In the <strong className="text-forest-dark">1990s</strong>, we
                  had the honor of being a trusted vendor and supplier to{" "}
                  <strong className="text-forest-dark">
                    Dabur India Limited
                  </strong>
                  , one of India&apos;s most respected names in honey and
                  natural products. That experience strengthened our commitment
                  to quality and authenticity – a commitment we have never
                  compromised.
                </p>
                <p>
                  <strong className="text-forest-dark">
                    For over 35 years
                  </strong>{" "}
                  we have remained dedicated to the same craft: producing and
                  supplying pure, natural honey.
                </p>
                <p>
                  Today, we are excited to launch our own brand —{" "}
                  <strong className="text-forest-dark">Country Bee</strong> —
                  bringing the same dedication, knowledge, and purity directly
                  to you.
                </p>
                <p>
                  We collect and offer a wide range of single-origin and
                  multi-floral honeys sourced from different regions across
                  India. Each variety reflects the unique nectar of its flowers
                  and environment.
                </p>
              </div>
            </RevealBlock>

            {/* Right Craftsmanship, "Country Bee stands for:" & Welcome Quote Column */}
            <RevealBlock delayMs={120} className="lg:col-span-6 space-y-5">
              <p className="font-sans text-[12.5px] sm:text-[16px] text-charcoal/90 leading-[1.68]">
                In beekeeping and honey, true quality cannot be judged only by
                machines or certificates. Real experts know that the final test
                is on the tongue —{" "}
                <strong className="text-forest-dark">
                  taste, texture, aroma, ripeness, mouthfeel and aftertaste
                </strong>{" "}
                tell the complete story. That&apos;s how we have always
                evaluated and selected our honey — the traditional way, with
                experience and care.
              </p>

              {/* "Country Bee stands for:" + Mini Honey Jar Showcase */}
              <div className="space-y-4 pt-1">
                <div className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#FAD96E] to-[#F5B400] shadow-xs">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-forest-dark">
                    Country Bee stands for:
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <ul className="space-y-2.5 flex-1">
                    {aboutPageData.standsFor.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-sans text-[12.5px] sm:text-[16px] font-medium text-charcoal/90"
                      >
                        <GreenCheckBadge />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Matching Burlap Honey Jar & Honeycomb Accent */}
                  <div className="relative w-full sm:w-48 h-44 sm:h-36 rounded-[14px] overflow-hidden border border-beige shadow-soft-sm shrink-0 bg-cream">
                    <Image
                      src="/images/Country_Bee_stands.png"
                      alt="Country Bee raw honey jar with wooden dipper and fresh honeycomb"
                      fill
                      sizes="(max-width: 639px) 100vw, 192px"
                      className="object-cover object-[80%_60%] sm:object-[82%_58%]"
                    />
                  </div>
                </div>
              </div>

              <p className="font-sans text-[12.5px] sm:text-[16px] text-charcoal/90 leading-[1.68]">
                Whether you&apos;re looking for daily table honey, special
                single-floral varieties, or bulk supply for your business, we
                are here with the same quality that made us a preferred partner
                decades ago.
              </p>

              {/* Warm Golden Welcome Quote Strip */}
              <div className="rounded-[12px] bg-[#FAEBBE]/85 border border-honey/45 px-4 sm:px-5 py-3.5 flex items-center gap-3 shadow-soft-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 36 28"
                  className="w-7 h-5 text-honey shrink-0"
                  fill="currentColor"
                >
                  <path d="M10.5 14.5C13.2 14.5 15.2 16.5 15.2 19.5C15.2 22.6 12.8 25.2 9.6 25.2C5.6 25.2 2.8 21.8 2.8 17C2.8 9.6 7.5 4.4 14 2.6L15.3 5.5C11 7.2 8.8 10.3 8.5 14.6C9.1 14.5 9.8 14.5 10.5 14.5ZM28.2 14.5C30.9 14.5 32.9 16.5 32.9 19.5C32.9 22.6 30.5 25.2 27.3 25.2C23.3 25.2 20.5 21.8 20.5 17C20.5 9.6 25.2 4.4 31.7 2.6L33 5.5C28.7 7.2 26.5 10.3 26.2 14.6C26.8 14.5 27.5 14.5 28.2 14.5Z" />
                </svg>
                <p className="font-serif italic text-sm sm:text-[15.5px] text-forest-dark">
                  Welcome to{" "}
                  <strong className="not-italic font-extrabold">
                    Country Bee
                  </strong>{" "}
                  — where tradition meets purity.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. BOTTOM WHATSAPP CONTACT BANNER ("Contact us today")
          ===================================================================== */}
      <section
        aria-label="Contact Country Bee on WhatsApp"
        className="pb-12 sm:pb-16"
      >
        <div className="cb-container">
          <RevealBlock>
            <div className="relative rounded-[5px] bg-gradient-to-r from-[#134222] via-[#1B542E] to-[#0D3219] border border-forest-light/70 shadow-forest px-5 py-6 sm:px-8 sm:py-7 lg:px-10 overflow-hidden">
              {/* Decorative Subtle Botanical Leaves at Left & Right Corners */}
              <svg
                aria-hidden="true"
                viewBox="0 0 110 110"
                fill="none"
                className="pointer-events-none absolute -left-3 -bottom-3 w-24 h-24 text-leaf/35"
              >
                <path
                  d="M8 100C28 74 48 56 80 42M24 80C18 54 32 32 54 24C56 48 44 68 24 80ZM42 74C56 58 76 54 96 62C80 78 60 82 42 74Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
              </svg>
              <svg
                aria-hidden="true"
                viewBox="0 0 110 110"
                fill="none"
                className="pointer-events-none absolute -right-3 -bottom-3 w-24 h-24 text-leaf/35 -scale-x-100"
              >
                <path
                  d="M8 100C28 74 48 56 80 42M24 80C18 54 32 32 54 24C56 48 44 68 24 80ZM42 74C56 58 76 54 96 62C80 78 60 82 42 74Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
              </svg>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left WhatsApp Icon + Prompt */}
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 flex-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center shrink-0">
                    <WhatsAppSvg className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <p className="font-sans text-[12.5px] sm:text-[16px] text-cream/95 leading-relaxed max-w-md">
                    {aboutPageData.whatsapp.promptText}
                  </p>
                </div>

                {/* Vertical Golden Divider */}
                <div
                  aria-hidden="true"
                  className="hidden md:block w-px h-16 bg-honey/40 shrink-0"
                />

                {/* Right Heading + Working WhatsApp Pill Button */}
                <div className="flex flex-col items-center md:items-start gap-2.5 shrink-0">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    {aboutPageData.whatsapp.heading}
                  </h3>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-b from-[#FFE066] via-honey-yellow to-honey hover:from-honey hover:to-honey-amber text-charcoal font-sans font-bold text-xs sm:text-sm shadow-honey hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <WhatsAppSvg className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal shrink-0" />
                    <span>{aboutPageData.whatsapp.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
    </div>
  );
};
