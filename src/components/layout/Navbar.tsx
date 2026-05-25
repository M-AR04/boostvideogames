'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth, UserRole } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { getCartCount, getCartTotal } = useCart();
  const { activeRole, switchRole } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLang = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  const roles: { id: UserRole; name: string; nameAr: string; color: string }[] = [
    { id: 'customer', name: 'Customer Portal', nameAr: 'بوابة العميل', color: 'bg-green-500' },
    { id: 'technician', name: 'MMS / Technician', nameAr: 'بوابة الفني (الصيانة)', color: 'bg-orange-500' },
    { id: 'inventory_manager', name: 'IMS / Inventory Manager', nameAr: 'إدارة المستودع (الجرد)', color: 'bg-blue-500' },
    { id: 'admin', name: 'System Admin / ERP', nameAr: 'المدير العام (ERP)', color: 'bg-purple-500' },
  ];

  const currentRoleInfo = roles.find((r) => r.id === activeRole);

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism border-b border-brand-purple/20">
      {/* Top Banner with Contact & Role Selector - Hidden on Mobile for clean compact UX */}
      <div className="hidden sm:block bg-brand-purple-deep/90 border-b border-brand-purple/10 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Contact and Experience info */}
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <span>📞</span> <span className="hover:text-brand-amber transition-colors">079 529 4030</span>
            </span>
            <span className="hidden md:inline text-brand-purple-light">|</span>
            <span className="hidden md:inline flex items-center gap-1 text-slate-400">
              <span>📍</span> <span>Amman, Swefieh</span>
            </span>
            <span className="text-brand-purple-light">|</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-amber font-bold">
              {t('tagline')}
            </span>
          </div>

          {/* Interactive Role Switcher for Demo */}
          <div className="flex items-center gap-3 relative">
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-amber animate-ping" />
              {t('roleBadge')}:
            </span>
            
            <button
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#1f1345] hover:bg-[#2b1b5e] border border-brand-purple/30 text-white font-semibold transition-all duration-200 text-[11px]"
            >
              <span className={`w-2 h-2 rounded-full ${currentRoleInfo?.color}`} />
              <span>{language === 'ar' ? currentRoleInfo?.nameAr : currentRoleInfo?.name}</span>
              <span className="text-[9px] text-slate-400">â–¼</span>
            </button>

            {isRoleOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-[#160c33] border border-brand-purple/40 rounded-lg shadow-2xl p-1 z-50 font-sans">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      switchRole(role.id);
                      setIsRoleOpen(false);
                    }}
                    className={`w-full text-left ${language === 'ar' ? 'text-right' : 'text-left'} px-3 py-2 rounded-md hover:bg-brand-purple/20 transition-all flex items-center justify-between text-xs mb-0.5 ${
                      activeRole === role.id ? 'bg-brand-purple/40 border border-brand-purple/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${role.color}`} />
                      <span className="font-medium text-slate-200">
                        {language === 'ar' ? role.nameAr : role.name}
                      </span>
                    </div>
                    {activeRole === role.id && <span className="text-brand-amber text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={toggleLang}
              className="px-2 py-0.5 rounded bg-brand-purple-deep hover:bg-[#1a0e38] border border-brand-purple/40 text-brand-amber font-bold text-[10px] uppercase font-mono tracking-wider transition-all duration-200"
            >
              {t('langToggle')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Logo container */}
          <div className="logo-container w-12 h-12 relative shrink-0">
            <Image
              src="/logo.png"
              alt="Boost Video Game Logo"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black font-outfit tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200">
              BOOST
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-brand-amber tracking-[4px] leading-tight font-outfit uppercase">
              Video Games
            </span>
          </div>
        </Link>

        {/* Desktop navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-outfit">
          <Link
            href="/shop"
            className={`text-sm font-semibold tracking-wide hover:text-brand-amber transition-colors ${
              pathname === '/shop' ? 'text-brand-amber border-b-2 border-brand-amber pb-1' : 'text-slate-200'
            }`}
          >
            {t('shop')}
          </Link>
          <Link
            href="/services"
            className={`text-sm font-semibold tracking-wide hover:text-brand-amber transition-colors ${
              pathname === '/services' ? 'text-brand-amber border-b-2 border-brand-amber pb-1' : 'text-slate-200'
            }`}
          >
            {t('services')}
          </Link>
          
          {/* Role based access control in demo */}
          {(activeRole === 'admin' || activeRole === 'technician' || activeRole === 'inventory_manager') && (
            <Link
              href="/dashboard"
              className="text-sm font-bold tracking-wide px-3.5 py-1.5 rounded bg-gradient-to-r from-brand-purple to-brand-purple-light hover:from-brand-purple-light hover:to-brand-purple border border-brand-purple-light/30 text-white flex items-center gap-1.5 shadow-[0_0_12px_rgba(109,40,217,0.3)] transition-all hover:scale-105"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
              {t('dashboard')}
            </Link>
          )}
        </nav>

        {/* Right side controls: Cart & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Interactive Shopping Cart summary */}
          <Link
            href="/cart"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-brand-purple-deep/80 hover:bg-[#1a0f3d] border border-brand-purple/20 transition-all duration-300 relative group"
          >
            <div className="relative">
              <span className="text-lg">🛒</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-brand-red text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-[#090514] scale-95 shadow-[0_0_8px_rgba(239,68,68,0.7)] group-hover:scale-110 transition-transform">
                  {getCartCount()}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left font-mono">
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">{t('cart')}</span>
              <span className="text-[11px] font-bold text-brand-amber leading-none">{getCartTotal().toFixed(2)} JOD</span>
            </div>
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-brand-purple/20 border border-brand-purple/30 text-white"
          >
            <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0c071d] border-b border-brand-purple/30 px-4 py-4 flex flex-col gap-4 font-outfit shadow-2xl">
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-base font-bold py-2 ${pathname === '/shop' ? 'text-brand-amber' : 'text-slate-200'}`}
          >
            {t('shop')}
          </Link>
          <Link
            href="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-base font-bold py-2 ${pathname === '/services' ? 'text-brand-amber' : 'text-slate-200'}`}
          >
            {t('services')}
          </Link>
          
          {(activeRole === 'admin' || activeRole === 'technician' || activeRole === 'inventory_manager') && (
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-black py-2.5 px-4 rounded bg-brand-purple/40 border border-brand-purple/30 text-brand-amber flex items-center justify-center gap-2 mb-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
              {t('dashboard')}
            </Link>
          )}

          {/* Divider */}
          <div className="border-t border-brand-purple/10 my-1" />

          {/* Mobile Language Toggle */}
          <div className="flex items-center justify-between gap-4 py-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
              {language === 'ar' ? 'اللغة الحالية' : 'Current Language'}
            </span>
            <button
              onClick={() => {
                toggleLang();
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-brand-purple-deep border border-brand-purple/40 text-brand-amber font-black text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
            >
              {t('langToggle')}
            </button>
          </div>

          {/* Mobile Demo Role Selector */}
          <div className="flex flex-col gap-2.5 pt-1">
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block">
              {t('roleBadge')}:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    switchRole(role.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-2 py-2 rounded-xl border text-[10px] font-black text-center transition-all flex items-center gap-1.5 justify-center active:scale-95 ${
                    activeRole === role.id
                      ? 'bg-brand-purple/40 border-brand-purple-light/40 text-brand-amber shadow-md'
                      : 'bg-[#130b2e]/60 border-brand-purple/20 text-slate-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${role.color}`} />
                  <span>{language === 'ar' ? role.nameAr : role.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;