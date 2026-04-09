'use client';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const points = [
  { title: 'We Only Do Cannabis', desc: 'This isn\'t a side business for us. We live in the cannabis insurance space — understanding state regulations, compliance requirements, and the unique risks that come with operating in a federally prohibited industry.' },
  { title: 'Specialty Market Access', desc: 'Standard carriers won\'t write cannabis. We have established relationships with surplus lines markets, Lloyd\'s syndicates, and specialty carriers that actually understand plant-touching operations.' },
  { title: 'Compliance-First Approach', desc: 'Every state has different insurance mandates for cannabis licensees. We ensure your coverage meets licensing requirements so you never risk losing your license over an insurance gap.' },
  { title: 'Claims That Don\'t Destroy You', desc: 'Product recalls, crop losses, robbery, regulatory shutdowns — cannabis claims are complex. Our team knows how to navigate these situations and fight for the coverage you paid for.' },
];

export default function WhyChooseUs() {
  const leftRef = useScrollAnimation();
  const rightRef = useScrollAnimation();

  return (
    <section id="why-us" className="bg-brand" style={{ padding: '8rem 0' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div ref={leftRef} className="fade-in-view-left">
            <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Why CanopyShield</p>
            <h2 className="text-stone font-bold leading-[1.3] tracking-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 2.6rem)' }}>Insurance for an Industry That Plays by Different Rules</h2>
            <p className="text-cream font-light mb-10" style={{ lineHeight: '22px', maxWidth: '500px' }}>Cannabis businesses face risks that don&apos;t exist in any other industry — federal illegality, banking restrictions, product liability for consumables, and regulatory environments that change every session. You need an insurance partner who gets all of it.</p>
            <a href="#contact" className="inline-flex items-center justify-center border-2 border-gold bg-gold text-brand text-center uppercase tracking-[0.16em] rounded-[2rem] font-semibold hover:border-stone hover:bg-stone hover:text-brand no-underline" style={{ padding: '0.8rem 1.8rem 0.7rem', fontSize: '0.75rem', lineHeight: '2', transition: 'all 0.24s' }}>Get Protected Today</a>
          </div>
          <div ref={rightRef} className="grid grid-cols-2 gap-5 stagger-children">
            {points.map((point) => (
              <div key={point.title} className="border-2 border-ash/30 rounded-[2rem] p-6 text-left">
                <h4 className="text-stone font-bold mb-2" style={{ fontSize: '18px', lineHeight: '24px' }}>{point.title}</h4>
                <p className="text-cream font-light" style={{ fontSize: '0.8rem', lineHeight: '20px' }}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
