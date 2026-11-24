'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Lock, LogIn, Mail } from 'lucide-react';
import { getSafeRedirect, useAuth } from '@/context/AuthContext';
import { EMAIL_PATTERN } from '@/lib/orders';
import { CheckboxField, FormAlert, PasswordField, SubmitButton, TextField } from '@/components/forms/FormFields';
import { AuthDivider, AuthShell } from './AuthShell';

export const LoginPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = getSafeRedirect(searchParams.get('next'));
  const { user, isReady, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Already signed in → skip the form
  useEffect(() => {
    if (isReady && user) router.replace(next);
  }, [isReady, user, next, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!password) nextErrors.password = 'Please enter your password.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setFormError(null);
    const result = await login(email, password, remember);
    if (!result.ok) {
      setFormError(result.error);
      setLoading(false);
    }
    // On success the effect above redirects
  };

  const nextQuery = next !== '/account' ? `?next=${encodeURIComponent(next)}` : '';

  return (
    <AuthShell
      eyebrow="WELCOME BACK"
      title="Sweet to See"
      highlight="You Again"
      description="Sign in to check out faster and keep track of every jar of pure Kashmir honey you order."
      benefits={['Faster checkout with saved address', 'View your complete order history', 'Pan India delivery to your doorstep']}
      formTitle="Log In to"
      formHighlight="Your Account"
      formSubtitle="Enter your email and password to continue."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormAlert message={formError} />

        <TextField
          id="login-email"
          label="Email Address"
          icon={Mail}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((p) => ({ ...p, email: undefined }));
          }}
          error={errors.email}
        />

        <PasswordField
          id="login-password"
          label="Password"
          icon={Lock}
          required
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((p) => ({ ...p, password: undefined }));
          }}
          error={errors.password}
          labelAction={
            <Link href="/forgot-password" className="font-sans text-[11.5px] font-bold text-forest hover:text-honey-amber transition-colors">
              Forgot password?
            </Link>
          }
        />

        <CheckboxField checked={remember} onChange={setRemember}>
          Keep me signed in on this device
        </CheckboxField>

        <SubmitButton loading={loading} loadingText="Signing in…">
          <LogIn className="w-4 h-4 text-honey" />
          <span>Log In</span>
        </SubmitButton>
      </form>

      <AuthDivider label="New to Country Bee?" />

      <Link
        href={`/register${nextQuery}`}
        className="w-full py-3 px-6 rounded-[10px] border-2 border-forest-dark text-forest-dark hover:bg-forest-dark hover:text-white font-sans font-bold text-sm flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
      >
        Create an Account <ArrowRight className="w-4 h-4" />
      </Link>

      <p className="mt-5 text-center font-sans text-xs text-charcoal/60">
        Prefer not to sign in?{' '}
        <Link href={next === '/checkout' ? '/checkout' : '/shop'} className="font-bold text-forest hover:text-honey-amber underline underline-offset-2">
          {next === '/checkout' ? 'Continue as guest' : 'Keep shopping'}
        </Link>
      </p>
    </AuthShell>
  );
};
