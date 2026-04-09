import { blogPosts, getBlogPostBySlug } from '../../../data/blog';
import BlogPageContent from './BlogPageContent';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://canopyshield.com/cannabis/blog/${post.slug}/`,
    },
    openGraph: {
      title: `${post.metaTitle} | CanopyShield`,
      description: post.metaDescription,
      url: `https://canopyshield.com/cannabis/blog/${post.slug}/`,
      type: 'article',
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return <div>Article not found</div>;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      datePublished: post.publishDate,
      author: { '@type': 'Organization', name: 'CanopyShield', url: 'https://canopyshield.com' },
      publisher: { '@type': 'Organization', name: 'CanopyShield', url: 'https://canopyshield.com' },
      description: post.metaDescription,
      url: `https://canopyshield.com/cannabis/blog/${post.slug}/`,
      mainEntityOfPage: `https://canopyshield.com/cannabis/blog/${post.slug}/`,
    },
    ...(post.faqs?.length ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
    }] : []),
  ];

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <BlogPageContent post={post} />
    </>
  );
}
