'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { products as initialProducts, categories } from '@/data/products';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function InventoryDashboard() {
  const { activeRole } = useAuth();
  const { language } = useLanguage();
  const [products, setProducts] = useState(initialProducts);
  const [selectedCat, setSelectedCat] = useState('all');
  
  // New Product Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [category, setCategory] = useState(categories[0].id);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleStockUpdate = (productId: string, amount: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newQty = Math.max(0, p.stockCount + amount);
          return { ...p, stockCount: newQty, inStock: newQty > 0 };
        }
        return p;
      })
    );
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !brand || !price || !stockCount) return;

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stockCount);

    const newProduct = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      nameAr: name, // simplified
      category: category as any,
      brand,
      price: parsedPrice,
      image: '/products/logo.jpg', // placeholder
      description: 'Incoming inventory stock.',
      descriptionAr: 'بضائع مخزنية جديدة.',
      specs: { 'Status': 'Intake' },
      inStock: parsedStock > 0,
      stockCount: parsedStock,
      featured: false,
    };

    setProducts([newProduct, ...products]);
    
    // Reset state form
    setName('');
    setBrand('');
    setPrice('');
    setStockCount('');
    setIsAddOpen(false);
  };

  const filteredList = selectedCat === 'all' ? products : products.filter((p) => p.category === selectedCat);

  if (activeRole === 'customer') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 gap-4">
          <span className="text-5xl">🛑</span>
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-xs text-slate-400 max-w-sm">
            Please switch your role to Inventory Manager or Admin in the top bar to access the IMS database.
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

        {/* IMS Inventory Panel */}
        <main className="flex-grow p-6 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className={`flex justify-between items-center flex-wrap gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                IMS Central Inventory Control
              </h1>
              <p className="text-[10px] text-brand-amber font-bold uppercase tracking-wider font-mono">
                Real-time stock audits, replenishment warnings and retail items listings
              </p>
            </div>

            <button
              onClick={() => setIsAddOpen(!isAddOpen)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white text-xs font-black transition-all hover:scale-105 shadow-md flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <span>+</span>
              <span>{language === 'ar' ? 'تسجيل بضاعة جديدة' : 'Register New Hardware'}</span>
            </button>
          </div>

          {/* Add Product Modal Block */}
          {isAddOpen && (
            <div className="glassmorphism rounded-2xl p-6 border border-brand-purple/20">
              <h2 className={`text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-brand-purple/10 pb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? 'نموذج تسجيل منتج جديد في المخزن' : 'New Product Intake Registration'}
              </h2>
              <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'اسم المنتج' : 'Product Name'}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Logitech Mouse G PRO"
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'الشركة المصنعة' : 'Brand'}</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Logitech"
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'سعر البيع' : 'Retail Price (JOD)'}</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 89.99"
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'الكمية المخزنية' : 'Initial Stock Quantity'}</label>
                  <input
                    type="number"
                    required
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value)}
                    placeholder="e.g. 10"
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'الفئة' : 'Category'}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-slate-300 focus:outline-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {language === 'ar' ? c.nameAr : c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-3 flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="px-4 py-2 rounded-xl bg-brand-purple-deep hover:bg-brand-purple/40 border border-brand-purple/20 text-slate-400 text-xs font-bold transition-all"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white text-xs font-black transition-all hover:scale-103 font-bold"
                  >
                    {language === 'ar' ? 'تأكيد الإدخال' : 'Confirm Intake'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Table of products */}
          <div className="glassmorphism rounded-2xl p-6 border border-brand-purple/20">
            {/* Category quick filter */}
            <div className={`flex items-center gap-3 mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <span className="text-[10px] text-slate-400 uppercase font-bold font-mono tracking-wider">
                {language === 'ar' ? 'فلتر سريع:' : 'Quick Filter:'}
              </span>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-1.5 text-[11px] text-slate-300 focus:outline-none cursor-pointer font-sans"
              >
                <option value="all">{language === 'ar' ? 'جميع الفئات' : 'All Categories'}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === 'ar' ? c.nameAr : c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className={`w-full font-mono text-[11px] ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="border-b border-brand-purple/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th>{language === 'ar' ? 'المنتج' : 'Hardware Item'}</th>
                    <th>{language === 'ar' ? 'الفئة' : 'Category'}</th>
                    <th>{language === 'ar' ? 'السعر المفرد' : 'Unit Price'}</th>
                    <th>{language === 'ar' ? 'الكمية المتوفرة' : 'Current Stock'}</th>
                    <th>{language === 'ar' ? 'حالة التقييم' : 'Audit Status'}</th>
                    <th className="text-right">{language === 'ar' ? 'تحديث الكمية' : 'Inventory Actions'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((p) => {
                    const isCritical = p.stockCount <= 3;
                    const isWarning = p.stockCount <= 5 && p.stockCount > 3;
                    
                    return (
                      <tr key={p.id} className="border-b border-brand-purple/5 last:border-0 hover:bg-brand-purple/5 transition-all">
                        <td className="py-3.5">
                          <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                            <span className="font-bold text-slate-200">{language === 'ar' ? p.nameAr : p.name}</span>
                            <span className="text-[9px] text-slate-500 mt-0.5">{p.brand}</span>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 rounded bg-brand-purple-deep border border-brand-purple/20 text-[9px] text-slate-300 font-semibold uppercase">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3.5 font-bold text-white">{p.price.toFixed(2)} JOD</td>
                        <td className="py-3.5">
                          <span className={`font-black text-xs ${isCritical ? 'text-brand-red' : isWarning ? 'text-brand-amber' : 'text-green-400'}`}>
                            {p.stockCount} {language === 'ar' ? 'وحدات' : 'units'}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                              isCritical
                                ? 'bg-red-500/20 text-brand-red'
                                : isWarning
                                ? 'bg-yellow-500/20 text-brand-amber'
                                : 'bg-green-500/20 text-green-400'
                            }`}
                          >
                            {isCritical
                              ? (language === 'ar' ? 'مخزون حرج' : 'Critical Stock')
                              : isWarning
                              ? (language === 'ar' ? 'مخزون منخفض' : 'Low Stock')
                              : (language === 'ar' ? 'مثالي' : 'Optimized')}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStockUpdate(p.id, -1)}
                              className="w-7 h-7 rounded-lg bg-brand-purple/20 hover:bg-brand-purple/40 border border-brand-purple-light/20 flex items-center justify-center text-slate-300 text-xs font-bold transition-all"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleStockUpdate(p.id, 1)}
                              className="w-7 h-7 rounded-lg bg-brand-purple/20 hover:bg-brand-purple/40 border border-brand-purple-light/20 flex items-center justify-center text-slate-300 text-xs font-bold transition-all"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}