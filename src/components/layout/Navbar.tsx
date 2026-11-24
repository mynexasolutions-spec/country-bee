'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Clock,
  ShieldCheck,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { honeyProducts, formatINR } from '@/data/products';

// Top Bar Value Propositions (matching image)
const TOP_BAR_FEATURES = [
  {
    id: 'pure',
    label: '100% Pure & Natural Honey',
    icon: (
      <svg
        className="w-4 h-4 text-honey shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M39 7C22 7 9 14 8 29c0 7 5 12 12 11C35 38 40 22 39 7Z" />
        <path d="M8 40c7-11 15-17 26-25" />
      </svg>
    ),
  },
  {
    id: 'chemicals',
    label: 'No Chemicals or Antibiotics',
    icon: (
      <svg
        className="w-4 h-4 text-honey shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 7h12M21 7v12L11 37a4 4 0 0 0 4 6h18a4 4 0 0 0 4-6L27 19V7" />
        <path d="M16 32h16M19 26h10" />
      </svg>
    ),
  },
  {
    id: 'organic',
    label: 'Organic Certified',
    icon: (
      <svg
        className="w-4 h-4 text-honey shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M24 3 29 7l7-1 3 7 6 4-2 8 2 7-7 4-3 7-8-1-6 4-6-5-7-1-1-8-5-6 4-7-1-7 8-3Z" />
        <path d="M15 27c8 0 13-5 15-13 7 9 3 20-6 21-6 1-9-3-9-8Z" />
        <path d="M13 35h18" />
      </svg>
    ),
  },
  {
    id: 'delivery',
    label: 'Pan India Delivery',
    icon: (
      <svg
        className="w-4 h-4 text-honey shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 13h24v22H4zM28 21h9l7 8v6H28z" />
        <circle cx="13" cy="37" r="4" />
        <circle cx="36" cy="37" r="4" />
      </svg>
    ),
  },
];

// Mega Menu Collection Links (matching uploaded layout)
const MEGA_MENU_COLLECTIONS = [
  { name: 'All Products', href: '/shop' },
  { name: 'Kashmir Specials', href: '/shop?category=kashmir' },
  { name: 'Single Floral Honey', href: '/shop?category=single-origin' },
  { name: 'Multi Floral Blends', href: '/shop?category=multi-floral' },
  { name: 'Pure Honeycomb & Raw', href: '/shop?category=raw-forest' },
  { name: 'Best Sellers', href: '/shop?badge=bestseller', badge: 'POPULAR', badgeType: 'popular' },
  { name: 'New Harvests', href: '/shop?filter=new', badge: 'NEW', badgeType: 'new' },
];

// Mega Menu Featured Items (Matching reference layout with Country Bee products)
const MEGA_MENU_FEATURED = [
  {
    category: 'KASHMIR SPECIAL',
    name: 'Borage Honey',
    slug: 'borage-honey',
    price: 320,
    originalPrice: 450,
    imageUrl: '/images/products/Country_Bee_Borage_Honey.png',
  },
  {
    category: 'SINGLE FLORAL',
    name: 'Acacia Honey',
    slug: 'acacia-honey',
    price: 320,
    originalPrice: 480,
    imageUrl: '/images/products/Country_Bee_Acacia_Honey.png',
  },
  {
    category: 'ROYAL GRADE',
    name: 'Sidr Honey',
    slug: 'sidr-honey',
    price: 210,
    originalPrice: 350,
    imageUrl: '/images/products/Country_Bee_Sidar_honey.png',
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  const {
    items: cartItems,
    cartCount,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  // Interactive states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isShopMobileExpanded, setIsShopMobileExpanded] = useState(false);
  const [mobileFeatureIndex, setMobileFeatureIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.trim()
    ? honeyProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.floralSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.origin.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : honeyProducts.slice(0, 3);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-rotating ticker for mobile announcement bar
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileFeatureIndex((prev) => (prev + 1) % TOP_BAR_FEATURES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Focus search input when search modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Lock body scroll when mobile drawer or search is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isSearchOpen, isCartOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsShopHovered(false);
  }, [pathname, setIsCartOpen]);

  const isHomeActive = pathname === '/' || pathname === '';

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* =========================================================================
          1. TOP ANNOUNCEMENT / USP BAR (Deep Forest Green with Honey Icons)
          ========================================================================= */}
      <section
        aria-label="Country Bee Benefits"
        className="w-full bg-[#092D17] text-white py-2 px-4 select-none border-b border-[#123D20]"
      >
        <div className="cb-container">
          {/* Desktop & Tablet Display: All 4 USPs with vertical divider '|' */}
          <div className="hidden md:flex items-center justify-between gap-6 lg:gap-9 text-xs lg:text-[13px] font-sans font-medium tracking-tight">
            {TOP_BAR_FEATURES.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="inline-flex items-center gap-2 text-white/95 transition-opacity hover:text-white">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {index < TOP_BAR_FEATURES.length - 1 && (
                  <span className="text-white/35 font-light" aria-hidden="true">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Display: Clean smooth auto-rotating ticker */}
          <div className="flex md:hidden items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden h-5">
              <span className="shrink-0">{TOP_BAR_FEATURES[mobileFeatureIndex].icon}</span>
              <span className="text-xs font-medium text-white/95 truncate transition-all duration-300">
                {TOP_BAR_FEATURES[mobileFeatureIndex].label}
              </span>
            </div>

            {/* Mobile Ticker Dots Indicator */}
            <div className="flex items-center gap-1 shrink-0 ml-2" aria-hidden="true">
              {TOP_BAR_FEATURES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileFeatureIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    mobileFeatureIndex === i ? 'bg-honey w-3.5' : 'bg-white/30'
                  }`}
                  aria-label={`Show announcement ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MAIN NAVBAR ROW (Cream background, Logo, Pill Links, Action Icons)
          ========================================================================= */}
      <nav
        aria-label="Main Navigation"
        className="w-full bg-[#FFF7EA] border-b border-[#F3E5D0] shadow-[0_2px_12px_-2px_rgba(41,37,31,0.06)] backdrop-blur-md"
      >
        <div className="cb-container">
          <div className="flex items-center justify-between h-[72px] md:h-[80px]">
            {/* ----------------- BRAND LOGO ----------------- */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded-lg p-1"
            >
              <div className="relative h-11 sm:h-12 md:h-14 w-36 sm:w-44 md:w-48 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/images/country-bee-logo.png"
                  alt="Country Bee - 100% Pure Natural Forest Honey"
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 192px"
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* ----------------- DESKTOP NAVIGATION LINKS ----------------- */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Home Link (Golden Yellow Pill as active) */}
              <Link
                href="/"
                className={`relative px-5 py-2 text-[15px] font-semibold rounded-full transition-all duration-200 ${
                  isHomeActive
                    ? 'bg-[#F5B400] text-charcoal shadow-sm hover:bg-[#FFCA28]'
                    : 'text-charcoal/85 hover:text-forest-dark hover:bg-beige/40'
                }`}
              >
                Home
              </Link>

              {/* Shop Link with Dropdown Menu */}
              <div
                className="relative"
                onMouseEnter={() => setIsShopHovered(true)}
                onMouseLeave={() => setIsShopHovered(false)}
              >
                <Link
                  href="/shop"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-[15px] rounded-full transition-all duration-200 ${
                    pathname.startsWith('/shop')
                      ? 'bg-[#F5B400] text-charcoal font-semibold shadow-sm hover:bg-[#FFCA28]'
                      : 'font-medium text-charcoal/85 hover:text-forest-dark hover:bg-beige/40'
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown
                    className={`w-4 h-4 text-charcoal/70 transition-transform duration-200 ${
                      isShopHovered ? 'rotate-180 text-forest' : ''
                    }`}
                  />
                </Link>

                {/* Shop Mega Menu Dropdown */}
                {isShopHovered && (
                  <div
                    className="absolute top-full -left-16 xl:-left-8 w-[740px] pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={() => setIsShopHovered(true)}
                    onMouseLeave={() => setIsShopHovered(false)}
                  >
                    <div className="bg-white border border-[#EDE4D8] rounded-2xl shadow-[0_20px_60px_-15px_rgba(9,45,23,0.18)] p-6 overflow-hidden">
                      <div className="grid grid-cols-12 gap-5 items-stretch">
                        {/* LEFT COLUMN: COLLECTIONS (col-span-5) */}
                        <div className="col-span-5 flex flex-col justify-between pr-2">
                          <div>
                            {/* Header */}
                            <div className="flex items-center justify-between pb-2.5 border-b border-[#EFE7DC]">
                              <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#123D20]">
                                COLLECTIONS
                              </span>
                              <Link
                                href="/shop"
                                onClick={() => setIsShopHovered(false)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#123D20] hover:text-[#F5B400] transition-colors group/link"
                              >
                                <span>View All</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                              </Link>
                            </div>

                            {/* Collections List */}
                            <div className="mt-3 space-y-1.5">
                              {MEGA_MENU_COLLECTIONS.map((col) => (
                                <Link
                                  key={col.name}
                                  href={col.href}
                                  onClick={() => setIsShopHovered(false)}
                                  className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[#FAF4EB] transition-all"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#123D20]/75 group-hover:bg-[#F5B400] group-hover:scale-125 transition-all shrink-0" />
                                    <span className="text-[13.5px] font-medium text-[#29251F] group-hover:text-[#123D20] group-hover:font-semibold transition-colors truncate">
                                      {col.name}
                                    </span>
                                  </div>

                                  {col.badge && (
                                    <span
                                      className={`text-[9.5px] font-bold tracking-wider px-2 py-0.5 rounded uppercase shrink-0 ${
                                        col.badgeType === 'popular'
                                          ? 'bg-[#EAF3DE] text-[#2E6B34] border border-[#D1E6BA] flex items-center gap-1'
                                          : 'bg-[#123D20] text-white'
                                      }`}
                                    >
                                      {col.badgeType === 'popular' && (
                                        <Sparkles className="w-2.5 h-2.5" />
                                      )}
                                      {col.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Bottom Left Trust Note */}
                          <div className="pt-3.5 mt-2 border-t border-[#EFE7DC] flex items-center gap-2 text-[11.5px] font-medium text-[#29251F]/70">
                            <svg
                              className="w-4 h-4 text-[#789B40] shrink-0"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                            </svg>
                            <span>100% Pure, Raw &amp; Antibiotic Free</span>
                          </div>
                        </div>

                        {/* VERTICAL DIVIDER (col-span-1) */}
                        <div className="col-span-1 flex justify-center">
                          <div className="w-[1px] h-full bg-[#EFE7DC]" />
                        </div>

                        {/* RIGHT COLUMN: FEATURED ESSENTIALS (col-span-6) */}
                        <div className="col-span-6 flex flex-col justify-between">
                          <div>
                            {/* Header */}
                            <div className="flex items-center justify-between pb-2.5 border-b border-[#EFE7DC]">
                              <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#123D20]">
                                FEATURED ESSENTIALS
                              </span>
                              <span className="text-xs text-[#29251F]/50 font-normal">
                                Customer Favorites
                              </span>
                            </div>

                            {/* 3 Featured Products */}
                            <div className="mt-2.5 space-y-2">
                              {MEGA_MENU_FEATURED.map((item) => (
                                <Link
                                  key={item.slug}
                                  href={`/products/${item.slug}`}
                                  onClick={() => setIsShopHovered(false)}
                                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF4EB] transition-colors border border-transparent hover:border-[#E8DEC8]"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    {/* Product Thumbnail Box */}
                                    <div className="relative w-14 h-14 rounded-lg bg-[#FAF5EC] border border-[#EBE0D0] p-1 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-200">
                                      <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        sizes="56px"
                                        className="object-contain p-0.5"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <span className="block text-[9.5px] font-extrabold tracking-wider uppercase text-[#29251F]/50">
                                        {item.category}
                                      </span>
                                      <h4 className="font-serif font-bold text-sm text-[#092D17] group-hover:text-[#123D20] truncate">
                                        {item.name}
                                      </h4>
                                    </div>
                                  </div>

                                  {/* Price and Strikethrough */}
                                  <div className="text-right shrink-0 pl-2">
                                    <div className="font-sans font-bold text-sm text-[#092D17]">
                                      {formatINR(item.price)}
                                    </div>
                                    <div className="text-[11px] text-[#29251F]/40 line-through">
                                      {formatINR(item.originalPrice)}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Bottom Promo Banner: BUNDLE & SAVE */}
                          <Link
                            href="/bulk-orders"
                            onClick={() => setIsShopHovered(false)}
                            className="mt-3 bg-[#092D17] hover:bg-[#123D20] text-white rounded-xl p-3 flex items-center justify-between transition-all duration-200 group shadow-md"
                          >
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFCA28] block mb-0.5">
                                BUNDLE &amp; SAVE
                              </span>
                              <p className="text-xs font-bold text-white group-hover:text-[#FFCA28] transition-colors">
                                Build Your Own Honey Combo — Up to 20% Off
                              </p>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#FFCA28] flex items-center justify-center shrink-0 ml-3 transition-colors">
                              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#092D17] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About Us Link */}
              <Link
                href="/about"
                className={`px-4 py-2 text-[15px] rounded-full transition-all duration-200 ${
                  pathname === '/about'
                    ? 'bg-[#F5B400] text-charcoal font-semibold shadow-sm hover:bg-[#FFCA28]'
                    : 'font-medium text-charcoal/85 hover:text-forest-dark hover:bg-beige/40'
                }`}
              >
                About Us
              </Link>

              {/* Our Process Link */}
              <Link
                href="/#process"
                className="px-3.5 py-2 text-[15px] font-medium text-charcoal/85 hover:text-forest-dark hover:bg-beige/40 rounded-full transition-colors"
              >
                Our Process
              </Link>

              {/* Benefits Link */}
              <Link
                href="/#benefits"
                className="px-3.5 py-2 text-[15px] font-medium text-charcoal/85 hover:text-forest-dark hover:bg-beige/40 rounded-full transition-colors"
              >
                Benefits
              </Link>

              {/* Recipes Link */}
              <Link
                href="/recipes"
                className={`px-4 py-2 text-[15px] rounded-full transition-all duration-200 ${
                  pathname === '/recipes'
                    ? 'bg-[#F5B400] text-charcoal font-semibold shadow-sm hover:bg-[#FFCA28]'
                    : 'font-medium text-charcoal/85 hover:text-forest-dark hover:bg-beige/40'
                }`}
              >
                Recipes
              </Link>

              {/* Bulk Orders Link */}
              <Link
                href="/bulk-orders"
                className={`px-4 py-2 text-[15px] rounded-full transition-all duration-200 ${
                  pathname === '/bulk-orders'
                    ? 'bg-[#F5B400] text-charcoal font-semibold shadow-sm hover:bg-[#FFCA28]'
                    : 'font-medium text-charcoal/85 hover:text-forest-dark hover:bg-beige/40'
                }`}
              >
                Bulk Orders
              </Link>

              {/* Contact Link */}
              <Link
                href="/contact"
                className={`px-4 py-2 text-[15px] rounded-full transition-all duration-200 ${
                  pathname === '/contact'
                    ? 'bg-[#F5B400] text-charcoal font-semibold shadow-sm hover:bg-[#FFCA28]'
                    : 'font-medium text-charcoal/85 hover:text-forest-dark hover:bg-beige/40'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* ----------------- RIGHT ACTION ICONS ----------------- */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Icon Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search Country Bee products"
                className="p-2 sm:p-2.5 text-charcoal hover:text-forest-dark hover:bg-beige/60 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              >
                <Search className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
              </button>

              {/* User / Account Icon Button */}
              <Link
                href="/contact"
                aria-label="User Account and Sign In"
                className="p-2 sm:p-2.5 text-charcoal hover:text-forest-dark hover:bg-beige/60 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              >
                <User className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
              </Link>

              {/* Shopping Cart Icon with Yellow '0' Badge */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping cart with ${cartCount} items`}
                className="relative p-2 sm:p-2.5 text-charcoal hover:text-forest-dark hover:bg-beige/60 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              >
                <ShoppingCart className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
                {/* Yellow Badge with '0' as in the reference image */}
                <span
                  className="absolute -top-1 -right-1 w-[18px] h-[18px] sm:w-5 sm:h-5 bg-[#F5B400] text-charcoal font-bold text-[10px] sm:text-[11px] rounded-full flex items-center justify-center shadow-xs border-2 border-[#FFF7EA]"
                  aria-hidden="true"
                >
                  {cartCount}
                </span>
              </button>

              {/* Mobile Hamburger Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden p-2 text-charcoal hover:text-forest-dark hover:bg-beige/60 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey ml-1"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-charcoal" />
                ) : (
                  <Menu className="w-6 h-6 text-charcoal" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          3. INTERACTIVE SEARCH MODAL OVERLAY
          ========================================================================= */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#FFFDF9] border border-beige rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-beige">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-forest" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search raw forest honey, honeycomb, acacia..."
                  className="w-full bg-transparent text-charcoal placeholder:text-charcoal/40 text-base focus:outline-none"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-charcoal/50 hover:text-charcoal rounded-lg"
                aria-label="Close search dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Product Results */}
            <div className="mt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-forest font-sans">
                {searchQuery.trim() ? `Matching Honey (${searchResults.length})` : 'Featured Pure Honeys'}
              </span>
              {searchResults.length > 0 ? (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-[5px] bg-cream hover:bg-beige/70 border border-beige transition-colors"
                    >
                      <div className="relative w-11 h-11 rounded-[5px] overflow-hidden shrink-0 bg-white">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-forest-dark truncate">{product.name}</p>
                        <p className="text-[11px] font-semibold text-charcoal/75">{product.priceDisplay}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-xs text-charcoal/65">
                  No honey varieties matched &ldquo;{searchQuery}&rdquo;. Try Borage, Acacia, Sidr, Jamun, or Thyme.
                </p>
              )}
            </div>

            {/* Popular Searches */}
            <div className="mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-forest font-sans">
                Quick Filter Tags
              </span>
              <div className="flex flex-wrap gap-2 mt-2.5">
                {[
                  'Borage',
                  'Acacia',
                  'Sidr',
                  'Jamun',
                  'Thyme',
                  'Summer Blossom',
                ].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="text-xs font-medium px-3 py-1 rounded-[5px] bg-beige/60 hover:bg-honey/30 text-charcoal hover:text-forest transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Promise */}
            <div className="mt-6 pt-4 border-t border-beige/60 flex items-center justify-between text-xs text-charcoal/60">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-honey" />
                All honey is 100% NMR tested & raw
              </span>
              <span>Fast Pan India Shipping</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          4. INTERACTIVE SLIDE-OVER CART DRAWER
          ========================================================================= */}
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-charcoal/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#FFFBF5] h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-beige"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="p-5 border-b border-beige/80 flex items-center justify-between bg-cream">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-forest" />
                <h3 className="font-serif text-lg font-bold text-forest">Your Honey Basket</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-honey/30 text-charcoal">
                  {cartCount} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-charcoal/60 hover:text-charcoal rounded-full hover:bg-beige/60 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            {cartItems.length === 0 ? (
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-honey/20 flex items-center justify-center mb-4 text-3xl">
                  🍯
                </div>
                <h4 className="font-serif text-xl font-bold text-forest mb-2">
                  Your Basket is Empty
                </h4>
                <p className="text-sm text-charcoal/70 max-w-xs mb-6">
                  Discover our pure, unpasteurized natural forest honeys harvested fresh from our apiaries.
                </p>
                <Link
                  href="/#collection"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[5px] bg-forest hover:bg-forest-dark text-white font-semibold text-sm shadow-md transition-all duration-200 hover:scale-105"
                >
                  Explore Pure Honey <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                {/* Free Shipping Progress */}
                <div className="p-3 rounded-[5px] bg-cream border border-beige text-xs">
                  {subtotal >= 499 ? (
                    <p className="font-semibold text-forest">
                      🎉 You unlocked <span className="text-leaf-dark">FREE Pan India Delivery!</span>
                    </p>
                  ) : (
                    <p className="font-medium text-charcoal/85">
                      Add <strong className="text-forest-dark">{formatINR(499 - subtotal)}</strong> more for{' '}
                      <strong className="text-leaf-dark">FREE Delivery</strong>
                    </p>
                  )}
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center gap-3 p-3 rounded-[5px] bg-white border border-beige shadow-soft-sm"
                  >
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative w-16 h-16 rounded-[5px] overflow-hidden bg-cream shrink-0 border border-beige/60"
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-sans font-bold text-sm text-forest-dark hover:text-forest truncate"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="text-charcoal/40 hover:text-red-600 transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] font-semibold text-charcoal/65 mt-0.5">
                        Jar Size: {item.weight} • {formatINR(item.price)}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-[5px] border border-beige bg-cream/60">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            aria-label="Decrease item quantity"
                            className="p-1.5 text-charcoal hover:bg-beige transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-forest-dark">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            aria-label="Increase item quantity"
                            className="p-1.5 text-charcoal hover:bg-beige transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-sans font-extrabold text-sm text-forest-dark">
                          {formatINR(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cart Footer */}
            <div className="p-5 border-t border-beige/80 bg-cream space-y-3">
              {cartItems.length > 0 && (
                <div className="space-y-3 pb-2 border-b border-beige">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-charcoal/80">Subtotal</span>
                    <span className="font-sans text-xl font-extrabold text-forest-dark">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/contact"
                      onClick={() => setIsCartOpen(false)}
                      className="flex-1 py-3 px-4 rounded-[5px] bg-forest-dark hover:bg-forest text-white font-sans font-bold text-sm text-center shadow-forest transition-colors"
                    >
                      Proceed to Checkout
                    </Link>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="py-3 px-3 rounded-[5px] border border-beige bg-white hover:bg-beige/60 text-xs font-semibold text-charcoal/75 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-forest font-medium">
                <ShieldCheck className="w-4 h-4 text-leaf" />
                <span>100% Money Back Purity Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-charcoal/70">
                <Clock className="w-4 h-4 text-honey" />
                <span>Dispatched within 24 hours via express courier</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. MOBILE RESPONSIVE SLIDE-OUT DRAWER MENU
          ========================================================================= */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 lg:hidden flex justify-end bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-[320px] max-w-[85vw] bg-[#FFFBF5] h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-beige"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Logo & Close */}
            <div className="p-4 border-b border-beige/80 flex items-center justify-between bg-cream">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block">
                <div className="relative h-10 w-32">
                  <Image
                    src="/images/country-bee-logo.png"
                    alt="Country Bee"
                    fill
                    sizes="128px"
                    className="object-contain object-left"
                  />
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-charcoal/60 hover:text-charcoal rounded-full hover:bg-beige/60"
                aria-label="Close mobile navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Mobile Quick Search Bar */}
              <div
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-beige/50 border border-beige text-charcoal/60 text-sm cursor-pointer hover:bg-beige/70 transition-colors"
              >
                <Search className="w-4 h-4 text-forest" />
                <span>Search pure honey...</span>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isHomeActive
                      ? 'bg-[#F5B400] text-charcoal shadow-xs'
                      : 'text-charcoal hover:bg-beige/40'
                  }`}
                >
                  <span>Home</span>
                  {isHomeActive && <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />}
                </Link>

                {/* Shop with accordion toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setIsShopMobileExpanded(!isShopMobileExpanded)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal hover:bg-beige/40 transition-colors"
                  >
                    <span>Shop Honey</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isShopMobileExpanded ? 'rotate-180 text-forest' : 'text-charcoal/50'
                      }`}
                    />
                  </button>

                  {isShopMobileExpanded && (
                    <div className="p-3 space-y-4 bg-white/70 rounded-xl my-2 border border-beige/80">
                      {/* Collections Subsection */}
                      <div>
                        <div className="flex items-center justify-between pb-1.5 border-b border-beige/60">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#123D20]">
                            Collections
                          </span>
                          <Link
                            href="/shop"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[11px] font-bold text-forest hover:text-honey flex items-center gap-0.5"
                          >
                            <span>View All</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                        <div className="mt-2 space-y-1">
                          {MEGA_MENU_COLLECTIONS.map((col) => (
                            <Link
                              key={col.name}
                              href={col.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between py-1.5 px-2 rounded-lg text-xs font-medium text-charcoal/85 hover:text-forest hover:bg-beige/30 transition-colors"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#123D20]/70 shrink-0" />
                                <span className="truncate">{col.name}</span>
                              </div>
                              {col.badge && (
                                <span
                                  className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase shrink-0 ${
                                    col.badgeType === 'popular'
                                      ? 'bg-[#EAF3DE] text-[#2E6B34] border border-[#D1E6BA]'
                                      : 'bg-[#123D20] text-white'
                                  }`}
                                >
                                  {col.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Featured Essentials Subsection */}
                      <div>
                        <div className="flex items-center justify-between pb-1.5 border-b border-beige/60">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#123D20]">
                            Featured Essentials
                          </span>
                          <span className="text-[10px] text-charcoal/50">Favorites</span>
                        </div>
                        <div className="mt-2 space-y-2">
                          {MEGA_MENU_FEATURED.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/products/${item.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between p-2 rounded-xl bg-white border border-beige/70 hover:border-honey/60 transition-colors"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="relative w-11 h-11 rounded-lg bg-[#FAF5EC] border border-[#EBE0D0] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                                  <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    sizes="44px"
                                    className="object-contain p-0.5"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <span className="block text-[8.5px] font-bold uppercase tracking-wider text-charcoal/50">
                                    {item.category}
                                  </span>
                                  <h5 className="font-serif font-bold text-xs text-forest-dark truncate">
                                    {item.name}
                                  </h5>
                                </div>
                              </div>

                              <div className="text-right shrink-0 pl-2">
                                <div className="font-sans font-bold text-xs text-forest-dark">
                                  {formatINR(item.price)}
                                </div>
                                <div className="text-[10px] text-charcoal/40 line-through">
                                  {formatINR(item.originalPrice)}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Bundle & Save Mobile Promo */}
                      <Link
                        href="/bulk-orders"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-[#092D17] text-white rounded-xl p-3 flex items-center justify-between block transition-colors"
                      >
                        <div>
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FFCA28] block mb-0.5">
                            BUNDLE &amp; SAVE
                          </span>
                          <p className="text-xs font-bold text-white">
                            Build Your Honey Combo — Up to 20% Off
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-honey shrink-0 ml-2" />
                      </Link>

                      {/* Full Catalog Link */}
                      <Link
                        href="/shop"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block pt-2 text-center text-xs font-bold text-forest hover:text-honey border-t border-beige/60"
                      >
                        Explore Complete Honey Collection →
                      </Link>
                    </div>
                  )}
                </div>

                {/* About Us */}
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal hover:bg-beige/40 transition-colors"
                >
                  About Us
                </Link>

                {/* Our Process */}
                <Link
                  href="/#process"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal hover:bg-beige/40 transition-colors"
                >
                  Our Process
                </Link>

                {/* Benefits */}
                <Link
                  href="/#benefits"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal hover:bg-beige/40 transition-colors"
                >
                  Benefits
                </Link>

                {/* Recipes */}
                <Link
                  href="/recipes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal hover:bg-beige/40 transition-colors"
                >
                  Recipes
                </Link>

                {/* Bulk Orders */}
                <Link
                  href="/bulk-orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal hover:bg-beige/40 transition-colors"
                >
                  Bulk Orders
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal hover:bg-beige/40 transition-colors"
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Trust Highlights */}
              <div className="pt-4 border-t border-beige/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/50">
                  Our Purity Promise
                </span>
                <div className="space-y-1.5 text-xs text-charcoal/80">
                  <div className="flex items-center gap-2">
                    <span className="text-honey">✓</span>
                    <span>100% Pure & Natural Forest Honey</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-honey">✓</span>
                    <span>No Chemicals, Antibiotics, or Sugar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-honey">✓</span>
                    <span>Direct Apiary to Doorstep</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="p-4 border-t border-beige/80 bg-cream space-y-2.5">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-forest hover:bg-forest-dark text-white font-semibold text-sm shadow-sm transition-colors"
              >
                <span>Shop Pure Honey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919876543210"
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-charcoal hover:text-forest transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-forest" />
                <span>Customer Care & Bulk Orders</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
