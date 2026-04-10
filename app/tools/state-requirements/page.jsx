import StateRequirementsContent from './StateRequirementsContent';

export const metadata = {
  title: 'State Cannabis Insurance Requirements Lookup',
  description: 'Look up cannabis insurance requirements by state. See minimum liability limits, workers comp rules, regulatory agencies, and state-specific cannabis regulations for all 50 states.',
  alternates: {
    canonical: 'https://canopyshield.com/cannabis/tools/state-requirements/',
  },
  openGraph: {
    title: 'State Cannabis Insurance Requirements Lookup | CanopyShield',
    description: 'Interactive tool to look up cannabis insurance requirements for any US state.',
    url: 'https://canopyshield.com/cannabis/tools/state-requirements/',
    type: 'website',
  },
};

export default function StateRequirementsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'State Cannabis Insurance Requirements Lookup',
    url: 'https://canopyshield.com/cannabis/tools/state-requirements/',
    applicationCategory: 'BusinessApplication',
    provider: { '@type': 'InsuranceAgency', name: 'CanopyShield', url: 'https://canopyshield.com' },
    description: 'Look up cannabis insurance requirements for any US state including minimums, workers comp, and regulatory agencies.',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StateRequirementsContent />
    </>
  );
}
