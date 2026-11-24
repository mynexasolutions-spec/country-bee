'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const SHOW_AFTER_PX = 320;

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

      setVisible(scrollTop > SHOW_AFTER_PX);
      setProgress(ratio);
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      className={cn(
        'group fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-40 w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full',
        'bg-gradient-to-b from-[#174A28] to-[#092D17] text-honey-yellow',
        'shadow-[0_10px_28px_-4px_rgba(9,45,23,0.5)] hover:shadow-[0_14px_32px_-4px_rgba(245,180,0,0.35)]',
        'flex items-center justify-center cursor-pointer',
        'transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      )}
    >
      {/* Live Circular Scroll Progress Ring */}
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
      >
        <circle
          cx="24"
          cy="24"
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(255, 247, 234, 0.16)"
          strokeWidth="2.5"
        />
        <circle
          cx="24"
          cy="24"
          r={RING_RADIUS}
          fill="none"
          stroke="url(#cbScrollRingGrad)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
        />
        <defs>
          <linearGradient id="cbScrollRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="100%" stopColor="#F5B400" />
          </linearGradient>
        </defs>
      </svg>

      <ArrowUp
        className="relative z-10 w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
      />
    </button>
  );
};
