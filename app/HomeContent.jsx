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
      <div className="bg-brand/5 border-b border-ash" style={{ paddingTop: '5rem' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-brand/50" style={{ fontSize: '0.7rem' }}>
            Published by <strong className="text-brand/70">CanopyShield Insurance Services</strong> · Licensed Insurance Brokerage · Est. 2003
          </p>
          <p className="text-brand/40" style={{ fontSize: '0.65rem' }}>
            Last updated April 2026
          </p>
        </div>
      </div>
      <Hero />
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
