import { states, getStateBySlug } from '../../../data/states';
import StatePageContent from './StatePageContent';

export function generateStaticParams() {
  return states.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};
  return {
    title: state.metaTitle,
    description: state.metaDescription,
    alternates: {
      canonical: `https://canopyshield.com/cannabis/states/${state.slug}/`,
    },
    openGraph: {
      title: `${state.metaTitle} | CanopyShield`,
      description: state.metaDescription,
      url: `https://canopyshield.com/cannabis/states/${state.slug}/`,
      type: 'website',
    },
  };
}

export default async function StatePage({ params }) {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return <div>State not found</div>;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Cannabis Insurance in ${state.name}`,
      provider: { '@type': 'InsuranceAgency', name: 'CanopyShield', url: 'https://canopyshield.com' },
      description: state.metaDescription,
      url: `https://canopyshield.com/cannabis/states/${state.slug}/`,
      serviceType: 'Cannabis Business Insurance',
      areaServed: { '@type': 'State', name: state.name, containedIn: { '@type': 'Country', name: 'United States' } },
      citation: { '@type': 'CreativeWork', name: 'Insurance Information Institute', url: 'https://www.iii.org' },
      about: { '@type': 'Thing', name: state.name },
    },
    ...(state.faqs?.length ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: state.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    }] : []),
  ];

  return (
    <>
      <meta name="author" content="CanopyShield Insurance Services" />
      <meta property="article:published_time" content="2025-06-01T00:00:00Z" />
      <meta property="article:modified_time" content="2026-04-01T00:00:00Z" />
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: state.name, datePublished: '2025-06-01', dateModified: '2026-04-01', author: { '@type': 'Organization', name: 'CanopyShield Insurance Services', url: 'https://canopyshield.com' }, publisher: { '@type': 'Organization', name: 'CanopyShield Insurance Services', url: 'https://canopyshield.com' } }) }} />
      <StatePageContent state={state} />
    </>
  );
}
