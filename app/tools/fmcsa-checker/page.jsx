import FMCSACheckerContent from './FMCSACheckerContent';

export const metadata = {
  title: 'FMCSA Coverage Requirements Checker',
  description: 'Find out exactly what insurance coverage your trucking operation needs. Select your cargo type and authority to see FMCSA minimum requirements, required filings, and recommended coverages.',
  alternates: {
    canonical: 'https://canopyshield.com/cannabis/tools/fmcsa-checker/',
  },
  openGraph: {
    title: 'FMCSA Coverage Requirements Checker | CanopyShield',
    description: 'Interactive tool to determine your trucking insurance requirements based on cargo type and authority.',
    url: 'https://canopyshield.com/cannabis/tools/fmcsa-checker/',
    type: 'website',
  },
};

export default function FMCSACheckerPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'FMCSA Coverage Requirements Checker',
      url: 'https://canopyshield.com/cannabis/tools/fmcsa-checker/',
      applicationCategory: 'BusinessApplication',
      provider: { '@type': 'InsuranceAgency', name: 'CanopyShield', url: 'https://canopyshield.com' },
      description: 'Interactive tool to determine your FMCSA trucking insurance requirements by cargo type and authority.',
    },
  ];

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <FMCSACheckerContent />
    </>
  );
}
