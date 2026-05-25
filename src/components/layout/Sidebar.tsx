'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Icons } from '@/components/Icons';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, activeRole } = useAuth();
  const { language, t } = useLanguage();

  const links = [
    { href: '/dashboard', labelKey: 'overviewSidebar', icon: <Icons.Dashboard size={14} /> },
    { href: '/dashboard/inventory', labelKey: 'imsSidebar', icon: <Icons.Inventory size={14} /> },
    { href: '/dashboard/inventory/audit', labelKey: 'jardSidebar', icon: <Icons.Search size={14} /> },
    { href: '/dashboard/maintenance', labelKey: 'mmsSidebar', icon: <Icons.Wrench size={14} /> },
  ];

  return (
    <aside className={`w-full lg:w-64 shrink-0 bg-[#0c071d] ${
      language === 'ar' ? 'border-l' : 'border-r'
    } border-brand-purple/20 p-6 flex flex-col justify-between font-sans`}>
      <div className="flex flex-col gap-8">
        
        {/* User Block info */}
        <div className="p-4 rounded-xl bg-brand-purple-deep/80 border border-brand-purple/15 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-purple/50 border border-brand-purple-light/20 flex items-center justify-center font-bold text-white text-base">
            {user?.name.charAt(0)}
          </div>
          <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <span className="text-[10px] font-bold text-brand-amber font-mono uppercase tracking-widest leading-none">
              {activeRole}
            </span>
            <h4 className="text-xs font-bold text-white mt-1 leading-tight">
              {language === 'ar' ? user?.nameAr : user?.name}
            </h4>
          </div>
        </div>

        {/* Nav Links grid */}
        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 font-outfit">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-purple to-brand-purple-light border border-brand-purple-light/30 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-brand-purple/10'
                }`}
              >
                <span>{link.icon}</span>
                <span>{t(link.labelKey)}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to E-commerce store portal */}
      <Link
        href="/"
        className="hidden lg:flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-brand-purple-deep hover:bg-[#1a0e3b] border border-brand-purple/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-200 font-outfit"
      >
        <span>{language === 'ar' ? <Icons.ArrowRight size={12} /> : <Icons.ArrowLeft size={12} />}</span>
        <span>{t('backStore')}</span>
      </Link>
    </aside>
  );
};
export default Sidebar;