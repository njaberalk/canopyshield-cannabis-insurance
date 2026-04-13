'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const INQUIRY_TYPES = [
  'General Inquiry',
  'Coverage Question',
  'Claims Support',
  'Billing / Policy Changes',
  'Partnership Opportunity',
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    message: '',
  });

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);

    try {
      // Method 1: Configurable webhook/endpoint (set via window config or env)
      const endpoint = typeof window !== 'undefined' ? window.__CONTACT_ENDPOINT : '';
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            to: 'marketing@alkemeins.com',
            source: 'canopyshield-contact-form',
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {});
      }

      // Method 2: Customer.io identify + track (if snippet loaded)
      if (typeof window !== 'undefined' && window._cio) {
        window._cio.identify({ id: form.email, email: form.email, name: form.name, phone: form.phone, company: form.company });
        window._cio.track('contact_form_submitted', { ...form, source: 'canopyshield-contact' });
      }

      // Method 3: Fallback mailto (always works)
      // Not triggered automatically — serves as last resort

      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: '12rem', paddingBottom: '5rem', backgroundColor: '#12201a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        <div className="relative max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 text-center">
          <h1 className="text-stone font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1.1' }}>Get in Touch</h1>
          <p className="text-brand/70 max-w-lg mx-auto" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Have questions about cannabis insurance? Our specialists are here to help.</p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="bg-stone" style={{ padding: '5rem 0' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-stone font-bold text-xl mb-2">Message Sent</h2>
                  <p className="text-brand/60">We will get back to you within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-brand/70 text-sm font-semibold mb-2">Full Name *</label>
                      <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" style={{ transition: 'border-color 0.2s' }} />
                    </div>
                    <div>
                      <label className="block text-brand/70 text-sm font-semibold mb-2">Email Address *</label>
                      <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-brand/70 text-sm font-semibold mb-2">Phone</label>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-brand/70 text-sm font-semibold mb-2">Company</label>
                      <input type="text" value={form.company} onChange={e => update('company', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-brand/70 text-sm font-semibold mb-2">Inquiry Type</label>
                    <select value={form.inquiryType} onChange={e => update('inquiryType', e.target.value)} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none appearance-none">
                      <option value="" className="bg-brand">Select type</option>
                      {INQUIRY_TYPES.map(t => <option key={t} value={t} className="bg-brand">{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand/70 text-sm font-semibold mb-2">Message *</label>
                    <textarea required value={form.message} onChange={e => update('message', e.target.value)} rows={5} className="w-full bg-transparent border-2 border-ash rounded-xl px-4 py-3 text-stone focus:border-gold focus:outline-none resize-none" placeholder="How can we help?" />
                  </div>
                  <button type="submit" disabled={submitting} className="bg-gold text-brand px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gold-hover disabled:opacity-50 cursor-pointer w-full sm:w-auto" style={{ transition: 'all 0.2s' }}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="border-2 border-ash rounded-2xl p-8 space-y-6">
                <h3 className="text-stone font-bold text-lg">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <div className="text-stone font-semibold text-sm">Phone</div>
                      <a href="tel:+18559255363" className="text-brand/70 text-sm no-underline hover:text-gold" style={{ transition: 'color 0.2s' }}>(855) 925-5363</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    </div>
                    <div>
                      <div className="text-stone font-semibold text-sm">Email</div>
                      <a href="mailto:marketing@alkemeins.com" className="text-brand/70 text-sm no-underline hover:text-gold" style={{ transition: 'color 0.2s' }}>marketing@alkemeins.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <div className="text-stone font-semibold text-sm">Hours</div>
                      <div className="text-brand/70 text-sm">Mon - Fri: 8am - 6pm PT</div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-ash pt-5">
                  <div className="text-brand/50 text-xs mb-3">Need a quote instead?</div>
                  <Link href="/quote/" className="inline-flex items-center border-2 border-gold text-gold rounded-xl px-5 py-2 text-sm font-semibold no-underline hover:bg-gold hover:text-brand" style={{ transition: 'all 0.2s' }}>
                    Get a Quote &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
