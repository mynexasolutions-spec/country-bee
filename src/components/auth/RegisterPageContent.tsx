'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Phone, User, UserPlus } from 'lucide-react';
import { getSafeRedirect, useAuth } from '@/context/AuthContext';
import { EMAIL_PATTERN, INDIAN_MOBILE_PATTERN, normalizePhone, stripCountryCode } from '@/lib/orders';
import { cn } from '@/lib/utils';
import { CheckboxField, FormAlert, PasswordField, SubmitButton, TextField } from '@/components/forms/FormFields';
import { AuthDivider, AuthShell } from './AuthShell';

type Field = 'name' | 'email' | 'phone' | 'password' | 'confirm';

function passwordStrength(pw: string): { score: 0 | 1 | 2 | 3 | 4; label: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++;
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
  const capped = (pw.length < 8 ? Math.min(score, 1) : score) as 0 | 1 | 2 | 3 | 4;
  return { score: capped, label: labels[capped] };
}

const STRENGTH_COLORS = ['bg-red-400', 'bg-red-400', 'bg-honey-amber', 'bg-leaf', 'bg-forest'];

export const RegisterPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = getSafeRedirect(searchParams.get('next'));
  const { user, isReady, register } = useAuth();

  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isReady && user) router.replace(next);
  }, [isReady, user, next, router]);

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'phone' ? stripCountryCode(e.target.value) : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const strength = passwordStrength(values.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<Field, string>> = {};
    if (values.name.trim().length < 2) nextErrors.name = 'Please enter your full name.';
    if (!EMAIL_PATTERN.test(values.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!INDIAN_MOBILE_PATTERN.test(normalizePhone(values.phone))) nextErrors.phone = 'Enter a valid 10-digit mobile number.';
    if (values.password.length < 8) nextErrors.password = 'Use at least 8 characters.';
    else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password))
      nextErrors.password = 'Include at least one letter and one number.';
    if (values.confirm !== values.password) nextErrors.confirm = 'Passwords don’t match.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setFormError(null);
    const result = await register({
      name: values.name,
      email: values.email,
      phone: normalizePhone(values.phone),
      password: values.password,
      marketingOptIn,
    });
    if (!result.ok) {
      setFormError(result.error);
      setLoading(false);
    }
  };

  const nextQuery = next !== '/account' ? `?next=${encodeURIComponent(next)}` : '';

  return (
    <AuthShell
      eyebrow="JOIN COUNTRY BEE"
      title="Join Our"
      highlight="Honey Family"
      description="Create a free account to save your delivery address, check out in seconds and track your orders."
      benefits={['Save your address for one-tap checkout', 'Track every order in one place', 'Hear first about fresh seasonal harvests']}
      formTitle="Create"
      formHighlight="Your Account"
      formSubtitle={
        <>
          Already have an account?{' '}
          <Link href={`/login${nextQuery}`} className="font-bold text-forest hover:text-honey-amber underline decoration-honey decoration-2 underline-offset-4">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormAlert message={formError} />

        <TextField
          id="register-name"
          label="Full Name"
          icon={User}
          required
          autoComplete="name"
          placeholder="Your full name"
          value={values.name}
          onChange={set('name')}
          error={errors.name}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            id="register-email"
            label="Email Address"
            icon={Mail}
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={set('email')}
            error={errors.email}
          />
          <TextField
            id="register-phone"
            label="Mobile Number"
            icon={Phone}
            prefix="+91"
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="98765 43210"
            value={values.phone}
            onChange={set('phone')}
            error={errors.phone}
          />
        </div>

        <div>
          <PasswordField
            id="register-password"
            label="Password"
            icon={Lock}
            required
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={values.password}
            onChange={set('password')}
            error={errors.password}
          />
          {values.password && !errors.password && (
            <div className="mt-2 flex items-center gap-2.5" aria-live="polite">
              <div className="flex-1 grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    className={cn(
                      'h-1.5 rounded-full transition-colors',
                      strength.score >= n ? STRENGTH_COLORS[strength.score] : 'bg-beige'
                    )}
                  />
                ))}
              </div>
              <span className="font-sans text-[11px] font-semibold text-charcoal/65 w-16 text-right">{strength.label}</span>
            </div>
          )}
        </div>

        <PasswordField
          id="register-confirm"
          label="Confirm Password"
          icon={Lock}
          required
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={values.confirm}
          onChange={set('confirm')}
          error={errors.confirm}
        />

        <CheckboxField checked={marketingOptIn} onChange={setMarketingOptIn}>
          Email me about new harvests, recipes and offers. You can unsubscribe anytime.
        </CheckboxField>

        <SubmitButton loading={loading} loadingText="Creating account…">
          <UserPlus className="w-4 h-4 text-honey" />
          <span>Create Account</span>
        </SubmitButton>
      </form>

      <AuthDivider label="or" />

      <p className="text-center font-sans text-xs text-charcoal/60">
        <Link href="/shop" className="font-bold text-forest hover:text-honey-amber underline underline-offset-2">
          Continue shopping
        </Link>{' '}
        — you can also check out as a guest.
      </p>
    </AuthShell>
  );
};
