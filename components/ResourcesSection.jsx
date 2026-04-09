'use client';
import Link from 'next/link';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const featuredResources = [
  { slug: 'cannabis-insurance-cost', title: 'How Much Does Cannabis Insurance Cost?', category: 'Guide', desc: 'Average costs by operation type, factors that drive premiums, and strategies to reduce rates.' },
  { slug: 'cannabis-insurance-requirements', title: 'Cannabis Insurance Requirements', category: 'Guide', desc: 'State-by-state insurance mandates for cannabis license holders.' },
  { slug: 'starting-dispensary-insurance', title: 'Insurance for Starting a Dispensary', category: 'Guide', desc: 'Everything new dispensary owners need before opening day.' },
  { slug: 'product-liability-cannabis', title: 'Cannabis Product Liability', category: 'Guide', desc: 'What edible, concentrate, and flower producers need to know about liability.' },
  { slug: 'crop-insurance-cannabis', title: 'Crop Insurance for Cultivators', category: 'Guide', desc: 'Protecting your cannabis harvest from mold, pests, power failure, and contamination.' },
  { slug: 'cannabis-insurance-glossary', title: 'Cannabis Insurance Glossary', category: 'Reference', desc: '30+ industry terms from 280E to seed-to-sale, explained clearly.' },
];

export default function ResourcesSection() {
  const headerRef = useScrollAnimation();
  const gridRef = useScrollAnimation(0.05);
  return (
    <section id="resources" className="bg-stone" style={{ padding: '7rem 0' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 fade-in-view">
          <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Resources</p>
          <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 4vw, 2.6rem)' }}>Cannabis Insurance Guides & Tools</h2>
          <p className="text-brand" style={{ fontSize: '1rem', lineHeight: '1.6' }}>Expert resources to help you understand coverage, meet compliance requirements, and protect your cannabis operation.</p>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {featuredResources.map((resource) => (
            <Link key={resource.slug} href={`/resources/${resource.slug}/`} className="block border-2 border-ash rounded-[2rem] p-7 group no-underline hover:border-blue-dark" style={{ transition: 'all 0.24s' }}>
              <span className="text-blue-dark uppercase tracking-[0.12em] font-bold mb-3 block" style={{ fontSize: '0.65rem' }}>{resource.category}</span>
              <h3 className="text-brand font-bold mb-2 group-hover:text-blue-dark" style={{ fontSize: '1.05rem', lineHeight: '1.4', transition: 'color 0.24s' }}>{resource.title}</h3>
              <p className="text-brand/60" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>{resource.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
