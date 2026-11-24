/**
 * Order pricing and storage.
 *
 * NOTE: Orders are currently kept in the shopper's browser (localStorage) so the
 * checkout flow works end to end without a backend. Before going live, replace
 * `saveOrder` / `getOrderById` / `getOrdersByEmail` with API calls, recompute
 * totals on the server, and connect a payment gateway (e.g. Razorpay) for the
 * online payment methods. No payment is collected by this code.
 */
import type { CartItem } from '@/context/CartContext';
import {
  COUPONS,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
  type Coupon,
  type PaymentMethodId,
} from '@/data/commerce';

export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

export const EMPTY_ADDRESS: ShippingAddress = {
  fullName: '',
  line1: '',
  line2: '',
  landmark: '',
  city: '',
  state: '',
  pincode: '',
};

export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export type OrderLine = Omit<CartItem, 'key'>;

export interface Order {
  id: string;
  createdAt: string;
  status: 'placed';
  email: string;
  phone: string;
  userId?: string;
  address: ShippingAddress;
  paymentMethod: PaymentMethodId;
  couponCode?: string;
  notes?: string;
  lines: OrderLine[];
  totals: OrderTotals;
}

const ORDERS_KEY = 'country_bee_orders_v1';

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((c) => c.code === normalized);
}

export function getCouponDiscount(coupon: Coupon | undefined, subtotal: number): number {
  if (!coupon || subtotal < coupon.minSubtotal) return 0;
  const raw = coupon.type === 'percent' ? (subtotal * coupon.value) / 100 : coupon.value;
  return Math.min(Math.round(raw), subtotal);
}

export function getShippingFee(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
}

export function computeTotals(subtotal: number, coupon?: Coupon): OrderTotals {
  const discount = getCouponDiscount(coupon, subtotal);
  const shipping = getShippingFee(subtotal);
  return {
    subtotal,
    discount,
    shipping,
    total: Math.max(0, subtotal - discount + shipping),
  };
}

/* ------------------------------------------------------------------ */
/* Storage                                                             */
/* ------------------------------------------------------------------ */

function readOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as Order[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function generateOrderId(): string {
  const time = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `CB-${time}${rand}`;
}

export function saveOrder(order: Order): void {
  const orders = readOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
}

export function getOrderById(id: string): Order | undefined {
  return readOrders().find((o) => o.id === id);
}

export function getOrdersByEmail(email: string): Order[] {
  const normalized = email.trim().toLowerCase();
  return readOrders().filter((o) => o.email.toLowerCase() === normalized);
}

/* ------------------------------------------------------------------ */
/* Validation helpers (shared by checkout, register and account forms) */
/* ------------------------------------------------------------------ */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;
export const PINCODE_PATTERN = /^[1-9]\d{5}$/;

/** For phone inputs that already show a +91 prefix: drop a typed/pasted "+91". */
export function stripCountryCode(value: string): string {
  return value.replace(/^\s*\+91[\s-]?/, '');
}

/** Strips spaces, dashes and a leading +91 / 0 so "+91 98765-43210" validates. */
export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

export type AddressErrors = Partial<Record<keyof ShippingAddress, string>>;

export function validateAddress(address: ShippingAddress): AddressErrors {
  const errors: AddressErrors = {};
  if (address.fullName.trim().length < 2) errors.fullName = 'Please enter the recipient’s full name.';
  if (address.line1.trim().length < 5) errors.line1 = 'Please enter your house / flat and street.';
  if (address.city.trim().length < 2) errors.city = 'Please enter your city or town.';
  if (!address.state) errors.state = 'Please select your state.';
  if (!PINCODE_PATTERN.test(address.pincode.trim())) errors.pincode = 'Enter a valid 6-digit pincode.';
  return errors;
}

export function formatOrderDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
