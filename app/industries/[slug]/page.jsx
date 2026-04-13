import { industries, getIndustryBySlug } from '../../../data/industries';
import IndustryPageContent from './IndustryPageContent';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: {
      canonical: `https://canopyshield.com/cannabis/industries/${industry.slug}/`,
    },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url: `https://canopyshield.com/cannabis/industries/${industry.slug}/`,
      type: 'website',
    },
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return <div>Industry not found</div>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${industry.title} Insurance`,
    provider: { '@type': 'InsuranceAgency', name: 'CanopyShield', url: 'https://canopyshield.com/cannabis' },
    description: industry.metaDescription,
    url: `https://canopyshield.com/cannabis/industries/${industry.slug}/`,
    serviceType: 'Cannabis Business Insurance',
    areaServed: { '@type': 'Country', name: 'United States' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {industry.faqs?.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: industry.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: industry.title, datePublished: '2025-06-01', dateModified: '2026-04-01', author: { '@type': 'Organization', name: 'CanopyShield Insurance Services', url: 'https://canopyshield.com' }, publisher: { '@type': 'Organization', name: 'CanopyShield Insurance Services', url: 'https://canopyshield.com' } }) }} />
      <IndustryPageContent industry={industry} />
    </>
  );
}
