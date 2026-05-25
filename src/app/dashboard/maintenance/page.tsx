'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { sampleTickets, statusColors, services } from '@/data/services';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Icons } from '@/components/Icons';

export default function MaintenanceDashboard() {
  const { activeRole } = useAuth();
  const { language, t } = useLanguage();
  const [tickets, setTickets] = useState(sampleTickets);
  
  // New ticket state form
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [device, setDevice] = useState('');
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [issue, setIssue] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Status updating handler
  const handleStatusChange = (ticketId: string, nextStatus: (typeof sampleTickets)[0]['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: nextStatus, updatedAt: new Date().toISOString() } : t))
    );
  };

  // Add technician note
  const handleAddNote = (ticketId: string, noteText: string) => {
    if (!noteText.trim()) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              notes: [...t.notes, noteText],
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone || !device || !issue) return;

    const baseService = services.find((s) => s.id === selectedService);
    const newTicket: (typeof sampleTickets)[0] = {
      id: (tickets.length + 1).toString(),
      ticketNumber: `BVG-2026-0${tickets.length + 101}`,
      customerName: custName,
      customerPhone: custPhone,
      device,
      issue,
      status: 'received',
      priority: 'medium',
      technician: activeRole === 'technician' ? 'محمد' : '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedCost: baseService ? baseService.price : 15,
      notes: [`Ticket created for base service: ${baseService?.name || 'Diagnostic'}`],
    };

    setTickets([newTicket, ...tickets]);
    
    // Reset state form
    setCustName('');
    setCustPhone('');
    setDevice('');
    setIssue('');
    setIsAddOpen(false);
  };

  if (activeRole === 'customer') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 gap-4">
          <Icons.Lock size={64} className="text-brand-red animate-pulse" />
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-xs text-slate-400 max-w-sm">
            Please switch your role to Technician or Admin in the top bar to access the MMS database.
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

        {/* MMS Maintenance Portal */}
        <main className="flex-grow p-6 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className={`flex justify-between items-center flex-wrap gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                MMS Maintenance Pipelines
              </h1>
              <p className="text-[10px] text-brand-amber font-bold uppercase tracking-wider font-mono">
                Diagnostics, stick drift replacements, and quality control
              </p>
            </div>

            <button
              onClick={() => setIsAddOpen(!isAddOpen)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white text-xs font-black transition-all hover:scale-105 shadow-md flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <span>+</span>
              <span>{language === 'ar' ? 'إنشاء تذكرة صيانة' : 'Create Repair Ticket'}</span>
            </button>
          </div>

          {/* Add Ticket Modal Block */}
          {isAddOpen && (
            <div className="glassmorphism rounded-2xl p-6 border border-brand-purple/20">
              <h2 className={`text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-brand-purple/10 pb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? 'نموذج إدخال جهاز صيانة جديد' : 'New Service Intake Form'}
              </h2>
              <form onSubmit={handleCreateTicket} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'اسم العميل' : 'Customer Name'}</label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="e.g. Salim Sweis"
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-amber"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    required
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder="e.g. 079..."
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-amber"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'نوع الجهاز' : 'Device Model'}</label>
                  <input
                    type="text"
                    required
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    placeholder="e.g. PS5 DualSense"
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-amber"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'الخدمة الأساسية' : 'Base Repair Type'}</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-slate-300 focus:outline-none cursor-pointer"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {language === 'ar' ? s.nameAr : s.name} ({s.price} JOD)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">{language === 'ar' ? 'وصف العطل' : 'Issue Description'}</label>
                  <input
                    type="text"
                    required
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="e.g. stick drift, broken trigger buttons"
                    className="bg-[#160c33]/80 border border-brand-purple/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-amber"
                  />
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
                    {language === 'ar' ? 'تأكيد التسجيل' : 'Confirm Intake'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* MMS Tickets Table listing */}
          <div className="glassmorphism rounded-2xl p-6 border border-brand-purple/20">
            <div className="overflow-x-auto">
              <table className={`w-full font-mono text-[11px] ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="border-b border-brand-purple/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th>{language === 'ar' ? 'رقم التذكرة' : 'Ticket ID'}</th>
                    <th>{language === 'ar' ? 'العميل والهاتف' : 'Customer & Phone'}</th>
                    <th>{language === 'ar' ? 'الجهاز والعطل' : 'Device & Issue'}</th>
                    <th>{language === 'ar' ? 'السعر' : 'Billing'}</th>
                    <th>{language === 'ar' ? 'الحالة' : 'Pipeline Status'}</th>
                    <th className="text-right">{language === 'ar' ? 'إجراءات فنية' : 'Workflow Actions'}</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t) => (
                    <tr key={t.id} className="border-b border-brand-purple/5 last:border-0 hover:bg-brand-purple/5 transition-all">
                      <td className="py-4 font-bold text-slate-300">
                        <div className="flex flex-col">
                          <span>{t.ticketNumber}</span>
                          <span className="text-[9px] text-slate-500 font-normal mt-0.5">
                            {new Date(t.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200">{t.customerName}</span>
                          <span className="text-[9px] text-slate-500 mt-0.5">{t.customerPhone}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200">{t.device}</span>
                          <span className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{t.issue}</span>
                        </div>
                      </td>
                      <td className="py-4 font-black text-brand-amber">{t.estimatedCost} JOD</td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase ${statusColors[t.status].bg} ${
                            statusColors[t.status].text
                          }`}
                        >
                          {language === 'ar' ? statusColors[t.status].labelAr : statusColors[t.status].label}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          <button
                            onClick={() => handleStatusChange(t.id, 'diagnosed')}
                            className="px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-[9px]"
                          >
                            {language === 'ar' ? 'تشخيص' : 'Diagnose'}
                          </button>
                          <button
                            onClick={() => handleStatusChange(t.id, 'awaiting-parts')}
                            className="px-2 py-1 rounded bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-[9px]"
                          >
                            {language === 'ar' ? 'قطع' : 'Parts'}
                          </button>
                          <button
                            onClick={() => handleStatusChange(t.id, 'in-progress')}
                            className="px-2 py-1 rounded bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 text-[9px]"
                          >
                            {language === 'ar' ? 'إصلاح' : 'Repair'}
                          </button>
                          <button
                            onClick={() => handleStatusChange(t.id, 'completed')}
                            className="px-2 py-1 rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 text-[9px]"
                          >
                            {language === 'ar' ? 'إنهاء' : 'Done'}
                          </button>
                          
                          {/* Technician Notes Add Action */}
                          <button
                            onClick={() => {
                              const note = prompt('Enter technician update comment for this device:');
                              if (note) handleAddNote(t.id, note);
                            }}
                            className="px-2 py-1 rounded bg-brand-purple/20 hover:bg-brand-purple/40 text-slate-300 border border-brand-purple-light/20 text-[9px]"
                          >
                            +
                          </button>
                        </div>
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