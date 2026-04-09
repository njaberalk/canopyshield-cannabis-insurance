'use client';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  { num: '01', title: 'Tell Us About Your Operation', desc: 'Share details about your license type, facility size, revenue, products, and state. We need to understand your specific cannabis operation to place coverage correctly.' },
  { num: '02', title: 'We Assess Your Risk Profile', desc: 'Our cannabis specialists evaluate your exposures — product liability, crop value, property, theft risk, compliance gaps — and identify the coverage structure you need.' },
  { num: '03', title: 'Receive Specialty Market Options', desc: 'We present proposals from carriers that actually write cannabis — with clear pricing, coverage details, and our recommendations on limits and deductibles.' },
  { num: '04', title: 'Get Covered & Stay Compliant', desc: 'Once bound, we provide certificates for your state licensing requirements and support you through renewals, claims, and as regulations evolve.' },
];

export default function Process() {
  const headerRef = useScrollAnimation();
  const stepsRef = useScrollAnimation(0.1);
  return (
    <section className="bg-stone" style={{ padding: '7rem 0' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 fade-in-view">
          <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>How It Works</p>
          <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 4vw, 2.6rem)' }}>Getting Cannabis Coverage Shouldn&apos;t Be This Hard. We Made It Simple.</h2>
          <p className="text-brand" style={{ fontSize: '1rem', lineHeight: '1.6' }}>Most cannabis operators spend months trying to find coverage. Our process gets you protected in days.</p>
        </div>
        <div ref={stepsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-5"><span className="text-gold font-bold text-xl">{step.num}</span></div>
              <h3 className="text-brand font-bold mb-3" style={{ fontSize: '1.25rem', lineHeight: '1.5' }}>{step.title}</h3>
              <p className="text-brand/70" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
