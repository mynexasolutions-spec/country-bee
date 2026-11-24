'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lock, Minus, Plus, Tag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR, honeyProducts } from '@/data/products';
import { computeTotals } from '@/lib/orders';
import { PageBanner, SectionTitle } from '@/components/common/PageBanner';
import { HoneyProductCard } from '@/components/products/HoneyProductCard';
import { CheckoutSteps } from './CheckoutSteps';
import {
  CheckoutTrustNotes,
  FreeShippingProgress,
  SummaryCard,
  TotalsRows,
} from './OrderSummary';

export const CartPageContent = () => {
  const { items, isHydrated, cartCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const totals = computeTotals(subtotal);

  const inCartIds = new Set(items.map((i) => i.productId));
  const suggestions = honeyProducts.filter((p) => !inCartIds.has(p.id) && p.inStock).slice(0, 4);

  return (
    <div className="w-full bg-cream text-charcoal overflow-x-clip">
      <PageBanner
        eyebrow="YOUR BASKET"
        title="Shopping"
        highlight="Basket"
        description="Review your pure honey picks before heading to checkout."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, { label: 'Basket' }]}
      />

      <section className="py-8 sm:py-10">
        <div className="cb-container space-y-7 sm:space-y-9">
          <CheckoutSteps current={0} />

          {!isHydrated ? (
            <CartSkeleton />
          ) : items.length === 0 ? (
            <EmptyBasket />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* LEFT: ITEMS */}
              <div className="lg:col-span-8 space-y-4">
                <FreeShippingProgress subtotal={subtotal} />

                <div className="rounded-[16px] bg-[#FFFDF8] border border-beige/95 shadow-soft-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-beige/80">
                    <SectionTitle title="Your" highlight="Honey Jars" />
                    <span className="font-sans text-xs font-semibold px-2.5 py-1 rounded-full bg-honey/25 text-charcoal">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {/* Column headings (desktop) */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2.5 bg-cream/70 border-b border-beige/70 font-sans text-[10.5px] font-bold uppercase tracking-wider text-charcoal/55">
                    <span className="col-span-6">Product</span>
                    <span className="col-span-3 text-center">Quantity</span>
                    <span className="col-span-3 text-right">Total</span>
                  </div>

                  <ul className="divide-y divide-beige/70">
                    {items.map((item) => (
                      <li key={item.key} className="px-4 sm:px-6 py-4 grid grid-cols-12 gap-3 sm:gap-4 items-center">
                        {/* Product */}
                        <div className="col-span-12 md:col-span-6 flex items-center gap-3 sm:gap-4 min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            className="relative w-20 h-20 sm:w-[88px] sm:h-[88px] shrink-0 rounded-[5px] overflow-hidden bg-cream border border-beige hover:border-honey transition-colors"
                          >
                            <Image src={item.imageUrl} alt={item.name} fill sizes="88px" className="object-cover" />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/products/${item.slug}`}
                              className="block font-serif font-bold text-base sm:text-lg text-forest-dark hover:text-forest leading-tight truncate"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-1 font-sans text-xs font-semibold text-charcoal/65">
                              Jar Size: <span className="text-forest-dark">{item.weight}</span>
                            </p>
                            <p className="font-sans text-xs text-charcoal/60">{formatINR(item.price)} each</p>
                            <button
                              type="button"
                              onClick={() => removeItem(item.key)}
                              className="mt-1.5 inline-flex items-center gap-1 font-sans text-[11.5px] font-semibold text-charcoal/50 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-6 md:col-span-3 flex md:justify-center">
                          <div className="inline-flex items-center rounded-[5px] border border-beige bg-white h-10">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              aria-label={`Decrease ${item.name} quantity`}
                              className="px-3 h-full text-charcoal hover:bg-beige/50 transition-colors rounded-l-[5px]"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 min-w-[2.25rem] text-center font-sans font-bold text-sm text-forest-dark" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              aria-label={`Increase ${item.name} quantity`}
                              className="px-3 h-full text-charcoal hover:bg-beige/50 transition-colors rounded-r-[5px]"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Line total */}
                        <div className="col-span-6 md:col-span-3 text-right">
                          <span className="font-sans font-extrabold text-base sm:text-lg text-forest-dark">
                            {formatINR(item.price * item.quantity)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-beige/80 bg-cream/40">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 font-sans text-xs sm:text-[13px] font-bold text-forest-dark hover:text-honey-amber transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Continue Shopping
                    </Link>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] border border-beige bg-white hover:bg-beige/60 font-sans text-xs font-semibold text-charcoal/75 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear Basket
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT: SUMMARY */}
              <aside className="lg:col-span-4 lg:sticky lg:top-32">
                <SummaryCard>
                  <TotalsRows totals={totals} />

                  <p className="flex items-center gap-2 rounded-[8px] bg-honey/10 border border-honey/30 px-3 py-2 font-sans text-[11.5px] text-charcoal/80">
                    <Tag className="w-3.5 h-3.5 text-honey-amber shrink-0" />
                    Have a coupon code? Apply it at checkout.
                  </p>

                  <Link
                    href="/checkout"
                    className="w-full h-12 px-6 rounded-[10px] bg-honey hover:bg-honey-yellow text-charcoal font-sans font-bold text-sm sm:text-[15px] inline-flex items-center justify-center gap-2.5 shadow-honey transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                  >
                    <Lock className="w-4 h-4" />
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <CheckoutTrustNotes />
                </SummaryCard>
              </aside>
            </div>
          )}

          {/* Suggestions */}
          {isHydrated && suggestions.length > 0 && (
            <section aria-labelledby="cart-suggestions" className="pt-4">
              <div className="flex items-end justify-between gap-4 mb-5">
                <div>
                  <h2 id="cart-suggestions" className="font-serif font-extrabold text-[24px] sm:text-[30px] leading-tight tracking-tight text-forest-dark">
                    You May Also <span className="text-[#D48D15]">Love</span>
                  </h2>
                  <svg aria-hidden="true" viewBox="0 0 180 12" fill="none" className="w-32 h-2.5 text-honey mt-0.5">
                    <path d="M2 7C42 1 88 11 178 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </div>
                <Link href="/shop" className="font-sans text-xs sm:text-sm font-bold text-forest hover:text-honey-amber inline-flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {suggestions.map((product) => (
                  <HoneyProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export const EmptyBasket = () => (
  <div className="max-w-lg mx-auto rounded-[18px] bg-[#FFFDF8] border border-beige/95 shadow-soft px-6 py-10 sm:py-12 text-center">
    <div className="w-20 h-20 rounded-full bg-honey/20 flex items-center justify-center mx-auto mb-4 text-4xl" aria-hidden="true">
      🍯
    </div>
    <h2 className="font-serif text-2xl font-bold text-forest-dark mb-2">Your Basket is Empty</h2>
    <p className="font-sans text-sm text-charcoal/70 max-w-sm mx-auto mb-6">
      Discover our pure, unpasteurized natural forest honeys harvested fresh from our Kashmir apiaries.
    </p>
    <Link
      href="/shop"
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-forest-dark hover:bg-forest text-white font-sans font-bold text-sm shadow-forest transition-all duration-200 hover:-translate-y-0.5"
    >
      Explore Pure Honey <ArrowRight className="w-4 h-4 text-honey" />
    </Link>
  </div>
);

export const CartSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 animate-pulse" aria-busy="true" aria-label="Loading">
    <div className="lg:col-span-8 space-y-4">
      <div className="h-[72px] rounded-[14px] bg-beige/50" />
      <div className="h-80 rounded-[16px] bg-beige/40" />
    </div>
    <div className="lg:col-span-4 h-80 rounded-[16px] bg-beige/40" />
  </div>
);
