/**
 * Store-wide commerce settings: shipping, coupons, payment options and
 * address reference data. Edit values here rather than in components.
 */

/** Orders at or above this subtotal ship free (matches the cart drawer promise). */
export const FREE_SHIPPING_THRESHOLD = 499;

/** Flat shipping fee charged below the free-shipping threshold. Confirm with operations. */
export const STANDARD_SHIPPING_FEE = 60;

export interface Coupon {
  code: string;
  description: string;
  type: 'percent' | 'flat';
  value: number;
  minSubtotal: number;
}

/** Active coupon codes. Add, edit or remove entries to manage promotions. */
export const COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    description: '10% off your order',
    type: 'percent',
    value: 10,
    minSubtotal: 0,
  },
];

export type PaymentMethodId = 'upi' | 'card' | 'netbanking' | 'cod';

export interface PaymentMethodOption {
  id: PaymentMethodId;
  label: string;
  description: string;
}

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  { id: 'upi', label: 'UPI', description: 'Google Pay, PhonePe, Paytm & any UPI app' },
  { id: 'card', label: 'Credit / Debit Card', description: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', description: 'All major Indian banks' },
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay in cash when your order arrives' },
];

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const;
