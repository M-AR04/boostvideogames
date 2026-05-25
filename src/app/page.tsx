'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { Icons } from '@/components/Icons';

export default function Home() {
  const { language, t } = useLanguage();
  const featuredList = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Dynamic Hero Section */}
        <section className="relative py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden border-b border-brand-purple/20">
          <div className="absolute inset-0 bg-[#090514] bg-[radial-gradient(circle_at_center,rgba(76,29,149,0.2)_0%,rgba(9,5,20,0)_70%)] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-4 text-center z-10 relative flex flex-col items-center">
            {/* Tag / Badge */}
            <span className="px-3.5 py-1 text-[10px] md:text-xs font-black uppercase tracking-widest bg-brand-purple/40 border border-brand-purple-light/20 rounded-full text-brand-amber mb-6 inline-block shadow-md">
              {t('heroSub')}
            </span>

            {/* Glowing Big Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200">
              {t('heroTitle')}
            </h1>

            {/* Subtext description */}
            <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed mb-10 font-outfit">
              {t('heroDesc')}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-red via-brand-amber to-brand-amber text-white font-black text-sm shadow-[0_0_20px_rgba(217,119,6,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{t('shopBtn')}</span>
                <Icons.Gamepad size={14} />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1b103e] hover:bg-[#28185c] border border-brand-purple/40 hover:border-brand-purple-light/40 text-white font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{t('repairBtn')}</span>
                <Icons.Gear size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
              </Link>
            </div>
          </div>
        </section>

        {/* Pillars of Operations */}
        <section className="py-20 max-w-7xl mx-auto px-4">
          <h2 className={`text-2xl md:text-3xl font-black text-white mb-12 tracking-tight ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {t('pillarsTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="glassmorphism-card rounded-2xl p-6 relative overflow-hidden group flex flex-col items-start">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-amber to-brand-amber opacity-10 rounded-bl-[100px]" />
              <Icons.Cart size={28} className="text-brand-amber mb-4 shrink-0" />
              <h3 className="text-lg font-bold text-white mb-2">{t('pillar1')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-outfit">{t('pillar1Desc')}</p>
            </div>

            {/* Pillar 2 */}
            <div className="glassmorphism-card rounded-2xl p-6 relative overflow-hidden group flex flex-col items-start">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-red to-brand-amber opacity-10 rounded-bl-[100px]" />
              <Icons.Wrench size={28} className="text-brand-red mb-4 shrink-0" />
              <h3 className="text-lg font-bold text-white mb-2">{t('pillar2')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-outfit">{t('pillar2Desc')}</p>
            </div>

            {/* Pillar 3 */}
            <div className="glassmorphism-card rounded-2xl p-6 relative overflow-hidden group flex flex-col items-start">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-purple to-brand-purple-light opacity-10 rounded-bl-[100px]" />
              <Icons.Handshake size={28} className="text-brand-purple-light mb-4 shrink-0" />
              <h3 className="text-lg font-bold text-white mb-2">{t('pillar3')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-outfit">{t('pillar3Desc')}</p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-brand-purple-deep/40 border-y border-brand-purple/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className={`mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {t('featuredTitle')}
              </h2>
              <p className="text-xs text-brand-amber font-bold uppercase tracking-wider font-mono mt-1">
                {t('featuredSub')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Repair Booking CTA */}
        <section className="py-20 max-w-7xl mx-auto px-4">
          <div className="glassmorphism rounded-3xl p-8 md:p-12 relative overflow-hidden border border-brand-purple/20 flex flex-col md:flex-row items-center gap-8 justify-between">
            {/* Background Glow */}
            <div className="absolute -left-12 -top-12 w-64 h-64 bg-brand-red opacity-10 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-brand-red opacity-10 rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-xl relative z-10">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-brand-red/20 border border-brand-red/30 text-brand-red rounded-md mb-4 inline-block">
                Specialized Service Center
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                {t('ctaTitle')}
              </h2>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-outfit">
                {t('ctaDesc')}
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto shrink-0">
              <Link
                href="/services"
                className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white font-black text-sm shadow-[0_0_15px_rgba(229,62,62,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Icons.Wrench size={14} />
                <span>{t('ctaBtn')}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-20 max-w-7xl mx-auto px-4 border-t border-brand-purple/10">
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-12">
            {t('reviewTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Review 1 */}
            <div className="glassmorphism-card rounded-2xl p-6 relative flex flex-col justify-between">
              <p className="text-sm italic text-slate-300 leading-relaxed font-outfit mb-4">
                {t('review1')}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 text-yellow-400 shrink-0">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Icons.Star key={idx} size={12} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400">{t('review1User')}</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="glassmorphism-card rounded-2xl p-6 relative flex flex-col justify-between">
              <p className="text-sm italic text-slate-300 leading-relaxed font-outfit mb-4">
                {t('review2')}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 text-yellow-400 shrink-0">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Icons.Star key={idx} size={12} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400">{t('review2User')}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}