'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: PageProps) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { language, t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc'>('specs');
  const [successMsg, setSuccessMsg] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 gap-4">
          <span className="text-5xl">⚠️</span>
          <h2 className="text-xl font-bold text-white">Product Not Found</h2>
          <Link href="/shop" className="text-brand-amber font-bold hover:underline">
            Back to Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/shop"
          className={`inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-brand-amber mb-8 transition-colors ${
            language === 'ar' ? 'flex-row-reverse' : ''
          }`}
        >
          <span>◀</span>
          <span>{t('backShop')}</span>
        </Link>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-16">
          
          {/* Left Column: Image with glass glow */}
          <div className="glassmorphism rounded-3xl p-8 border border-brand-purple/20 flex items-center justify-center relative min-h-[300px] md:min-h-[450px]">
            <div className="ambient-glow opacity-30 scale-75" />
            <div className="relative w-full h-[250px] md:h-[350px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                preload={true}
              />
            </div>
          </div>

          {/* Right Column: Info & purchase triggers */}
          <div className="flex flex-col gap-6 font-sans">
            
            {/* Header info */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-brand-amber tracking-widest uppercase font-mono">
                {product.brand}
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                {language === 'ar' ? product.nameAr : product.name}
              </h1>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 py-3 border-y border-brand-purple/10">
              <span className="text-3xl font-black text-brand-amber font-mono">
                {product.price.toFixed(2)} JOD
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-500 line-through font-mono">
                  {product.originalPrice.toFixed(2)} JOD
                </span>
              )}
            </div>

            {/* Meta details (availability, stock) */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-brand-purple-deep/40 border border-brand-purple/15">
                <span className="text-slate-400 font-bold uppercase tracking-wider">{t('brand')}</span>
                <span className="text-white font-semibold">{product.brand}</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-brand-purple-deep/40 border border-brand-purple/15">
                <span className="text-slate-400 font-bold uppercase tracking-wider">{t('availability')}</span>
                <span className={`font-semibold ${product.inStock ? 'text-green-400' : 'text-brand-red'}`}>
                  {product.inStock ? t('inStock') : t('outOfStock')}
                </span>
              </div>
            </div>

            {/* Checkout & Quantity Trigger */}
            {product.inStock && (
              <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
                {/* Quantity adjuster */}
                <div className="flex items-center bg-[#160c33]/80 border border-brand-purple/30 rounded-xl p-1.5 w-full sm:w-auto shrink-0 justify-between gap-4">
                  <span className="text-xs text-slate-400 font-mono px-2 uppercase font-bold">{t('quantity')}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-brand-purple/30 hover:bg-brand-purple/50 flex items-center justify-center text-sm font-bold text-white"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-black font-mono text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount || 99, quantity + 1))}
                      className="w-8 h-8 rounded-lg bg-brand-purple/30 hover:bg-brand-purple/50 flex items-center justify-center text-sm font-bold text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to cart CTA */}
                <div className="w-full relative">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-red via-brand-amber to-brand-amber text-white font-black text-sm shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
                  >
                    <span>🛒</span>
                    <span>{t('addToCart')}</span>
                  </button>
                  {successMsg && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-green-500/20 border border-green-500/40 text-green-400 text-xs py-2 px-3 rounded-lg text-center font-bold animate-pulse">
                      {t('successAdd')}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Info Tabs (Specs vs Description) */}
            <div className="mt-4">
              <div className="flex border-b border-brand-purple/20 mb-4 font-mono text-xs uppercase font-bold tracking-wider">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 px-4 border-b-2 transition-all ${
                    activeTab === 'specs'
                      ? 'border-brand-amber text-brand-amber'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {t('specifications')}
                </button>
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-2.5 px-4 border-b-2 transition-all ${
                    activeTab === 'desc'
                      ? 'border-brand-amber text-brand-amber'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {t('overview')}
                </button>
              </div>

              {activeTab === 'specs' ? (
                <div className="glassmorphism-card rounded-2xl p-4 border border-brand-purple/10">
                  <table className="w-full text-xs font-outfit">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key} className="border-b border-brand-purple/10 last:border-b-0">
                          <td className="py-2.5 text-slate-400 font-bold uppercase tracking-wider">{key}</td>
                          <td className="py-2.5 text-white font-semibold text-right">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-outfit">
                  {language === 'ar' ? product.descriptionAr : product.description}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-brand-purple/10 pt-16">
            <h2 className={`text-xl md:text-2xl font-black text-white mb-8 tracking-tight ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('relatedGear')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
