'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { HoneyProduct } from '@/data/products';

export interface CartItem {
  key: string; // `${productId}__${weight}`
  productId: string;
  slug: string;
  name: string;
  imageUrl: string;
  weight: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastAddedMessage: string | null;
  addItem: (product: HoneyProduct, weight?: string, price?: number, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'country_bee_cart_v1';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastAddedMessage, setLastAddedMessage] = useState<string | null>(null);

  // Hydrate cart from localStorage on client mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore malformed storage
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist cart changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore quota errors
    }
  }, [items, isHydrated]);

  const addItem = useCallback(
    (product: HoneyProduct, weight?: string, price?: number, quantity: number = 1) => {
      const selectedWeight = weight ?? product.defaultWeight;
      const matchedVariant = product.variants.find((v) => v.weight === selectedWeight);
      const selectedPrice = price ?? matchedVariant?.price ?? product.price;
      const itemKey = `${product.id}__${selectedWeight}`;

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.key === itemKey);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        return [
          ...prev,
          {
            key: itemKey,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            imageUrl: product.imageUrl,
            weight: selectedWeight,
            price: selectedPrice,
            quantity,
          },
        ];
      });

      setLastAddedMessage(`${product.name} (${selectedWeight}) added to basket`);
    },
    []
  );

  // Auto-dismiss toast banner
  useEffect(() => {
    if (!lastAddedMessage) return;
    const timer = setTimeout(() => setLastAddedMessage(null), 2600);
    return () => clearTimeout(timer);
  }, [lastAddedMessage]);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.key !== key));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        lastAddedMessage,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}

      {/* Floating Modern Toast Notification (rounded-[5px]) */}
      {lastAddedMessage && !isCartOpen && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-[5px] bg-forest-dark text-white border border-honey/60 shadow-soft-lg transition-all duration-300"
        >
          <span className="w-6 h-6 rounded-[5px] bg-honey text-charcoal font-bold text-xs flex items-center justify-center shrink-0">
            ✓
          </span>
          <span className="text-xs sm:text-sm font-medium">{lastAddedMessage}</span>
          <button
            type="button"
            onClick={() => {
              setLastAddedMessage(null);
              setIsCartOpen(true);
            }}
            className="ml-1 px-2.5 py-1 rounded-[5px] bg-honey hover:bg-honey-yellow text-charcoal font-bold text-xs transition-colors"
          >
            View Cart
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
