'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { use, useState } from 'react';
import { getMangaById, mangaCollection, formatPrice, getProductInfo } from '@/lib/manga-data';
import { useCart } from '@/lib/cart-context';
import MangaCard from '@/components/MangaCard';

export default function MangaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const manga = getMangaById(id);
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);
  const productInfo = getProductInfo(id);

  if (!manga) {
    notFound();
  }

  // Get related manga (same genre, excluding current)
  const relatedManga = mangaCollection
    .filter(m => m.id !== manga.id && m.genre.some(g => manga.genre.includes(g)))
    .slice(0, 4);

  return (
    <div className="bg-[var(--paper)] pt-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6">
        <nav className="flex items-center gap-2 text-sm text-[var(--stone)]">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--ink)] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[var(--ink)]">{manga.title}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="relative aspect-[2/3] bg-[var(--mist)] overflow-hidden">
                  {imgError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--mist)]">
                      <span className="text-xl text-[var(--stone)] text-center px-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        {manga.title}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={manga.image}
                      alt={manga.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      onError={() => setImgError(true)}
                      unoptimized
                    />
                  )}
                </div>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {manga.new && (
                    <span className="px-3 py-1.5 text-xs tracking-widest uppercase bg-[var(--crimson)] text-white">
                      New
                    </span>
                  )}
                  {manga.featured && (
                    <span className="px-3 py-1.5 text-xs tracking-widest uppercase bg-[var(--ink)] text-white">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:py-8"
            >
              <p className="text-sm tracking-wider text-[var(--stone)] mb-2">
                {manga.author}
              </p>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl text-[var(--ink)] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {manga.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(manga.rating) ? 'text-[var(--crimson)]' : 'text-[var(--mist)]'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-[var(--stone)]">{manga.rating} / 5</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-3xl font-medium text-[var(--ink)]">
                  {formatPrice(manga.price)}
                </span>
                <span className="text-lg text-[var(--stone)] line-through">
                  {formatPrice(manga.originalPrice)}
                </span>
                <span className="px-2 py-1 text-xs tracking-wider bg-[var(--crimson)] text-white">
                  SAVE {Math.round((1 - manga.originalPrice / manga.price) * -100)}%
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-[var(--stone)] leading-relaxed mb-8">
                {manga.description}
              </p>

              {/* Service Info Box */}
              <div className="border border-[var(--mist)] rounded-lg p-6 mb-8">
                <div className="grid grid-cols-3 gap-4">
                  {/* Cash on Delivery */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--ink)]">Cash on Delivery</span>
                  </div>
                  
                  {/* 3 Days Return */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--ink)]">3 days Return</span>
                    <span className="text-xs text-[var(--stone)]">(Wrong/damaged items only)</span>
                  </div>
                  
                  {/* Free Delivery */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--ink)]">Free Delivery</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-[var(--mist)] text-center">
                  <span className="text-sm text-[var(--stone)]">Get it delivered in 4-9 days</span>
                </div>
              </div>

              {/* Details List */}
              <div className="border-t border-b border-[var(--mist)] py-6 mb-8 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--stone)]">Volumes</span>
                  <span className="text-[var(--ink)]">{manga.volumes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--stone)]">Status</span>
                  <span className="text-[var(--ink)] capitalize">{manga.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--stone)]">Genre</span>
                  <span className="text-[var(--ink)]">{manga.genre.join(', ')}</span>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(manga)}
                className="w-full py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300"
              >
                Add to Cart
              </button>

              {/* Product Information Table */}
              <div className="mt-10 border border-[var(--mist)] rounded-lg overflow-hidden">
                <h3 className="text-lg font-medium text-[var(--ink)] px-6 py-4 bg-[var(--paper-warm)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Product Information
                </h3>
                <div className="divide-y divide-[var(--mist)]">
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Product Type</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{productInfo.productType}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Author Name</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{manga.author}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Name of Publisher</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{productInfo.publisher}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Number of Pages</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{productInfo.pages}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Material</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{productInfo.material}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Ideal For / Usage</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{productInfo.usage}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">ISBN</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{productInfo.isbn}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Weight</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{productInfo.weight}</span>
                  </div>
                  <div className="flex px-6 py-3">
                    <span className="w-1/2 text-sm text-[var(--stone)]">Dimensions</span>
                    <span className="w-1/2 text-sm text-[var(--ink)]">{productInfo.dimensions}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedManga.length > 0 && (
        <section className="py-24 bg-[var(--paper-warm)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2
              className="text-3xl md:text-4xl text-[var(--ink)] mb-12"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {relatedManga.map((m, index) => (
                <MangaCard key={m.id} manga={m} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
