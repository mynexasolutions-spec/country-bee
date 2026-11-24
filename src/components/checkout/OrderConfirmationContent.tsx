'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  CreditCard,
  Home,
  MapPin,
  PackageCheck,
  Truck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { siteConfig } from '@/config/site';
import { formatINR } from '@/data/products';
import { PAYMENT_METHODS } from '@/data/commerce';
import { formatOrderDate, getOrderById, type Order } from '@/lib/orders';
import { PageBanner, SectionTitle } from '@/components/common/PageBanner';
import { AddressBlock } from './AddressFields';
import { CheckoutSteps } from './CheckoutSteps';
import { OrderLineList, SummaryCard, TotalsRows } from './OrderSummary';

const NEXT_STEPS = [
  { icon: ClipboardCheck, title: 'Order Received', text: 'Your order is confirmed and queued at our apiary.' },
  { icon: PackageCheck, title: 'Packed & Dispatched', text: 'Hygienic, leak-proof packing — dispatched within 24 hours.' },
  { icon: Truck, title: 'Delivered to You', text: 'Pure Kashmir honey, straight to your doorstep.' },
];

export const OrderConfirmationContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') ?? '';
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrder(orderId ? getOrderById(orderId) ?? null : null);
  }, [orderId]);

  const copyOrderId = async () => {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — the ID is still visible on screen
    }
  };

  const paymentLabel = order
    ? PAYMENT_METHODS.find((m) => m.id === order.paymentMethod)?.label ?? order.paymentMethod
    : '';

  const whatsappUrl = order
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        `Hello Country Bee! I just placed order ${order.id} (${formatINR(order.totals.total)}). Name: ${order.address.fullName}.`
      )}`
    : '';

  return (
    <div className="w-full bg-cream text-charcoal overflow-x-clip">
      <PageBanner
        eyebrow="ORDER CONFIRMED"
        title="Thank You for"
        highlight="Your Order"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Order Confirmation' }]}
      />

      <section className="py-8 sm:py-10">
        <div className="cb-container space-y-7 sm:space-y-9">
          <CheckoutSteps current={2} />

          {order === undefined ? (
            <div className="h-72 rounded-[18px] bg-beige/40 animate-pulse" aria-busy="true" aria-label="Loading order" />
          ) : order === null ? (
            <div className="max-w-lg mx-auto rounded-[18px] bg-[#FFFDF8] border border-beige/95 shadow-soft px-6 py-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-honey/20 flex items-center justify-center mx-auto text-3xl" aria-hidden="true">
                🐝
              </div>
              <h2 className="font-serif text-2xl font-bold text-forest-dark">We couldn’t find that order</h2>
              <p className="font-sans text-sm text-charcoal/70">
                The link may be incomplete, or the order was placed on another device.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link href={user ? '/account' : '/login?next=/account'} className="px-5 py-2.5 rounded-[10px] bg-forest-dark hover:bg-forest text-white font-sans font-bold text-sm transition-colors">
                  View My Orders
                </Link>
                <Link href="/contact" className="px-5 py-2.5 rounded-[10px] border border-beige bg-white hover:bg-beige/60 text-forest-dark font-sans font-bold text-sm transition-colors">
                  Contact Support
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Success card */}
              <div className="relative overflow-hidden rounded-[18px] bg-gradient-to-r from-[#123D20] via-[#1B542E] to-[#0D3219] border border-forest-light/75 shadow-forest px-5 py-7 sm:px-8 sm:py-8">
                <svg aria-hidden="true" viewBox="0 0 110 130" fill="none" className="pointer-events-none absolute left-[42%] -bottom-12 w-24 sm:w-32 h-auto text-honey/20">
                  <polygon points="36,8 62,22 62,50 36,64 10,50 10,22" stroke="currentColor" strokeWidth="2" />
                  <polygon points="66,54 92,68 92,96 66,110 40,96 40,68" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                  <span className="w-16 h-16 rounded-full bg-honey text-forest-dark flex items-center justify-center shrink-0 shadow-honey animate-in zoom-in duration-500">
                    <CheckCircle2 className="w-9 h-9" strokeWidth={2.2} />
                  </span>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                      Thank you, <span className="text-honey-yellow">{order.address.fullName.split(' ')[0]}</span>!
                    </h2>
                    <p className="font-sans text-sm text-cream/90">
                      Your order has been placed. Please keep your order ID handy for any questions.
                    </p>
                  </div>
                  <div className="rounded-[12px] bg-white/10 border border-white/15 px-4 py-3 shrink-0">
                    <span className="block font-sans text-[10.5px] font-bold uppercase tracking-[0.18em] text-cream/75">
                      Order ID
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-sans font-extrabold text-lg text-honey-yellow tracking-wide">{order.id}</span>
                      <button
                        type="button"
                        onClick={copyOrderId}
                        aria-label="Copy order ID"
                        className="p-1.5 rounded-[6px] text-cream/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-honey" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* LEFT: details */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-5">
                  {/* What's next */}
                  <div className="rounded-[16px] bg-[#FFFDF8] border border-beige/95 shadow-soft-sm p-5 sm:p-6">
                    <SectionTitle title="What Happens" highlight="Next" className="mb-5" />
                    <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {NEXT_STEPS.map((step, i) => (
                        <li key={step.title} className="flex sm:flex-col items-start gap-3 rounded-[12px] bg-cream/60 border border-beige/80 p-4">
                          <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${i === 0 ? 'bg-forest-dark text-honey-yellow' : 'bg-[#FCE9A8]/90 text-forest-dark border border-honey/40'}`}>
                            <step.icon className="w-5 h-5" />
                          </span>
                          <div>
                            <p className="font-sans font-bold text-sm text-forest-dark">{step.title}</p>
                            <p className="font-sans text-xs text-charcoal/70 leading-snug mt-0.5">{step.text}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Delivery + payment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InfoCard icon={MapPin} title="Delivery Address">
                      <AddressBlock address={order.address} phone={order.phone} />
                    </InfoCard>
                    <InfoCard icon={CreditCard} title="Order Details">
                      <dl className="font-sans text-xs sm:text-[13px] space-y-1.5">
                        <div className="flex justify-between gap-3">
                          <dt className="text-charcoal/65">Payment</dt>
                          <dd className="font-bold text-forest-dark text-right">{paymentLabel}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-charcoal/65">Placed on</dt>
                          <dd className="font-bold text-forest-dark inline-flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5 text-honey-amber" />
                            {formatOrderDate(order.createdAt)}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-charcoal/65">Email</dt>
                          <dd className="font-bold text-forest-dark break-all text-right">{order.email}</dd>
                        </div>
                        {order.notes && (
                          <div className="pt-2 mt-1 border-t border-beige/70">
                            <dt className="text-charcoal/65">Notes</dt>
                            <dd className="text-charcoal/85 mt-0.5">{order.notes}</dd>
                          </div>
                        )}
                      </dl>
                    </InfoCard>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-honey hover:bg-honey-yellow text-charcoal font-sans font-bold text-sm shadow-honey transition-all hover:-translate-y-0.5"
                    >
                      Continue Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-forest-dark hover:bg-forest text-white font-sans font-bold text-sm shadow-forest transition-all hover:-translate-y-0.5"
                    >
                      Share Order on WhatsApp
                    </a>
                    {user ? (
                      <Link
                        href="/account"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] border border-beige bg-white hover:bg-beige/60 text-forest-dark font-sans font-bold text-sm transition-colors"
                      >
                        View My Orders
                      </Link>
                    ) : (
                      <Link
                        href="/register?next=/account"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] border border-beige bg-white hover:bg-beige/60 text-forest-dark font-sans font-bold text-sm transition-colors"
                      >
                        Create an Account
                      </Link>
                    )}
                  </div>
                </div>

                {/* RIGHT: summary */}
                <aside className="lg:col-span-5 xl:col-span-4">
                  <SummaryCard>
                    <OrderLineList lines={order.lines} className="pt-1.5" />
                    <div className="pt-4 border-t border-beige/80">
                      <TotalsRows totals={order.totals} couponCode={order.couponCode} />
                    </div>
                    <Link href="/" className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-forest hover:text-honey-amber">
                      <Home className="w-3.5 h-3.5" /> Back to Home
                    </Link>
                  </SummaryCard>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

const InfoCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-[16px] bg-[#FFFDF8] border border-beige/95 shadow-soft-sm p-5">
    <div className="flex items-center gap-2.5 mb-3">
      <span className="w-9 h-9 rounded-[10px] bg-[#FCE8A8] text-forest-dark flex items-center justify-center shrink-0">
        <Icon className="w-[18px] h-[18px]" />
      </span>
      <h3 className="font-serif font-extrabold text-base sm:text-lg text-forest-dark">{title}</h3>
    </div>
    {children}
  </div>
);
