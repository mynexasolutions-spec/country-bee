'use client';

import React from 'react';
import { Building2, Home, MapPin, Navigation, User } from 'lucide-react';
import { SelectField, TextField } from '@/components/forms/FormFields';
import { INDIAN_STATES } from '@/data/commerce';
import type { AddressErrors, ShippingAddress } from '@/lib/orders';

interface AddressFieldsProps {
  value: ShippingAddress;
  onChange: (field: keyof ShippingAddress, value: string) => void;
  errors?: AddressErrors;
  idPrefix?: string;
}

export const AddressFields = ({ value, onChange, errors = {}, idPrefix = 'addr' }: AddressFieldsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
    <TextField
      id={`${idPrefix}-fullName`}
      label="Full Name"
      icon={User}
      required
      autoComplete="name"
      placeholder="Recipient’s full name"
      value={value.fullName}
      onChange={(e) => onChange('fullName', e.target.value)}
      error={errors.fullName}
      wrapperClassName="sm:col-span-2"
    />
    <TextField
      id={`${idPrefix}-line1`}
      label="House / Flat, Street"
      icon={Home}
      required
      autoComplete="address-line1"
      placeholder="e.g. 12B, Lal Chowk Road"
      value={value.line1}
      onChange={(e) => onChange('line1', e.target.value)}
      error={errors.line1}
      wrapperClassName="sm:col-span-2"
    />
    <TextField
      id={`${idPrefix}-line2`}
      label="Area / Locality"
      icon={Building2}
      optional
      autoComplete="address-line2"
      placeholder="Colony, sector or village"
      value={value.line2}
      onChange={(e) => onChange('line2', e.target.value)}
    />
    <TextField
      id={`${idPrefix}-landmark`}
      label="Landmark"
      icon={Navigation}
      optional
      placeholder="Near school, temple, masjid…"
      value={value.landmark}
      onChange={(e) => onChange('landmark', e.target.value)}
    />
    <TextField
      id={`${idPrefix}-city`}
      label="City / Town"
      icon={MapPin}
      required
      autoComplete="address-level2"
      placeholder="City or town"
      value={value.city}
      onChange={(e) => onChange('city', e.target.value)}
      error={errors.city}
    />
    <TextField
      id={`${idPrefix}-pincode`}
      label="Pincode"
      required
      inputMode="numeric"
      autoComplete="postal-code"
      maxLength={6}
      placeholder="6-digit pincode"
      value={value.pincode}
      onChange={(e) => onChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
      error={errors.pincode}
    />
    <SelectField
      id={`${idPrefix}-state`}
      label="State / UT"
      required
      autoComplete="address-level1"
      placeholder="Select your state"
      options={INDIAN_STATES}
      value={value.state}
      onChange={(e) => onChange('state', e.target.value)}
      error={errors.state}
      wrapperClassName="sm:col-span-2"
    />
  </div>
);

/* Read-only formatted address block */
export const AddressBlock = ({ address, phone }: { address: ShippingAddress; phone?: string }) => (
  <address className="not-italic font-sans text-xs sm:text-[13.5px] text-charcoal/85 leading-relaxed">
    <span className="block font-bold text-forest-dark">{address.fullName}</span>
    <span className="block">{address.line1}</span>
    {address.line2 && <span className="block">{address.line2}</span>}
    {address.landmark && <span className="block">Near {address.landmark}</span>}
    <span className="block">
      {address.city}, {address.state} – {address.pincode}
    </span>
    {phone && <span className="block mt-1 font-semibold">+91 {phone}</span>}
  </address>
);
