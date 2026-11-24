'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Banknote,
  Check,
  CreditCard,
  Landmark,
  Lock,
  Mail,
  MessageSquareText,
  Phone,
  Smartphone,
  Tag,
  Truck,
  UserCircle2,
  X,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatINR } from '@/data/products';
import { PAYMENT_METHODS, type Coupon, type PaymentMethodId } from '@/data/commerce';
import {
  EMAIL_PATTERN,
  EMPTY_ADDRESS,
  INDIAN_MOBILE_PATTERN,
  computeTotals,
  findCoupon,
  generateOrderId,
  normalizePhone,
  saveOrder,
  stripCountryCode,
  validateAddress,
  type Order,
  type ShippingAddress,
} from '@/lib/orders';
import { cn } from '@/lib/utils';
import { PageBanner } from '@/components/common/PageBanner';
import { CheckboxField, FormAlert, SubmitButton, TextField } from '@/components/forms/FormFields';
import { AddressFields } from './AddressFields';
import { CheckoutSteps } from './CheckoutSteps';
import { CartSkeleton, EmptyBasket } from './CartPageContent';
import { CheckoutTrustNotes, OrderLineList, SummaryCard, TotalsRows } from './OrderSummary';

const PAYMENT_ICONS: Record<PaymentMethodId, React.ComponentType<{ className?: string }>> = {
  upi: Smartphone,
  card: CreditCard,
  netbanking: Landmark,
  cod: Banknote,
};

type FieldErrors = Partial<Record<'email' | 'phone' | keyof ShippingAddress, string>>;

/* Field order used to focus the first invalid input */
const FIELD_FOCUS_ORDER: { key: keyof FieldErrors; id: string }[] = [
  { key: 'email', id: 'checkout-email' },
  { key: 'phone', id: 'checkout-phone' },
  { key: 'fullName', id: 'ship-fullName' },
  { key: 'line1', id: 'ship-line1' },
  { key: 'city', id: 'ship-city' },
  { key: 'pincode', id: 'ship-pincode' },
  { key: 'state', id: 'ship-state' },
];

export const CheckoutPageContent = () => {
  const router = useRouter();
  const { items, isHydrated, subtotal, clearCart } = useCart();
  const { user, isReady: authReady, updateProfile } = useAuth();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [saveAddress, setSaveAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('upi');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | undefined>();
  const [couponError, setCouponError] = useState<string | null>(null);

  // Pre-fill contact details and saved address once the signed-in user is known
  const prefilledFor = useRef<string | null>(null);
  useEffect(() => {
    if (!authReady || !user || prefilledFor.current === user.id) return;
    prefilledFor.current = user.id;
    setEmail((v) => v || user.email);
    setPhone((v) => v || user.phone);
    setAddress((current) =>
      current.line1 ? current : user.address ?? { ...EMPTY_ADDRESS, fullName: user.name }
    );
  }, [authReady, user]);

  const totals = computeTotals(subtotal, appliedCoupon);

  const updateAddress = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const applyCoupon = () => {
    const code = couponInput.trim();
    if (!code) return;
    const coupon = findCoupon(code);
    if (!coupon) {
      setCouponError('This coupon code isn’t valid.');
      return;
    }
    if (subtotal < coupon.minSubtotal) {
      setCouponError(`Add ${formatINR(coupon.minSubtotal - subtotal)} more to use ${coupon.code}.`);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponError(null);
    setCouponInput('');
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = { ...validateAddress(address) };
    if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!INDIAN_MOBILE_PATTERN.test(normalizePhone(phone))) next.phone = 'Enter a valid 10-digit mobile number.';
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPlacing || items.length === 0) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    const firstInvalid = FIELD_FOCUS_ORDER.find((f) => nextErrors[f.key]);
    if (firstInvalid) {
      setFormError('Please fix the highlighted fields to continue.');
      const el = document.getElementById(firstInvalid.id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus({ preventScroll: true });
      return;
    }
    setFormError(null);

    const cleanAddress: ShippingAddress = {
      fullName: address.fullName.trim(),
      line1: address.line1.trim(),
      line2: address.line2.trim(),
      landmark: address.landmark.trim(),
      city: address.city.trim(),
      state: address.state,
      pincode: address.pincode.trim(),
    };
    const cleanPhone = normalizePhone(phone);

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: 'placed',
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      userId: user?.id,
      address: cleanAddress,
      paymentMethod,
      couponCode: appliedCoupon?.code,
      notes: notes.trim() || undefined,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      lines: items.map(({ key, ...line }) => line),
      totals,
    };

    try {
      setIsPlacing(true);
      saveOrder(order);
      if (user && saveAddress) {
        updateProfile({ address: cleanAddress, phone: user.phone || cleanPhone });
      }
      clearCart();
      router.push(`/order-confirmation?id=${encodeURIComponent(order.id)}`);
    } catch {
      setIsPlacing(false);
      setFormError('We couldn’t place your order. Please try again or contact us on WhatsApp.');
    }
  };

  const renderBody = () => {
    if (isPlacing) {
      return (
        <div className="max-w-md mx-auto rounded-[18px] bg-[#FFFDF8] border border-beige/95 shadow-soft px-6 py-12 text-center space-y-4">
          <span className="w-12 h-12 mx-auto rounded-full border-[3px] border-beige border-t-honey animate-spin block" aria-hidden="true" />
          <p className="font-serif text-xl font-bold text-forest-dark">Placing your order…</p>
          <p className="font-sans text-sm text-charcoal/70">Please don’t close this page.</p>
        </div>
      );
    }
    if (!isHydrated) return <CartSkeleton />;
    if (items.length === 0) return <EmptyBasket />;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ============ LEFT: FORM ============ */}
        <form id="checkout-form" noValidate onSubmit={handleSubmit} className="lg:col-span-7 xl:col-span-8 space-y-5">
          {/* Account prompt */}
          {authReady && (
            <div className="rounded-[14px] bg-[#FAF1E1] border border-beige/90 px-4 py-3 flex flex-wrap items-center justify-between gap-2 shadow-soft-sm">
              {user ? (
                <p className="flex items-center gap-2 font-sans text-xs sm:text-[13px] text-charcoal/85">
                  <UserCircle2 className="w-5 h-5 text-forest-dark" />
                  Signed in as <strong className="text-forest-dark">{user.name}</strong>
                  <span className="hidden xs:inline text-charcoal/55">({user.email})</span>
                </p>
              ) : (
                <>
                  <p className="flex items-center gap-2 font-sans text-xs sm:text-[13px] text-charcoal/85">
                    <UserCircle2 className="w-5 h-5 text-forest-dark" />
                    Have an account? Log in for faster checkout.
                  </p>
                  <Link
                    href="/login?next=/checkout"
                    className="font-sans text-xs sm:text-[13px] font-bold text-forest-dark underline decoration-honey decoration-2 underline-offset-4 hover:text-honey-amber"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          )}

          <FormAlert message={formError} />

          {/* 1. Contact */}
          <CheckoutSection step={1} title="Contact" highlight="Information" subtitle="We’ll use these to share order and delivery updates.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                id="checkout-email"
                label="Email Address"
                icon={Mail}
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                error={errors.email}
              />
              <TextField
                id="checkout-phone"
                label="Mobile Number"
                icon={Phone}
                prefix="+91"
                type="tel"
                required
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => {
                  setPhone(stripCountryCode(e.target.value));
                  if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                }}
                error={errors.phone}
                hint="For delivery updates from our courier partner"
              />
            </div>
          </CheckoutSection>

          {/* 2. Shipping address */}
          <CheckoutSection step={2} title="Shipping" highlight="Address" subtitle="We deliver pan-India, straight from our Kashmir apiaries.">
            <AddressFields idPrefix="ship" value={address} onChange={updateAddress} errors={errors} />
            {user && (
              <CheckboxField checked={saveAddress} onChange={setSaveAddress} className="mt-4">
                Save this address to my account for next time
              </CheckboxField>
            )}
          </CheckoutSection>

          {/* 3. Delivery */}
          <CheckoutSection step={3} title="Delivery" highlight="Method">
            <div className="flex items-center gap-3.5 rounded-[12px] border-2 border-forest-dark bg-forest-dark/[0.03] p-4">
              <span className="w-10 h-10 rounded-full bg-[#FCE9A8]/90 border border-honey/40 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-forest-dark" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-bold text-sm text-forest-dark">Standard Express Courier</p>
                <p className="font-sans text-xs text-charcoal/65">Dispatched within 24 hours • Pan India delivery</p>
              </div>
              <span className={cn('font-sans font-extrabold text-sm', totals.shipping === 0 ? 'text-leaf-dark' : 'text-forest-dark')}>
                {totals.shipping === 0 ? 'FREE' : formatINR(totals.shipping)}
              </span>
            </div>
          </CheckoutSection>

          {/* 4. Payment */}
          <CheckoutSection step={4} title="Payment" highlight="Method" subtitle="Choose how you’d like to pay for your order.">
            <fieldset>
              <legend className="sr-only">Choose a payment method</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = PAYMENT_ICONS[method.id];
                  const selected = paymentMethod === method.id;
                  return (
                    <label
                      key={method.id}
                      className={cn(
                        'relative flex items-start gap-3 rounded-[12px] border-2 p-3.5 cursor-pointer transition-all duration-200',
                        selected
                          ? 'border-forest-dark bg-forest-dark/[0.03] shadow-soft-sm'
                          : 'border-beige bg-white hover:border-honey/70'
                      )}
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.id}
                        checked={selected}
                        onChange={() => setPaymentMethod(method.id)}
                        className="sr-only peer"
                      />
                      <span
                        className={cn(
                          'w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-colors',
                          selected ? 'bg-forest-dark text-honey-yellow' : 'bg-cream text-forest-dark'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-sans font-bold text-sm text-forest-dark">{method.label}</span>
                        <span className="block font-sans text-[11.5px] text-charcoal/65 leading-snug">{method.description}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-honey',
                          selected ? 'border-forest-dark bg-forest-dark' : 'border-beige-dark bg-white'
                        )}
                      >
                        {selected && <Check className="w-3 h-3 text-honey-yellow stroke-[3.5]" />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </CheckoutSection>

          {/* 5. Notes */}
          <CheckoutSection step={5} title="Order" highlight="Notes" subtitle="Gift message or delivery instructions (optional).">
            <div className="relative">
              <label htmlFor="checkout-notes" className="sr-only">
                Order notes
              </label>
              <MessageSquareText className="w-4 h-4 text-charcoal/50 absolute left-4 top-3.5 pointer-events-none" />
              <textarea
                id="checkout-notes"
                rows={3}
                maxLength={400}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Please pack as a gift — Happy Diwali!"
                className="w-full pl-11 pr-4 py-3 rounded-[8px] bg-white border border-beige-dark/80 text-sm text-charcoal placeholder:text-charcoal/45 font-sans transition-colors focus:outline-none focus:border-honey focus:ring-2 focus:ring-honey/25 resize-y"
              />
            </div>
          </CheckoutSection>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 font-sans text-xs sm:text-[13px] font-bold text-forest-dark hover:text-honey-amber transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Basket
          </Link>
        </form>

        {/* ============ RIGHT: SUMMARY ============ */}
        <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32">
          <SummaryCard>
            <OrderLineList lines={items} className="max-h-[260px] overflow-y-auto pr-1 -mr-1 pt-1.5" />

            {/* Coupon */}
            <div className="pt-4 border-t border-beige/80">
              {appliedCoupon ? (
                <div className="flex items-center justify-between gap-2 rounded-[8px] bg-leaf/10 border border-leaf/35 px-3 py-2.5">
                  <p className="flex items-center gap-2 font-sans text-xs text-forest-dark">
                    <Tag className="w-4 h-4 text-leaf-dark" />
                    <span>
                      <strong>{appliedCoupon.code}</strong> applied — {appliedCoupon.description}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(undefined)}
                    aria-label="Remove coupon"
                    className="p-1 rounded-[5px] text-charcoal/50 hover:text-red-600 hover:bg-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <label htmlFor="checkout-coupon" className="block font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-charcoal/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="checkout-coupon"
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          setCouponError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            applyCoupon();
                          }
                        }}
                        placeholder="Enter code"
                        aria-invalid={couponError ? true : undefined}
                        aria-describedby={couponError ? 'checkout-coupon-error' : undefined}
                        className="w-full pl-10 pr-3 py-2.5 rounded-[8px] bg-white border border-beige-dark/80 text-sm font-semibold uppercase tracking-wide text-charcoal placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-charcoal/45 focus:outline-none focus:border-honey focus:ring-2 focus:ring-honey/25"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={applyCoupon}
                      disabled={!couponInput.trim()}
                      className="px-4 rounded-[8px] bg-forest-dark hover:bg-forest text-white font-sans font-bold text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p id="checkout-coupon-error" role="alert" className="mt-1.5 font-sans text-[11.5px] font-medium text-red-600">
                      {couponError}
                    </p>
                  )}
                </div>
              )}
            </div>

            <TotalsRows totals={totals} couponCode={appliedCoupon?.code} />

            <SubmitButton form="checkout-form" loading={isPlacing} loadingText="Placing order…" className="h-12">
              <Lock className="w-4 h-4 text-honey" />
              <span>Place Order — {formatINR(totals.total)}</span>
            </SubmitButton>

            <CheckoutTrustNotes />
          </SummaryCard>
        </aside>

        {/* Mobile sticky place-order bar */}
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-[45] border-t border-beige bg-[#FFFBF5]/95 backdrop-blur-md shadow-[0_-8px_24px_-8px_rgba(41,37,31,0.18)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-3 max-w-xl mx-auto">
            <div className="shrink-0">
              <span className="block font-sans text-[10.5px] font-semibold uppercase tracking-wider text-charcoal/55">Total</span>
              <span className="block font-sans font-extrabold text-lg text-forest-dark leading-tight">{formatINR(totals.total)}</span>
            </div>
            <SubmitButton form="checkout-form" loading={isPlacing} loadingText="Placing…" className="h-12 flex-1 hover:translate-y-0">
              <Lock className="w-4 h-4 text-honey" />
              <span>Place Order</span>
            </SubmitButton>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-cream text-charcoal overflow-x-clip">
      <PageBanner
        eyebrow="SECURE CHECKOUT"
        title="Complete Your"
        highlight="Order"
        description="Just a few details and your pure honey will be on its way."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Basket', href: '/cart' }, { label: 'Checkout' }]}
      />
      <section className="pt-8 pb-28 sm:pt-10 lg:pb-10">
        <div className="cb-container space-y-7 sm:space-y-9">
          <CheckoutSteps current={1} />
          {renderBody()}
        </div>
      </section>
    </div>
  );
};

const CheckoutSection = ({
  step,
  title,
  highlight,
  subtitle,
  children,
}: {
  step: number;
  title: string;
  highlight: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-[16px] bg-[#FFFDF8] border border-beige/95 shadow-soft-sm p-5 sm:p-6">
    <div className="flex items-start gap-3 mb-5">
      <span className="w-8 h-8 rounded-full bg-honey text-charcoal font-sans font-extrabold text-sm flex items-center justify-center shrink-0 shadow-honey">
        {step}
      </span>
      <div>
        <h2 className="font-serif font-extrabold text-lg sm:text-xl leading-tight tracking-tight text-forest-dark">
          {title} <span className="text-[#D48D15]">{highlight}</span>
        </h2>
        {subtitle && <p className="mt-0.5 font-sans text-xs text-charcoal/65">{subtitle}</p>}
      </div>
    </div>
    {children}
  </section>
);
