'use client';
import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const faqs = [
  {
    q: 'Why is cannabis insurance so expensive?',
    a: 'Cannabis remains federally illegal (Schedule I), which means standard insurance carriers won\'t write policies for plant-touching businesses. Coverage must be placed through specialty surplus lines markets with limited carrier capacity, which drives up premiums. Additionally, cannabis operations face elevated theft, product liability, and regulatory risks that increase the cost of coverage.',
  },
  {
    q: 'What insurance does a dispensary need?',
    a: 'At minimum, dispensaries need general liability, product liability, property insurance, crime/theft coverage, and workers\' compensation. Most also need cyber liability (for POS and customer data), commercial auto (for delivery operations), and directors & officers coverage. State licensing requirements often mandate specific insurance minimums before you can operate.',
  },
  {
    q: 'Can I get crop insurance for cannabis?',
    a: 'Yes, but not through the federal crop insurance program (USDA won\'t cover a Schedule I substance). Cannabis crop insurance is available through specialty markets and covers losses from power failure, HVAC breakdown, mold, pest infestation, contamination, and in some cases regulatory seizure. Coverage is typically based on the value of your canopy at time of loss.',
  },
  {
    q: 'Does hemp/CBD require the same insurance as cannabis?',
    a: 'No. Hemp was federally legalized under the 2018 Farm Bill, which means standard insurance carriers are more willing to write hemp/CBD risks. Premiums are typically lower, and you may have access to federal crop insurance programs. However, you still need product liability coverage, especially if you manufacture ingestible CBD products.',
  },
  {
    q: 'What happens if my state changes its cannabis laws?',
    a: 'Insurance policies are written on an annual basis, so regulatory changes are addressed at renewal. If your state expands legalization (e.g., medical to recreational), your coverage needs may change. If a state restricts legalization, existing policies typically honor the policy period but may not renew. We monitor regulatory changes in every state we operate in.',
  },
  {
    q: 'Do you insure cannabis delivery operations?',
    a: 'Yes. Cannabis delivery requires commercial auto insurance, hired and non-owned auto coverage, product liability for goods in transit, and crime coverage for cash and inventory being transported. Many states have specific insurance requirements for delivery licensees including minimum liability limits and proof of coverage before you can operate.',
  },
];

function FaqItem({ faq, isOpen, onClick }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => { setHeight(isOpen && contentRef.current ? contentRef.current.scrollHeight : 0); }, [isOpen]);
  return (
    <div className="border-2 border-ash rounded-[2rem] overflow-hidden" style={{ background: isOpen ? 'rgba(255,255,255,0.5)' : 'transparent', transition: 'background 0.5s ease' }}>
      <button onClick={onClick} className="w-full flex items-center justify-between p-6 text-left group cursor-pointer">
        <span className="text-brand font-bold pr-8 group-hover:text-blue-dark" style={{ fontSize: '1rem', transition: 'color 0.2s' }}>{faq.q}</span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: isOpen ? '#ffbf3b' : '#25475e', transition: 'all 0.5s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
          <svg className="w-4 h-4" style={{ color: isOpen ? '#25475e' : '#f4f4ec' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </button>
      <div ref={contentRef} style={{ height: isOpen ? height + 'px' : '0px', overflow: 'hidden', transition: 'height 0.5s ease' }}>
        <p className="text-brand/70 px-6 pb-6" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const headerRef = useScrollAnimation();
  const listRef = useScrollAnimation(0.05);

  return (
    <section id="faq" className="bg-stone" style={{ padding: '7rem 0' }}>
      <div className="max-w-[900px] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
        <div ref={headerRef} className="text-center mb-14 fade-in-view">
          <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Frequently Asked Questions</p>
          <h2 className="text-brand font-bold leading-[1.3] tracking-tight" style={{ fontSize: 'clamp(2.2rem, 4vw, 2.6rem)' }}>Common Questions About Cannabis Insurance</h2>
        </div>
        <div ref={listRef} className="space-y-4 stagger-children">
          {faqs.map((faq, i) => <FaqItem key={i} faq={faq} isOpen={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? null : i)} />)}
        </div>
      </div>
    </section>
  );
}
