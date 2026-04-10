'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import QuoteForm from '../../../components/QuoteForm';
import Footer from '../../../components/Footer';
import { businessTypes, stateCannabisPolicies } from '../../../data/fmcsa-requirements';

const US_STATES = [
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'AK', name: 'Alaska' }, { abbr: 'AZ', name: 'Arizona' },
  { abbr: 'AR', name: 'Arkansas' }, { abbr: 'CA', name: 'California' }, { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' }, { abbr: 'DE', name: 'Delaware' }, { abbr: 'FL', name: 'Florida' },
  { abbr: 'GA', name: 'Georgia' }, { abbr: 'HI', name: 'Hawaii' }, { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' }, { abbr: 'IN', name: 'Indiana' }, { abbr: 'IA', name: 'Iowa' },
  { abbr: 'KS', name: 'Kansas' }, { abbr: 'KY', name: 'Kentucky' }, { abbr: 'LA', name: 'Louisiana' },
  { abbr: 'ME', name: 'Maine' }, { abbr: 'MD', name: 'Maryland' }, { abbr: 'MA', name: 'Massachusetts' },
  { abbr: 'MI', name: 'Michigan' }, { abbr: 'MN', name: 'Minnesota' }, { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' }, { abbr: 'MT', name: 'Montana' }, { abbr: 'NE', name: 'Nebraska' },
  { abbr: 'NV', name: 'Nevada' }, { abbr: 'NH', name: 'New Hampshire' }, { abbr: 'NJ', name: 'New Jersey' },
  { abbr: 'NM', name: 'New Mexico' }, { abbr: 'NY', name: 'New York' }, { abbr: 'NC', name: 'North Carolina' },
  { abbr: 'ND', name: 'North Dakota' }, { abbr: 'OH', name: 'Ohio' }, { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' }, { abbr: 'PA', name: 'Pennsylvania' }, { abbr: 'RI', name: 'Rhode Island' },
  { abbr: 'SC', name: 'South Carolina' }, { abbr: 'SD', name: 'South Dakota' }, { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'TX', name: 'Texas' }, { abbr: 'UT', name: 'Utah' }, { abbr: 'VT', name: 'Vermont' },
  { abbr: 'VA', name: 'Virginia' }, { abbr: 'WA', name: 'Washington' }, { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' }, { abbr: 'WY', name: 'Wyoming' },
];

function getStatusColor(status) {
  if (status === 'Recreational & Medical') return 'bg-green-100 text-green-800 border-green-300';
  if (status === 'Medical Only') return 'bg-blue-100 text-blue-800 border-blue-300';
  if (status === 'CBD Only') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  return 'bg-red-100 text-red-800 border-red-300';
}

export default function CannabisCheckerContent() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedState, setSelectedState] = useState('');

  const businessResult = businessTypes.find(b => b.id === selectedBusiness);
  const stateResult = selectedState ? stateCannabisPolicies[selectedState] : null;
  const selectedStateName = US_STATES.find(s => s.abbr === selectedState)?.name || '';

  return (
    <div className="min-h-screen bg-stone">
      <Header />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tools' },
        { label: 'Cannabis Legality & Coverage Checker' },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand" style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-brand" style={{ opacity: 0.9 }} />
        </div>
        <div className="relative max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 text-center">
          <p className="text-blue uppercase tracking-[0.15em] font-bold mb-4" style={{ fontSize: '0.85rem' }}>Free Tool</p>
          <h1 className="text-stone font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}>
            State Cannabis Legality & Coverage Checker
          </h1>
          <p className="text-cream font-light mx-auto" style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px' }}>
            Select your cannabis business type and state to see the legal status, required insurance coverages, and regulatory notes for your operation.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="bg-stone" style={{ padding: '4rem 0' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
          {/* Business Type Selector */}
          <div className="max-w-3xl mx-auto mb-12">
            <label className="block text-brand font-bold mb-4" style={{ fontSize: '1rem' }}>
              What type of cannabis business do you operate?
            </label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {businessTypes.map((biz) => (
                <button
                  key={biz.id}
                  onClick={() => setSelectedBusiness(biz.id)}
                  className={`border-2 rounded-[1.5rem] p-4 text-left cursor-pointer ${selectedBusiness === biz.id ? 'border-gold bg-gold/10' : 'border-ash bg-white/40 hover:border-blue-dark'}`}
                  style={{ transition: 'all 0.24s' }}
                >
                  <span className="block text-brand font-bold mb-1" style={{ fontSize: '0.85rem' }}>{biz.label}</span>
                  <span className="block text-brand/50" style={{ fontSize: '0.7rem', lineHeight: '1.3' }}>{biz.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* State Selector */}
          <div className="max-w-3xl mx-auto mb-12">
            <label className="block text-brand font-bold mb-4" style={{ fontSize: '1rem' }}>
              What state is your business located in?
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full max-w-md border-2 border-ash rounded-[1.5rem] p-4 text-brand font-bold bg-white/40 cursor-pointer"
              style={{ fontSize: '0.9rem' }}
            >
              <option value="">Select a state...</option>
              {US_STATES.map((s) => (
                <option key={s.abbr} value={s.abbr}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* State Legality Result */}
          {stateResult && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="border-2 border-ash rounded-[2rem] p-8 bg-white/40">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <p className="text-blue-dark uppercase tracking-[0.12em] font-bold mb-1" style={{ fontSize: '0.7rem' }}>Cannabis Legal Status</p>
                    <p className="text-brand font-extrabold" style={{ fontSize: '2rem', lineHeight: '1.1' }}>{selectedStateName}</p>
                  </div>
                  <span className={`rounded-[2rem] px-5 py-2 font-bold border-2 ${getStatusColor(stateResult.status)}`} style={{ fontSize: '0.85rem' }}>
                    {stateResult.status}
                  </span>
                </div>
                <div className="border-t border-ash pt-4">
                  <p className="text-blue-dark font-bold mb-2" style={{ fontSize: '0.8rem' }}>Regulatory Notes</p>
                  <p className="text-brand/70" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{stateResult.notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Business Coverage Results */}
          {businessResult && (
            <div className="max-w-3xl mx-auto">
              <div className="border-2 border-ash rounded-[2rem] p-8 mb-6 bg-white/40">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <p className="text-blue-dark uppercase tracking-[0.12em] font-bold mb-1" style={{ fontSize: '0.7rem' }}>Coverage Requirements For</p>
                    <p className="text-brand font-extrabold" style={{ fontSize: '2rem', lineHeight: '1' }}>{businessResult.label}</p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center border-2 border-gold bg-gold text-brand uppercase tracking-[0.16em] rounded-[2rem] font-semibold hover:border-brand hover:bg-brand hover:text-stone no-underline"
                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem', lineHeight: '2', transition: 'all 0.24s' }}
                  >
                    Get a Quote
                  </a>
                </div>

                {/* Required Coverages */}
                <h3 className="text-brand font-bold mb-4" style={{ fontSize: '1rem' }}>Required & Recommended Coverages</h3>
                <div className="space-y-4">
                  {businessResult.requiredCoverages.map((cov, i) => (
                    <div key={i} className="border border-ash rounded-[1rem] p-4">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          {cov.slug ? (
                            <Link href={`/coverage/${cov.slug}/`} className="text-brand font-bold hover:text-blue-dark no-underline" style={{ fontSize: '0.95rem', transition: 'color 0.2s' }}>
                              {cov.coverage} &rarr;
                            </Link>
                          ) : (
                            <span className="text-brand font-bold" style={{ fontSize: '0.95rem' }}>{cov.coverage}</span>
                          )}
                          <p className="text-brand/60 mt-1" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{cov.notes}</p>
                        </div>
                        <span className={`shrink-0 rounded-[2rem] px-3 py-1 font-bold uppercase tracking-[0.1em] ${cov.minimum === 'Recommended' ? 'bg-ash/50 text-brand/50' : 'bg-gold/20 text-brand'}`} style={{ fontSize: '0.65rem' }}>
                          {cov.minimum}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Notes */}
                {businessResult.additionalNotes && (
                  <div className="mt-6 border-t border-ash pt-4">
                    <p className="text-blue-dark font-bold mb-2" style={{ fontSize: '0.8rem' }}>Important Note</p>
                    <p className="text-brand/70" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{businessResult.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* Cross-links */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/resources/cannabis-insurance-requirements/" className="block border-2 border-ash rounded-[2rem] p-5 hover:border-blue-dark no-underline" style={{ transition: 'all 0.24s' }}>
                  <span className="text-blue-dark uppercase tracking-[0.12em] font-bold block mb-1" style={{ fontSize: '0.65rem' }}>Guide</span>
                  <span className="text-brand font-bold block" style={{ fontSize: '0.9rem' }}>Cannabis Insurance Requirements Explained &rarr;</span>
                </Link>
                <Link href="/resources/starting-dispensary-insurance/" className="block border-2 border-ash rounded-[2rem] p-5 hover:border-blue-dark no-underline" style={{ transition: 'all 0.24s' }}>
                  <span className="text-blue-dark uppercase tracking-[0.12em] font-bold block mb-1" style={{ fontSize: '0.65rem' }}>Guide</span>
                  <span className="text-brand font-bold block" style={{ fontSize: '0.9rem' }}>Starting a Dispensary Insurance Guide &rarr;</span>
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
