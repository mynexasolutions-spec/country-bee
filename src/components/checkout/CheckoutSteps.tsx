import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { label: 'Basket', href: '/cart' },
  { label: 'Details & Payment', href: '/checkout' },
  { label: 'Confirmation', href: undefined },
] as const;

/** Basket → Details & Payment → Confirmation progress tracker */
export const CheckoutSteps = ({ current }: { current: 0 | 1 | 2 }) => (
  <nav aria-label="Checkout progress" className="w-full">
    <ol className="flex items-center justify-center gap-0 max-w-xl mx-auto">
      {STEPS.map((step, i) => {
        const isDone = i < current;
        const isActive = i === current;
        const canNavigate = isDone && current < 2 && step.href;
        const circle = (
          <span
            className={cn(
              'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-sans text-xs sm:text-sm font-extrabold border-2 transition-colors shrink-0',
              isDone && 'bg-honey border-honey text-charcoal',
              isActive && 'bg-forest-dark border-forest-dark text-honey-yellow shadow-forest',
              !isDone && !isActive && 'bg-white border-beige-dark text-charcoal/45'
            )}
          >
            {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : i + 1}
          </span>
        );

        return (
          <li key={step.label} className={cn('flex items-center', i < STEPS.length - 1 && 'flex-1')}>
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2" aria-current={isActive ? 'step' : undefined}>
              {canNavigate ? (
                <Link href={step.href} aria-label={`Back to ${step.label}`} className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey">
                  {circle}
                </Link>
              ) : (
                circle
              )}
              <span
                className={cn(
                  'font-sans text-[10.5px] sm:text-[13px] whitespace-nowrap',
                  isActive ? 'font-bold text-forest-dark' : isDone ? 'font-semibold text-forest' : 'font-medium text-charcoal/50'
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  'flex-1 h-[2px] mx-2 sm:mx-3 rounded-full -mt-5 sm:mt-0',
                  i < current ? 'bg-honey' : 'bg-beige-dark/70'
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
