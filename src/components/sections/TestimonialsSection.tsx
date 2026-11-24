'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, PenLine, X } from 'lucide-react';
import { initialTestimonials, type CustomerTestimonial } from '@/data/testimonials';
import { honeyProducts } from '@/data/products';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'country_bee_reviews_v1';

/**
 * Bold rounded Honey-Gold double quotation mark matching reference design
 */
const GoldenQuoteMark = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 48 38"
    fill="none"
    className="w-9 h-7 sm:w-11 sm:h-9 text-honey shrink-0"
  >
    <path
      d="M14.2 19.4C17.8 19.4 20.6 22.2 20.6 26.2C20.6 30.4 17.4 33.8 13.1 33.8C7.8 33.8 4 29.4 4 22.8C4 12.8 10.2 5.8 18.8 3.5L20.6 7.4C14.8 9.6 11.8 13.8 11.4 19.6C12.2 19.4 13.2 19.4 14.2 19.4ZM37.6 19.4C41.2 19.4 44 22.2 44 26.2C44 30.4 40.8 33.8 36.5 33.8C31.2 33.8 27.4 29.4 27.4 22.8C27.4 12.8 33.6 5.8 42.2 3.5L44 7.4C38.2 9.6 35.2 13.8 34.8 19.6C35.6 19.4 36.6 19.4 37.6 19.4Z"
      fill="currentColor"
    />
  </svg>
);

const StarRow = ({ count }: { count: number }) => (
  <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={cn(
          'w-4 h-4 sm:w-[18px] sm:h-[18px]',
          star <= count ? 'text-honey fill-current' : 'text-beige-dark fill-none stroke-current'
        )}
        strokeWidth="2"
      >
        <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9L12 2.5z" />
      </svg>
    ))}
  </div>
);

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<CustomerTestimonial[]>(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsPerView, setCardsPerView] = useState<number>(2);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isWriteOpen, setIsWriteOpen] = useState<boolean>(false);

  // Write Review Form State
  const [authorInput, setAuthorInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [honeyInput, setHoneyInput] = useState(honeyProducts[0]?.name ?? 'Borage Honey');
  const [ratingInput, setRatingInput] = useState(5);
  const [quoteInput, setQuoteInput] = useState('');

  const touchStartX = useRef<number | null>(null);

  // Load user-submitted reviews from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CustomerTestimonial[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...initialTestimonials]);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Responsive cardsPerView: 1 on mobile (<768px), 2 on tablet & desktop (>=768px)
  useEffect(() => {
    const updateLayout = () => {
      setCardsPerView(window.innerWidth >= 768 ? 2 : 1);
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);

  // Keep currentIndex in bounds on resize
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-advance every 4.5s unless hovered or modal open
  useEffect(() => {
    if (isPaused || isWriteOpen) return;
    const timer = setInterval(goNext, 4500);
    return () => clearInterval(timer);
  }, [isPaused, isWriteOpen, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorInput.trim() || !quoteInput.trim()) return;

    const newReview: CustomerTestimonial = {
      id: `user-rev-${Date.now()}`,
      author: authorInput.trim(),
      location: locationInput.trim() || 'India',
      honeyBought: honeyInput,
      rating: ratingInput,
      quote: quoteInput.trim(),
      verified: true,
    };

    setReviews((prev) => {
      const updated = [newReview, ...prev];
      const customOnly = updated.filter((r) => r.id.startsWith('user-rev-'));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
      } catch {
        // Ignore quota errors
      }
      return updated;
    });

    setCurrentIndex(0);
    setAuthorInput('');
    setLocationInput('');
    setQuoteInput('');
    setRatingInput(5);
    setIsWriteOpen(false);
  };

  const totalStops = maxIndex + 1;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full bg-cream py-10 sm:py-14 lg:py-16 overflow-hidden mt-[-40px]"
    >
      {/* Soft Warm Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[280px] bg-honey/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 cb-container">
        {/* =================================================================
            SECTION HEADER: Twin Botanical Leaves + "Loved by Our Customers"
            ================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-11">
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
              id="testimonials-heading"
              className="font-serif font-extrabold text-[24px] xs:text-[28px] sm:text-[36px] lg:text-[42px] leading-tight tracking-tight text-forest-dark"
            >
              Loved by Our <span className="text-honey">Customers</span>
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

        {/* =================================================================
            CAROUSEL STAGE WITH LEFT '<' & RIGHT '>' CIRCULAR BUTTONS
            Purely Typography & Icon Driven — Strictly Zero Images
            ================================================================= */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative px-2 sm:px-12 lg:px-14"
        >
          {/* Previous Slide Button (Desktop/Tablet Side Floating) */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous customer review"
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white hover:bg-honey text-charcoal border border-beige shadow-soft items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.4} />
          </button>

          {/* Sliding Viewport */}
          <div className="overflow-hidden py-2 -my-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full md:w-1/2 shrink-0 px-1.5 sm:px-2.5"
                >
                  <article className="group h-full rounded-[5px] bg-[#FFFDF9] border border-beige/90 hover:border-honey/70 shadow-soft hover:shadow-[0_14px_32px_-8px_rgba(41,37,31,0.12)] p-5 sm:p-7 flex flex-col justify-between transition-all duration-300">
                    {/* Top Quote Block */}
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <GoldenQuoteMark />
                      <div className="flex-1 min-w-0 space-y-3">
                        <p className="font-sans text-[14.5px] sm:text-[16px] text-charcoal leading-[1.62] font-medium">
                          {review.quote}
                        </p>
                        <StarRow count={review.rating} />
                      </div>
                    </div>

                    {/* Bottom Author & Verified Honey Tag (Zero Images — Pure Monogram + Text) */}
                    <div className="mt-5 pt-4 border-t border-beige/70 flex items-center justify-between gap-3 sm:pl-14">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          aria-hidden="true"
                          className="w-9 h-9 rounded-full bg-forest-dark text-honey-yellow font-serif font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                        >
                          {getInitials(review.author)}
                        </span>
                        <div className="min-w-0">
                          <p className="font-sans font-bold text-sm text-forest-dark truncate">
                            — {review.author}
                          </p>
                          <div className="flex items-center gap-1.5 text-[11px] text-charcoal/65">
                            <span>{review.location}</span>
                            {review.verified && (
                              <>
                                <span aria-hidden="true">•</span>
                                <span className="inline-flex items-center gap-0.5 text-leaf-dark font-semibold">
                                  <CheckCircle2 className="w-3 h-3 text-leaf shrink-0" />
                                  Verified
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-honey/15 border border-honey/35 font-sans text-[11px] font-bold text-forest-dark shrink-0">
                        {review.honeyBought}
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Next Slide Button (Desktop/Tablet Side Floating) */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next customer review"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white hover:bg-honey text-charcoal border border-beige shadow-soft items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.4} />
          </button>
        </div>

        {/* =================================================================
            BOTTOM CONTROLS: Mobile Prev/Next + Golden Dots + Write a Review
            ================================================================= */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            {/* Mobile Prev Button */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous customer review"
              className="sm:hidden w-9 h-9 rounded-full bg-white active:bg-honey text-charcoal border border-beige shadow-soft-sm flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2.4} />
            </button>

            {/* Golden Filled & Hollow Dots (matching reference image ● ● ○ ○) */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Review slides">
              {Array.from({ length: totalStops }).map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to review slide ${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      'w-3 h-3 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest',
                      isActive
                        ? 'bg-honey border-2 border-honey scale-110 shadow-xs'
                        : 'bg-transparent border-[1.8px] border-charcoal/35 hover:border-honey'
                    )}
                  />
                );
              })}
            </div>

            {/* Mobile Next Button */}
            <button
              type="button"
              onClick={goNext}
              aria-label="Next customer review"
              className="sm:hidden w-9 h-9 rounded-full bg-white active:bg-honey text-charcoal border border-beige shadow-soft-sm flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2.4} />
            </button>
          </div>

          {/* Working "Share Your Review" Button */}
          <button
            type="button"
            onClick={() => setIsWriteOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-beige/60 border border-beige text-xs font-sans font-bold text-forest-dark shadow-soft-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey cursor-pointer"
          >
            <PenLine className="w-3.5 h-3.5 text-honey-amber" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          WORKING "WRITE A REVIEW" MODAL (Image-Free, Instant Live Addition)
          ===================================================================== */}
      {isWriteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsWriteOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-[#FFFDF9] rounded-[16px] border border-beige shadow-2xl p-5 sm:p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-beige">
              <h3
                id="write-review-title"
                className="font-serif text-xl font-bold text-forest-dark"
              >
                Share Your Honey Experience
              </h3>
              <button
                type="button"
                onClick={() => setIsWriteOpen(false)}
                aria-label="Close review form"
                className="w-7 h-7 rounded-full bg-cream hover:bg-beige text-charcoal flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    placeholder="e.g. Priya S."
                    className="w-full px-3 py-2 rounded-lg bg-cream/60 border border-beige text-sm text-charcoal focus:outline-none focus:border-honey"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="e.g. Jaipur"
                    className="w-full px-3 py-2 rounded-lg bg-cream/60 border border-beige text-sm text-charcoal focus:outline-none focus:border-honey"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mb-1">
                    Honey Variety
                  </label>
                  <select
                    value={honeyInput}
                    onChange={(e) => setHoneyInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-cream/60 border border-beige text-sm text-charcoal focus:outline-none focus:border-honey"
                  >
                    {honeyProducts.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mb-1">
                    Your Rating
                  </span>
                  <div className="flex items-center gap-1 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingInput(star)}
                        aria-label={`Rate ${star} stars`}
                        className="p-0.5 transition-transform hover:scale-110"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className={cn(
                            'w-5 h-5',
                            star <= ratingInput
                              ? 'text-honey fill-current'
                              : 'text-beige-dark fill-none stroke-current'
                          )}
                          strokeWidth="2"
                        >
                          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9L12 2.5z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mb-1">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={3}
                  value={quoteInput}
                  onChange={(e) => setQuoteInput(e.target.value)}
                  placeholder="Tell us how you enjoyed Country Bee honey..."
                  className="w-full px-3 py-2 rounded-lg bg-cream/60 border border-beige text-sm text-charcoal focus:outline-none focus:border-honey resize-none"
                />
              </div>

              <div className="pt-1 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-charcoal/70 hover:bg-beige/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-forest-dark hover:bg-forest text-white font-sans font-bold text-xs shadow-forest transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
