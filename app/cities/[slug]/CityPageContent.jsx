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

export default function CityPageContent({ city }) {
  useScrollAnimations();
  const linksRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-stone">
      <Header />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: city.state, href: `/states/${city.stateSlug}/` },
        { label: `${city.city}, ${city.abbreviation}` },
      ]} />
      <SubPageHero label={`${city.city}, ${city.abbreviation}`} heading={city.heroHeading} subheading={city.heroSubheading} />

      {city.overview && (
        <div className="bg-stone" style={{ padding: '4rem 0 0' }}>
          <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
            <p className="text-brand max-w-3xl" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>{city.overview}</p>
          </div>
        </div>
      )}

      {city.sections?.map((section, i) => (
        <ContentSection key={i} heading={section.heading} content={section.content} bullets={section.bullets} dark={i % 2 === 1} />
      ))}

      {city.faqs?.length > 0 && (
        <section className="bg-stone" style={{ padding: '5rem 0' }}>
          <div className="max-w-[900px] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
            <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-8 text-center" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
              Trucking Insurance FAQ — {city.city}, {city.abbreviation}
            </h2>
            <div className="space-y-4">
              {city.faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
            </div>
          </div>
        </section>
      )}

      {city.recommendedCoverages?.length > 0 && (
        <RelatedCoverages slugs={city.recommendedCoverages} title={`Coverage Options in ${city.city}`} />
      )}

      {/* Sibling cities in same state */}
      {(() => {
        const siblings = cities.filter(c => c.stateSlug === city.stateSlug && c.slug !== city.slug);
        if (siblings.length === 0) return null;
        return (
          <div className="bg-stone" style={{ padding: '4rem 0' }}>
            <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
              <h2 className="text-brand font-bold mb-6" style={{ fontSize: '1.3rem' }}>More Cities in {city.state}</h2>
              <div className="flex flex-wrap gap-3">
                {siblings.map(c => (
                  <Link key={c.slug} href={`/cities/${c.slug}/`} className="border-2 border-ash rounded-[2rem] px-5 py-2 text-brand font-semibold hover:border-blue-dark hover:text-blue-dark no-underline" style={{ fontSize: '0.85rem', transition: 'all 0.24s' }}>
                    {c.city}, {c.abbreviation}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Internal linking section */}
      <div ref={linksRef} className="bg-brand fade-in-view" style={{ padding: '4rem 0' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-gold font-bold uppercase tracking-[0.12em] mb-4" style={{ fontSize: '0.8rem' }}>Statewide Coverage</h3>
              <Link href={`/states/${city.stateSlug}/`} className="block text-cream hover:text-gold no-underline mb-2" style={{ fontSize: '0.9rem', transition: 'color 0.2s' }}>
                Trucking Insurance in {city.state} →
              </Link>
              <p className="text-cream/50" style={{ fontSize: '0.8rem' }}>View state requirements, corridors, and coverage details</p>
            </div>
            <div>
              <h3 className="text-gold font-bold uppercase tracking-[0.12em] mb-4" style={{ fontSize: '0.8rem' }}>Industries We Serve</h3>
              <div className="space-y-2">
                {['owner-operators', 'small-fleets', 'large-fleets', 'flatbed', 'hazmat'].map(slug => (
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
                  { slug: 'trucking-insurance-cost', label: 'How Much Does It Cost?' },
                  { slug: 'fmcsa-insurance-requirements', label: 'FMCSA Requirements' },
                  { slug: 'new-authority-insurance', label: 'New Authority Insurance' },
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

      <QuoteForm />
      <Footer />
    </div>
  );
}
