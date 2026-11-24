'use client';

import React, { useId, useState } from 'react';
import { ChevronDown, Eye, EyeOff, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/* Shared look for every text input across contact, checkout and auth forms */
export const fieldBaseClass =
  'w-full py-3 rounded-[8px] bg-white border text-sm text-charcoal placeholder:text-charcoal/45 font-sans transition-colors focus:outline-none focus:ring-2 disabled:bg-cream/60 disabled:text-charcoal/60';

function stateClass(hasError: boolean) {
  return hasError
    ? 'border-red-400 focus:border-red-500 focus:ring-red-200/70'
    : 'border-beige-dark/80 focus:border-honey focus:ring-honey/25';
}

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  labelAction?: React.ReactNode;
  children: React.ReactNode;
}

export const FieldShell = ({
  id,
  label,
  required,
  optional,
  error,
  hint,
  className,
  labelAction,
  children,
}: FieldShellProps) => (
  <div className={className}>
    <div className="flex items-center justify-between gap-2 mb-1.5">
      <label
        htmlFor={id}
        className="block font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal/70"
      >
        {label}
        {required && <span className="text-honey-amber"> *</span>}
        {optional && (
          <span className="normal-case tracking-normal font-medium text-charcoal/45"> (optional)</span>
        )}
      </label>
      {labelAction}
    </div>
    {children}
    {error ? (
      <p id={`${id}-error`} role="alert" className="mt-1.5 font-sans text-[11.5px] font-medium text-red-600">
        {error}
      </p>
    ) : hint ? (
      <p id={`${id}-hint`} className="mt-1.5 font-sans text-[11.5px] text-charcoal/55">
        {hint}
      </p>
    ) : null}
  </div>
);

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id?: string;
  label: string;
  icon?: LucideIcon;
  error?: string;
  hint?: string;
  optional?: boolean;
  prefix?: string;
  wrapperClassName?: string;
  labelAction?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id: idProp,
      label,
      icon: Icon,
      error,
      hint,
      optional,
      prefix,
      required,
      wrapperClassName,
      labelAction,
      trailing,
      className,
      ...inputProps
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

    return (
      <FieldShell
        id={id}
        label={label}
        required={required}
        optional={optional}
        error={error}
        hint={hint}
        className={wrapperClassName}
        labelAction={labelAction}
      >
        <div className="relative">
          {Icon && (
            <Icon className="w-4 h-4 text-charcoal/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          )}
          {prefix && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2 font-sans text-sm font-semibold text-charcoal/70 pointer-events-none',
                Icon ? 'left-10' : 'left-4'
              )}
            >
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              fieldBaseClass,
              stateClass(Boolean(error)),
              Icon ? (prefix ? 'pl-[4.25rem]' : 'pl-11') : prefix ? 'pl-12' : 'pl-4',
              trailing ? 'pr-12' : 'pr-4',
              className
            )}
            {...inputProps}
          />
          {trailing && <div className="absolute right-1.5 top-1/2 -translate-y-1/2">{trailing}</div>}
        </div>
      </FieldShell>
    );
  }
);
TextField.displayName = 'TextField';

export const PasswordField = React.forwardRef<HTMLInputElement, Omit<TextFieldProps, 'type' | 'trailing'>>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <TextField
        ref={ref}
        {...props}
        type={visible ? 'text' : 'password'}
        trailing={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="w-9 h-9 rounded-[6px] flex items-center justify-center text-charcoal/55 hover:text-forest-dark hover:bg-beige/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
          >
            {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />
    );
  }
);
PasswordField.displayName = 'PasswordField';

export interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id?: string;
  label: string;
  icon?: LucideIcon;
  error?: string;
  hint?: string;
  placeholder: string;
  options: readonly string[];
  wrapperClassName?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    { id: idProp, label, icon: Icon, error, hint, placeholder, options, required, wrapperClassName, className, value, ...selectProps },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    return (
      <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
        <div className="relative">
          {Icon && (
            <Icon className="w-4 h-4 text-charcoal/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          )}
          <select
            ref={ref}
            id={id}
            required={required}
            value={value}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            className={cn(
              fieldBaseClass,
              stateClass(Boolean(error)),
              'appearance-none cursor-pointer pr-10',
              Icon ? 'pl-11' : 'pl-4',
              value ? 'text-charcoal' : 'text-charcoal/45',
              className
            )}
            {...selectProps}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt} className="text-charcoal">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-charcoal/55 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </FieldShell>
    );
  }
);
SelectField.displayName = 'SelectField';

interface CheckboxFieldProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

/* Native checkbox styled to match the honey-gold shop filter checkboxes */
export const CheckboxField = ({ id: idProp, checked, onChange, children, className }: CheckboxFieldProps) => {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <label htmlFor={id} className={cn('flex items-start gap-2.5 cursor-pointer select-none group', className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 shrink-0 rounded-[4px] border-beige-dark accent-[#F5B400] cursor-pointer"
      />
      <span className="font-sans text-xs sm:text-[13px] text-charcoal/80 group-hover:text-charcoal leading-snug">
        {children}
      </span>
    </label>
  );
};

/* Primary forest-gradient submit button (same as Contact page "Send Message") */
export const SubmitButton = ({
  children,
  loading,
  loadingText,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; loadingText?: string }) => (
  <button
    type="submit"
    disabled={loading || props.disabled}
    className={cn(
      'group w-full py-3.5 px-6 rounded-[10px] bg-gradient-to-r from-[#134222] via-[#1B542E] to-[#0D3219] hover:from-[#0E331B] hover:to-[#134222] text-white font-sans font-bold text-sm sm:text-[15px] shadow-forest flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2 cursor-pointer disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0',
      className
    )}
    {...props}
  >
    {loading ? (
      <>
        <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-honey animate-spin" aria-hidden="true" />
        <span>{loadingText ?? 'Please wait…'}</span>
      </>
    ) : (
      children
    )}
  </button>
);

/* Inline banner for form-level errors */
export const FormAlert = ({ message }: { message: string | null }) =>
  message ? (
    <div
      role="alert"
      className="rounded-[8px] border border-red-200 bg-red-50 px-3.5 py-2.5 font-sans text-xs sm:text-[13px] font-medium text-red-700"
    >
      {message}
    </div>
  ) : null;
