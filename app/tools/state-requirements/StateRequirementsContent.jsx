'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import QuoteForm from '../../../components/QuoteForm';
import Footer from '../../../components/Footer';
import { stateRequirements } from '../../../data/state-requirements';

export default function StateRequirementsContent() {
  const [selectedState, setSelectedState] = useState(null);

  const result = stateRequirements.find(s => s.abbr === selectedState);

  return (
    <div className="min-h-screen bg-stone">
      <Header />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tools' },
        { label: 'State Requirements Lookup' },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand" style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
        <div className="absolute inset-0 bg-brand" style={{ opacity: 0.9 }} />
        <div className="relative max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 text-center">
          <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Free Tool</p>
          <h1 className="text-stone font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}>
            State Cannabis Insurance Requirements
          </h1>
          <p className="text-cream font-light mx-auto" style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px' }}>
            Select a state to see minimum insurance requirements, workers compensation rules, regulatory agencies, and important state-specific cannabis regulations.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="bg-stone" style={{ padding: '4rem 0' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
          {/* State Selector Grid */}
          <div className="max-w-4xl mx-auto mb-12">
            <label className="block text-brand font-bold mb-4" style={{ fontSize: '1rem' }}>Select a state:</label>
            <div className="flex flex-wrap gap-2">
              {stateRequirements.map((s) => (
                <button
                  key={s.abbr}
                  onClick={() => setSelectedState(s.abbr)}
                  className={`rounded-[1rem] px-3 py-2 font-bold cursor-pointer ${selectedState === s.abbr ? 'bg-gold text-brand border-2 border-gold' : 'bg-white/40 text-brand border-2 border-ash hover:border-blue-dark'}`}
                  style={{ fontSize: '0.75rem', transition: 'all 0.24s', minWidth: '52px' }}
                >
                  {s.abbr}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="max-w-3xl mx-auto">
              <div className="border-2 border-ash rounded-[2rem] p-8 bg-white/40">
                {/* State Header */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <p className="text-blue-dark uppercase tracking-[0.12em] font-bold mb-1" style={{ fontSize: '0.7rem' }}>State Requirements</p>
                    <h2 className="text-brand font-extrabold" style={{ fontSize: '2rem', lineHeight: '1.1' }}>{result.state}</h2>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/states/${result.slug}/`} className="inline-flex items-center border-2 border-brand text-brand rounded-[2rem] font-semibold uppercase tracking-[0.12em] hover:bg-brand hover:text-stone no-underline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.65rem', transition: 'all 0.24s' }}>
                      Full State Page →
                    </Link>
                    <a href="#contact" className="inline-flex items-center border-2 border-gold bg-gold text-brand rounded-[2rem] font-semibold uppercase tracking-[0.12em] hover:border-brand hover:bg-brand hover:text-stone no-underline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.65rem', transition: 'all 0.24s' }}>
                      Get a Quote
                    </a>
                  </div>
                </div>

                {/* Requirements Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="border border-ash rounded-[1rem] p-4">
                    <p className="text-brand/50 uppercase tracking-[0.1em] font-bold mb-1" style={{ fontSize: '0.65rem' }}>Federal Minimum Liability</p>
                    <p className="text-brand font-bold" style={{ fontSize: '1.3rem' }}>{result.minLiability}</p>
                  </div>
                  <div className="border border-ash rounded-[1rem] p-4">
                    <p className="text-brand/50 uppercase tracking-[0.1em] font-bold mb-1" style={{ fontSize: '0.65rem' }}>State Auto Minimums</p>
                    <p className="text-brand font-bold" style={{ fontSize: '1.1rem' }}>{result.personalAutoMin}</p>
                  </div>
                  <div className="border border-ash rounded-[1rem] p-4">
                    <p className="text-brand/50 uppercase tracking-[0.1em] font-bold mb-1" style={{ fontSize: '0.65rem' }}>Workers&apos; Compensation</p>
                    <p className="text-brand font-bold" style={{ fontSize: '1rem' }}>
                      {result.wcRequired ? (
                        result.wcMonopolistic ? (
                          <span className="text-gold">Required — Monopolistic State Fund</span>
                        ) : (
                          <span>Required</span>
                        )
                      ) : (
                        <span className="text-blue-dark">Voluntary (Texas)</span>
                      )}
                    </p>
                  </div>
                  <div className="border border-ash rounded-[1rem] p-4">
                    <p className="text-brand/50 uppercase tracking-[0.1em] font-bold mb-1" style={{ fontSize: '0.65rem' }}>Regulatory Agency</p>
                    <p className="text-brand font-bold" style={{ fontSize: '0.9rem' }}>{result.dotAgency}</p>
                  </div>
                </div>

                {/* Special Notes */}
                <div className="border-t border-ash pt-4">
                  <p className="text-blue-dark font-bold mb-2" style={{ fontSize: '0.8rem' }}>State-Specific Notes</p>
                  <p className="text-brand/70" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{result.specialNotes}</p>
                </div>
              </div>

              {/* Cross-links */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <Link href={`/states/${result.slug}/`} className="block border-2 border-ash rounded-[2rem] p-5 hover:border-blue-dark no-underline" style={{ transition: 'all 0.24s' }}>
                  <span className="text-blue-dark uppercase tracking-[0.12em] font-bold block mb-1" style={{ fontSize: '0.65rem' }}>Detailed Info</span>
                  <span className="text-brand font-bold block" style={{ fontSize: '0.9rem' }}>Cannabis Insurance in {result.state} →</span>
                </Link>
                <Link href="/tools/fmcsa-checker/" className="block border-2 border-ash rounded-[2rem] p-5 hover:border-blue-dark no-underline" style={{ transition: 'all 0.24s' }}>
                  <span className="text-blue-dark uppercase tracking-[0.12em] font-bold block mb-1" style={{ fontSize: '0.65rem' }}>Tool</span>
                  <span className="text-brand font-bold block" style={{ fontSize: '0.9rem' }}>Cannabis Legality & Coverage Checker →</span>
                </Link>
              </div>
            </div>
          )}

          {/* All states table (shown when no state selected) */}
          {!selectedState && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-brand font-bold mb-6" style={{ fontSize: '1.3rem' }}>All 50 States at a Glance</h2>
              <div className="border-2 border-ash rounded-[2rem] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full" style={{ fontSize: '0.8rem' }}>
                    <thead>
                      <tr className="bg-brand text-stone">
                        <th className="text-left p-3 font-bold uppercase tracking-[0.1em]" style={{ fontSize: '0.7rem' }}>State</th>
                        <th className="text-left p-3 font-bold uppercase tracking-[0.1em]" style={{ fontSize: '0.7rem' }}>Min. Liability</th>
                        <th className="text-left p-3 font-bold uppercase tracking-[0.1em]" style={{ fontSize: '0.7rem' }}>WC Required</th>
                        <th className="text-left p-3 font-bold uppercase tracking-[0.1em]" style={{ fontSize: '0.7rem' }}>Key Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stateRequirements.map((s, i) => (
                        <tr key={s.abbr} className={`border-t border-ash ${i % 2 === 0 ? 'bg-white/30' : ''}`}>
                          <td className="p-3">
                            <button onClick={() => setSelectedState(s.abbr)} className="text-brand font-bold hover:text-blue-dark cursor-pointer" style={{ transition: 'color 0.2s' }}>
                              {s.state}
                            </button>
                          </td>
                          <td className="p-3 text-brand">{s.minLiability}</td>
                          <td className="p-3 text-brand">{s.wcRequired ? (s.wcMonopolistic ? 'Yes (State Fund)' : 'Yes') : 'Voluntary'}</td>
                          <td className="p-3 text-brand/60" style={{ maxWidth: '300px' }}>{s.specialNotes.substring(0, 80)}...</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <QuoteForm />
      <Footer />
    </div>
  );
}
