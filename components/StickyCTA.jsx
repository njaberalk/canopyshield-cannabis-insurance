'use client';
import { useState, useEffect } from 'react';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[990] border-t border-ash" style={{ backgroundColor: 'rgba(26, 43, 34, 0.95)', backdropFilter: 'blur(8px)', transition: 'transform 0.3s ease', transform: visible ? 'translateY(0)' : 'translateY(100%)' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 py-3 flex items-center justify-between">
        <p className="text-stone font-semibold text-sm max-md:hidden">Ready to protect your business? Get a custom quote.</p>
        <p className="text-stone font-semibold text-xs md:hidden">Get a custom quote.</p>
        <button
          onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
          className="bg-gold text-brand px-5 py-2 rounded-[2rem] font-bold uppercase tracking-[0.12em] cursor-pointer shrink-0"
          style={{ fontSize: '0.7rem', transition: 'all 0.2s' }}
        >
          Get Your Quote
        </button>
      </div>
    </div>
  );
}
