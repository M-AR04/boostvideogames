'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { products } from '@/data/products';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function AuditDashboard() {
  const { activeRole } = useAuth();
  const { language } = useLanguage();
  
  // Map initial products to audit rows
  const [auditRows, setAuditRows] = useState(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      nameAr: p.nameAr,
      category: p.category,
      digitalStock: p.stockCount,
      physicalCount: p.stockCount, // Defaults to matching
    }))
  );

  const [isAuditingComplete, setIsAuditingComplete] = useState(false);

  const handlePhysicalCountChange = (productId: string, val: string) => {
    const num = parseInt(val) || 0;
    setAuditRows((prev) =>
      prev.map((row) => (row.id === productId ? { ...row, physicalCount: Math.max(0, num) } : row))
    );
  };

  const handleCalculateDiscrepancies = () => {
    setIsAuditingComplete(true);
  };

  const resetAudit = () => {
    setAuditRows(
      products.map((p) => ({
        id: p.id,
        name: p.name,
        nameAr: p.nameAr,
        category: p.category,
        digitalStock: p.stockCount,
        physicalCount: p.stockCount,
      }))
    );
    setIsAuditingComplete(false);
  };

  // Calculations
  const totalDiscrepancies = auditRows.reduce(
    (acc, row) => acc + Math.abs(row.digitalStock - row.physicalCount),
    0
  );

  if (activeRole === 'customer') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 gap-4">
          <span className="text-5xl">🛑</span>
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-xs text-slate-400 max-w-sm">
            Please switch your role to Inventory Manager or Admin in the top bar to access the IMS Auditing (Jard) module.
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

        {/* Jard Auditing Module */}
        <main className="flex-grow p-6 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                {language === 'ar' ? 'جرد المستودعات الرقمي (Jard)' : 'Jard / Digital Auditing'}
              </h1>
              <p className="text-[10px] text-brand-amber font-bold uppercase tracking-wider font-mono">
                Compare physical retail shelf stock with IMS database records
              </p>
            </div>

            {isAuditingComplete && (
              <button
                onClick={resetAudit}
                className="px-4 py-2 rounded-xl bg-brand-purple-deep hover:bg-brand-purple/40 border border-brand-purple/35 text-[10px] uppercase font-bold text-slate-300 tracking-wider transition-all cursor-pointer font-bold"
              >
                {language === 'ar' ? 'إعادة تصفير الجرد' : 'Reset Audit Sheet'}
              </button>
            )}
          </div>

          {/* Alert of audit status */}
          {isAuditingComplete && (
            <div
              className={`p-6 rounded-2xl border text-center ${
                totalDiscrepancies > 0
                  ? 'bg-red-500/10 border-brand-red/30 text-brand-red'
                  : 'bg-green-500/10 border-green-500/30 text-green-400'
              }`}
            >
              <span className="text-4xl mb-3 block">{totalDiscrepancies > 0 ? '⚠️' : '✅'}</span>
              <h3 className="text-sm font-bold mb-1">
                {totalDiscrepancies > 0
                  ? (language === 'ar' ? 'تم كشف فروقات في الجرد الميداني!' : 'Discrepancies Detected!')
                  : (language === 'ar' ? 'تم مطابقة الجرد بالكامل بنجاح!' : 'Stock Audit Cleared!')}
              </h3>
              <p className="text-xs font-mono">
                {totalDiscrepancies > 0
                  ? (language === 'ar'
                      ? `يوجد اختلاف في كميات الأرفف الفعلية بمقدار ${totalDiscrepancies} قطع. يرجى المطابقة مع سجلات مبيعات الصويفية.`
                      : `Physical counts differ by total of ${totalDiscrepancies} units. Please reconcile with Swefieh store logs.`)
                  : (language === 'ar'
                      ? 'الكميات الفعلية على الرفوف متطابقة تماماً مع سجلات المستودع الرقمي.'
                      : 'Physical shelf counts match digital database stock counts exactly.')}
              </p>
            </div>
          )}

          {/* Audit Sheet Table */}
          <div className="glassmorphism rounded-2xl p-6 border border-brand-purple/20">
            <div className="overflow-x-auto">
              <table className={`w-full font-mono text-[11px] ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="border-b border-brand-purple/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th>{language === 'ar' ? 'المنتج' : 'Hardware Item'}</th>
                    <th>{language === 'ar' ? 'الفئة' : 'Category'}</th>
                    <th className="text-center">{language === 'ar' ? 'الكمية الرقمية (IMS)' : 'Digital Stock (IMS)'}</th>
                    <th className="text-center">{language === 'ar' ? 'الكمية الفعلية على الرف' : 'Physical Shelf Count'}</th>
                    <th className="text-right">{language === 'ar' ? 'الفروقات الناتجة' : 'Discrepancy (Variance)'}</th>
                  </tr>
                </thead>
                <tbody>
                  {auditRows.map((row) => {
                    const variance = row.physicalCount - row.digitalStock;
                    const hasDiscrepancy = variance !== 0;

                    return (
                      <tr
                        key={row.id}
                        className={`border-b border-brand-purple/5 last:border-0 hover:bg-brand-purple/5 transition-all ${
                          isAuditingComplete && hasDiscrepancy ? 'bg-red-500/5' : ''
                        }`}
                      >
                        <td className="py-3">
                          <span className="font-bold text-slate-200">{language === 'ar' ? row.nameAr : row.name}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-slate-400 uppercase text-[9px]">{row.category}</span>
                        </td>
                        <td className="py-3 text-center">
                          <span className="font-bold text-slate-300">{row.digitalStock}</span>
                        </td>
                        <td className="py-3 text-center">
                          <input
                            type="number"
                            disabled={isAuditingComplete}
                            value={row.physicalCount}
                            onChange={(e) => handlePhysicalCountChange(row.id, e.target.value)}
                            className="bg-[#160c33]/80 border border-brand-purple/30 rounded-lg px-2 py-1 text-center w-16 text-white focus:outline-none focus:border-brand-amber disabled:opacity-60"
                          />
                        </td>
                        <td className="py-3 text-right">
                          {isAuditingComplete ? (
                            hasDiscrepancy ? (
                              <span className={`font-bold ${variance > 0 ? 'text-green-400' : 'text-brand-red'}`}>
                                {variance > 0 ? `+${variance}` : variance} {language === 'ar' ? 'وحدات' : 'units'}
                              </span>
                            ) : (
                              <span className="text-green-400">{language === 'ar' ? '✓ مطابقة تامة' : '✓ Perfect'}</span>
                            )
                          ) : (
                            <span className="text-slate-500">{language === 'ar' ? 'بانتظار التقييم' : 'Pending calculation'}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Calculations submission trigger */}
            {!isAuditingComplete && (
              <div className="flex justify-end mt-8 border-t border-brand-purple/10 pt-6">
                <button
                  onClick={handleCalculateDiscrepancies}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white font-black text-xs shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer font-bold"
                >
                  {language === 'ar' ? 'حساب فروقات الكميات (جرد المستودع)' : 'Calculate Stock Discrepancies (Jard Audit)'}
                </button>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}