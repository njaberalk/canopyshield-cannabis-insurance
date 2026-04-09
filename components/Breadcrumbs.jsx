import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `https://canopyshield.com/cannabis${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="bg-stone border-b border-ash" style={{ paddingTop: '5.5rem' }}>
        <div className="max-w-[68rem] mx-auto px-[60px] max-lg:px-6 max-md:px-4 py-4">
          <ol className="flex items-center gap-2 list-none p-0 m-0" style={{ fontSize: '0.8rem' }}>
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-brand/30">/</span>}
                {item.href ? (
                  <Link href={item.href} className="text-blue-dark hover:text-brand no-underline" style={{ transition: 'color 0.2s' }}>{item.label}</Link>
                ) : (
                  <span className="text-brand/50">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
