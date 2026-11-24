import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  benefits: string[];
  formTitle: string;
  formHighlight: string;
  formSubtitle: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Two-panel layout for login / register / password pages: Kashmir-valley brand
 * panel on the left (desktop), form card on the right.
 */
export const AuthShell = ({
  eyebrow,
  title,
  highlight,
  description,
  benefits,
  formTitle,
  formHighlight,
  formSubtitle,
  children,
}: AuthShellProps) => (
  <section className="relative py-8 sm:py-12 lg:py-14 overflow-x-clip">
    {/* Decorative honeycomb outlines */}
    <svg aria-hidden="true" viewBox="0 0 110 130" fill="none" className="hidden md:block pointer-events-none absolute right-4 top-6 w-20 lg:w-28 h-auto text-honey/30">
      <polygon points="36,8 62,22 62,50 36,64 10,50 10,22" stroke="currentColor" strokeWidth="1.6" />
      <polygon points="66,54 92,68 92,96 66,110 40,96 40,68" stroke="currentColor" strokeWidth="1.6" />
    </svg>
    <svg aria-hidden="true" viewBox="0 0 110 130" fill="none" className="hidden md:block pointer-events-none absolute left-3 bottom-8 w-16 lg:w-20 h-auto text-honey/25 -scale-x-100">
      <polygon points="36,8 62,22 62,50 36,64 10,50 10,22" stroke="currentColor" strokeWidth="1.6" />
      <polygon points="66,54 92,68 92,96 66,110 40,96 40,68" stroke="currentColor" strokeWidth="1.6" />
    </svg>

    <div className="relative z-10 cb-container">
      <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.08fr] rounded-[22px] overflow-hidden border border-beige/95 bg-[#FFFDF8] shadow-soft-lg">
        {/* ----------------- LEFT BRAND PANEL ----------------- */}
        <div className="relative hidden lg:flex flex-col justify-between min-h-[600px] p-9 xl:p-10 overflow-hidden">
          <Image
            src="/images/others/abouts_hero_section.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 520px, 0px"
            className="object-cover object-[70%_center]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#072412]/95 via-[#092D17]/85 to-[#092D17]/75" />

          <div className="relative z-10 space-y-3">
            <span className="block font-sans text-xs font-bold uppercase tracking-[0.26em] text-cream/90">{eyebrow}</span>
            <h2 className="font-serif font-extrabold text-[40px] leading-[1.06] tracking-tight">
              <span className="text-white">{title} </span>
              <span className="text-honey">{highlight}</span>
            </h2>
            <svg aria-hidden="true" viewBox="0 0 240 14" fill="none" className="w-44 h-3 text-honey">
              <path d="M2 8C48 1 100 13 152 6C188 1.5 215 5 238 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <p className="font-sans text-sm text-cream/90 leading-relaxed max-w-sm">{description}</p>
          </div>

          <ul className="relative z-10 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 font-sans text-sm font-medium text-white">
                <span className="w-8 h-8 rounded-full bg-honey/20 border border-honey/45 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-honey-yellow" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-3 rounded-[12px] bg-white/10 border border-white/15 px-4 py-3 backdrop-blur-xs">
            <span className="text-2xl" aria-hidden="true">🍯</span>
            <p className="font-sans text-xs text-cream/90 leading-snug">
              <strong className="block text-honey-yellow text-[13px]">Trusted since 1988</strong>
              100% pure, raw honey from the valleys of Kashmir.
            </p>
          </div>
        </div>

        {/* ----------------- RIGHT FORM PANEL ----------------- */}
        <div className="p-6 xs:p-8 sm:p-10 lg:p-11 flex flex-col justify-center">
          <div className="mb-6 sm:mb-7">
            <span className="lg:hidden block font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-honey-amber mb-1.5">
              {eyebrow}
            </span>
            <h1 className="font-serif font-extrabold text-[28px] sm:text-[34px] leading-tight tracking-tight text-forest-dark">
              {formTitle} <span className="text-[#D48D15]">{formHighlight}</span>
            </h1>
            <svg aria-hidden="true" viewBox="0 0 180 12" fill="none" className="w-32 h-2.5 text-honey mt-1">
              <path d="M2 7C42 1 88 11 178 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal/75">{formSubtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  </section>
);

/* "or" divider between primary action and alternate route */
export const AuthDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 my-6" role="separator">
    <span className="flex-1 h-px bg-beige-dark/70" />
    <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">{label}</span>
    <span className="flex-1 h-px bg-beige-dark/70" />
  </div>
);
