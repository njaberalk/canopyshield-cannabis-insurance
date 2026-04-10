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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Why is cannabis insurance so expensive?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cannabis remains federally illegal (Schedule I), which means standard insurance carriers won\'t write policies for plant-touching businesses. Coverage must be placed through specialty surplus lines markets with limited carrier capacity, which drives up premiums. Additionally, cannabis operations face elevated theft, product liability, and regulatory risks that increase the cost of coverage.',
                },
              },
              {
                '@type': 'Question',
                name: 'What insurance does a dispensary need?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'At minimum, dispensaries need general liability, product liability, property insurance, crime/theft coverage, and workers\' compensation. Most also need cyber liability (for POS and customer data), commercial auto (for delivery operations), and directors & officers coverage. State licensing requirements often mandate specific insurance minimums before you can operate.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I get crop insurance for cannabis?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, but not through the federal crop insurance program (USDA won\'t cover a Schedule I substance). Cannabis crop insurance is available through specialty markets and covers losses from power failure, HVAC breakdown, mold, pest infestation, contamination, and in some cases regulatory seizure. Coverage is typically based on the value of your canopy at time of loss.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does hemp/CBD require the same insurance as cannabis?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Hemp was federally legalized under the 2018 Farm Bill, which means standard insurance carriers are more willing to write hemp/CBD risks. Premiums are typically lower, and you may have access to federal crop insurance programs. However, you still need product liability coverage, especially if you manufacture ingestible CBD products.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens if my state changes its cannabis laws?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Insurance policies are written on an annual basis, so regulatory changes are addressed at renewal. If your state expands legalization (e.g., medical to recreational), your coverage needs may change. If a state restricts legalization, existing policies typically honor the policy period but may not renew. We monitor regulatory changes in every state we operate in.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you insure cannabis delivery operations?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Cannabis delivery requires commercial auto insurance, hired and non-owned auto coverage, product liability for goods in transit, and crime coverage for cash and inventory being transported. Many states have specific insurance requirements for delivery licensees including minimum liability limits and proof of coverage before you can operate.',
                },
              },
            ],
          }),
        }}
      />
      <HomeContent />
    </>
  );
}
