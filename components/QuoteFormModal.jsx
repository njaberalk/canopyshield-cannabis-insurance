'use client';
import { useState, useEffect, useCallback } from 'react';
import { verticalConfig as config } from '../data/verticalConfig';

const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const STEPS = ['Type', 'Details', 'Coverage', 'Contact'];

export default function QuoteFormModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessType: '',
    customAnswers: {},
    coverages: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    message: '',
  });

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-quote-modal', handler);
    return () => window.removeEventListener('open-quote-modal', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const update = useCallback((field, value) => setForm(prev => ({ ...prev, [field]: value })), []);

  function setCustomAnswer(questionId, value) {
    setForm(prev => ({ ...prev, customAnswers: { ...prev.customAnswers, [questionId]: value } }));
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
    if (step === 1) return config.customQuestions.every(q => form.customAnswers[q.id]);
    if (step === 2) return form.coverages.length > 0;
    if (step === 3) return !!form.firstName && !!form.email;
    return false;
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => { setStep(0); setSubmitted(false); setForm({ businessType: '', customAnswers: {}, coverages: [], firstName: '', lastName: '', email: '', phone: '', city: '', state: '', message: '' }); }, 300);
  }

  async function handleSubmit() {
    if (!canAdvance()) return;
    setSubmitting(true);

    // Build customFields from vertical-specific answers
    const customFields = config.customQuestions.map(q => ({
      label: q.label.replace(/\?$/, ''),
      value: form.customAnswers[q.id] || '',
    }));

    const payload = {
      vertical: config.id,
      verticalLabel: config.label,
      source: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
      businessType: form.businessType,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      state: form.state,
      coverages: form.coverages,
      customFields,
      message: form.message,
    };

    try {
      // Customer.io identify + track
      if (typeof window !== 'undefined' && window._cio) {
        window._cio.identify({
          id: form.email,
          email: form.email,
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
          city: form.city,
          state: form.state,
          vertical: config.id,
          business_type: form.businessType,
        });
        window._cio.track('quote_submitted', payload);
      }

      // Webhook
      const webhookUrl = typeof window !== 'undefined' ? (window.__QUOTE_WEBHOOK_URL || '') : '';
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {});
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ animation: 'qfmFadeIn 0.2s ease' }}>
      <style>{`
        @keyframes qfmFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes qfmSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand/80" style={{ backdropFilter: 'blur(4px)' }} onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto mx-4 bg-stone rounded-[2rem] border-2 border-ash" style={{ animation: 'qfmSlideUp 0.25s ease 0.05s both', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>

        {/* Close */}
        <button onClick={handleClose} className="absolute top-5 right-5 w-8 h-8 rounded-full border-2 border-ash flex items-center justify-center text-brand/40 hover:text-brand hover:border-brand cursor-pointer z-10" style={{ transition: 'all 0.2s' }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Success */}
        {submitted ? (
          <div className="text-center py-16 px-8">
            <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-brand font-bold text-xl mb-2">You&apos;re All Set</h2>
            <p className="text-brand/60 mb-8">We&apos;ve received your information and a {config.label.toLowerCase().replace(' insurance', '')} specialist will be in touch within 24 hours.</p>
            <button onClick={handleClose} className="bg-gold text-brand px-6 py-2.5 rounded-[2rem] font-semibold text-sm cursor-pointer uppercase tracking-[0.12em]" style={{ transition: 'all 0.2s' }}>Close</button>
          </div>
        ) : (
          <div className="p-8">
            {/* Header */}
            <div className="mb-6 pr-8">
              <h2 className="text-brand font-bold text-xl mb-1">{config.heading}</h2>
              <p className="text-brand/50 text-sm">{config.subtext}</p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-1.5 mb-8">
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1">
                  <div className="h-1.5 rounded-full" style={{ backgroundColor: i <= step ? '#ffbf3b' : '#e3e3d8', transition: 'background 0.3s' }} />
                  <span className="block text-center mt-1.5" style={{ fontSize: '0.6rem', color: i <= step ? '#25475e' : '#25475e60', fontWeight: i <= step ? 700 : 500 }}>{s}</span>
                </div>
              ))}
            </div>

            {/* Step 1: Business Type */}
            {step === 0 && (
              <div>
                <h3 className="text-brand font-semibold mb-4">What best describes your operation?</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {config.businessTypes.map(type => (
                    <button key={type.value} onClick={() => update('businessType', type.value)} className={`border-2 rounded-[1.25rem] px-4 py-3.5 text-left cursor-pointer ${form.businessType === type.value ? 'border-gold bg-gold/8' : 'border-ash hover:border-gold/40'}`} style={{ transition: 'all 0.2s' }}>
                      <span className="text-brand font-semibold" style={{ fontSize: '0.85rem' }}>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Custom Questions */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="text-brand font-semibold mb-4">Tell us about your operation</h3>
                {config.customQuestions.map(q => (
                  <div key={q.id}>
                    <label className="block text-brand/70 text-sm font-semibold mb-2">{q.label}</label>
                    {q.type === 'select' ? (
                      <div className="flex flex-wrap gap-2">
                        {q.options.map(opt => (
                          <button key={opt} onClick={() => setCustomAnswer(q.id, opt)} className={`border-2 rounded-[1.25rem] px-4 py-2 text-sm font-medium cursor-pointer ${form.customAnswers[q.id] === opt ? 'border-gold bg-gold/8 text-brand' : 'border-ash text-brand/60 hover:border-gold/40'}`} style={{ transition: 'all 0.2s' }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input type="text" value={form.customAnswers[q.id] || ''} onChange={e => setCustomAnswer(q.id, e.target.value)} className="w-full border-2 border-ash rounded-[1.25rem] px-4 py-2.5 text-brand text-sm focus:border-gold focus:outline-none" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Coverage Selection */}
            {step === 2 && (
              <div>
                <h3 className="text-brand font-semibold mb-1">What coverage do you need?</h3>
                <p className="text-brand/50 text-sm mb-4">Select all that apply</p>
                <div className="grid grid-cols-2 gap-2">
                  {config.coverageOptions.map(cov => (
                    <button key={cov} onClick={() => toggleCoverage(cov)} className={`border-2 rounded-[1.25rem] px-3.5 py-3 text-left cursor-pointer flex items-center gap-2.5 ${form.coverages.includes(cov) ? 'border-gold bg-gold/8' : 'border-ash hover:border-gold/40'}`} style={{ transition: 'all 0.2s' }}>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${form.coverages.includes(cov) ? 'border-gold bg-gold' : 'border-ash'}`} style={{ transition: 'all 0.2s' }}>
                        {form.coverages.includes(cov) && <svg className="w-2.5 h-2.5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-brand text-xs font-medium">{cov}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Contact Info */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-brand font-semibold mb-4">How can we reach you?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1.5">First Name *</label>
                    <input type="text" value={form.firstName} onChange={e => update('firstName', e.target.value)} className="w-full border-2 border-ash rounded-[1.25rem] px-4 py-2.5 text-brand text-sm focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1.5">Last Name</label>
                    <input type="text" value={form.lastName} onChange={e => update('lastName', e.target.value)} className="w-full border-2 border-ash rounded-[1.25rem] px-4 py-2.5 text-brand text-sm focus:border-gold focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-brand/70 text-xs font-semibold mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full border-2 border-ash rounded-[1.25rem] px-4 py-2.5 text-brand text-sm focus:border-gold focus:outline-none" placeholder="you@company.com" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1.5">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full border-2 border-ash rounded-[1.25rem] px-4 py-2.5 text-brand text-sm focus:border-gold focus:outline-none" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-brand/70 text-xs font-semibold mb-1.5">City</label>
                    <input type="text" value={form.city} onChange={e => update('city', e.target.value)} className="w-full border-2 border-ash rounded-[1.25rem] px-4 py-2.5 text-brand text-sm focus:border-gold focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-brand/70 text-xs font-semibold mb-1.5">State</label>
                  <select value={form.state} onChange={e => update('state', e.target.value)} className="w-full border-2 border-ash rounded-[1.25rem] px-4 py-2.5 text-brand text-sm focus:border-gold focus:outline-none appearance-none bg-stone">
                    <option value="">Select state</option>
                    {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-brand/70 text-xs font-semibold mb-1.5">Anything else? (optional)</label>
                  <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={2} className="w-full border-2 border-ash rounded-[1.25rem] px-4 py-2.5 text-brand text-sm focus:border-gold focus:outline-none resize-none" placeholder="Tell us about your needs..." />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-ash">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="text-brand/50 hover:text-brand text-sm font-semibold cursor-pointer" style={{ transition: 'color 0.2s' }}>&larr; Back</button>
              ) : <div />}
              {step < 3 ? (
                <button onClick={() => canAdvance() && setStep(step + 1)} disabled={!canAdvance()} className="bg-gold text-brand px-6 py-2.5 rounded-[2rem] font-semibold text-sm uppercase tracking-[0.12em] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" style={{ transition: 'all 0.2s' }}>Continue &rarr;</button>
              ) : (
                <button onClick={handleSubmit} disabled={!canAdvance() || submitting} className="bg-gold text-brand px-6 py-2.5 rounded-[2rem] font-semibold text-sm uppercase tracking-[0.12em] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" style={{ transition: 'all 0.2s' }}>{submitting ? 'Submitting...' : 'Submit'}</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
