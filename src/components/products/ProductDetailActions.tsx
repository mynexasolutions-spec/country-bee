'use client';

import React, { useState } from 'react';
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import { type HoneyProduct, formatINR } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export const ProductDetailActions = ({ product }: { product: HoneyProduct }) => {
  const { addItem, setIsCartOpen } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>(product.defaultWeight);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  const activeVariant =
    product.variants.find((v) => v.weight === selectedWeight) ?? product.variants[0];

  const handleAdd = () => {
    addItem(product, activeVariant.weight, activeVariant.price, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-5 pt-2">
      {/* Price Display */}
      <div className="flex items-baseline gap-3">
        <span className="font-sans text-3xl font-extrabold text-forest-dark">
          {formatINR(activeVariant.price)}
        </span>
        <span className="text-xs font-semibold text-leaf-dark bg-leaf/15 px-2.5 py-1 rounded-[5px]">
          Inclusive of all taxes
        </span>
      </div>

      {/* Weight Selector — rounded-[5px] */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-2">
          Select Jar Weight
        </span>
        <div className="flex flex-wrap gap-2.5">
          {product.variants.map((variant) => {
            const isSelected = variant.weight === selectedWeight;
            return (
              <button
                key={variant.weight}
                type="button"
                onClick={() => setSelectedWeight(variant.weight)}
                className={cn(
                  'px-4 py-2.5 rounded-[5px] font-sans text-sm font-bold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey',
                  isSelected
                    ? 'bg-forest-dark text-white border-forest-dark shadow-soft-sm'
                    : 'bg-white text-charcoal border-beige hover:border-honey'
                )}
              >
                {variant.weight} — {formatINR(variant.price)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity + Add to Basket + Buy Now */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <div className="inline-flex items-center rounded-[5px] border border-beige bg-white h-12">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="px-3.5 h-full text-charcoal hover:bg-beige/50 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 font-sans font-bold text-base text-forest-dark">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="px-3.5 h-full text-charcoal hover:bg-beige/50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            'flex-1 min-w-[180px] h-12 px-6 rounded-[5px] font-sans font-bold text-sm inline-flex items-center justify-center gap-2.5 shadow-honey transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest',
            added
              ? 'bg-leaf text-white'
              : 'bg-honey hover:bg-honey-yellow text-charcoal'
          )}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Basket</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Basket — {formatINR(activeVariant.price * quantity)}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            addItem(product, activeVariant.weight, activeVariant.price, quantity);
            setIsCartOpen(true);
          }}
          className="h-12 px-5 rounded-[5px] bg-forest-dark hover:bg-forest text-white font-sans font-bold text-sm transition-colors shadow-forest"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};
