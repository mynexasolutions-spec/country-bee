import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  breadcrumbs?: Crumb[];
}

/**
 * Compact version of the Kashmir-valley hero used on About / Shop / Contact,
 * sized for utility pages (basket, checkout, account).
 */
export const PageBanner = ({ eyebrow, title, highlight, description, breadcrumbs }: PageBannerProps) => (
  <section
    aria-labelledby="page-banner-heading"
    className="relative w-full min-h-[170px] sm:min-h-[200px] lg:min-h-[220px] flex items-center overflow-hidden bg-[#092D17]"
  >
    <Image
      src="/images/others/abouts_hero_section.png"
      alt=""
      fill
      priority
      quality={90}
      sizes="100vw"
      className="object-cover object-[76%_52%] sm:object-[70%_52%] lg:object-center"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-r from-[#072412]/90 via-[#092D17]/70 sm:via-[#092D17]/50 to-transparent"
    />
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#092D17]/45 to-transparent"
    />

    <div className="relative z-10 cb-container py-6 sm:py-8">
      <div className="max-w-xl space-y-2 sm:space-y-2.5 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 font-sans text-[11px] sm:text-xs text-cream/75">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="inline-flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3 h-3 text-honey/80" aria-hidden="true" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-honey-yellow transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-semibold text-cream">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <span className="block font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.26em] text-cream/95">
          {eyebrow}
        </span>

        <h1
          id="page-banner-heading"
          className="font-serif font-extrabold text-[30px] xs:text-[34px] sm:text-[40px] lg:text-[46px] leading-[1.06] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
        >
          <span className="text-white">{title}</span>
          {highlight && <span className="text-honey"> {highlight}</span>}
        </h1>

        <div className="w-24 sm:w-32 h-[2px] bg-honey rounded-full" aria-hidden="true" />

        {description && (
          <p className="font-sans text-xs xs:text-sm sm:text-[15px] text-cream/95 leading-relaxed max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            {description}
          </p>
        )}
      </div>
    </div>
  </section>
);

/* Serif section heading with the hand-drawn golden underline used across the site */
export const SectionTitle = ({
  title,
  highlight,
  as: Tag = 'h2',
  className,
}: {
  title: string;
  highlight?: string;
  as?: 'h2' | 'h3';
  className?: string;
}) => (
  <div className={className}>
    <Tag className="font-serif font-extrabold text-xl sm:text-[22px] leading-tight tracking-tight text-forest-dark">
      {title}
      {highlight && <span className="text-[#D48D15]"> {highlight}</span>}
    </Tag>
    <svg aria-hidden="true" viewBox="0 0 120 10" fill="none" className="w-20 h-2 text-honey mt-1">
      <path d="M2 6C30 1 65 9 118 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  </div>
);
