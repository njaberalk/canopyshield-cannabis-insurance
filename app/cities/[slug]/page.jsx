import { cities, getCityBySlug } from '../../../data/cities';
import CityPageContent from './CityPageContent';

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `https://canopyshield.com/cannabis/cities/${city.slug}/`,
    },
    openGraph: {
      title: `${city.metaTitle} | CanopyShield`,
      description: city.metaDescription,
      url: `https://canopyshield.com/cannabis/cities/${city.slug}/`,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return <div>City not found</div>;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Cannabis Insurance in ${city.city}, ${city.abbreviation}`,
      provider: { '@type': 'InsuranceAgency', name: 'CanopyShield', url: 'https://canopyshield.com' },
      description: city.metaDescription,
      url: `https://canopyshield.com/cannabis/cities/${city.slug}/`,
      serviceType: 'Cannabis Business Insurance',
      areaServed: { '@type': 'City', name: city.city, containedIn: { '@type': 'State', name: city.state } },
    },
    ...(city.faqs?.length ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: city.faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
    }] : []),
  ];

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <CityPageContent city={city} />
    </>
  );
}
