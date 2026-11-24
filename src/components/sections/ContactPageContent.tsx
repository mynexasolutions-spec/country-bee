'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  User,
  Mail,
  Phone,
  Tag,
  MessageSquareText,
  Send,
  MapPin,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CONTACT_INFO = {
  address: 'B1,192 Behind Jamal Masjid, Checki wangung, Qazigund, Anantnag 192221',
  email: 'countrybeefoods@gmail.com',
  phoneDisplay: '+918825065419',
  phoneHref: '+918825065419',
  whatsappNumber: '918825065419',
};

const INQUIRY_OPTIONS = [
  'General Inquiry',
  'Bulk / Wholesale Order',
  'Single-Origin Honey Varieties',
  'Order Status & Delivery',
  'Corporate & Festive Gifting',
] as const;

const SERVICE_BADGES = [
  {
    id: 'bulk',
    title: 'Bulk Orders',
    subtitle: 'Available',
  },
  {
    id: 'support',
    title: 'Quick Support',
    subtitle: 'Get a fast response',
  },
  {
    id: 'trusted',
    title: 'Trusted & Authentic',
    subtitle: 'Since 1988',
  },
  {
    id: 'pure',
    title: '100% Pure Honey',
    subtitle: 'From Indian Valleys',
  },
] as const;

const ServiceBadgeIcon = ({ id }: { id: (typeof SERVICE_BADGES)[number]['id'] }) => {
  const cls = 'w-9 h-9 text-[#D99800] mx-auto transition-transform duration-300 group-hover:scale-110';

  switch (id) {
    case 'bulk':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cls}
        >
          <path d="M5 14h23v19H5zM28 20h8l6 6v7H28z" />
          <circle cx="14" cy="35" r="3.5" />
          <circle cx="35" cy="35" r="3.5" />
        </svg>
      );
    case 'support':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cls}
        >
          <path d="M9 26v-3a15 15 0 0 1 30 0v3" />
          <rect x="7" y="24" width="6" height="11" rx="3" />
          <rect x="35" y="24" width="6" height="11" rx="3" />
          <path d="M38 35c-.5 4-4 6-10 6h-3" />
        </svg>
      );
    case 'trusted':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cls}
        >
          <path d="M24 6C19 9.2 14.2 10.5 9.5 10.8V22.5C9.5 32.2 15.8 39.2 24 42.5C32.2 39.2 38.5 32.2 38.5 22.5V10.8C33.8 10.5 29 9.2 24 6Z" />
          <path d="M17.5 24.2L22 28.8L30.8 19.2" strokeWidth="2.8" />
        </svg>
      );
    case 'pure':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cls}
        >
          <path d="M38 9C22 9 11 16 10 29.5C10 36 14.5 40.5 21 39.5C35 37.5 39 23 38 9Z" />
          <path d="M10 39.5C16.5 29.5 24 23.5 34 16" />
        </svg>
      );
  }
};

export const ContactPageContent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setInquiryType('');
    setMessage('');
    setSubmitted(false);
  };

  const whatsappDirectUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    name.trim()
      ? `Hello Country Bee! My name is ${name.trim()}. Inquiry: ${
          inquiryType || 'General Inquiry'
        }. ${message.trim()}`
      : 'Hello Country Bee! I would like to inquire about your pure honey varieties or bulk orders.'
  )}`;

  return (
    <div className="relative w-full bg-cream text-charcoal overflow-x-clip">
      {/* =====================================================================
          1. HERO BANNER — Same Kashmir Valley Hero Section as About Us
          ===================================================================== */}
      <section
        aria-labelledby="contact-hero-heading"
        className="relative w-full min-h-[210px] xs:min-h-[230px] sm:min-h-[245px] md:min-h-[260px] lg:min-h-[270px] xl:min-h-[290px] 2xl:min-h-[310px] flex items-center overflow-hidden bg-[#092D17]"
      >
        <Image
          src="/images/others/abouts_hero_section.png"
          alt="Kashmir valleys with Country Bee raw honey jar, wooden dipper, and fresh honeycomb"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[76%_52%] sm:object-[70%_52%] lg:object-center"
        />

        {/* Deep Forest Left Readability Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#072412]/90 via-[#092D17]/65 sm:via-[#092D17]/42 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#092D17]/45 to-transparent"
        />

        <div className="relative z-10 cb-container py-5 sm:py-7 lg:py-8">
          <div className="max-w-lg space-y-2.5 sm:space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="block font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.26em] text-cream/95">
              GET IN TOUCH
            </span>

            <h1
              id="contact-hero-heading"
              className="font-serif font-extrabold text-3xl xs:text-[38px] sm:text-[44px] lg:text-[50px] leading-[1.05] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
            >
              <span className="text-white">Contact </span>
              <span className="text-honey">Us</span>
            </h1>

            {/* Golden Horizontal Accent Rule */}
            <div className="w-24 sm:w-32 h-[2px] bg-honey rounded-full" aria-hidden="true" />

            <p className="font-sans text-xs xs:text-sm sm:text-[15px] lg:text-base text-cream/95 leading-relaxed max-w-md pt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              Have a question, bulk order inquiry, or want to know more about our honeys? We&apos;re
              here to help.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. TWO-COLUMN MAIN CONTACT SECTION (Form Card | Info & WhatsApp Cards)
          ===================================================================== */}
      <section aria-label="Contact Form and Details" className="relative py-10 sm:py-14">
        <div className="cb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* ----------------- LEFT: SEND US A MESSAGE FORM CARD ----------------- */}
            <div className="lg:col-span-7">
              <div className="rounded-[18px] bg-[#FFFDF8] border border-beige/95 shadow-soft p-5 sm:p-7 lg:p-8">
                <div className="mb-6">
                  <h2 className="font-serif font-extrabold text-[26px] sm:text-[32px] leading-tight tracking-tight text-forest-dark">
                    Send Us a <span className="text-[#D48D15]">Message</span>
                  </h2>
                  <p className="mt-1.5 font-sans text-xs sm:text-sm text-charcoal/80">
                    Fill out the form below and we&apos;ll get back to you soon.
                  </p>
                </div>

                {submitted ? (
                  <div className="rounded-[14px] bg-leaf/10 border border-leaf/35 p-6 sm:p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-14 h-14 rounded-full bg-leaf text-white mx-auto flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-2xl font-bold text-forest-dark">
                        Thank You, {name}!
                      </h3>
                      <p className="font-sans text-sm text-charcoal/85 max-w-md mx-auto">
                        We&apos;ve received your inquiry and our Country Bee team in Kashmir will
                        get back to you shortly.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-forest-dark hover:bg-forest text-white font-sans font-bold text-xs sm:text-sm transition-colors"
                      >
                        <span>Also Send on WhatsApp</span>
                        <ArrowRight className="w-4 h-4 text-honey" />
                      </a>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-5 py-2.5 rounded-[10px] border border-beige bg-white hover:bg-beige/60 text-charcoal font-sans font-bold text-xs sm:text-sm transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    {/* Your Name */}
                    <div className="relative">
                      <label htmlFor="contact-name" className="sr-only">
                        Your Name
                      </label>
                      <User className="w-4 h-4 text-charcoal/55 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full pl-11 pr-4 py-3 rounded-[8px] bg-white border border-beige-dark/80 text-sm text-charcoal placeholder:text-charcoal/50 font-sans transition-colors focus:outline-none focus:border-honey focus:ring-2 focus:ring-honey/25"
                      />
                    </div>

                    {/* Your Email */}
                    <div className="relative">
                      <label htmlFor="contact-email" className="sr-only">
                        Your Email
                      </label>
                      <Mail className="w-4 h-4 text-charcoal/55 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        className="w-full pl-11 pr-4 py-3 rounded-[8px] bg-white border border-beige-dark/80 text-sm text-charcoal placeholder:text-charcoal/50 font-sans transition-colors focus:outline-none focus:border-honey focus:ring-2 focus:ring-honey/25"
                      />
                    </div>

                    {/* Your Phone */}
                    <div className="relative">
                      <label htmlFor="contact-phone" className="sr-only">
                        Your Phone
                      </label>
                      <Phone className="w-4 h-4 text-charcoal/55 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your Phone"
                        className="w-full pl-11 pr-4 py-3 rounded-[8px] bg-white border border-beige-dark/80 text-sm text-charcoal placeholder:text-charcoal/50 font-sans transition-colors focus:outline-none focus:border-honey focus:ring-2 focus:ring-honey/25"
                      />
                    </div>

                    {/* Inquiry Type Select */}
                    <div className="relative">
                      <label htmlFor="contact-inquiry" className="sr-only">
                        Inquiry Type
                      </label>
                      <Tag className="w-4 h-4 text-charcoal/55 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        id="contact-inquiry"
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className={cn(
                          'w-full pl-11 pr-10 py-3 rounded-[8px] bg-white border border-beige-dark/80 text-sm font-sans appearance-none transition-colors focus:outline-none focus:border-honey focus:ring-2 focus:ring-honey/25 cursor-pointer',
                          inquiryType ? 'text-charcoal' : 'text-charcoal/50'
                        )}
                      >
                        <option value="" disabled>
                          Inquiry Type
                        </option>
                        {INQUIRY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="text-charcoal">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-charcoal/60 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Your Message */}
                    <div className="relative">
                      <label htmlFor="contact-message" className="sr-only">
                        Your Message
                      </label>
                      <MessageSquareText className="w-4 h-4 text-charcoal/55 absolute left-4 top-3.5 pointer-events-none" />
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your Message"
                        className="w-full pl-11 pr-4 py-3 rounded-[8px] bg-white border border-beige-dark/80 text-sm text-charcoal placeholder:text-charcoal/50 font-sans transition-colors focus:outline-none focus:border-honey focus:ring-2 focus:ring-honey/25 resize-y"
                      />
                    </div>

                    {/* Submit CTA Button */}
                    <button
                      type="submit"
                      className="group w-full py-3.5 px-6 rounded-[10px] bg-gradient-to-r from-[#134222] via-[#1B542E] to-[#0D3219] hover:from-[#0E331B] hover:to-[#134222] text-white font-sans font-bold text-sm sm:text-[15px] shadow-forest flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-honey fill-honey transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ----------------- RIGHT: ADDRESS, EMAIL, CALL & WHATSAPP CARDS ----------------- */}
            <div className="lg:col-span-5 space-y-4">
              {/* 1. Address Card */}
              <div className="group rounded-[14px] bg-[#FFFDF8] border border-beige/95 hover:border-honey/80 p-4 sm:p-5 shadow-soft-sm hover:shadow-soft flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-[12px] bg-[#FCE8A8] text-forest-dark flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <MapPin className="w-6 h-6" strokeWidth={2.1} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif font-extrabold text-lg sm:text-xl text-forest-dark leading-snug">
                    Address
                  </h3>
                  <p className="mt-0.5 font-sans text-xs sm:text-[13.5px] font-medium text-charcoal/85 leading-relaxed">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              {/* 2. Email Us Card */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group rounded-[14px] bg-[#FFFDF8] border border-beige/95 hover:border-honey/80 p-4 sm:p-5 shadow-soft-sm hover:shadow-soft flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              >
                <div className="w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-[12px] bg-[#FCE8A8] text-forest-dark flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Mail className="w-6 h-6" strokeWidth={2.1} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif font-extrabold text-lg sm:text-xl text-forest-dark leading-snug">
                    Email Us
                  </h3>
                  <p className="mt-0.5 font-sans text-xs sm:text-[14px] font-semibold text-charcoal/85 group-hover:text-forest transition-colors break-all">
                    {CONTACT_INFO.email}
                  </p>
                </div>
              </a>

              {/* 3. Call Us Card */}
              <a
                href={`tel:${CONTACT_INFO.phoneHref}`}
                className="group rounded-[14px] bg-[#FFFDF8] border border-beige/95 hover:border-honey/80 p-4 sm:p-5 shadow-soft-sm hover:shadow-soft flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              >
                <div className="w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-[12px] bg-[#FCE8A8] text-forest-dark flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Phone className="w-6 h-6" strokeWidth={2.1} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif font-extrabold text-lg sm:text-xl text-forest-dark leading-snug">
                    Call Us
                  </h3>
                  <p className="mt-0.5 font-sans text-sm sm:text-[15px] font-bold text-charcoal/90 group-hover:text-forest transition-colors">
                    {CONTACT_INFO.phoneDisplay}
                  </p>
                </div>
              </a>

              {/* 4. Chat with Us on WhatsApp Deep Forest Card */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-[16px] bg-gradient-to-r from-[#123D20] via-[#1B542E] to-[#0D3219] border border-forest-light/75 p-5 sm:p-6 shadow-forest hover:shadow-soft-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              >
                {/* Decorative Botanical Leaf Corners */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="pointer-events-none absolute -left-2 -bottom-2 w-16 h-16 text-leaf/35"
                >
                  <path
                    d="M6 74C22 54 38 40 64 28M20 58C16 38 26 22 44 16C46 34 36 50 20 58Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="currentColor"
                    fillOpacity="0.18"
                  />
                </svg>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="pointer-events-none absolute -right-2 -bottom-2 w-16 h-16 text-leaf/35 -scale-x-100"
                >
                  <path
                    d="M6 74C22 54 38 40 64 28M20 58C16 38 26 22 44 16C46 34 36 50 20 58Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="currentColor"
                    fillOpacity="0.18"
                  />
                </svg>

                <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Bright WhatsApp Circle Badge */}
                    <span className="w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-full bg-[#25D366] text-white border-2 border-white shadow-md flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                        <path
                          d="M16 4C9.4 4 4 9.2 4 15.6C4 18 4.8 20.2 6 22L4.5 27.8L10.6 26.2C12.2 27.1 14.1 27.6 16 27.6C22.6 27.6 28 22.4 28 16C28 9.2 22.6 4 16 4Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.3 10.8C11.9 10.8 11.4 11 11.1 11.4C10.5 12 10 13 10 14.3C10 15.9 11.2 17.5 12.7 19C14.3 20.5 16.2 21.5 17.9 21.7C19.3 21.8 20.4 21.3 21 20.6C21.4 20.2 21.6 19.6 21.6 19.2C21.6 18.8 21.3 18.5 20.9 18.3L18.9 17.4C18.5 17.2 18.1 17.3 17.8 17.6L17.1 18.4C16.8 18.7 16.4 18.8 16 18.6C15.1 18.2 13.8 17 13.3 16C13.1 15.6 13.2 15.2 13.5 14.9L14.2 14.2C14.5 13.9 14.6 13.5 14.4 13.1L13.5 11.2C13.3 10.9 12.9 10.8 12.3 10.8Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>

                    <span className="w-px h-11 bg-honey/35 shrink-0" aria-hidden="true" />

                    <div className="min-w-0">
                      <span className="block font-serif font-bold text-sm sm:text-base text-white leading-tight">
                        Chat with Us on
                      </span>
                      <span className="block font-serif font-extrabold text-xl sm:text-2xl text-honey-yellow leading-tight mt-0.5">
                        WhatsApp
                      </span>
                    </div>
                  </div>

                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-honey group-hover:bg-honey-yellow text-charcoal flex items-center justify-center shrink-0 shadow-honey transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. BOTTOM 4 SERVICE TRUST BADGES ROW
          ===================================================================== */}
      <section aria-label="Customer Service Promises" className="relative pt-2 pb-12 sm:pb-16">
        {/* Decorative Subtle Right Honeycomb Outlines */}
        <svg
          aria-hidden="true"
          viewBox="0 0 110 130"
          fill="none"
          className="hidden md:block pointer-events-none absolute right-2 top-0 w-20 lg:w-24 h-auto text-honey/35"
        >
          <polygon points="36,8 62,22 62,50 36,64 10,50 10,22" stroke="currentColor" strokeWidth="1.6" />
          <polygon points="66,54 92,68 92,96 66,110 40,96 40,68" stroke="currentColor" strokeWidth="1.6" />
        </svg>

        <div className="relative z-10 cb-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-7 gap-x-4 lg:gap-0 lg:divide-x lg:divide-beige-dark/65">
            {SERVICE_BADGES.map((badge) => (
              <div
                key={badge.id}
                className="group flex flex-col items-center text-center px-3 space-y-2"
              >
                <ServiceBadgeIcon id={badge.id} />
                <div>
                  <h3 className="font-serif font-extrabold text-sm sm:text-base text-forest-dark">
                    {badge.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-charcoal/75 mt-0.5">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
