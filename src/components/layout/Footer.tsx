'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#05030d] border-t border-brand-purple/20 pt-16 pb-8 text-slate-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Information Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group">
          {/* Logo */}
          <div className="logo-container w-10 h-10 relative shrink-0">
            <Image
              src="/logo.png"
              alt="Boost Video Game Logo"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white leading-none">BOOST</span>
            <span className="text-[8px] font-bold text-brand-amber tracking-[3px] leading-tight uppercase">Video Games</span>
          </div>
          </Link>
          
          <p className="text-xs text-slate-400 leading-relaxed font-outfit mt-2">
            {t('aboutDesc')}
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://www.facebook.com/Boostvideogame/?locale=ar_AR"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple/30 hover:border-brand-amber hover:bg-brand-amber/10 flex items-center justify-center text-sm transition-all duration-300"
            >
              f
            </a>
            <a
              href="https://www.instagram.com/boostvideogame"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple/30 hover:border-brand-amber hover:bg-brand-amber/10 flex items-center justify-center text-sm transition-all duration-300"
            >
              📸
            </a>
            <a
              href="https://www.google.com/maps/place/Boost+Video+Game/data=!4m2!3m1!1s0x0:0x63350cf009b132c?sa=X&ved=1t:2428&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple/30 hover:border-brand-amber hover:bg-brand-amber/10 flex items-center justify-center text-sm transition-all duration-300"
            >
              📍
            </a>
          </div>
        </div>

        {/* Quick Links / E-Commerce */}
        <div className="flex flex-col gap-4 font-outfit">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-brand-amber pl-2.5">
            {t('shopHub')}
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
            <li><Link href="/shop" className="hover:text-brand-amber transition-colors">{t('browseConsoles')}</Link></li>
            <li><Link href="/shop?cat=keyboards" className="hover:text-brand-amber transition-colors">{t('keyboards')}</Link></li>
            <li><Link href="/shop?cat=mice" className="hover:text-brand-amber transition-colors">{t('mice')}</Link></li>
            <li><Link href="/shop?cat=controllers" className="hover:text-brand-amber transition-colors">{t('controllers')}</Link></li>
          </ul>
        </div>

        {/* Repair & Maintenance MMS */}
        <div className="flex flex-col gap-4 font-outfit">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-brand-red pl-2.5">
            {t('repairHub')}
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
            <li><Link href="/services" className="hover:text-brand-red transition-colors">{t('driftFix')}</Link></li>
            <li><Link href="/services" className="hover:text-brand-red transition-colors">{t('hdmiRepair')}</Link></li>
            <li><Link href="/services" className="hover:text-brand-red transition-colors">{t('deepClean')}</Link></li>
            <li><Link href="/services" className="hover:text-brand-red transition-colors">{t('bookRepair')}</Link></li>
          </ul>
        </div>

        {/* Swefieh Showroom Contact Detail */}
        <div className="flex flex-col gap-4 font-outfit">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-brand-amber pl-2.5">
            {t('locationTitle')}
          </h4>
          <div className="flex flex-col gap-3 text-xs leading-relaxed text-slate-400">
            <span className="flex items-start gap-2">
              <span>📍</span>
              <span>{t('locationDesc')}</span>
            </span>
            <span className="flex items-center gap-2">
              <span>📞</span>
              <span>{t('phone')}</span>
            </span>
            <span className="flex items-center gap-2">
              <span>🕒</span>
              <span>{t('hours')}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Copywrite Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-brand-purple/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-mono">
        <span>{t('rights')}</span>
        <span>{t('erpTitle')}</span>
      </div>
    </footer>
  );
};
export default Footer;