import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-forest text-white hover:bg-forest-dark shadow-forest focus-visible:ring-honey',
      gold: 'bg-honey text-charcoal hover:bg-honey-yellow shadow-honey focus-visible:ring-forest',
      outline:
        'border-2 border-forest text-forest hover:bg-forest hover:text-white focus-visible:ring-honey',
      ghost: 'text-forest hover:bg-beige/40 focus-visible:ring-forest',
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-xs font-medium rounded-full',
      md: 'px-6 py-3 text-sm font-semibold rounded-full',
      lg: 'px-8 py-3.5 text-base font-semibold rounded-full',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
