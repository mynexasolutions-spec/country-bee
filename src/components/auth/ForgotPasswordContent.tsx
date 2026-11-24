'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MailCheck, Send } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { EMAIL_PATTERN } from '@/lib/orders';
import { SubmitButton, TextField } from '@/components/forms/FormFields';
import { AuthShell } from './AuthShell';

/**
 * NOTE: Sending the reset email requires a backend / auth provider. Hook the
 * `handleSubmit` call up to it (e.g. `sendPasswordResetEmail`) before launch.
 */
export const ForgotPasswordContent = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setSent(true);
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello Country Bee! I need help signing in to my account (${email.trim() || 'my email'}).`
  )}`;

  return (
    <AuthShell
      eyebrow="ACCOUNT HELP"
      title="Locked"
      highlight="Out?"
      description="It happens to the best of us. We’ll help you get back to your honey in no time."
      benefits={['Reset your password securely', 'Your orders and address stay saved', 'Need a hand? We’re on WhatsApp']}
      formTitle="Reset"
      formHighlight="Password"
      formSubtitle="Enter the email you registered with and we’ll send you a reset link."
    >
      {sent ? (
        <div className="rounded-[14px] bg-leaf/10 border border-leaf/35 p-6 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-14 h-14 rounded-full bg-leaf text-white mx-auto flex items-center justify-center shadow-sm">
            <MailCheck className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-xl font-bold text-forest-dark">Check your inbox</h2>
          <p className="font-sans text-sm text-charcoal/80">
            If an account exists for <strong className="text-forest-dark break-all">{email.trim()}</strong>, a password reset
            link will arrive shortly.
          </p>
          <p className="font-sans text-xs text-charcoal/60">
            Didn’t get it?{' '}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-forest underline underline-offset-2">
              Message us on WhatsApp
            </a>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <TextField
            id="forgot-email"
            label="Email Address"
            icon={Mail}
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(undefined);
            }}
            error={error}
          />
          <SubmitButton>
            <Send className="w-4 h-4 text-honey fill-honey" />
            <span>Send Reset Link</span>
          </SubmitButton>
        </form>
      )}

      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-2 font-sans text-xs sm:text-[13px] font-bold text-forest-dark hover:text-honey-amber transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Log In
      </Link>
    </AuthShell>
  );
};
