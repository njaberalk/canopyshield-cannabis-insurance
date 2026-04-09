'use client';
import Link from 'next/link';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const coverages = [
  { title: 'General Liability', slug: 'general-liability', desc: 'Protects against third-party bodily injury and property damage claims at your dispensary, grow facility, or processing site.' },
  { title: 'Product Liability', slug: 'product-liability', desc: 'Covers claims from cannabis products — contamination, mislabeling, adverse reactions, dosing errors in edibles and concentrates.' },
  { title: 'Property / Premises', slug: 'property-insurance', desc: 'Protects your facilities, equipment, inventory, and improvements. Covers grow rooms, dispensaries, processing labs, and warehouses.' },
  { title: 'Crop & Harvest', slug: 'crop-harvest', desc: 'Covers cannabis crop loss from power failure, HVAC breakdown, mold, pests, contamination, or regulatory seizure.' },
  { title: 'Commercial Auto', slug: 'commercial-auto', desc: 'Coverage for vehicles transporting cannabis between facilities, to dispensaries, or for delivery operations.' },
  { title: 'Workers\' Compensation', slug: 'workers-compensation', desc: 'Required coverage for employees in cultivation, processing, retail, and distribution — high injury risk in grow operations.' },
  { title: 'Equipment Breakdown', slug: 'equipment-breakdown', desc: 'Covers failure of critical systems — HVAC, lighting, extraction equipment, irrigation, CO2 systems, and security infrastructure.' },
  { title: 'Cyber Liability', slug: 'cyber-liability', desc: 'Protects POS systems, seed-to-sale tracking data, customer information, and compliance reporting systems from breaches.' },
  { title: 'Directors & Officers', slug: 'directors-officers', desc: 'Protects leadership from personal liability related to business decisions, regulatory investigations, and investor disputes.' },
  { title: 'Crime / Theft', slug: 'crime-theft', desc: 'Essential for cash-heavy cannabis businesses — covers robbery, burglary, employee theft, and product loss from your premises.' },
];

export default function CoverageSolutions() {
  const headerRef = useScrollAnimation();
  const gridRef = useScrollAnimation(0.05);

  return (
    <section id="coverage" className="bg-brand" style={{ padding: '8rem 0' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 fade-in-view">
          <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Coverage Solutions</p>
          <h2 className="text-stone font-bold leading-[1.3] tracking-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 4vw, 2.6rem)' }}>Complete Protection for Every Stage of Cannabis</h2>
          <p className="text-cream font-light" style={{ lineHeight: '22px' }}>From cultivation to retail, we cover every risk that cannabis operators face — including the ones standard carriers won&apos;t touch.</p>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {coverages.map((item) => (
            <Link key={item.title} href={`/coverage/${item.slug}/`} className="block border-2 border-ash/30 rounded-[2rem] p-8 group no-underline" style={{ background: 'rgba(255,255,255,0.04)', transition: 'all 0.24s' }}>
              <h3 className="text-stone font-bold mb-3 group-hover:text-gold" style={{ fontSize: '1.25rem', lineHeight: '1.5', transition: 'color 0.24s' }}>{item.title}</h3>
              <p className="text-cream font-light" style={{ fontSize: '0.85rem', lineHeight: '22px' }}>{item.desc}</p>
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.16em] mt-4 inline-block opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.24s' }}>Learn More →</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-14">
          <a href="#contact" className="inline-flex items-center justify-center border-2 border-gold bg-gold text-brand text-center uppercase tracking-[0.16em] rounded-[2rem] font-semibold hover:border-stone hover:bg-stone hover:text-brand no-underline" style={{ padding: '0.8rem 1.8rem 0.7rem', fontSize: '0.75rem', lineHeight: '2', transition: 'all 0.24s' }}>Discuss Your Coverage Needs</a>
        </div>
      </div>
    </section>
  );
}
