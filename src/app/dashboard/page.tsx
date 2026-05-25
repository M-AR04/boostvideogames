'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { dashboardStats, recentOrders, weeklySales, topProducts } from '@/data/dashboard';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Icons } from '@/components/Icons';

export default function Dashboard() {
  const { activeRole } = useAuth();
  const { language, t } = useLanguage();

  // Role checking redirect (if customer tries to view admin dashboard)
  if (activeRole === 'customer') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 gap-4">
          <Icons.Lock size={64} className="text-brand-red animate-pulse" />
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-xs text-slate-400 max-w-sm">
            Your active profile role (Customer) does not have privileges to view the ERP general ledger. Please use the Role Switcher in the top bar to become an Admin, Technician or Inventory Manager!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow flex flex-col lg:flex-row">
        <Sidebar />

        {/* Overview Panel */}
        <main className="flex-grow p-6 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                {t('erpOverview')}
              </h1>
              <p className="text-[10px] text-brand-amber font-bold uppercase tracking-wider font-mono">
                {t('erpSub')}
              </p>
            </div>
            
            <span className="px-3 py-1 rounded bg-brand-purple/30 border border-brand-purple/40 text-brand-amber text-[10px] font-bold uppercase font-mono tracking-wider">
              {t('liveUpdates')}
            </span>
          </div>

          {/* KPI Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* KPI 1: Today sales */}
            <div className={`glassmorphism rounded-2xl p-5 border border-brand-purple/20 relative overflow-hidden flex flex-col gap-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} text-brand-amber`}>
                <Icons.Dollar size={24} />
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                {t('todayRevenue')}
              </span>
              <h2 className="text-xl lg:text-2xl font-black text-white font-mono">
                {dashboardStats.totalSalesToday.toFixed(2)} JOD
              </h2>
              <span className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                <Icons.ArrowUp size={10} className="text-green-400 shrink-0" />
                <span>+14.2% {language === 'ar' ? 'مقارنة بالأمس' : 'vs yesterday'}</span>
              </span>
            </div>

            {/* KPI 2: Active repairs */}
            <div className={`glassmorphism rounded-2xl p-5 border border-brand-purple/20 relative overflow-hidden flex flex-col gap-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} text-brand-red`}>
                <Icons.Wrench size={24} />
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                {t('mmsActive')}
              </span>
              <h2 className="text-xl lg:text-2xl font-black text-white font-mono">
                {dashboardStats.activeRepairs} {language === 'ar' ? 'أجهزة صيانة' : 'Repairs'}
              </h2>
              <span className="text-[10px] text-brand-amber font-mono">
                {language === 'ar' ? '٣ أجهزة قيد التشخيص' : '3 in diagnostic pipelines'}
              </span>
            </div>

            {/* KPI 3: Stock alerts */}
            <div className={`glassmorphism rounded-2xl p-5 border border-brand-purple/20 relative overflow-hidden flex flex-col gap-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} text-brand-amber`}>
                <Icons.Inventory size={24} />
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                {t('imsStockAlerts')}
              </span>
              <h2 className="text-xl lg:text-2xl font-black text-brand-red font-mono">
                {dashboardStats.lowStockAlerts} {language === 'ar' ? 'قطع منقوصة' : 'items'}
              </h2>
              <span className="text-[10px] text-slate-400 font-mono font-sans text-xs">
                {language === 'ar' ? 'مستوى حرج لـ PS5 Digital' : 'Critical levels for PS5 Digital'}
              </span>
            </div>

            {/* KPI 4: Customers today */}
            <div className={`glassmorphism rounded-2xl p-5 border border-brand-purple/20 relative overflow-hidden flex flex-col gap-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} text-brand-purple-light`}>
                <Icons.Users size={24} />
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                {t('walkins')}
              </span>
              <h2 className="text-xl lg:text-2xl font-black text-white font-mono">
                {dashboardStats.customersToday} {language === 'ar' ? 'زائر' : 'shoppers'}
              </h2>
              <span className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                <Icons.ArrowUp size={10} className="text-green-400 shrink-0" />
                <span>+8.5% {language === 'ar' ? 'المعدل الأسبوعي' : 'average week'}</span>
              </span>
            </div>

          </div>

          {/* Section 2: Charts and Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Weekly Revenue visual block */}
            <div className="lg:col-span-2 glassmorphism rounded-2xl p-6 border border-brand-purple/20 flex flex-col gap-4">
              <h3 className={`text-xs font-bold text-white uppercase tracking-wider border-l-2 border-brand-amber pl-2 ${language === 'ar' ? 'text-right pr-2 border-r-2 border-l-0' : 'text-left'}`}>
                {t('weeklyRev')}
              </h3>
              
              {/* Simulated Chart Bars */}
              <div className="flex items-end justify-between h-44 pt-6 font-mono text-[10px] text-slate-400 gap-2" dir="ltr">
                {weeklySales.map((d) => {
                  const maxVal = Math.max(...weeklySales.map((w) => w.revenue));
                  const pct = (d.revenue / maxVal) * 100;
                  return (
                    <div key={d.date} className="flex flex-col items-center gap-2 flex-grow">
                      <span className="text-[9px] font-bold text-slate-300">{d.revenue}</span>
                      <div className="w-full bg-brand-purple-deep/60 border border-brand-purple/15 rounded-t-lg h-28 flex items-end">
                        <div
                          className="w-full bg-gradient-to-t from-brand-purple to-brand-amber rounded-t-md shadow-lg"
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <span className="font-bold">{d.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top retail items list */}
            <div className="glassmorphism rounded-2xl p-6 border border-brand-purple/20 flex flex-col gap-4">
              <h3 className={`text-xs font-bold text-white uppercase tracking-wider border-l-2 border-brand-red pl-2 ${language === 'ar' ? 'text-right pr-2 border-r-2 border-l-0' : 'text-left'}`}>
                {t('topProducts')}
              </h3>
              <div className="flex flex-col gap-3 font-mono text-[11px]">
                {topProducts.map((p, idx) => (
                  <div key={idx} className={`flex justify-between items-center border-b border-brand-purple/5 pb-2.5 last:border-0 last:pb-0 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <span className="font-bold text-slate-200">{p.name}</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">{p.sales} {language === 'ar' ? 'مبيعات' : 'sales'}</span>
                    </div>
                    <span className="font-bold text-brand-amber">{p.revenue.toFixed(2)} JOD</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 3: Recent E-commerce Orders */}
          <div className="glassmorphism rounded-2xl p-6 border border-brand-purple/20 flex flex-col gap-4">
            <h3 className={`text-xs font-bold text-white uppercase tracking-wider border-l-2 border-brand-purple-light pl-2 ${language === 'ar' ? 'text-right pr-2 border-r-2 border-l-0' : 'text-left'}`}>
              {t('recentOrders')}
            </h3>
            
            <div className="overflow-x-auto">
              <table className={`w-full font-mono text-[11px] ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="border-b border-brand-purple/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5">{t('orderId')}</th>
                    <th className="py-2.5">{t('customer')}</th>
                    <th className="py-2.5">{t('itemsPurchased')}</th>
                    <th className="py-2.5">{t('billingTotal')}</th>
                    <th className="py-2.5">{t('workflowStatus')}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((ord) => (
                    <tr key={ord.id} className="border-b border-brand-purple/5 last:border-0 hover:bg-brand-purple/5 transition-all">
                      <td className="py-3 font-bold text-slate-300">{ord.orderNumber}</td>
                      <td className="py-3 font-bold text-slate-300">{ord.customer}</td>
                      <td className="py-3 text-slate-400">{ord.items.join(', ')}</td>
                      <td className="py-3 font-black text-brand-amber">{ord.total.toFixed(2)} JOD</td>
                      <td className="py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase ${
                            ord.status === 'delivered'
                              ? 'bg-green-500/20 text-green-400'
                              : ord.status === 'processing'
                              ? 'bg-blue-500/20 text-blue-400'
                              : ord.status === 'shipped'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}