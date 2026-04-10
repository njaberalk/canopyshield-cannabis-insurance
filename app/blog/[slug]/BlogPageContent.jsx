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
import { blogPosts } from '../../../data/blog';

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

export default function BlogPageContent({ post }) {
  useScrollAnimations();
  const relatedRef = useScrollAnimation();
  const linksRef = useScrollAnimation();

  const relatedPosts = post.relatedPosts?.map(slug => blogPosts.find(p => p.slug === slug)).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-stone">
      <Header />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog/' },
        { label: post.title },
      ]} />
      <SubPageHero label={post.category} heading={post.heroHeading} subheading={post.heroSubheading} />

      {/* Publish date */}
      <div className="bg-stone" style={{ padding: '2rem 0 0' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
          <time className="text-blue-dark uppercase tracking-[0.12em] font-bold" style={{ fontSize: '0.7rem' }}>
            {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>
      </div>

      {post.overview && (
        <div className="bg-stone" style={{ padding: '2rem 0 0' }}>
          <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
            <p className="text-brand max-w-3xl font-medium" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>{post.overview}</p>
          </div>
        </div>
      )}

      {post.sections?.map((section, i) => (
        <ContentSection key={i} heading={section.heading} content={section.content} bullets={section.bullets} dark={i % 2 === 1} />
      ))}

      {post.faqs?.length > 0 && (
        <section className="bg-stone" style={{ padding: '5rem 0' }}>
          <div className="max-w-[900px] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
            <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-8 text-center" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>FAQ</h2>
            <div className="space-y-4">
              {post.faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
            </div>
          </div>
        </section>
      )}

      {post.relatedCoverages?.length > 0 && (
        <RelatedCoverages slugs={post.relatedCoverages} title="Related Coverage" />
      )}

      {relatedPosts.length > 0 && (
        <div ref={relatedRef} className="bg-stone fade-in-view" style={{ padding: '5rem 0' }}>
          <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
            <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="block border-2 border-ash rounded-[2rem] p-6 group no-underline hover:border-blue-dark" style={{ transition: 'all 0.24s' }}>
                  <span className="text-blue-dark uppercase tracking-[0.12em] font-bold mb-2 block" style={{ fontSize: '0.65rem' }}>{p.category}</span>
                  <h3 className="text-brand font-bold mb-2 group-hover:text-blue-dark" style={{ fontSize: '1rem', transition: 'color 0.24s', lineHeight: '1.4' }}>{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cross-links */}
      <div ref={linksRef} className="bg-brand fade-in-view" style={{ padding: '4rem 0' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-gold font-bold uppercase tracking-[0.12em] mb-4" style={{ fontSize: '0.8rem' }}>Coverage</h3>
              <div className="space-y-2">
                {['general-liability', 'product-liability', 'property-insurance', 'workers-compensation', 'cyber-liability'].map(slug => (
                  <Link key={slug} href={`/coverage/${slug}/`} className="block text-cream hover:text-gold no-underline" style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}>
                    {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-gold font-bold uppercase tracking-[0.12em] mb-4" style={{ fontSize: '0.8rem' }}>Industries</h3>
              <div className="space-y-2">
                {['dispensaries', 'indoor-cultivation', 'outdoor-greenhouse', 'processors', 'distributors'].map(slug => (
                  <Link key={slug} href={`/industries/${slug}/`} className="block text-cream hover:text-gold no-underline" style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}>
                    {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-gold font-bold uppercase tracking-[0.12em] mb-4" style={{ fontSize: '0.8rem' }}>Top States</h3>
              <div className="space-y-2">
                {['texas', 'california', 'florida', 'illinois', 'ohio'].map(slug => (
                  <Link key={slug} href={`/states/${slug}/`} className="block text-cream hover:text-gold no-underline" style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}>
                    {slug.charAt(0).toUpperCase() + slug.slice(1)}
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
