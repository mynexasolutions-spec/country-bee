import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProductBySlug, honeyProducts } from '@/data/products';
import { ProductDetailActions } from '@/components/products/ProductDetailActions';
import { HoneyProductCard } from '@/components/products/HoneyProductCard';
import { ArrowLeft, CheckCircle2, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return honeyProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = honeyProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="cb-container">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/#collection"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-forest hover:text-honey transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Honey Collection</span>
            </Link>
          </div>

          {/* Main Product Card — rounded-[5px] */}
          <div className="bg-white rounded-[5px] border border-beige p-4 sm:p-6 lg:p-8 shadow-soft grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Image */}
            <div className="relative aspect-square w-full rounded-[5px] overflow-hidden bg-cream border border-beige/70">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-[5px] bg-honey text-charcoal font-sans text-xs font-bold uppercase tracking-wider shadow-soft-sm">
                {product.badge}
              </span>
            </div>

            {/* Right Info */}
            <div className="flex flex-col justify-between space-y-5">
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-leaf-dark">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-leaf/10">
                    <MapPin className="w-3.5 h-3.5" />
                    {product.origin}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-honey/15 text-charcoal">
                    <Sparkles className="w-3.5 h-3.5 text-honey-amber" />
                    {product.harvestSeason}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest-dark">
                  {product.name}
                </h1>

                {/* Rating strictly 0.0 (0) */}
                <div className="flex items-center gap-2 text-sm text-charcoal/75">
                  <span className="text-honey font-bold">★ {product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
                  <span>•</span>
                  <span>{product.floralSource}</span>
                </div>

                <p className="font-sans text-sm sm:text-base text-charcoal/85 leading-relaxed">
                  {product.description}
                </p>

                {/* Taste Notes */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.tasteNotes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 rounded-[5px] bg-cream border border-beige text-xs font-semibold text-forest-dark"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/*Interactive Weight & Cart Actions */}
                <ProductDetailActions product={product} />
              </div>

              {/* Purity Highlights */}
              <div className="pt-5 border-t border-beige grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-xs font-medium text-charcoal/85">
                    <CheckCircle2 className="w-4 h-4 text-leaf shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-xs font-medium text-forest">
                  <ShieldCheck className="w-4 h-4 text-honey-amber shrink-0" />
                  <span>100% Pure & Antibiotic-Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Honeys */}
          <section className="mt-14">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-dark mb-6">
              More Single-Origin Honeys
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {relatedProducts.map((item) => (
                <HoneyProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
