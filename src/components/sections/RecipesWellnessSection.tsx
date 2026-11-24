'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Clock, X, Sparkles, ShoppingCart, Check } from 'lucide-react';
import { honeyRecipesData, type HoneyRecipeItem } from '@/data/recipes';
import { getProductBySlug } from '@/data/products';
import { useCart } from '@/context/CartContext';

export const RecipesWellnessSection = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<HoneyRecipeItem | null>(null);
  const [addedHoney, setAddedHoney] = useState<boolean>(false);
  const { addItem } = useCart();

  const pairedProduct = selectedRecipe
    ? getProductBySlug(selectedRecipe.recommendedHoneySlug)
    : undefined;

  return (
    <section
      id="recipes"
      aria-labelledby="recipes-wellness-heading"
      className="relative w-full bg-cream py-10 sm:py-14 lg:py-16 overflow-hidden mt-[-40px]"
    >
      {/* Left & Right Decorative Botanical Leaf Sprigs (matching reference edges) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 150"
        fill="none"
        className="hidden lg:block pointer-events-none absolute -left-3 top-24 w-16 h-auto opacity-90"
      >
        <path d="M0 95C22 76 38 56 50 28" stroke="#5A7D2A" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M16 58C10 38 20 20 38 14C42 34 32 52 16 58Z" fill="#789B40" />
        <path d="M22 86C40 78 58 84 68 100C50 106 32 98 22 86Z" fill="#8EAE56" />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 100 150"
        fill="none"
        className="hidden lg:block pointer-events-none absolute -right-3 bottom-10 w-16 h-auto opacity-90"
      >
        <path d="M100 95C78 76 62 56 50 28" stroke="#5A7D2A" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M84 58C90 38 80 20 62 14C58 34 68 52 84 58Z" fill="#789B40" />
        <path d="M78 86C60 78 42 84 32 100C50 106 68 98 78 86Z" fill="#8EAE56" />
      </svg>

      <div className="relative z-10 cb-container">
        {/* Section Header with Twin Botanical Leaves */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center gap-2.5 sm:gap-4">
            <svg
              aria-hidden="true"
              viewBox="0 0 56 32"
              className="w-7 xs:w-8 sm:w-11 h-auto shrink-0"
              fill="none"
            >
              <path d="M4 10C18 4 36 8 46 20C32 26 14 22 4 10Z" fill="#789B40" />
              <path
                d="M6 11C22 14 36 17 52 19"
                stroke="#4E6E24"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <h2
              id="recipes-wellness-heading"
              className="font-serif font-extrabold text-[24px] xs:text-[28px] sm:text-[36px] lg:text-[42px] leading-tight tracking-tight text-forest-dark"
            >
              Recipes &amp; Wellness Ideas
            </h2>

            <svg
              aria-hidden="true"
              viewBox="0 0 56 32"
              className="w-7 xs:w-8 sm:w-11 h-auto shrink-0"
              fill="none"
            >
              <path d="M52 10C38 4 20 8 10 20C24 26 42 22 52 10Z" fill="#789B40" />
              <path
                d="M50 11C34 14 20 17 4 19"
                stroke="#4E6E24"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="mt-2.5 font-sans text-xs xs:text-sm sm:text-[15px] text-charcoal/80 leading-relaxed">
            Delicious, healthy and easy ways to enjoy the benefits of natural honey.
          </p>
        </div>

        {/* 3 Responsive Recipe Cards (1 col mobile -> 2 col sm -> 3 col lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {honeyRecipesData.map((recipe) => (
            <article
              key={recipe.id}
              onClick={() => {
                setSelectedRecipe(recipe);
                setAddedHoney(false);
              }}
              className="group cursor-pointer rounded-[5px] bg-[#FFFDF9] border border-beige/90 hover:border-honey/75 p-2.5 sm:p-3 shadow-soft hover:shadow-[0_16px_34px_-10px_rgba(18,61,32,0.16)] transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Recipe Dummy Artwork Banner */}
              <div className="relative w-full aspect-[2/1] rounded-[5px] overflow-hidden bg-cream">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Top-Right Instagram Camera Outline Badge (matching reference) */}
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-charcoal/30 backdrop-blur-xs text-white flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    className="w-4 h-4"
                  >
                    <rect x="6" y="6" width="36" height="36" rx="10" />
                    <circle cx="24" cy="24" r="8" />
                    <circle cx="35" cy="13" r="2.2" fill="currentColor" stroke="none" />
                  </svg>
                </span>
              </div>

              {/* Card Body: Title + Subtitle + Golden Circular Arrow */}
              <div className="pt-3.5 pb-1.5 px-2 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-sans font-bold text-base sm:text-[17.5px] text-forest-dark group-hover:text-forest transition-colors leading-snug">
                    {recipe.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs sm:text-[13.5px] text-charcoal/80 leading-relaxed">
                    {recipe.shortDesc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRecipe(recipe);
                    setAddedHoney(false);
                  }}
                  aria-label={`Read ${recipe.title} recipe`}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-honey group-hover:bg-honey-yellow text-charcoal flex items-center justify-center shrink-0 shadow-xs transition-all duration-200 group-hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* =====================================================================
          WORKING RECIPE & HONEY PAIRING MODAL
          ===================================================================== */}
      {selectedRecipe && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="recipe-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[86vh] overflow-y-auto bg-[#FFFDF9] rounded-[16px] border border-beige shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedRecipe(null)}
              aria-label="Close recipe modal"
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-beige text-charcoal flex items-center justify-center shadow-soft-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full aspect-[2.2/1] bg-cream">
              <Image
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.title}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
              />
            </div>

            <div className="p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3
                  id="recipe-modal-title"
                  className="font-serif text-xl sm:text-2xl font-bold text-forest-dark"
                >
                  {selectedRecipe.title}
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-honey/20 text-xs font-bold text-forest-dark">
                  <Clock className="w-3.5 h-3.5 text-honey-amber" />
                  {selectedRecipe.prepTime}
                </span>
              </div>

              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-leaf-dark mb-1.5">
                  Ingredients
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-charcoal/85">
                  {selectedRecipe.ingredients.map((ing) => (
                    <li key={ing} className="flex items-start gap-2">
                      <span className="text-honey font-bold">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-leaf-dark mb-1.5">
                  Quick Preparation
                </h4>
                <ol className="space-y-1.5 text-xs sm:text-sm text-charcoal/85 list-decimal list-inside">
                  {selectedRecipe.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              {pairedProduct && (
                <div className="pt-3 border-t border-beige flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Sparkles className="w-4 h-4 text-honey shrink-0" />
                    <span>
                      Best paired with{' '}
                      <strong className="text-forest-dark">{pairedProduct.name}</strong> (
                      {pairedProduct.priceDisplay})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addItem(pairedProduct);
                      setAddedHoney(true);
                      setTimeout(() => setAddedHoney(false), 1500);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-forest-dark hover:bg-forest text-white text-xs font-bold transition-colors"
                  >
                    {addedHoney ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-honey-yellow" /> Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5 text-honey-yellow" /> Add Honey
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
