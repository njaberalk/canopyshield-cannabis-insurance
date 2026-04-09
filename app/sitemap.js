import { coverages } from '../data/coverages';
import { industries } from '../data/industries';
import { states } from '../data/states';
import { resources } from '../data/resources';
import { cities } from '../data/cities';
import { blogPosts } from '../data/blog';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://canopyshield.com/cannabis';

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },

    ...coverages.map((c) => ({
      url: `${baseUrl}/coverage/${c.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9,
    })),

    ...industries.map((i) => ({
      url: `${baseUrl}/industries/${i.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9,
    })),

    ...states.map((s) => ({
      url: `${baseUrl}/states/${s.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8,
    })),

    ...cities.map((c) => ({
      url: `${baseUrl}/cities/${c.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7,
    })),

    ...resources.map((r) => ({
      url: `${baseUrl}/resources/${r.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7,
    })),

    ...blogPosts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6,
    })),
  ];
}
