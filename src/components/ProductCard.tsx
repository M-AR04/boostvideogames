'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCardProps {
  product: Product;
  lang?: 'en' | 'ar';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link href={`/shop/${product.id}`} className="block group">
      <div className="glassmorphism-card rounded-2xl overflow-hidden flex flex-col h-full relative border border-brand-purple/20">
        
        {/* Product Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-gradient-to-r from-brand-red to-brand-amber text-white shadow-lg animate-pulse">
              {product.badge}
            </span>
          </div>
        )}

        {/* Thumbnail Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-purple-deep/40 border-b border-brand-purple/10 flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-2 group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090514]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Info Block */}
        <div className="p-4 flex flex-col flex-grow gap-2">
          {/* Brand */}
          <span className="text-[10px] font-bold text-brand-amber tracking-widest uppercase font-mono">
            {product.brand}
          </span>

          {/* Title */}
          <h3 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-brand-amber transition-colors duration-200">
            {language === 'ar' ? product.nameAr : product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed h-8 font-outfit">
            {language === 'ar' ? product.descriptionAr : product.description}
          </p>

          {/* Price & Cart CTA */}
          <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-brand-purple/10">
            <div className="flex flex-col font-mono">
              <span className="text-sm font-black text-white">
                {product.price.toFixed(2)} JOD
              </span>
              {product.originalPrice && (
                <span className="text-[10px] text-slate-500 line-through">
                  {product.originalPrice.toFixed(2)} JOD
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="px-3.5 py-2 rounded-xl bg-brand-purple/40 hover:bg-gradient-to-r hover:from-brand-red hover:to-brand-amber border border-brand-purple-light/20 hover:border-transparent text-white text-xs font-black shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>🛒</span>
              <span>{t('addToCart')}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;