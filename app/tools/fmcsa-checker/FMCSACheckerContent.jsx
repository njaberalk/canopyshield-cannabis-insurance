'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import QuoteForm from '../../../components/QuoteForm';
import Footer from '../../../components/Footer';
import { cargoTypes } from '../../../data/fmcsa-requirements';

export default function FMCSACheckerContent() {
  const [selectedCargo, setSelectedCargo] = useState(null);

  const result = cargoTypes.find(c => c.id === selectedCargo);

  return (
    <div className="min-h-screen bg-stone">
      <Header />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tools' },
        { label: 'FMCSA Requirements Checker' },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand" style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-brand" style={{ opacity: 0.9 }} />
        </div>
        <div className="relative max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 text-center">
          <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Free Tool</p>
          <h1 className="text-stone font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}>
            FMCSA Coverage Requirements Checker
          </h1>
          <p className="text-cream font-light mx-auto" style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px' }}>
            Select your cargo type below to see the exact insurance requirements, minimum limits, and required filings for your operation.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="bg-stone" style={{ padding: '4rem 0' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
          {/* Cargo Type Selector */}
          <div className="max-w-3xl mx-auto mb-12">
            <label className="block text-brand font-bold mb-4" style={{ fontSize: '1rem' }}>
              What type of freight do you haul?
            </label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cargoTypes.map((cargo) => (
                <button
                  key={cargo.id}
                  onClick={() => setSelectedCargo(cargo.id)}
                  className={`border-2 rounded-[1.5rem] p-4 text-left cursor-pointer ${selectedCargo === cargo.id ? 'border-gold bg-gold/10' : 'border-ash bg-white/40 hover:border-blue-dark'}`}
                  style={{ transition: 'all 0.24s' }}
                >
                  <span className="block text-brand font-bold mb-1" style={{ fontSize: '0.85rem' }}>{cargo.label}</span>
                  <span className="block text-brand/50" style={{ fontSize: '0.7rem', lineHeight: '1.3' }}>{cargo.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="max-w-3xl mx-auto">
              {/* Minimum Liability */}
              <div className="border-2 border-ash rounded-[2rem] p-8 mb-6 bg-white/40">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <p className="text-blue-dark uppercase tracking-[0.12em] font-bold mb-1" style={{ fontSize: '0.7rem' }}>Federal Minimum Liability</p>
                    <p className="text-brand font-extrabold" style={{ fontSize: '2.5rem', lineHeight: '1' }}>{result.minimumLiability}</p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center border-2 border-gold bg-gold text-brand uppercase tracking-[0.16em] rounded-[2rem] font-semibold hover:border-brand hover:bg-brand hover:text-stone no-underline"
                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem', lineHeight: '2', transition: 'all 0.24s' }}
                  >
                    Get a Quote
                  </a>
                </div>

                {/* Required Filings */}
                <div className="mb-6">
                  <h3 className="text-brand font-bold mb-3" style={{ fontSize: '1rem' }}>Required Filings</h3>
                  <div className="space-y-2">
                    {result.filings.map((filing, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-gold">&#9679;</span>
                        <span className="text-brand" style={{ fontSize: '0.9rem' }}>{filing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Coverages */}
                <h3 className="text-brand font-bold mb-4" style={{ fontSize: '1rem' }}>Coverage Requirements</h3>
                <div className="space-y-4">
                  {result.requiredCoverages.map((cov, i) => (
                    <div key={i} className="border border-ash rounded-[1rem] p-4">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          {cov.slug ? (
                            <Link href={`/coverage/${cov.slug}/`} className="text-brand font-bold hover:text-blue-dark no-underline" style={{ fontSize: '0.95rem', transition: 'color 0.2s' }}>
                              {cov.coverage} →
                            </Link>
                          ) : (
                            <span className="text-brand font-bold" style={{ fontSize: '0.95rem' }}>{cov.coverage}</span>
                          )}
                          <p className="text-brand/60 mt-1" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{cov.notes}</p>
                        </div>
                        <span className={`shrink-0 rounded-[2rem] px-3 py-1 font-bold uppercase tracking-[0.1em] ${cov.minimum === 'Not required' ? 'bg-ash/50 text-brand/50' : 'bg-gold/20 text-brand'}`} style={{ fontSize: '0.65rem' }}>
                          {cov.minimum}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Notes */}
                {result.additionalNotes && (
                  <div className="mt-6 border-t border-ash pt-4">
                    <p className="text-blue-dark font-bold mb-2" style={{ fontSize: '0.8rem' }}>Important Note</p>
                    <p className="text-brand/70" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{result.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* Cross-links */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/resources/fmcsa-insurance-requirements/" className="block border-2 border-ash rounded-[2rem] p-5 hover:border-blue-dark no-underline" style={{ transition: 'all 0.24s' }}>
                  <span className="text-blue-dark uppercase tracking-[0.12em] font-bold block mb-1" style={{ fontSize: '0.65rem' }}>Guide</span>
                  <span className="text-brand font-bold block" style={{ fontSize: '0.9rem' }}>FMCSA Insurance Requirements Explained →</span>
                </Link>
                <Link href="/resources/new-authority-insurance/" className="block border-2 border-ash rounded-[2rem] p-5 hover:border-blue-dark no-underline" style={{ transition: 'all 0.24s' }}>
                  <span className="text-blue-dark uppercase tracking-[0.12em] font-bold block mb-1" style={{ fontSize: '0.65rem' }}>Guide</span>
                  <span className="text-brand font-bold block" style={{ fontSize: '0.9rem' }}>Insurance for New Trucking Authority →</span>
                </Link>
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
