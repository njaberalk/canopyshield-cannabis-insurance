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
      <div className="sr-only" aria-hidden="false">
        <p>Written by CanopyShield Insurance Services — Cannabis Insurance Specialists, Est. 2003</p>
        <p>Last updated: April 2026</p>
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
