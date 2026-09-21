'use client';

import React, { useState } from 'react';
import Link from '@/components/StaticLink';
import Icon from '@/components/ui/AppIcon';

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

export default function FloatingContact() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 print:hidden">
        {chatOpen && (
          <div className="glass-card rounded-2xl p-5 w-[19rem] max-w-[calc(100vw-3rem)] shadow-2xl" role="dialog" aria-label="Assistant">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-sm">Mech Engineer Soft Assistant</p>
                <p className="text-[11px] text-muted-foreground mt-1">Typically replies within 24 hours</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Close assistant"
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              An AI assistant for services, pricing, and portfolio questions is being prepared. In the meantime, choose the
              fastest route below and you will get a direct reply.
            </p>
            <div className="mt-5 space-y-2">
              <Link href="/contact" className="btn-primary block text-center px-4 py-2.5 text-sm" onClick={() => setChatOpen(false)}>
                Book free consultation
              </Link>
              <Link href="/faq" className="btn-secondary block text-center px-4 py-2.5 text-sm" onClick={() => setChatOpen(false)}>
                Browse FAQs
              </Link>
              <Link href="/pricing" className="btn-secondary block text-center px-4 py-2.5 text-sm" onClick={() => setChatOpen(false)}>
                Estimate my project
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={() => setChatOpen((open) => !open)}
            aria-expanded={chatOpen}
            aria-label={chatOpen ? 'Close assistant' : 'Open assistant'}
            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={20} />
          </button>
          <a
            href={whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}` : '/contact'}
            target={whatsappNumber ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label="Message us on WhatsApp"
            className="w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
          >
            <Icon name="PhoneIcon" size={20} />
          </a>
        </div>
      </div>
    </>
  );
}
