'use client';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SmartText from './SmartText';

export default function ContentSection({ heading, content, bullets, dark = false }) {
  const ref = useScrollAnimation();

  return (
    <div ref={ref} className={`fade-in-view ${dark ? 'bg-brand' : 'bg-stone'}`} style={{ padding: '5rem 0' }}>
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <div className="max-w-3xl">
          <h2 className={`font-bold leading-[1.3] tracking-tight mb-5 ${dark ? 'text-stone' : 'text-brand'}`} style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
            {heading}
          </h2>
          {content && content.split('\n\n').map((para, i) => (
            <p key={i} className={`mb-4 ${dark ? 'text-cream font-light' : 'text-brand'}`} style={{ fontSize: '1rem', lineHeight: '1.7' }}>
              <SmartText text={para} />
            </p>
          ))}
          {bullets && (
            <ul className={`mt-6 space-y-3 ${dark ? 'text-cream' : 'text-brand'}`}>
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                  <span className="text-gold mt-1 shrink-0">&#9679;</span>
                  <span><SmartText text={b} /></span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
