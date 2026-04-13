'use client';
import { useScrollAnimations } from '../hooks/useScrollAnimation';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ValueProposition from '../components/ValueProposition';
import CoverageSolutions from '../components/CoverageSolutions';
import WhoWeServe from '../components/WhoWeServe';
import StatesSection from '../components/StatesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import ResourcesSection from '../components/ResourcesSection';
import BlogSection from '../components/BlogSection';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import Testimonial from '../components/Testimonial';
import QuoteForm from '../components/QuoteForm';
import Footer from '../components/Footer';

export default function HomeContent() {
  useScrollAnimations();

  return (
    <div className="min-h-screen bg-stone">
      <Header />
      <Hero />
      <section className="bg-stone border-b border-ash" style={{ padding: '2rem 0' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              <span className="text-brand/70 font-semibold" style={{ fontSize: '0.8rem' }}>Licensed in All 50 States</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              <span className="text-brand/70 font-semibold" style={{ fontSize: '0.8rem' }}>20+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              <span className="text-brand/70 font-semibold" style={{ fontSize: '0.8rem' }}>A+ Rated Carriers</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              <span className="text-brand/70 font-semibold" style={{ fontSize: '0.8rem' }}>Independently Verified Reviews</span>
            </div>
          </div>
        </div>
      </section>
      <ValueProposition />
      <CoverageSolutions />
      <WhoWeServe />
      <StatesSection />
      <WhyChooseUs />
      <Stats />
      <ResourcesSection />
      <BlogSection />
      <Process />
      <FAQ />
      <Testimonial />
      <QuoteForm />
      <Footer />
    </div>
  );
}
