'use client';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const cards = [
  {
    title: 'Cannabis Industry Specialists',
    description: 'We understand the regulatory, compliance, and risk challenges facing legal cannabis operators — from federal scheduling to state licensing requirements.',
    image: 'https://images.pexels.com/photos/7667731/pexels-photo-7667731.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Coverage No One Else Will Write',
    description: 'Standard carriers won\'t insure cannabis. We work with specialty markets that understand plant-touching operations, product liability, and crop risks.',
    image: 'https://images.pexels.com/photos/7667908/pexels-photo-7667908.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Seed to Sale Protection',
    description: 'Whether you grow it, process it, transport it, or sell it — we build programs that protect every stage of your cannabis operation.',
    image: 'https://images.pexels.com/photos/7667735/pexels-photo-7667735.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function ValueProposition() {
  const headerRef = useScrollAnimation();
  const cardsRef = useScrollAnimation(0.1);

  return (
    <section className="bg-stone" style={{ padding: '7rem 0' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 fade-in-view">
          <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Why We&apos;re Different</p>
          <h2 className="text-brand font-bold leading-[1.3] tracking-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 4vw, 2.6rem)' }}>Built for Cannabis. Nothing Else.</h2>
          <p className="text-brand" style={{ fontSize: '1rem', lineHeight: '1.6' }}>The cannabis industry has risks that no other business faces. We specialize in solving them.</p>
        </div>
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 stagger-children">
          {cards.map((card) => (
            <div key={card.title} className="relative overflow-hidden rounded-[2rem] group cursor-pointer" style={{ height: '18rem' }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${card.image}')`, filter: 'grayscale(100%)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
              <div className="absolute inset-0 bg-brand opacity-0 group-hover:opacity-70" style={{ transition: 'opacity 0.5s ease' }} />
              <div className="relative h-full flex flex-col justify-end p-7 overflow-hidden">
                <h3 className="text-stone font-bold text-xl mb-2 relative z-10" style={{ fontSize: '1.25rem', lineHeight: '1.5' }}>{card.title}</h3>
                <p className="text-cream font-light text-sm leading-relaxed relative z-10 opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.6s ease' }}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
