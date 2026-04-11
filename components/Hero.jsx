'use client';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand" style={{ height: '100vh', minHeight: '600px', maxHeight: '900px' }}>
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7667908/pexels-photo-7667908.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Licensed cannabis dispensary storefront for marijuana business insurance"
          width={1920}
          height={1080}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5, objectPosition: '50% 0%', filter: 'grayscale(100%)' }}
        />
        <div className="absolute inset-0 bg-brand" style={{ opacity: 0.55 }} />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.08,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
          <h1
            className="font-extrabold tracking-tight mb-6"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
              lineHeight: '1',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            <span className="text-stone">Seed to Sale.</span>
            <br />
            <span className="text-gold">Fully Covered.</span>
          </h1>

          <p
            className="text-cream font-medium mx-auto mb-12"
            style={{
              fontSize: '1.25rem',
              lineHeight: '1.65',
              maxWidth: '550px',
              textShadow: '0 1px 8px rgba(0,0,0,0.2)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
            }}
          >
            Specialized cannabis insurance for dispensaries, cultivators, processors, and every operation in between — designed for an industry that standard carriers won&apos;t touch.
          </p>

          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s',
            }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center border-2 border-brand bg-brand text-stone text-center uppercase tracking-[0.16em] rounded-[2rem] font-semibold hover:border-stone hover:bg-stone hover:text-brand no-underline"
              style={{ padding: '0.8rem 2.5rem 0.7rem', fontSize: '0.75rem', lineHeight: '2', transition: 'all 0.24s' }}
            >
              Get Your Quote Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
