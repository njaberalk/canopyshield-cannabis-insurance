'use client';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function QuoteForm() {
  const ref = useScrollAnimation();
  return (
    <section id="contact" className="bg-blue-dark" style={{ padding: '6rem 0' }}>
      <div ref={ref} className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 fade-in-view">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Get Covered</p>
            <h2 className="text-stone font-bold leading-[1.3] tracking-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 4vw, 2.6rem)' }}>Protect Your Cannabis Operation Today</h2>
            <p className="text-cream font-light mb-8" style={{ lineHeight: '22px', maxWidth: '500px' }}>Tell us about your license type, facility, and coverage needs. A CanopyShield specialist will reach out with tailored options from carriers that actually write cannabis.</p>
            <a href="#contact" className="inline-flex items-center justify-center border-2 border-gold bg-gold text-brand text-center uppercase tracking-[0.16em] rounded-[2rem] font-semibold hover:border-stone hover:bg-stone hover:text-brand no-underline" style={{ padding: '0.8rem 2.5rem 0.7rem', fontSize: '0.75rem', lineHeight: '2', transition: 'all 0.24s' }}>Get Your Quote Today</a>
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <div className="text-stone font-bold" style={{ fontSize: '0.9rem' }}>Call Us</div>
                  <a href="tel:+18005551234" className="text-cream/70 no-underline hover:text-gold" style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}>(800) 555-1234</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </div>
                <div>
                  <div className="text-stone font-bold" style={{ fontSize: '0.9rem' }}>Email</div>
                  <a href="mailto:info@canopyshield.com" className="text-cream/70 no-underline hover:text-gold" style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}>info@canopyshield.com</a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem]" style={{ minHeight: '400px' }}>
            <img src="https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Cannabis dispensary interior" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand" style={{ opacity: 0.7 }} />
            <div className="relative h-full flex flex-col items-center justify-center text-center p-10" style={{ minHeight: '400px' }}>
              <h3 className="text-stone font-bold mb-4" style={{ fontSize: '1.8rem', lineHeight: '1.3' }}>Ready to Protect Your Cannabis Business?</h3>
              <p className="text-cream/80 font-light mb-8 max-w-sm" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>Coverage designed for an industry that standard carriers won&apos;t touch. We specialize in the risks you face every day.</p>
              <a href="#contact" className="inline-flex items-center justify-center border-2 border-stone text-stone bg-transparent text-center uppercase tracking-[0.16em] rounded-[2rem] font-semibold hover:bg-stone hover:text-brand no-underline" style={{ padding: '0.8rem 2rem 0.7rem', fontSize: '0.75rem', lineHeight: '2', transition: 'all 0.24s' }}>Start Your Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
