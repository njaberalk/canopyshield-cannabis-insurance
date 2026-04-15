'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookie-consent')) setVisible(true);
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem('cookie-consent', 'accepted'); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem('cookie-consent', 'declined'); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[995]" style={{ animation: 'cookieSlideUp 0.4s ease' }}>
      <style>{`@keyframes cookieSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 pb-4">
        <div className="bg-brand rounded-2xl border border-ash p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.15)' }}>
          <p className="text-stone text-sm font-light leading-relaxed">
            We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our{' '}
            <a href="https://alkemeins.com/privacy" className="text-gold underline no-underline hover:text-gold/80" style={{ transition: 'color 0.2s' }}>Privacy Policy</a>.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={decline} className="text-stone/60 hover:text-stone text-xs font-semibold uppercase tracking-[0.1em] cursor-pointer" style={{ transition: 'color 0.2s' }}>Decline</button>
            <button onClick={accept} className="bg-gold text-brand px-5 py-2 rounded-[2rem] font-bold uppercase tracking-[0.1em] cursor-pointer text-xs" style={{ transition: 'all 0.2s' }}>Accept</button>
          </div>
        </div>
      </div>
    </div>
  );
}
