'use client';
import { useState } from 'react';
import Link from 'next/link';

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

const REVENUE_RANGES = [
  'Under $250,000',
  '$250,000 - $500,000',
  '$500,000 - $1,000,000',
  '$1,000,000 - $2,500,000',
  '$2,500,000 - $5,000,000',
  '$5,000,000 - $10,000,000',
  'Over $10,000,000',
];

const EMPLOYEE_COUNTS = ['1-5', '6-15', '16-30', '31-50', '51-100', '100+'];

export default function QuoteFormPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessType: '',
    businessName: '',
    state: '',
    licenseNumber: '',
    annualRevenue: '',
    employeeCount: '',
    coverages: [],
    currentInsurance: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    message: '',
  });

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function toggleCoverage(value) {
    setForm(prev => ({
      ...prev,
      coverages: prev.coverages.includes(value)
        ? prev.coverages.filter(c => c !== value)
        : [...prev.coverages, value],
    }));
  }

  function canAdvance() {
    if (step === 0) return !!form.businessType;
    if (step === 1) return !!form.businessName && !!form.state;
    if (step === 2) return form.coverages.length > 0;
    if (step === 3) return !!form.firstName && !!form.email;
    return false;
  }

  async function handleSubmit() {
    if (!canAdvance()) return;
    setSubmitting(true);
    try {
      // Send to Customer.io Track API
      const siteId = typeof window !== 'undefined' ? window.__CUSTOMERIO_SITE_ID || '' : '';
      if (siteId) {
        await fetch('https://track.customer.io/api/v1/forms/cannabis-quote/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${btoa(siteId + ':')}` },
          body: JSON.stringify({ data: { ...form, source: 'canopyshield-cannabis-quote', timestamp: new Date().toISOString() } }),
        }).catch(() => {});
      }

      // Also send to Customer.io identify + track via snippet (if loaded)
      if (typeof window !== 'undefined' && window._cio) {
        window._cio.identify({ id: form.email, email: form.email, first_name: form.firstName, last_name: form.lastName, phone: form.phone, business_name: form.businessName, business_type: form.businessType, state: form.state });
        window._cio.track('quote_submitted', { ...form });
      }

      // Fallback: also POST to a configurable webhook endpoint
      const webhookUrl = typeof window !== 'undefined' ? window.__QUOTE_WEBHOOK_URL : '';
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, source: 'canopyshield-cannabis-quote', timestamp: new Date().toISOString() }),
        }).catch(() => {});
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-stone font-bold text-2xl mb-3">Quote Request Received</h1>
          <p className="text-brand/70 mb-8">Our cannabis insurance specialists will review your information and reach out within 24 hours with a custom coverage proposal.</p>
          <Link href="/" className="inline-flex items-center justify-center border-2 border-gold bg-gold text-brand text-center uppercase tracking-[0.16em] rounded-[2rem] font-semibold no-underline" style={{ padding: '0.8rem 2rem 0.7rem', fontSize: '0.75rem', lineHeight: '2' }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone">
      {/* Header */}
      <header className="border-b border-ash" style={{ padding: '1.5rem 0' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 flex items-center justify-between">
          <Link href="/" className="text-stone font-bold text-lg no-underline">CanopyShield</Link>
          <Link href="/" className="text-brand/50 text-sm no-underline hover:text-brand">&larr; Back to Site</Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-4">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-gold text-brand' : 'border-2 border-ash text-brand/30'}`} style={{ transition: 'all 0.3s' }}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`w-12 sm:w-20 h-0.5 mx-2 ${i < step ? 'bg-gold' : 'bg-ash'}`} style={{ transition: 'background 0.3s' }} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-brand/40 px-1">
          {STEPS.map(s => <span key={s.id}>{s.label}</span>)}
        </div>
      </div>

      {/* Form Steps */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Step 1: Business Type */}
        {step === 0 && (
          <div>
            <h2 className="text-stone font-bold text-2xl mb-2">What type of cannabis business do you operate?</h2>
            <p className="text-brand/60 mb-8">Select the option that best describes your operation.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BUSINESS_TYPES.map(type => (
                <button key={type.value} onClick={() => update('businessType', type.value)} className={`border-2 rounded-xl p-5 text-left cursor-pointer ${form.businessType === type.value ? 'border-gold bg-gold/10' : 'border-ash hover:border-gold/40'}`} style={{ transition: 'all 0.2s' }}>
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-stone font-semibold text-sm">{type.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Business Details */}
        {step === 1 && (
          <div>
            <h2 className="text-stone font-bold text-2xl mb-2">Tell us about your business</h2>
            <p className="text-brand/60 mb-8">This helps us match you with the right coverage program.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-brand/70 text-sm font-semibold mb-2">Business Name *</label>
                <input type="text" value={form.businessName} onChange={e => update('businessName', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" placeholder="Your cannabis business name" style={{ transition: 'border-color 0.2s' }} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand/70 text-sm font-semibold mb-2">State *</label>
                  <select value={form.state} onChange={e => update('state', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none appearance-none" style={{ transition: 'border-color 0.2s' }}>
                    <option value="" className="bg-brand">Select state</option>
                    {STATES.map(s => <option key={s} value={s} className="bg-brand">{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-brand/70 text-sm font-semibold mb-2">License Number</label>
                  <input type="text" value={form.licenseNumber} onChange={e => update('licenseNumber', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" placeholder="Optional" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand/70 text-sm font-semibold mb-2">Annual Revenue</label>
                  <select value={form.annualRevenue} onChange={e => update('annualRevenue', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none appearance-none">
                    <option value="" className="bg-brand">Select range</option>
                    {REVENUE_RANGES.map(r => <option key={r} value={r} className="bg-brand">{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-brand/70 text-sm font-semibold mb-2">Number of Employees</label>
                  <select value={form.employeeCount} onChange={e => update('employeeCount', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none appearance-none">
                    <option value="" className="bg-brand">Select range</option>
                    {EMPLOYEE_COUNTS.map(c => <option key={c} value={c} className="bg-brand">{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Coverage Selection */}
        {step === 2 && (
          <div>
            <h2 className="text-stone font-bold text-2xl mb-2">What coverage do you need?</h2>
            <p className="text-brand/60 mb-8">Select all that apply. Not sure? Choose the last option and we will help.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {COVERAGE_OPTIONS.map(cov => (
                <button key={cov.value} onClick={() => toggleCoverage(cov.value)} className={`border-2 rounded-xl px-5 py-4 text-left cursor-pointer flex items-center gap-3 ${form.coverages.includes(cov.value) ? 'border-gold bg-gold/10' : 'border-ash hover:border-gold/40'}`} style={{ transition: 'all 0.2s' }}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${form.coverages.includes(cov.value) ? 'border-gold bg-gold' : 'border-ash'}`}>
                    {form.coverages.includes(cov.value) && <svg className="w-3 h-3 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-stone font-medium text-sm">{cov.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-brand/70 text-sm font-semibold mb-2">Do you currently have insurance?</label>
              <div className="flex gap-3">
                {['Yes', 'No', 'Switching carriers'].map(opt => (
                  <button key={opt} onClick={() => update('currentInsurance', opt)} className={`border-2 rounded-xl px-5 py-3 text-sm font-medium cursor-pointer ${form.currentInsurance === opt ? 'border-gold bg-gold/10 text-stone' : 'border-ash text-brand/60 hover:border-gold/40'}`} style={{ transition: 'all 0.2s' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact Info */}
        {step === 3 && (
          <div>
            <h2 className="text-stone font-bold text-2xl mb-2">How can we reach you?</h2>
            <p className="text-brand/60 mb-8">We will have a cannabis insurance specialist contact you within 24 hours.</p>
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand/70 text-sm font-semibold mb-2">First Name *</label>
                  <input type="text" value={form.firstName} onChange={e => update('firstName', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-brand/70 text-sm font-semibold mb-2">Last Name</label>
                  <input type="text" value={form.lastName} onChange={e => update('lastName', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-brand/70 text-sm font-semibold mb-2">Email Address *</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" placeholder="you@company.com" />
              </div>
              <div>
                <label className="block text-brand/70 text-sm font-semibold mb-2">Phone Number</label>
                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" placeholder="(555) 123-4567" />
              </div>
              <div>
                <label className="block text-brand/70 text-sm font-semibold mb-2">Preferred Contact Method</label>
                <div className="flex gap-3">
                  {['email', 'phone'].map(opt => (
                    <button key={opt} onClick={() => update('preferredContact', opt)} className={`border-2 rounded-xl px-5 py-3 text-sm font-medium cursor-pointer capitalize ${form.preferredContact === opt ? 'border-gold bg-gold/10 text-stone' : 'border-ash text-brand/60 hover:border-gold/40'}`} style={{ transition: 'all 0.2s' }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-brand/70 text-sm font-semibold mb-2">Anything else we should know?</label>
                <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={3} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none resize-none" placeholder="Optional — tell us about specific needs or concerns" />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-ash">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="text-brand/60 hover:text-stone text-sm font-semibold cursor-pointer" style={{ transition: 'color 0.2s' }}>
              &larr; Back
            </button>
          ) : <div />}
          {step < 3 ? (
            <button onClick={() => canAdvance() && setStep(step + 1)} disabled={!canAdvance()} className="bg-gold text-brand px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gold-hover disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" style={{ transition: 'all 0.2s' }}>
              Continue &rarr;
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!canAdvance() || submitting} className="bg-gold text-brand px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gold-hover disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" style={{ transition: 'all 0.2s' }}>
              {submitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
