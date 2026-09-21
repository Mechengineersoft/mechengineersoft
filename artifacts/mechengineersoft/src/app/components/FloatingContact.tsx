'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from '@/components/StaticLink';
import Icon from '@/components/ui/AppIcon';
import { useSiteSettings } from '@/app/site-settings';

type Message = { from: 'assistant' | 'user'; text: string };

function assistantReply(message: string) {
  const value = message.toLowerCase();
  if (value.includes('price') || value.includes('cost') || value.includes('budget')) {
    return 'Project budgets depend on scope. Try the project estimator for a quick range, or book a consultation for a tailored proposal.';
  }
  if (value.includes('service') || value.includes('erp') || value.includes('crm') || value.includes('software')) {
    return 'We build ERP, CRM, dashboards, automation, and custom business software for manufacturing and growing teams.';
  }
  if (value.includes('time') || value.includes('how long') || value.includes('timeline')) {
    return 'Most discovery calls happen within 24 hours. Delivery time depends on the scope, and we share a structured plan before work begins.';
  }
  if (value.includes('contact') || value.includes('talk') || value.includes('call')) {
    return 'The quickest next step is to book a free consultation. You can also call or message us using the buttons below.';
  }
  return 'I can help with services, pricing, timelines, or getting in touch. What would you like to know?';
}

export default function FloatingContact() {
  const settings = useSiteSettings();
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'assistant', text: 'Hi. I can answer quick questions about our services, pricing, and timelines.' },
  ]);
  const cleanPhone = useMemo(() => (settings.phone || import.meta.env.VITE_PHONE_NUMBER || '').replace(/\D/g, ''), [settings.phone]);
  const cleanWhatsapp = useMemo(() => (settings.phone || import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''), [settings.phone]);

  function sendMessage(event: FormEvent) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { from: 'user', text: trimmed }, { from: 'assistant', text: assistantReply(trimmed) }]);
    setMessage('');
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 print:hidden">
      {chatOpen && (
        <div className="glass-card rounded-2xl p-5 w-[21rem] max-w-[calc(100vw-3rem)] shadow-2xl" role="dialog" aria-label="Mech Engineer Soft assistant">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-sm">Mech Engineer Soft Assistant</p>
              <p className="text-[11px] text-muted-foreground mt-1">Quick answers, then a clear next step</p>
            </div>
            <button onClick={() => setChatOpen(false)} aria-label="Close assistant" className="text-muted-foreground hover:text-foreground">
              <Icon name="XMarkIcon" size={18} />
            </button>
          </div>
          <div className="mt-4 max-h-48 overflow-y-auto space-y-2 pr-1" aria-live="polite">
            {messages.map((item, index) => (
              <div key={`${item.from}-${index}`} className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${item.from === 'user' ? 'bg-primary/20 text-foreground ml-6' : 'bg-muted/60 text-muted-foreground mr-4'}`}>
                {item.text}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="mt-3 flex gap-2">
            <label htmlFor="assistant-message" className="sr-only">Ask the assistant</label>
            <input id="assistant-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about services…" className="form-input min-w-0 py-2.5 text-xs" />
            <button type="submit" className="btn-primary shrink-0 px-3" aria-label="Send message"><Icon name="PaperAirplaneIcon" size={16} /></button>
          </form>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Link href="/contact" onClick={() => setChatOpen(false)} className="btn-secondary px-2 py-2 text-center text-[11px]">Consultation</Link>
            <Link href="/faq" onClick={() => setChatOpen(false)} className="btn-secondary px-2 py-2 text-center text-[11px]">FAQs</Link>
            <Link href="/pricing" onClick={() => setChatOpen(false)} className="btn-secondary px-2 py-2 text-center text-[11px]">Estimator</Link>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button onClick={() => setChatOpen((open) => !open)} aria-expanded={chatOpen} aria-label={chatOpen ? 'Close assistant' : 'Open assistant'} className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
          <Icon name="ChatBubbleLeftRightIcon" size={20} />
        </button>
        <a href={cleanPhone ? `tel:+${cleanPhone}` : '/contact'} aria-label="Call Mech Engineer Soft" className="w-12 h-12 rounded-full border border-sky-500/40 bg-sky-500/15 text-sky-300 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
          <Icon name="PhoneIcon" size={20} />
        </a>
        <a href={cleanWhatsapp ? `https://wa.me/${cleanWhatsapp}` : '/contact'} target={cleanWhatsapp ? '_blank' : undefined} rel="noopener noreferrer" aria-label="Message Mech Engineer Soft on WhatsApp" className="w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
          <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={20} />
        </a>
        <Link href="/contact" aria-label="Open contact page" className="w-12 h-12 rounded-full border border-violet-500/40 bg-violet-500/15 text-violet-300 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
          <Icon name="AddressBookIcon" size={20} />
        </Link>
      </div>
    </div>
  );
}