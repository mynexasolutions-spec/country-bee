'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Check,
  ChevronRight,
  LogOut,
  Mail,
  MapPin,
  Package,
  Pencil,
  Phone,
  Save,
  User,
  UserCog,
} from 'lucide-react';
import { useAuth, type UserProfile } from '@/context/AuthContext';
import { formatINR } from '@/data/products';
import {
  EMPTY_ADDRESS,
  INDIAN_MOBILE_PATTERN,
  formatOrderDate,
  getOrdersByEmail,
  normalizePhone,
  stripCountryCode,
  validateAddress,
  type AddressErrors,
  type Order,
  type ShippingAddress,
} from '@/lib/orders';
import { cn } from '@/lib/utils';
import { PageBanner, SectionTitle } from '@/components/common/PageBanner';
import { AddressBlock, AddressFields } from '@/components/checkout/AddressFields';
import { CheckboxField, SubmitButton, TextField } from '@/components/forms/FormFields';

type Tab = 'orders' | 'profile' | 'address';

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'profile', label: 'Profile Details', icon: UserCog },
  { id: 'address', label: 'Saved Address', icon: MapPin },
];

export const AccountPageContent = () => {
  const router = useRouter();
  const { user, isReady, logout } = useAuth();
  const [tab, setTab] = useState<Tab>('orders');
  const signingOut = useRef(false);

  // Guard: send signed-out visitors to login (but not when they just signed out)
  useEffect(() => {
    if (isReady && !user && !signingOut.current) router.replace('/login?next=/account');
  }, [isReady, user, router]);

  const firstName = user?.name.split(' ')[0] ?? '';

  return (
    <div className="w-full bg-cream text-charcoal overflow-x-clip">
      <PageBanner
        eyebrow="MY ACCOUNT"
        title={user ? 'Hello,' : 'My'}
        highlight={user ? firstName : 'Account'}
        description="Manage your orders, profile and delivery address."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'My Account' }]}
      />

      <section className="py-8 sm:py-10">
        <div className="cb-container">
          {!isReady || !user ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse" aria-busy="true" aria-label="Loading account">
              <div className="lg:col-span-4 xl:col-span-3 h-80 rounded-[16px] bg-beige/40" />
              <div className="lg:col-span-8 xl:col-span-9 h-80 rounded-[16px] bg-beige/40" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* ----------------- SIDEBAR ----------------- */}
              <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-32 rounded-[16px] bg-[#FFFDF8] border border-beige/95 shadow-soft-sm overflow-hidden">
                <div className="relative px-5 pt-6 pb-5 bg-gradient-to-br from-[#123D20] via-[#1B542E] to-[#0D3219] text-center">
                  <span className="w-16 h-16 mx-auto rounded-full bg-honey text-forest-dark font-serif font-extrabold text-2xl flex items-center justify-center border-4 border-white/20 shadow-honey">
                    {initials(user.name)}
                  </span>
                  <p className="mt-3 font-serif font-bold text-lg text-white truncate">{user.name}</p>
                  <p className="font-sans text-xs text-cream/80 truncate">{user.email}</p>
                  <p className="mt-1 font-sans text-[10.5px] uppercase tracking-wider text-honey-yellow/90">
                    Member since {formatOrderDate(user.createdAt)}
                  </p>
                </div>

                <nav aria-label="Account sections" className="p-3">
                  <ul className="flex lg:flex-col gap-1 overflow-x-auto">
                    {TABS.map((t) => (
                      <li key={t.id} className="shrink-0 lg:shrink">
                        <button
                          type="button"
                          onClick={() => setTab(t.id)}
                          aria-current={tab === t.id ? 'page' : undefined}
                          className={cn(
                            'w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] font-sans text-[13px] font-semibold transition-colors whitespace-nowrap',
                            tab === t.id
                              ? 'bg-[#F5B400] text-charcoal shadow-sm'
                              : 'text-charcoal/80 hover:bg-beige/50 hover:text-forest-dark'
                          )}
                        >
                          <t.icon className="w-4 h-4" />
                          <span className="flex-1 text-left">{t.label}</span>
                          <ChevronRight className={cn('w-4 h-4 hidden lg:block', tab === t.id ? 'opacity-70' : 'opacity-30')} />
                        </button>
                      </li>
                    ))}
                    <li className="shrink-0 lg:shrink lg:mt-2 lg:pt-2 lg:border-t lg:border-beige/80">
                      <button
                        type="button"
                        onClick={() => {
                          signingOut.current = true;
                          logout();
                          router.push('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] font-sans text-[13px] font-semibold text-charcoal/70 hover:bg-red-50 hover:text-red-600 transition-colors whitespace-nowrap"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </nav>
              </aside>

              {/* ----------------- CONTENT ----------------- */}
              <div className="lg:col-span-8 xl:col-span-9">
                {tab === 'orders' && <OrdersPanel email={user.email} />}
                {tab === 'profile' && <ProfilePanel user={user} />}
                {tab === 'address' && <AddressPanel user={user} />}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

const Panel = ({ title, highlight, action, children }: { title: string; highlight: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <div className="rounded-[16px] bg-[#FFFDF8] border border-beige/95 shadow-soft-sm p-5 sm:p-7">
    <div className="flex items-start justify-between gap-3 mb-6">
      <SectionTitle title={title} highlight={highlight} />
      {action}
    </div>
    {children}
  </div>
);

/* ============================ ORDERS ============================ */

const OrdersPanel = ({ email }: { email: string }) => {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    setOrders(getOrdersByEmail(email));
  }, [email]);

  return (
    <Panel title="My" highlight="Orders">
      {orders === null ? (
        <div className="h-40 rounded-[12px] bg-beige/40 animate-pulse" />
      ) : orders.length === 0 ? (
        <div className="rounded-[14px] border-2 border-dashed border-beige-dark/70 bg-cream/40 px-6 py-10 text-center">
          <div className="w-16 h-16 rounded-full bg-honey/20 flex items-center justify-center mx-auto mb-3 text-3xl" aria-hidden="true">
            🍯
          </div>
          <h3 className="font-serif text-xl font-bold text-forest-dark">No orders yet</h3>
          <p className="mt-1 font-sans text-sm text-charcoal/70 max-w-xs mx-auto">
            When you place an order, it will appear here so you can track it anytime.
          </p>
          <Link
            href="/shop"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-forest-dark hover:bg-forest text-white font-sans font-bold text-sm shadow-forest transition-colors"
          >
            Start Shopping <ArrowRight className="w-4 h-4 text-honey" />
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            const itemCount = order.lines.reduce((s, l) => s + l.quantity, 0);
            return (
              <li key={order.id} className="rounded-[14px] border border-beige bg-white hover:border-honey/70 transition-colors overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 sm:px-5 py-3 bg-cream/60 border-b border-beige/80 font-sans text-xs">
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50">Order ID</span>
                      <span className="font-bold text-forest-dark">{order.id}</span>
                    </span>
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50">Placed</span>
                      <span className="font-semibold text-charcoal/85">{formatOrderDate(order.createdAt)}</span>
                    </span>
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50">Total</span>
                      <span className="font-bold text-forest-dark">{formatINR(order.totals.total)}</span>
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-leaf/15 text-leaf-dark font-bold text-[11px]">
                    <Check className="w-3 h-3 stroke-[3]" /> Order Placed
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-5 py-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex -space-x-3">
                      {order.lines.slice(0, 3).map((line) => (
                        <div key={`${line.productId}-${line.weight}`} className="relative w-12 h-12 rounded-[5px] overflow-hidden bg-cream border-2 border-white shadow-soft-sm">
                          <Image src={line.imageUrl} alt={line.name} fill sizes="48px" className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <p className="font-sans text-xs sm:text-[13px] text-charcoal/80 min-w-0">
                      <span className="font-bold text-forest-dark">{order.lines[0]?.name}</span>
                      {order.lines.length > 1 && ` + ${order.lines.length - 1} more`}
                      <span className="block text-charcoal/55">
                        {itemCount} {itemCount === 1 ? 'jar' : 'jars'}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/order-confirmation?id=${encodeURIComponent(order.id)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] border border-beige bg-white hover:bg-beige/60 font-sans text-xs font-bold text-forest-dark transition-colors"
                  >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
};

/* ============================ PROFILE ============================ */

const ProfilePanel = ({ user }: { user: UserProfile }) => {
  const { updateProfile } = useAuth();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [marketingOptIn, setMarketingOptIn] = useState(user.marketingOptIn);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (name.trim().length < 2) nextErrors.name = 'Please enter your full name.';
    if (!INDIAN_MOBILE_PATTERN.test(normalizePhone(phone))) nextErrors.phone = 'Enter a valid 10-digit mobile number.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    updateProfile({ name: name.trim(), phone: normalizePhone(phone), marketingOptIn });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <Panel title="Profile" highlight="Details">
      <form onSubmit={handleSubmit} noValidate className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            id="profile-name"
            label="Full Name"
            icon={User}
            required
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((p) => ({ ...p, name: undefined }));
            }}
            error={errors.name}
          />
          <TextField
            id="profile-phone"
            label="Mobile Number"
            icon={Phone}
            prefix="+91"
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel-national"
            value={phone}
            onChange={(e) => {
              setPhone(stripCountryCode(e.target.value));
              setErrors((p) => ({ ...p, phone: undefined }));
            }}
            error={errors.phone}
          />
          <TextField
            id="profile-email"
            label="Email Address"
            icon={Mail}
            type="email"
            value={user.email}
            disabled
            hint="Your email is used to sign in and can’t be changed here."
            wrapperClassName="sm:col-span-2"
          />
        </div>
        <CheckboxField checked={marketingOptIn} onChange={setMarketingOptIn}>
          Email me about new harvests, recipes and offers.
        </CheckboxField>
        <div className="flex items-center gap-3 pt-1">
          <SubmitButton className="w-auto px-7">
            <Save className="w-4 h-4 text-honey" />
            <span>Save Changes</span>
          </SubmitButton>
          {saved && (
            <span role="status" className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-leaf-dark animate-in fade-in">
              <Check className="w-4 h-4 stroke-[3]" /> Saved
            </span>
          )}
        </div>
      </form>
    </Panel>
  );
};

/* ============================ ADDRESS ============================ */

const AddressPanel = ({ user }: { user: UserProfile }) => {
  const { updateProfile } = useAuth();
  const [editing, setEditing] = useState(!user.address);
  const [address, setAddress] = useState<ShippingAddress>(user.address ?? { ...EMPTY_ADDRESS, fullName: user.name });
  const [errors, setErrors] = useState<AddressErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateAddress(address);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    updateProfile({
      address: {
        fullName: address.fullName.trim(),
        line1: address.line1.trim(),
        line2: address.line2.trim(),
        landmark: address.landmark.trim(),
        city: address.city.trim(),
        state: address.state,
        pincode: address.pincode.trim(),
      },
    });
    setEditing(false);
  };

  return (
    <Panel
      title="Saved"
      highlight="Address"
      action={
        !editing && user.address ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] border border-beige bg-white hover:bg-beige/60 font-sans text-xs font-bold text-forest-dark transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
        ) : undefined
      }
    >
      {!editing && user.address ? (
        <div className="max-w-md rounded-[14px] border-2 border-forest-dark/80 bg-white p-5 relative">
          <span className="absolute top-4 right-4 px-2 py-0.5 rounded-[5px] bg-honey text-charcoal font-sans text-[10px] font-bold uppercase tracking-wider">
            Default
          </span>
          <AddressBlock address={user.address} phone={user.phone} />
          <p className="mt-3 pt-3 border-t border-beige/80 font-sans text-[11.5px] text-charcoal/60">
            This address is filled in automatically at checkout.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-2xl">
          <AddressFields
            idPrefix="account-addr"
            value={address}
            onChange={(field, value) => {
              setAddress((prev) => ({ ...prev, [field]: value }));
              if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
            }}
            errors={errors}
          />
          <div className="flex items-center gap-3">
            <SubmitButton className="w-auto px-7">
              <Save className="w-4 h-4 text-honey" />
              <span>Save Address</span>
            </SubmitButton>
            {user.address && (
              <button
                type="button"
                onClick={() => {
                  setAddress(user.address ?? EMPTY_ADDRESS);
                  setErrors({});
                  setEditing(false);
                }}
                className="px-5 py-3 rounded-[10px] border border-beige bg-white hover:bg-beige/60 font-sans text-sm font-bold text-charcoal/75 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </Panel>
  );
};
