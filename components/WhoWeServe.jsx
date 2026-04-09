'use client';
import Link from 'next/link';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const segments = [
  { name: 'Dispensaries', slug: 'dispensaries', desc: 'Retail cannabis stores and medical dispensaries' },
  { name: 'Indoor Cultivation', slug: 'indoor-cultivation', desc: 'Indoor grow operations and controlled environment agriculture' },
  { name: 'Outdoor / Greenhouse', slug: 'outdoor-greenhouse', desc: 'Outdoor farms and greenhouse cultivation facilities' },
  { name: 'Processors', slug: 'processors', desc: 'Edibles, concentrates, extracts, and infused product manufacturers' },
  { name: 'Distributors', slug: 'distributors', desc: 'Licensed cannabis transporters and distribution companies' },
  { name: 'Testing Labs', slug: 'testing-labs', desc: 'Cannabis testing and quality assurance laboratories' },
  { name: 'Vertically Integrated', slug: 'vertically-integrated', desc: 'Multi-license operators spanning grow to retail' },
  { name: 'Hemp / CBD', slug: 'hemp-cbd', desc: 'Federally legal hemp cultivation and CBD product companies' },
  { name: 'Delivery Services', slug: 'delivery-services', desc: 'Licensed cannabis delivery and last-mile operators' },
  { name: 'Ancillary', slug: 'ancillary-businesses', desc: 'Tech, consulting, packaging, and cannabis-adjacent services' },
];

export default function WhoWeServe() {
  const headerRef = useScrollAnimation();
  const gridRef = useScrollAnimation(0.05);
  return (
    <section id="who-we-serve" className="bg-stone" style={{ padding: '7rem 0' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 fade-in-view">
          <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Who We Insure</p>
          <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 4vw, 2.6rem)' }}>Coverage for Every Cannabis License Type</h2>
          <p className="text-brand" style={{ fontSize: '1rem', lineHeight: '1.6' }}>From seed to sale and everything in between — we insure every segment of the legal cannabis supply chain.</p>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 stagger-children">
          {segments.map((seg) => (
            <Link key={seg.name} href={`/industries/${seg.slug}/`} className="group border-2 border-ash rounded-[2rem] p-6 text-center bg-white/40 no-underline block" style={{ transition: 'all 0.24s' }}>
              <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold" style={{ transition: 'all 0.24s' }}>
                <svg className="w-6 h-6 text-stone group-hover:text-brand" style={{ transition: 'color 0.24s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
              </div>
              <h3 className="text-brand font-bold mb-1" style={{ fontSize: '0.9rem' }}>{seg.name}</h3>
              <p className="text-brand/60" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>{seg.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
