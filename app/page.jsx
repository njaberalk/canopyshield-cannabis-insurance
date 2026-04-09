import HomeContent from './HomeContent';

export const metadata = {
  title: 'Cannabis Insurance Solutions',
  description: 'CanopyShield provides specialized cannabis insurance for dispensaries, cultivators, processors, and every operation in the legal cannabis supply chain. Seed to sale coverage.',
  openGraph: {
    title: 'Cannabis Insurance | CanopyShield',
    description: 'Specialized cannabis insurance for dispensaries, cultivators, processors, and the legal cannabis supply chain.',
    url: 'https://canopyshield.com/cannabis/',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'InsuranceAgency',
            name: 'CanopyShield',
            url: 'https://canopyshield.com',
            telephone: '+18005551234',
            email: 'info@canopyshield.com',
            description: 'CanopyShield provides specialized cannabis insurance for dispensaries, cultivators, processors, distributors, and every operation in the legal cannabis supply chain.',
            areaServed: { '@type': 'Country', name: 'United States' },
            serviceType: [
              'Cannabis Insurance',
              'Dispensary Insurance',
              'Cannabis Cultivation Insurance',
              'Cannabis Product Liability',
              'Cannabis Property Insurance',
              'Cannabis Crop Insurance',
              'CBD & Hemp Insurance',
            ],
          }),
        }}
      />
      <HomeContent />
    </>
  );
}
