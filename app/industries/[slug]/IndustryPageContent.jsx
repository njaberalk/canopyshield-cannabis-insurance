'use client';
import { useState, useRef, useEffect } from 'react';
import SmartText from '../../../components/SmartText';
import { useScrollAnimations } from '../../../hooks/useScrollAnimation';
import Header from '../../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SubPageHero from '../../../components/SubPageHero';
import ContentSection from '../../../components/ContentSection';
import RelatedCoverages from '../../../components/RelatedCoverages';
import { TopStates, RelatedResourceLinks } from '../../../components/CrossLinks';
import { industryToStates, industryToResources } from '../../../data/cross-links';
import QuoteForm from '../../../components/QuoteForm';
import Footer from '../../../components/Footer';

function FaqItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) setHeight(contentRef.current.scrollHeight);
    else setHeight(0);
  }, [isOpen]);

  return (
    <div className="border-2 border-ash rounded-[2rem] overflow-hidden" style={{ background: isOpen ? 'rgba(255,255,255,0.5)' : 'transparent', transition: 'background 0.5s ease' }}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left group cursor-pointer">
        <span className="text-brand font-bold pr-8 group-hover:text-blue-dark" style={{ fontSize: '1rem', transition: 'color 0.2s' }}>{faq.q}</span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: isOpen ? '#ffbf3b' : '#25475e', transition: 'all 0.5s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
          <svg className="w-4 h-4" style={{ color: isOpen ? '#25475e' : '#f4f4ec' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div ref={contentRef} style={{ height: isOpen ? height + 'px' : '0px', overflow: 'hidden', transition: 'height 0.5s ease' }}>
        <p className="text-brand/70 px-6 pb-6" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}><SmartText text={faq.a} /></p>
      </div>
    </div>
  );
}

export default function IndustryPageContent({ industry }) {
  useScrollAnimations();

  return (
    <div className="min-h-screen bg-stone">
      <Header />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/#who-we-serve' },
        { label: industry.title },
      ]} />
      <SubPageHero label={industry.title} heading={industry.heroHeading} subheading={industry.heroSubheading} />

      {industry.overview && (
        <div className="bg-stone" style={{ padding: '4rem 0 0' }}>
          <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
            <p className="text-brand max-w-3xl" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>{industry.overview}</p>
          </div>
        </div>
      )}

      {industry.sections?.map((section, i) => (
        <ContentSection key={i} heading={section.heading} content={section.content} bullets={section.bullets} dark={i % 2 === 1} />
      ))}

      {industry.faqs?.length > 0 && (
        <section className="bg-stone" style={{ padding: '5rem 0' }}>
          <div className="max-w-[900px] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
            <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-8 text-center" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {industry.faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </section>
      )}

      {industry.recommendedCoverages?.length > 0 && (
        <RelatedCoverages slugs={industry.recommendedCoverages} title="Recommended Coverage" />
      )}

      <TopStates slugs={industryToStates[industry.slug]} title={`Top States for ${industry.title}`} />
      <RelatedResourceLinks slugs={industryToResources[industry.slug]} title="Helpful Resources" />

      <QuoteForm />
      <Footer />
    </div>
  );
}
