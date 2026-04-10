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
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <StatePageContent state={state} />
    </>
  );
}
