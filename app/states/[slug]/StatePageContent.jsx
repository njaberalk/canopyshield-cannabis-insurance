'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import SmartText from '../../../components/SmartText';
import { useScrollAnimations, useScrollAnimation } from '../../../hooks/useScrollAnimation';
import Header from '../../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SubPageHero from '../../../components/SubPageHero';
import ContentSection from '../../../components/ContentSection';
import RelatedCoverages from '../../../components/RelatedCoverages';
import QuoteForm from '../../../components/QuoteForm';
import Footer from '../../../components/Footer';
import { states } from '../../../data/states';
import { cities } from '../../../data/cities';

function FaqItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => { setHeight(isOpen && contentRef.current ? contentRef.current.scrollHeight : 0); }, [isOpen]);

  return (
    <div className="border-2 border-ash rounded-[2rem] overflow-hidden" style={{ background: isOpen ? 'rgba(255,255,255,0.5)' : 'transparent', transition: 'background 0.5s ease' }}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left group cursor-pointer">
        <span className="text-brand font-bold pr-8 group-hover:text-blue-dark" style={{ fontSize: '1rem', transition: 'color 0.2s' }}>{faq.q}</span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: isOpen ? '#ffbf3b' : '#25475e', transition: 'all 0.5s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
          <svg className="w-4 h-4" style={{ color: isOpen ? '#25475e' : '#f4f4ec' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </button>
      <div ref={contentRef} style={{ height: isOpen ? height + 'px' : '0px', overflow: 'hidden', transition: 'height 0.5s ease' }}>
        <p className="text-brand/70 px-6 pb-6" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}><SmartText text={faq.a} /></p>
      </div>
    </div>
  );
}

function NearbyStates({ currentSlug }) {
  const ref = useScrollAnimation();
  // Show 5 nearby states alphabetically
  const currentIndex = states.findIndex(s => s.slug === currentSlug);
  if (currentIndex === -1 || states.length < 3) return null;

  const nearby = [];
  for (let i = -3; i <= 3; i++) {
    if (i === 0) continue;
    const idx = currentIndex + i;
    if (idx >= 0 && idx < states.length) nearby.push(states[idx]);
  }
  if (nearby.length === 0) return null;

  return (
    <div ref={ref} className="bg-stone fade-in-view" style={{ padding: '4rem 0' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-6" style={{ fontSize: '1.5rem' }}>Cannabis Insurance in Nearby States</h2>
        <div className="flex flex-wrap gap-3">
          {nearby.map(s => (
            <Link key={s.slug} href={`/states/${s.slug}/`} className="border-2 border-ash rounded-[2rem] px-5 py-2 text-brand font-semibold hover:border-blue-dark hover:text-blue-dark no-underline" style={{ fontSize: '0.85rem', transition: 'all 0.24s' }}>
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function InternalLinks() {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className="bg-brand fade-in-view" style={{ padding: '4rem 0' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gold font-bold uppercase tracking-[0.12em] mb-4" style={{ fontSize: '0.8rem' }}>Coverage Options</h3>
            <div className="space-y-2">
              {['general-liability', 'product-liability', 'property-insurance', 'workers-compensation', 'crop-harvest'].map(slug => (
                <Link key={slug} href={`/coverage/${slug}/`} className="block text-cream hover:text-gold no-underline" style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}>
                  {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-gold font-bold uppercase tracking-[0.12em] mb-4" style={{ fontSize: '0.8rem' }}>Industries We Serve</h3>
            <div className="space-y-2">
              {['dispensaries', 'indoor-cultivation', 'outdoor-greenhouse', 'processors', 'distributors'].map(slug => (
                <Link key={slug} href={`/industries/${slug}/`} className="block text-cream hover:text-gold no-underline" style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}>
                  {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-gold font-bold uppercase tracking-[0.12em] mb-4" style={{ fontSize: '0.8rem' }}>Resources</h3>
            <div className="space-y-2">
              {[
                { slug: 'cannabis-insurance-cost', label: 'How Much Does Cannabis Insurance Cost?' },
                { slug: 'cannabis-insurance-requirements', label: 'Cannabis Insurance Requirements' },
                { slug: 'starting-dispensary-insurance', label: 'Starting a Dispensary Guide' },
                { slug: 'cannabis-compliance-guide', label: 'Cannabis Compliance Guide' },
              ].map(r => (
                <Link key={r.slug} href={`/resources/${r.slug}/`} className="block text-cream hover:text-gold no-underline" style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}>
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StatePageContent({ state }) {
  useScrollAnimations();

  return (
    <div className="min-h-screen bg-stone">
      <Header />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'States', href: '/#states' },
        { label: state.name },
      ]} />
      <SubPageHero label={`${state.name} (${state.abbreviation})`} heading={state.heroHeading} subheading={state.heroSubheading} />

      {state.overview && (
        <div className="bg-stone" style={{ padding: '4rem 0 0' }}>
          <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
            <p className="text-brand max-w-3xl" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>{state.overview}</p>
          </div>
        </div>
      )}

      {state.sections?.map((section, i) => (
        <ContentSection key={i} heading={section.heading} content={section.content} bullets={section.bullets} dark={i % 2 === 1} />
      ))}

      {state.faqs?.length > 0 && (
        <section className="bg-stone" style={{ padding: '5rem 0' }}>
          <div className="max-w-[900px] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
            <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-8 text-center" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
              Cannabis Insurance FAQ — {state.name}
            </h2>
            <div className="space-y-4">
              {state.faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
            </div>
          </div>
        </section>
      )}

      {state.recommendedCoverages?.length > 0 && (
        <RelatedCoverages slugs={state.recommendedCoverages} title={`Recommended Coverage in ${state.name}`} />
      )}

      {/* Cities in this state */}
      {(() => {
        const stateCities = cities.filter(c => c.stateSlug === state.slug);
        if (stateCities.length === 0) return null;
        return (
          <div className="bg-stone" style={{ padding: '4rem 0' }}>
            <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
              <h2 className="text-brand font-bold mb-6" style={{ fontSize: '1.3rem' }}>Cities in {state.name}</h2>
              <div className="flex flex-wrap gap-3">
                {stateCities.map(c => (
                  <Link key={c.slug} href={`/cities/${c.slug}/`} className="border-2 border-ash rounded-[2rem] px-5 py-2 text-brand font-semibold hover:border-blue-dark hover:text-blue-dark no-underline" style={{ fontSize: '0.85rem', transition: 'all 0.24s' }}>
                    {c.city}, {c.abbreviation}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      <NearbyStates currentSlug={state.slug} />
      <InternalLinks />
      <QuoteForm />
      <Footer />
    </div>
  );
}
