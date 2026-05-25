'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { services, sampleTickets, statusColors } from '@/data/services';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { language, t } = useLanguage();
  const [searchTicket, setSearchTicket] = useState('');
  const [trackedTicket, setTrackedTicket] = useState<(typeof sampleTickets)[0] | null>(null);
  const [trackError, setTrackError] = useState(false);

  // Booking Form State
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [device, setDevice] = useState('PS5 Controller');
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [issueDesc, setIssueDesc] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waRepairLink, setWaRepairLink] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicket) return;

    const ticket = sampleTickets.find(
      (t) => t.ticketNumber.toLowerCase() === searchTicket.trim().toLowerCase()
    );

    if (ticket) {
      setTrackedTicket(ticket);
      setTrackError(false);
    } else {
      setTrackedTicket(null);
      setTrackError(true);
    }
  };

  const handleBookService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone || !issueDesc) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketNum = `BVG-2026-0${Math.floor(Math.random() * 900 + 100)}`;
      
      const baseService = services.find((s) => s.id === selectedService);
      const serviceName = baseService ? (language === 'ar' ? baseService.nameAr : baseService.name) : 'Diagnostics';

      // Create WhatsApp message text for repair ticket booking
      const waText = language === 'ar'
        ? `*طلب صيانة جديد - Boost Video Game* 🛠️\n` +
          `===========================\n` +
          `🎫 *رقم التذكرة:* *${ticketNum}*\n` +
          `👤 *العميل:* ${custName}\n` +
          `📞 *رقم الهاتف:* ${custPhone}\n` +
          `🎮 *الجهاز:* ${device}\n` +
          `🔧 *الخدمة:* ${serviceName}\n` +
          `📍 *تفاصيل العطل:* ${issueDesc}\n` +
          `===========================\n` +
          `سيقوم فنيو الصيانة في الصويفية بفحص جهازك فوراً عند تشريفك لنا.`
        : `*New Repair Booking - Boost Video Game* 🛠️\n` +
          `===========================\n` +
          `🎫 *Ticket ID:* *${ticketNum}*\n` +
          `👤 *Customer:* ${custName}\n` +
          `📞 *Phone:* ${custPhone}\n` +
          `🎮 *Device:* ${device}\n` +
          `🔧 *Service:* ${serviceName}\n` +
          `📍 *Issue Description:* ${issueDesc}\n` +
          `===========================\n` +
          `Our Swefieh technician team will diagnose your device upon arrival.`;

      const url = `https://api.whatsapp.com/send?phone=962795294030&text=${encodeURIComponent(waText)}`;
      
      setWaRepairLink(url);
      setIsSubmitting(false);
      setBookingSuccess(ticketNum);
      
      // Auto redirect to WhatsApp for repair bookings as well!
      window.open(url, '_blank');

      // Reset form
      setCustName('');
      setCustPhone('');
      setIssueDesc('');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Title Header */}
        <div className={`mb-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {t('mmsHubTitle')}
          </h1>
          <p className="text-xs text-brand-amber font-bold uppercase tracking-wider font-mono mt-1">
            {t('mmsHubSub')}
          </p>
        </div>

        {/* SECTION 1: Repair Status Tracker */}
        <section className="mb-16">
          <div className="glassmorphism rounded-3xl p-6 md:p-8 border border-brand-purple/20 relative">
            <div className="max-w-xl">
              <h2 className={`text-base font-bold text-white uppercase tracking-wider mb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('trackStatus')}
              </h2>
              <p className={`text-[10px] text-slate-400 font-mono mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('sampleTickets')}
              </p>

              <form onSubmit={handleTrack} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder={t('ticketPlaceholder')}
                  value={searchTicket}
                  onChange={(e) => setSearchTicket(e.target.value)}
                  className="bg-[#160c33]/85 border border-brand-purple/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-amber transition-all font-sans flex-grow text-center"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white font-black text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                >
                  {t('searchBtn')}
                </button>
              </form>
              {trackError && <p className="text-[11px] font-bold text-brand-red mt-2">{t('ticketNotFound')}</p>}
            </div>

            {/* Tracked Ticket Results Modal Block */}
            {trackedTicket && (
              <div className="mt-8 border-t border-brand-purple/15 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column Left: Status details */}
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <h3 className={`text-xs font-bold text-brand-amber uppercase tracking-wider border-l-2 border-brand-amber pl-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {t('ticketDetails')} — {trackedTicket.ticketNumber}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-3 rounded-xl bg-[#1b103e]/40 border border-brand-purple/10">
                      <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">{t('statusLabel')}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          statusColors[trackedTicket.status].bg
                        } ${statusColors[trackedTicket.status].text}`}
                      >
                        {language === 'ar'
                          ? statusColors[trackedTicket.status].labelAr
                          : statusColors[trackedTicket.status].label}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#1b103e]/40 border border-brand-purple/10">
                      <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">{language === 'ar' ? 'الجهاز' : 'Device'}</span>
                      <span className="text-white font-bold">{trackedTicket.device}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#1b103e]/40 border border-brand-purple/10">
                      <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">{t('technicianLabel')}</span>
                      <span className="text-white font-bold">{trackedTicket.technician || 'Not assigned'}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#1b103e]/40 border border-brand-purple/10">
                      <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">{t('estCost')}</span>
                      <span className="text-brand-amber font-bold">{trackedTicket.estimatedCost} JOD</span>
                    </div>
                  </div>
                </div>

                {/* Column Right: Technician Notes Log */}
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <h3 className={`text-xs font-bold text-brand-red uppercase tracking-wider border-l-2 border-brand-red pl-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {t('techNotes')}
                  </h3>
                  <div className="bg-[#1b103e]/30 border border-brand-purple/10 rounded-2xl p-4 flex flex-col gap-2.5 max-h-[160px] overflow-y-auto">
                    {trackedTicket.notes.length > 0 ? (
                      trackedTicket.notes.map((note, index) => (
                        <div key={index} className="flex gap-2 text-[11px] leading-relaxed border-b border-brand-purple/5 pb-2 last:border-b-0 last:pb-0">
                          <span className="text-brand-amber">▸</span>
                          <span className="text-slate-300">{note}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-500 italic">{t('noNotes')}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: Grid list of Services */}
        <section className="mb-16">
          <h2 className={`text-2xl font-black text-white mb-8 tracking-tight ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {t('serviceCatalog')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.id}
                className="glassmorphism-card rounded-2xl p-5 border border-brand-purple/10 flex flex-col justify-between h-full relative"
              >
                <div>
                  <span className="text-3xl mb-3 block">{s.icon}</span>
                  <h3 className="text-sm font-bold text-white mb-2">
                    {language === 'ar' ? s.nameAr : s.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-outfit h-14 line-clamp-3">
                    {language === 'ar' ? s.descriptionAr : s.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-purple/10 flex justify-between items-center text-xs font-mono">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-bold">{t('duration')}</span>
                    <span className="text-slate-300 font-semibold">{s.duration}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] text-slate-500 uppercase font-bold">{t('estCost')}</span>
                    <span className="text-brand-amber font-bold">~{s.price} JOD</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Booking appointment form */}
        <section className="max-w-3xl mx-auto">
          <div className="glassmorphism rounded-3xl p-6 md:p-8 border border-brand-purple/20">
            <h2 className={`text-base font-bold text-white uppercase tracking-wider mb-6 border-b border-brand-purple/10 pb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('bookService')}
            </h2>

            {bookingSuccess ? (
              <div className="bg-green-500/20 border border-green-500/30 text-green-400 p-6 rounded-2xl text-center flex flex-col items-center gap-4">
                <span className="text-4xl animate-bounce">💬</span>
                <h3 className="text-sm font-bold">{t('mmsSuccess')}</h3>
                <p className="text-xs leading-relaxed max-w-md">
                  {t('mmsSuccessDesc').replace('{id}', bookingSuccess)}
                </p>
                <a
                  href={waRepairLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  {language === 'ar' ? 'إرسال التذكرة للواتساب 💬' : 'Send Ticket to WhatsApp 💬'}
                </a>
              </div>
            ) : (
              <form onSubmit={handleBookService} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    {t('yourName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="e.g. Khalid Sweis"
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-amber transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    {t('phoneNum')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder="e.g. 079..."
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-amber transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    {t('gamingDevice')}
                  </label>
                  <input
                    type="text"
                    required
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    placeholder="e.g. PS5 console, or Xbox elite controller"
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-amber transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    {t('selectedService')}
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-brand-amber transition-all cursor-pointer font-sans"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {language === 'ar' ? s.nameAr : s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    {t('faultDesc')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={issueDesc}
                    onChange={(e) => setIssueDesc(e.target.value)}
                    placeholder="e.g. Right analog stick drifting up, console shutting down after 30 mins, etc."
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-amber transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="md:col-span-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white font-black text-sm shadow-[0_0_15px_rgba(229,62,62,0.3)] transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50 font-bold"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>🔧</span>
                      <span>{t('generateTicket')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}