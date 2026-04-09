import Link from 'next/link';

const coverageLinks = [
  { label: 'General Liability', href: '/coverage/general-liability/' },
  { label: 'Product Liability', href: '/coverage/product-liability/' },
  { label: 'Property / Premises', href: '/coverage/property-insurance/' },
  { label: 'Crop & Harvest', href: '/coverage/crop-harvest/' },
  { label: 'Crime / Theft', href: '/coverage/crime-theft/' },
  { label: 'Cyber Liability', href: '/coverage/cyber-liability/' },
];

const industryLinks = [
  { label: 'Dispensaries', href: '/industries/dispensaries/' },
  { label: 'Indoor Cultivation', href: '/industries/indoor-cultivation/' },
  { label: 'Processors', href: '/industries/processors/' },
  { label: 'Distributors', href: '/industries/distributors/' },
  { label: 'Hemp / CBD', href: '/industries/hemp-cbd/' },
  { label: 'Delivery Services', href: '/industries/delivery-services/' },
];

const resourceLinks = [
  { label: 'Cannabis Insurance Cost', href: '/resources/cannabis-insurance-cost/' },
  { label: 'State Requirements', href: '/resources/cannabis-insurance-requirements/' },
  { label: 'Starting a Dispensary', href: '/resources/starting-dispensary-insurance/' },
  { label: 'Cannabis Glossary', href: '/resources/cannabis-insurance-glossary/' },
  { label: 'Get a Quote', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-stone">
      <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4" style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5 no-underline">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <span className="text-brand font-bold text-lg tracking-tight">CanopyShield</span>
            </Link>
            <p className="text-brand/60 mb-6" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
              CanopyShield provides specialized cannabis insurance for dispensaries, cultivators, processors, and every operation in the legal cannabis supply chain.
            </p>
            <div className="space-y-2">
              <a href="tel:+18005551234" className="block text-brand hover:text-blue-dark no-underline" style={{ fontSize: '0.95rem', lineHeight: '1.5', transition: 'all 0.2s' }}>(800) 555-1234</a>
              <a href="mailto:info@canopyshield.com" className="block text-brand hover:text-blue-dark no-underline" style={{ fontSize: '0.95rem', lineHeight: '1.5', transition: 'all 0.2s' }}>info@canopyshield.com</a>
            </div>
          </div>
          {[
            { title: 'Coverage', links: coverageLinks },
            { title: 'Industries', links: industryLinks },
            { title: 'Resources', links: resourceLinks },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-brand font-bold mb-5 text-right max-lg:text-left" style={{ fontSize: '1rem' }}>{col.title}</h4>
              <ul className="space-y-3 list-none p-0 m-0">
                {col.links.map((link) => (
                  <li key={link.label} className="text-right max-lg:text-left">
                    <Link href={link.href} className="text-brand hover:text-blue-dark no-underline" style={{ fontSize: '0.9rem', lineHeight: '1.5', transition: 'all 0.2s' }}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-ash">
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-brand/50 text-center" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>&copy; {new Date().getFullYear()} CanopyShield. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy/" className="text-brand/50 hover:text-blue-dark no-underline" style={{ fontSize: '0.85rem', transition: 'all 0.2s' }}>Privacy Policy</Link>
              <Link href="/terms/" className="text-brand/50 hover:text-blue-dark no-underline" style={{ fontSize: '0.85rem', transition: 'all 0.2s' }}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
