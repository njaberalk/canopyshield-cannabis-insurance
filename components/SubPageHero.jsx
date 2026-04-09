'use client';
import { useEffect, useState } from 'react';

export default function SubPageHero({ label, heading, subheading }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section className="relative overflow-hidden bg-brand" style={{ paddingTop: '12rem', paddingBottom: '6rem' }}>
      <div className="absolute inset-0">
        <img src="https://images.pexels.com/photos/7667735/pexels-photo-7667735.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80" alt="Commercial trucking fleet on highway" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.35, objectPosition: '50% 30%' }} />
        <div className="absolute inset-0 bg-brand" style={{ opacity: 0.6 }} />
      </div>
      <div className="relative max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          {label}
        </p>
        <h1 className="text-stone font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.1s' }}>
          {heading}
        </h1>
        <p className="text-cream font-light max-w-[600px]" style={{ fontSize: '1.1rem', lineHeight: '1.6', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.2s' }}>
          {subheading}
        </p>
      </div>
    </section>
  );
}
