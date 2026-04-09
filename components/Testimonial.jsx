'use client';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Testimonial() {
  const ref = useScrollAnimation();
  return (
    <section className="bg-blue-dark" style={{ padding: '6rem 0' }}>
      <div ref={ref} className="max-w-[900px] mx-auto px-[60px] max-lg:px-6 max-md:px-4 text-center fade-in-view">
        <div className="mb-8">
          <svg className="w-12 h-12 text-gold mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" /></svg>
        </div>
        <blockquote className="text-stone font-light leading-relaxed mb-8" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', lineHeight: '1.6' }}>
          After being turned down by five insurance brokers, CanopyShield got us fully covered in under a week. They understood our cultivation operation, knew the California compliance requirements, and placed us with a carrier that actually gets cannabis. Night and day difference.
        </blockquote>
        <div>
          <div className="text-stone font-bold" style={{ fontSize: '1rem' }}>Rachel Torres</div>
          <div className="text-cream/70" style={{ fontSize: '0.85rem' }}>Co-Founder, Pacific Bloom Cultivation — 30,000 sq ft indoor grow</div>
        </div>
      </div>
    </section>
  );
}
