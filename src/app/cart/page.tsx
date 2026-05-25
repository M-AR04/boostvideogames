'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Icons } from '@/components/Icons';

export default function Cart() {
  const { language, t } = useLanguage();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  
  // Checkout Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waLink, setWaLink] = useState('');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    setIsSubmitting(true);
    
    // Simulate order placement database register
    setTimeout(() => {
      // Create detailed bilingual invoice text for WhatsApp redirect
      const itemsList = cart.map((item, idx) => {
        const productName = language === 'ar' ? item.product.nameAr : item.product.name;
        return `${idx + 1}. *${productName}* \n   ${item.quantity} x ${item.product.price.toFixed(2)} JOD = *${(item.product.price * item.quantity).toFixed(2)} JOD*`;
      }).join('\n\n');

      const whatsappText = language === 'ar' 
        ? `*فاتورة طلب جديدة - Boost Video Game* 🎮\n` +
          `===========================\n` +
          `👤 *اسم العميل:* ${name}\n` +
          `📞 *رقم الهاتف:* ${phone}\n` +
          `📍 *عنوان التوصيل / الاستلام:* ${address}\n` +
          `===========================\n` +
          `📦 *المنتجات المشتراة:*\n\n${itemsList}\n` +
          `===========================\n` +
          `💰 *السعر الإجمالي:* *${getCartTotal().toFixed(2)} JOD*\n\n` +
          `شكراً لتسوقك معنا! سيقوم فريق المعرض بتأكيد طلبك وتجهيز التوصيل فوراً.`
        : `*New Order Invoice - Boost Video Game* 🎮\n` +
          `===========================\n` +
          `👤 *Customer Name:* ${name}\n` +
          `📞 *Phone Number:* ${phone}\n` +
          `📍 *Delivery / Pickup Details:* ${address}\n` +
          `===========================\n` +
          `📦 *Purchased Items:*\n\n${itemsList}\n` +
          `===========================\n` +
          `💰 *Grand Total:* *${getCartTotal().toFixed(2)} JOD*\n\n` +
          `Thank you! Our Swefieh team will contact you in under 15 minutes to confirm immediate pickup or home delivery in Amman.`;

      // Boost official WhatsApp number: +962 7 9529 4030
      const formattedPhone = '962795294030';
      const encodedText = encodeURIComponent(whatsappText);
      const url = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedText}`;

      setWaLink(url);
      setIsSubmitting(false);
      setCheckoutComplete(true);
      
      // Open WhatsApp Web/App in a new window automatically!
      window.open(url, '_blank');
      
      // Clear Cart state
      clearCart();
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Title Header */}
        <div className={`mb-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {t('cartTitle')}
          </h1>
          <p className="text-xs text-brand-amber font-bold uppercase tracking-wider font-mono mt-1">
            {t('cartSub')}
          </p>
        </div>

        {checkoutComplete ? (
          /* Order success notification state with redirect details */
          <div className="max-w-2xl mx-auto glassmorphism rounded-3xl p-8 md:p-12 text-center border border-green-500/25 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-green-500" />
            <div className="flex justify-center mb-6">
              <Icons.Message size={64} className="text-green-500 animate-bounce" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-green-400 mb-4">{t('successOrder')}</h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-outfit mb-8">
              {t('successOrderDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-sm shadow-[0_0_15px_rgba(22,163,74,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Icons.Message size={18} className="text-white" />
                <span>{language === 'ar' ? 'افتح واتساب يدوياً' : 'Open WhatsApp Manually'}</span>
              </a>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1b103e] hover:bg-[#28185c] border border-brand-purple/40 text-white font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                {t('backHome')}
              </Link>
            </div>
          </div>
        ) : cart.length > 0 ? (
          /* Cart contents lists */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Cart items list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="glassmorphism-card rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between border border-brand-purple/10"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-16 h-16 relative bg-[#1b103e]/40 border border-brand-purple/20 rounded-xl overflow-hidden p-1 flex items-center justify-center shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <span className="text-[10px] font-bold text-brand-amber uppercase font-mono tracking-widest leading-none">
                        {item.product.brand}
                      </span>
                      <h3 className="text-xs md:text-sm font-bold text-white mt-1">
                        {language === 'ar' ? item.product.nameAr : item.product.name}
                      </h3>
                      <span className="text-[11px] font-bold text-brand-amber font-mono mt-0.5">
                        {item.product.price.toFixed(2)} JOD
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center gap-6 justify-between w-full sm:w-auto shrink-0 border-t border-brand-purple/10 sm:border-0 pt-3 sm:pt-0">
                    <div className="flex items-center bg-[#160c33]/80 border border-brand-purple/20 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-brand-purple/30 hover:bg-brand-purple/50 flex items-center justify-center text-xs font-bold text-white"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-black font-mono text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-brand-purple/30 hover:bg-brand-purple/50 flex items-center justify-center text-xs font-bold text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4 font-mono">
                      <span className="text-xs font-black text-white">
                        {(item.product.price * item.quantity).toFixed(2)} JOD
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-slate-500 hover:text-brand-red font-black"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Trigger */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 rounded-xl bg-brand-purple-deep hover:bg-brand-purple/40 border border-brand-purple/35 text-[10px] uppercase font-bold text-brand-red tracking-wider transition-all"
                >
                  {t('clearBasket')}
                </button>
              </div>
            </div>

            {/* Right Column: Order summary and interactive checkout booking form */}
            <div className="flex flex-col gap-6 font-sans">
              {/* Summary Block */}
              <div className="glassmorphism rounded-2xl p-6 border border-brand-purple/20">
                <h3 className={`text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-brand-purple/10 pb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {t('summary')}
                </h3>
                <div className="flex flex-col gap-3 text-xs font-mono mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('itemsCount')}</span>
                    <span className="text-white font-bold">{cart.length}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black border-t border-brand-purple/10 pt-3">
                    <span className="text-white">{t('totalPrice')}</span>
                    <span className="text-brand-amber">{getCartTotal().toFixed(2)} JOD</span>
                  </div>
                </div>
              </div>

              {/* Interactive Booking Form */}
              <div className="glassmorphism rounded-2xl p-6 border border-brand-purple/20">
                <h3 className={`text-sm font-bold text-white uppercase tracking-wider mb-2 border-b border-brand-purple/10 pb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {t('checkoutTitle')}
                </h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-outfit mb-4">
                  {t('checkoutDesc')}
                </p>

                <form onSubmit={handleCheckout} className="flex flex-col gap-3.5 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {t('fullName')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: رائد سويس' : 'e.g. Raed Sweis'}
                      className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-amber transition-all font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {t('phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0795294030"
                      className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-amber transition-all font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {t('addressLabel')}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: استلام من معرض الصويفية، أو عمان، الدوار الرابع شارع 3' : 'e.g. Swefieh showroom pickup, or Amman, 4th circle street 3'}
                      className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-amber transition-all font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white font-black text-sm shadow-[0_0_15px_rgba(229,62,62,0.3)] transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-bold"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Icons.Message size={18} className="text-white" />
                        <span>{t('confirmWhatsApp')}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        ) : (
          /* Empty cart placeholder state */
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <Icons.Cart size={64} className="text-slate-500" />
            <p className="text-sm font-bold text-slate-400">{t('cartEmpty')}</p>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white font-black text-xs shadow-md transition-all hover:scale-105"
            >
              {t('shopBtn')}
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}