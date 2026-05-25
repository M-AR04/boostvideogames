'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories, brands } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

export default function Shop() {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Filter
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.descriptionAr.includes(q)
      );
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Brand Filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default / Featured
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, selectedCategory, selectedBrand, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Title Header */}
        <div className={`mb-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {t('catalogTitle')}
          </h1>
          <p className="text-xs text-brand-amber font-bold uppercase tracking-wider font-mono mt-1">
            {t('catalogSub')}
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="glassmorphism p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 justify-between items-center border border-brand-purple/20">
          {/* Search bar */}
          <div className="w-full md:max-w-md relative">
            <span className="absolute left-3.5 top-3.5 text-slate-400">🔍</span>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full bg-[#160c33]/80 border border-brand-purple/30 rounded-xl py-2.5 ${
                language === 'ar' ? 'pr-4 pl-10 text-right' : 'pl-10 pr-4 text-left'
              } text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-amber transition-all duration-300 font-sans`}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className={`absolute ${language === 'ar' ? 'left-10' : 'right-4'} top-3.5 text-xs text-slate-500 hover:text-white`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Selector Dropdowns */}
          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
            {/* Category selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-brand-amber transition-all font-sans cursor-pointer"
            >
              <option value="all">{t('allCats')}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'ar' ? c.nameAr : c.name}
                </option>
              ))}
            </select>

            {/* Brand selector */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-brand-amber transition-all font-sans cursor-pointer"
            >
              <option value="all">{t('allBrands')}</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Sorting selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-brand-amber transition-all font-sans cursor-pointer"
            >
              <option value="featured">{t('featured')}</option>
              <option value="price-low">{t('priceLow')}</option>
              <option value="price-high">{t('priceHigh')}</option>
              <option value="name">{t('nameSort')}</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className={`mb-6 text-xs text-slate-400 font-mono ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {t('resultsCount').replace('{n}', filteredProducts.length.toString())}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <span className="text-5xl">📦</span>
            <p className="text-sm font-bold text-slate-400">{t('noResults')}</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSortBy('featured');
              }}
              className="px-4 py-2 rounded-xl bg-brand-purple-deep hover:bg-brand-purple/40 border border-brand-purple/30 text-xs text-brand-amber font-bold transition-all"
            >
              {t('clearFilters')}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}