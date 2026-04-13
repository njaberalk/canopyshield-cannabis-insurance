'use client';
import { useEffect, useState } from 'react';

export default function SubPageHero({ label, heading, subheading }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section className="relative overflow-hidden bg-brand" style={{ paddingTop: '12rem', paddingBottom: '6rem' }}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1503262028195-93c528f03218?auto=format&fit=crop&w=1920&q=80" alt="Cannabis business facility" width={1920} height={600} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.35, objectPosition: '50% 30%', filter: 'grayscale(100%)' }} />
        <div className="absolute inset-0" style={{ opacity: 0.6, backgroundColor: '#0a1510' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
      </div>
      <div className="relative max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <p className="text-cream font-light max-w-[600px]" style={{ fontSize: '1.1rem', lineHeight: '1.6', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          {subheading}
        </p>
        <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4 mt-4" style={{ fontSize: '0.85rem', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
          {label}
        </p>
        <h1 className="text-stone font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.15s' }}>
          {heading}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mt-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.3s' }}>
          <span className="text-cream/60 font-semibold flex items-center gap-1" style={{ fontSize: '0.75rem' }}>
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
            Licensed Brokerage
          </span>
          <span className="text-cream/60 font-semibold flex items-center gap-1" style={{ fontSize: '0.75rem' }}>
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
            20+ Years Experience
          </span>
          <span className="text-cream/60 font-semibold flex items-center gap-1" style={{ fontSize: '0.75rem' }}>
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
            Updated April 2026
          </span>
        </div>
      </div>
    </section>
  );
}
