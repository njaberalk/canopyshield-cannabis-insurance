import CannabisCheckerContent from './FMCSACheckerContent';

export const metadata = {
  title: 'State Cannabis Legality & Coverage Checker',
  description: 'Check cannabis legality status by state and find out what insurance coverage your cannabis business needs. See legal status, required coverages, and regulatory notes for all 50 states.',
  alternates: {
    canonical: 'https://canopyshield.com/cannabis/tools/fmcsa-checker/',
  },
  openGraph: {
    title: 'State Cannabis Legality & Coverage Checker | CanopyShield',
    description: 'Interactive tool to check cannabis legality and insurance requirements by state and business type.',
    url: 'https://canopyshield.com/cannabis/tools/fmcsa-checker/',
    type: 'website',
  },
};

export default function CannabisCheckerPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'State Cannabis Legality & Coverage Checker',
      url: 'https://canopyshield.com/cannabis/tools/fmcsa-checker/',
      applicationCategory: 'BusinessApplication',
      provider: { '@type': 'InsuranceAgency', name: 'CanopyShield', url: 'https://canopyshield.com' },
      description: 'Interactive tool to check cannabis legality status and insurance requirements by state and business type.',
    },
  ];

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <CannabisCheckerContent />
    </>
  );
}
