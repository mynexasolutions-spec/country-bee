import React from 'react';
import Image from 'next/image';
import { Clock, ShieldCheck, Truck } from 'lucide-react';
import { formatINR } from '@/data/products';
import { FREE_SHIPPING_THRESHOLD } from '@/data/commerce';
import type { OrderLine, OrderTotals } from '@/lib/orders';
import { cn } from '@/lib/utils';
import { SectionTitle } from '@/components/common/PageBanner';

/* Thumbnail list of ordered items */
export const OrderLineList = ({ lines, className }: { lines: OrderLine[]; className?: string }) => (
  <ul className={cn('space-y-3', className)}>
    {lines.map((line) => (
      <li key={`${line.productId}-${line.weight}`} className="flex items-center gap-3">
        <div className="relative w-14 h-14 shrink-0">
          <div className="relative w-full h-full rounded-[5px] overflow-hidden bg-cream border border-beige">
            <Image src={line.imageUrl} alt={line.name} fill sizes="56px" className="object-cover" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-forest-dark text-honey-yellow text-[10px] font-extrabold flex items-center justify-center border-2 border-[#FFFDF8]">
            {line.quantity}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-sans font-bold text-[13px] text-forest-dark truncate">{line.name}</p>
          <p className="font-sans text-[11px] font-semibold text-charcoal/60">
            {line.weight} • {formatINR(line.price)} each
          </p>
        </div>
        <span className="font-sans font-extrabold text-[13px] text-forest-dark shrink-0">
          {formatINR(line.price * line.quantity)}
        </span>
      </li>
    ))}
  </ul>
);

/* Subtotal / discount / shipping / total rows */
export const TotalsRows = ({ totals, couponCode }: { totals: OrderTotals; couponCode?: string }) => (
  <dl className="space-y-2 font-sans text-[13px]">
    <div className="flex items-center justify-between">
      <dt className="text-charcoal/75 font-medium">Subtotal</dt>
      <dd className="font-bold text-forest-dark">{formatINR(totals.subtotal)}</dd>
    </div>
    {totals.discount > 0 && (
      <div className="flex items-center justify-between">
        <dt className="text-charcoal/75 font-medium">
          Discount{couponCode && <span className="ml-1 text-[11px] font-bold text-leaf-dark">({couponCode})</span>}
        </dt>
        <dd className="font-bold text-leaf-dark">− {formatINR(totals.discount)}</dd>
      </div>
    )}
    <div className="flex items-center justify-between">
      <dt className="text-charcoal/75 font-medium">Shipping</dt>
      <dd className={cn('font-bold', totals.shipping === 0 ? 'text-leaf-dark' : 'text-forest-dark')}>
        {totals.shipping === 0 ? 'FREE' : formatINR(totals.shipping)}
      </dd>
    </div>
    <div className="pt-3 mt-1 border-t border-dashed border-beige-dark flex items-end justify-between">
      <dt>
        <span className="block font-bold text-sm text-forest-dark">Total</span>
        <span className="block text-[10.5px] text-charcoal/55">Inclusive of all taxes</span>
      </dt>
      <dd className="font-extrabold text-xl sm:text-2xl text-forest-dark tracking-tight">
        {formatINR(totals.total)}
      </dd>
    </div>
  </dl>
);

/* Free-delivery progress bar (shared by basket page) */
export const FreeShippingProgress = ({ subtotal }: { subtotal: number }) => {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  return (
    <div className="rounded-[14px] bg-[#FAF1E1] border border-beige/90 px-4 py-3.5 shadow-soft-sm">
      <div className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-full bg-[#FCE9A8]/90 border border-honey/40 flex items-center justify-center shrink-0">
          <Truck className="w-4 h-4 text-forest-dark" />
        </span>
        <p className="font-sans text-xs sm:text-[13px] text-charcoal/85">
          {remaining === 0 ? (
            <span className="font-semibold text-forest">
              🎉 You’ve unlocked <span className="text-leaf-dark font-bold">FREE Pan India Delivery!</span>
            </span>
          ) : (
            <>
              Add <strong className="text-forest-dark">{formatINR(remaining)}</strong> more to unlock{' '}
              <strong className="text-leaf-dark">FREE Delivery</strong>
            </>
          )}
        </p>
      </div>
      <div
        className="mt-3 h-2 w-full rounded-full bg-white border border-beige overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Progress towards free delivery"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-honey-amber via-honey to-honey-yellow transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

/* Trust notes beneath totals — reuse the guarantees already promised site-wide */
export const CheckoutTrustNotes = () => (
  <ul className="space-y-1.5 font-sans text-[11.5px]">
    <li className="flex items-center gap-2 text-forest font-medium">
      <ShieldCheck className="w-4 h-4 text-leaf shrink-0" />
      100% Money Back Purity Guarantee
    </li>
    <li className="flex items-center gap-2 text-charcoal/70">
      <Clock className="w-4 h-4 text-honey-amber shrink-0" />
      Dispatched within 24 hours via express courier
    </li>
  </ul>
);

/* Card wrapper used for the summary column */
export const SummaryCard = ({
  title = 'Order',
  highlight = 'Summary',
  children,
  className,
}: {
  title?: string;
  highlight?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('rounded-[16px] bg-[#FFFDF8] border border-beige/95 shadow-soft p-5 sm:p-6 space-y-5', className)}>
    <SectionTitle title={title} highlight={highlight} />
    {children}
  </div>
);
