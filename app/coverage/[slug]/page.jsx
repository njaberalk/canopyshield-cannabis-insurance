import { coverages, getCoverageBySlug } from '../../../data/coverages';
import CoveragePageContent from './CoveragePageContent';

export function generateStaticParams() {
  return coverages.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const coverage = getCoverageBySlug(slug);
  if (!coverage) return {};
  return {
    title: coverage.metaTitle,
    description: coverage.metaDescription,
    alternates: {
      canonical: `https://canopyshield.com/cannabis/coverage/${coverage.slug}/`,
    },
    openGraph: {
      title: coverage.metaTitle,
      description: coverage.metaDescription,
      url: `https://canopyshield.com/cannabis/coverage/${coverage.slug}/`,
      type: 'website',
    },
  };
}

export default async function CoveragePage({ params }) {
  const { slug } = await params;
  const coverage = getCoverageBySlug(slug);
  if (!coverage) return <div>Coverage not found</div>;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: coverage.title,
      provider: { '@type': 'InsuranceAgency', name: 'CanopyShield', url: 'https://canopyshield.com/cannabis' },
      description: coverage.metaDescription,
      url: `https://canopyshield.com/cannabis/coverage/${coverage.slug}/`,
      serviceType: 'Insurance',
      areaServed: { '@type': 'Country', name: 'United States' },
    },
    ...(coverage.faqs?.length ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: coverage.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    }] : []),
  ];

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: coverage.title || coverage.metaTitle, datePublished: '2025-06-01', dateModified: '2026-04-01', author: { '@type': 'Organization', name: 'CanopyShield Insurance Services', url: 'https://canopyshield.com' }, publisher: { '@type': 'Organization', name: 'CanopyShield Insurance Services', url: 'https://canopyshield.com' } }) }} />
      <CoveragePageContent coverage={coverage} />
    </>
  );
}
