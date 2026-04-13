'use client';
import { useState, useEffect, useCallback } from 'react';

const STEPS = [
  { id: 'business', label: 'Business Type' },
  { id: 'details', label: 'Details' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'contact', label: 'Contact' },
];

const BUSINESS_TYPES = [
  { value: 'dispensary', label: 'Dispensary / Retail', icon: '🏪' },
  { value: 'cultivator', label: 'Cultivator / Grower', icon: '🌱' },
  { value: 'manufacturer', label: 'Manufacturer / Processor', icon: '🏭' },
  { value: 'distributor', label: 'Distributor / Transporter', icon: '🚚' },
  { value: 'testing-lab', label: 'Testing Laboratory', icon: '🔬' },
  { value: 'multi-license', label: 'Multi-License Operator', icon: '📋' },
];

const COVERAGE_OPTIONS = [
  { value: 'general-liability', label: 'General Liability' },
  { value: 'product-liability', label: 'Product Liability' },
  { value: 'property', label: 'Commercial Property' },
  { value: 'crop', label: 'Crop / Harvest Coverage' },
  { value: 'workers-comp', label: 'Workers\' Compensation' },
  { value: 'commercial-auto', label: 'Commercial Auto' },
  { value: 'cyber', label: 'Cyber Liability' },
  { value: 'directors-officers', label: 'Directors & Officers' },
  { value: 'equipment', label: 'Equipment Breakdown' },
  { value: 'not-sure', label: 'Not Sure — Help Me Decide' },
];

const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const REVENUE_RANGES = ['Under $250,000','$250,000 - $500,000','$500,000 - $1,000,000','$1,000,000 - $2,500,000','$2,500,000 - $5,000,000','$5,000,000 - $10,000,000','Over $10,000,000'];
const EMPLOYEE_COUNTS = ['1-5', '6-15', '16-30', '31-50', '51-100', '100+'];

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessType: '', businessName: '', state: '', licenseNumber: '',
    annualRevenue: '', employeeCount: '', coverages: [], currentInsurance: '',
    firstName: '', lastName: '', email: '', phone: '', preferredContact: 'email', message: '',
  });

  // Listen for custom event to open modal from anywhere
  useEffect(() => {
    function handler() { setOpen(true); }
    window.addEventListener('open-quote-modal', handler);
    return () => window.removeEventListener('open-quote-modal', handler);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on escape
  useEffect(() => {
    function handler(e) { if (e.key === 'Escape') setOpen(false); }
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const update = useCallback((field, value) => setForm(prev => ({ ...prev, [field]: value })), []);

  function toggleCoverage(value) {
    setForm(prev => ({ ...prev, coverages: prev.coverages.includes(value) ? prev.coverages.filter(c => c !== value) : [...prev.coverages, value] }));
  }

  function canAdvance() {
    if (step === 0) return !!form.businessType;
    if (step === 1) return !!form.businessName && !!form.state;
    if (step === 2) return form.coverages.length > 0;
    if (step === 3) return !!form.firstName && !!form.email;
    return false;
  }

  function handleClose() {
    setOpen(false);
    // Reset after animation
    setTimeout(() => { setStep(0); setSubmitted(false); }, 300);
  }

  async function handleSubmit() {
    if (!canAdvance()) return;
    setSubmitting(true);
    try {
      if (typeof window !== 'undefined' && window._cio) {
        window._cio.identify({ id: form.email, email: form.email, first_name: form.firstName, last_name: form.lastName, phone: form.phone, business_name: form.businessName, business_type: form.businessType, state: form.state });
        window._cio.track('quote_submitted', { ...form });
      }
      const webhookUrl = typeof window !== 'undefined' ? window.__QUOTE_WEBHOOK_URL : '';
      if (webhookUrl) {
        await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, source: 'canopyshield-cannabis-quote', timestamp: new Date().toISOString() }) }).catch(() => {});
      }
      setSubmitted(true);
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ animation: 'modalFadeIn 0.25s ease' }}>
      <style>{`
        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 rounded-2xl border border-ash" style={{ backgroundColor: '#1a2b22', animation: 'modalSlideUp 0.3s ease 0.05s both' }}>
        {/* Close button */}
        <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 rounded-full border border-ash flex items-center justify-center text-brand/60 hover:text-stone hover:border-stone cursor-pointer z-10" style={{ transition: 'all 0.2s' }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Success state */}
        {submitted ? (
          <div className="text-center py-16 px-8">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-stone font-bold text-xl mb-2">Quote Request Received</h2>
            <p className="text-brand/60 mb-8">Our specialists will reach out within 24 hours.</p>
            <button onClick={handleClose} className="bg-gold text-brand px-6 py-2 rounded-xl font-semibold text-sm cursor-pointer">Close</button>
          </div>
        ) : (
          <div className="p-8">
            {/* Header */}
            <h2 className="text-stone font-bold text-xl mb-1">Get a Cannabis Insurance Quote</h2>
            <p className="text-brand/50 text-sm mb-6">Step {step + 1} of 4</p>

            {/* Progress */}
            <div className="flex items-center gap-1 mb-8">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex-1 h-1 rounded-full" style={{ backgroundColor: i <= step ? '#5db87a' : '#334d3c', transition: 'background 0.3s' }} />
              ))}
            </div>

            {/* Step 1 */}
            {step === 0 && (
              <div>
                <h3 className="text-stone font-semibold mb-4">What type of cannabis business?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BUSINESS_TYPES.map(type => (
                    <button key={type.value} onClick={() => update('businessType', type.value)} className={`border-2 rounded-xl p-4 text-left cursor-pointer ${form.businessType === type.value ? 'border-gold bg-gold/10' : 'border-ash hover:border-gold/40'}`} style={{ transition: 'all 0.2s' }}>
                      <div className="text-xl mb-1">{type.icon}</div>
                      <div className="text-stone font-medium text-xs">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-stone font-semibold mb-4">Business Details</h3>
                <div>
                  <label className="block text-brand/70 text-xs font-semibold mb-1">Business Name *</label>
                  <input type="text" value={form.businessName} onChange={e => update('businessName', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-lg px-3 py-2.5 text-stone text-sm focus:border-gold focus:outline-none" placeholder="Your cannabis business" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1">State *</label>
                    <select value={form.state} onChange={e => update('state', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-lg px-3 py-2.5 text-stone text-sm focus:border-gold focus:outline-none appearance-none">
                      <option value="" style={{ background: '#1a2b22' }}>Select</option>
                      {STATES.map(s => <option key={s} value={s} style={{ background: '#1a2b22' }}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1">License #</label>
                    <input type="text" value={form.licenseNumber} onChange={e => update('licenseNumber', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-lg px-3 py-2.5 text-stone text-sm focus:border-gold focus:outline-none" placeholder="Optional" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1">Annual Revenue</label>
                    <select value={form.annualRevenue} onChange={e => update('annualRevenue', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-lg px-3 py-2.5 text-stone text-sm focus:border-gold focus:outline-none appearance-none">
                      <option value="" style={{ background: '#1a2b22' }}>Select</option>
                      {REVENUE_RANGES.map(r => <option key={r} value={r} style={{ background: '#1a2b22' }}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1">Employees</label>
                    <select value={form.employeeCount} onChange={e => update('employeeCount', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-lg px-3 py-2.5 text-stone text-sm focus:border-gold focus:outline-none appearance-none">
                      <option value="" style={{ background: '#1a2b22' }}>Select</option>
                      {EMPLOYEE_COUNTS.map(c => <option key={c} value={c} style={{ background: '#1a2b22' }}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <div>
                <h3 className="text-stone font-semibold mb-4">What coverage do you need?</h3>
                <div className="grid grid-cols-2 gap-2">
                  {COVERAGE_OPTIONS.map(cov => (
                    <button key={cov.value} onClick={() => toggleCoverage(cov.value)} className={`border-2 rounded-lg px-3 py-3 text-left cursor-pointer flex items-center gap-2 ${form.coverages.includes(cov.value) ? 'border-gold bg-gold/10' : 'border-ash hover:border-gold/40'}`} style={{ transition: 'all 0.2s' }}>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${form.coverages.includes(cov.value) ? 'border-gold bg-gold' : 'border-ash'}`}>
                        {form.coverages.includes(cov.value) && <svg className="w-2.5 h-2.5" style={{ color: '#1a2b22' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-stone text-xs font-medium">{cov.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-stone font-semibold mb-4">Your Contact Info</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1">First Name *</label>
                    <input type="text" value={form.firstName} onChange={e => update('firstName', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-lg px-3 py-2.5 text-stone text-sm focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1">Last Name</label>
                    <input type="text" value={form.lastName} onChange={e => update('lastName', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-lg px-3 py-2.5 text-stone text-sm focus:border-gold focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-brand/70 text-xs font-semibold mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-lg px-3 py-2.5 text-stone text-sm focus:border-gold focus:outline-none" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-brand/70 text-xs font-semibold mb-1">Phone</label>
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-lg px-3 py-2.5 text-stone text-sm focus:border-gold focus:outline-none" placeholder="(555) 123-4567" />
                </div>
              </div>
            )}

            {/* Nav */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-ash">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="text-brand/50 hover:text-stone text-sm font-semibold cursor-pointer">&larr; Back</button>
              ) : <div />}
              {step < 3 ? (
                <button onClick={() => canAdvance() && setStep(step + 1)} disabled={!canAdvance()} className="bg-gold px-6 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" style={{ color: '#fff', transition: 'all 0.2s' }}>Continue &rarr;</button>
              ) : (
                <button onClick={handleSubmit} disabled={!canAdvance() || submitting} className="bg-gold px-6 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" style={{ color: '#fff', transition: 'all 0.2s' }}>{submitting ? 'Submitting...' : 'Submit Quote Request'}</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
