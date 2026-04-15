'use client';
import { useState, useEffect, useRef } from 'react';

const WIDGET_BASE = 'https://alkeme-quote-widget.vercel.app';
const VERTICAL = 'cannabis';

export default function QuoteFormModal() {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-quote-modal', handler);
    return () => window.removeEventListener('open-quote-modal', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Listen for close message from widget iframe
  useEffect(() => {
    const handler = (e) => {
      if (e.data === 'insurance-form-close' || e.data?.type === 'insurance-form-close') {
        setOpen(false);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  if (!open) return null;

  const src = `${WIDGET_BASE}?vertical=${VERTICAL}&embed=modal`;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ animation: 'qfmFadeIn 0.2s ease' }}>
      <style>{`
        @keyframes qfmFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setOpen(false)} />
      <button onClick={() => setOpen(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer z-10" style={{ transition: 'all 0.2s' }}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div className="relative w-full mx-4" style={{ maxWidth: '680px', height: '90vh', maxHeight: '820px', animation: 'qfmFadeIn 0.25s ease 0.05s both' }}>
        <iframe
          ref={iframeRef}
          src={src}
          className="w-full h-full rounded-2xl"
          style={{ border: 'none', backgroundColor: '#25475e', overflow: 'hidden' }}
          title="Get a Quote"
          allow="clipboard-write"
          scrolling="no"
        />
      </div>
    </div>
  );
}
