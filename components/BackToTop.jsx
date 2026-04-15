'use client';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed z-[980] w-10 h-10 rounded-full bg-brand border-2 border-ash flex items-center justify-center cursor-pointer hover:bg-gold group"
      style={{ bottom: '5rem', right: '1.5rem', transition: 'all 0.3s ease', opacity: visible ? 1 : 0 }}
      aria-label="Back to top"
    >
      <svg className="w-4 h-4 text-stone group-hover:text-brand" style={{ transition: 'color 0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
