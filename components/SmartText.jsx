'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINK_MAP = [
  // Coverages
  ['general liability', '/coverage/general-liability/'],
  ['product liability', '/coverage/product-liability/'],
  ['property insurance', '/coverage/property-insurance/'],
  ['property coverage', '/coverage/property-insurance/'],
  ['premises insurance', '/coverage/property-insurance/'],
  ['crop insurance', '/coverage/crop-harvest/'],
  ['crop coverage', '/coverage/crop-harvest/'],
  ['harvest insurance', '/coverage/crop-harvest/'],
  ['commercial auto', '/coverage/commercial-auto/'],
  ['workers\' compensation', '/coverage/workers-compensation/'],
  ['workers compensation', '/coverage/workers-compensation/'],
  ['workers\' comp', '/coverage/workers-compensation/'],
  ['equipment breakdown', '/coverage/equipment-breakdown/'],
  ['cyber liability', '/coverage/cyber-liability/'],
  ['directors and officers', '/coverage/directors-officers/'],
  ['D&O', '/coverage/directors-officers/'],
  ['crime coverage', '/coverage/crime-theft/'],
  ['theft coverage', '/coverage/crime-theft/'],

  // Industries
  ['dispensaries', '/industries/dispensaries/'],
  ['dispensary', '/industries/dispensaries/'],
  ['indoor cultivation', '/industries/indoor-cultivation/'],
  ['indoor grow', '/industries/indoor-cultivation/'],
  ['outdoor cultivation', '/industries/outdoor-greenhouse/'],
  ['greenhouse', '/industries/outdoor-greenhouse/'],
  ['processors', '/industries/processors/'],
  ['manufacturers', '/industries/processors/'],
  ['edibles', '/industries/processors/'],
  ['concentrates', '/industries/processors/'],
  ['distributors', '/industries/distributors/'],
  ['testing labs', '/industries/testing-labs/'],
  ['testing laboratory', '/industries/testing-labs/'],
  ['vertically integrated', '/industries/vertically-integrated/'],
  ['hemp', '/industries/hemp-cbd/'],
  ['CBD', '/industries/hemp-cbd/'],
  ['cannabis delivery', '/industries/delivery-services/'],
  ['delivery services', '/industries/delivery-services/'],
  ['ancillary', '/industries/ancillary-businesses/'],

  // States (only legal cannabis states)
  ['California', '/states/california/'], ['Colorado', '/states/colorado/'], ['Washington', '/states/washington/'],
  ['Oregon', '/states/oregon/'], ['Nevada', '/states/nevada/'], ['Illinois', '/states/illinois/'],
  ['Michigan', '/states/michigan/'], ['Massachusetts', '/states/massachusetts/'], ['Arizona', '/states/arizona/'],
  ['New Jersey', '/states/new-jersey/'], ['New York', '/states/new-york/'], ['Connecticut', '/states/connecticut/'],
  ['Vermont', '/states/vermont/'], ['Maine', '/states/maine/'], ['Montana', '/states/montana/'],
  ['Alaska', '/states/alaska/'], ['Rhode Island', '/states/rhode-island/'], ['New Mexico', '/states/new-mexico/'],
  ['Virginia', '/states/virginia/'], ['Maryland', '/states/maryland/'], ['Missouri', '/states/missouri/'],
  ['Minnesota', '/states/minnesota/'], ['Delaware', '/states/delaware/'], ['Ohio', '/states/ohio/'],
  ['Florida', '/states/florida/'], ['Pennsylvania', '/states/pennsylvania/'], ['Oklahoma', '/states/oklahoma/'],
  ['Hawaii', '/states/hawaii/'], ['Louisiana', '/states/louisiana/'],

  // Resources
  ['seed-to-sale', '/resources/cannabis-insurance-glossary/'],
  ['METRC', '/resources/cannabis-insurance-glossary/'],
  ['280E', '/resources/cannabis-insurance-glossary/'],

  // Tools
  ['state legality', '/tools/fmcsa-checker/'],
  ['state requirements', '/tools/state-requirements/'],
];

export default function SmartText({ text, className, style }) {
  const pathname = usePathname();
  if (!text) return null;
  const currentPath = pathname?.replace(/\/cannabis/, '') || '';
  const parts = autoLink(text, currentPath);

  return (
    <span className={className} style={style}>
      {parts.map((part, i) =>
        typeof part === 'string' ? part : (
          <Link key={i} href={part.href} className="text-blue-dark font-semibold hover:text-brand underline decoration-blue-dark/30 underline-offset-2 hover:decoration-brand/50" style={{ transition: 'color 0.2s' }}>{part.text}</Link>
        )
      )}
    </span>
  );
}

function autoLink(text, currentPath = '') {
  const parts = [];
  let remaining = text;
  const linked = new Set();

  while (remaining.length > 0) {
    let earliestMatch = null;
    let earliestIndex = remaining.length;
    let matchedTerm = null;

    for (const [term, href] of LINK_MAP) {
      if (linked.has(term)) continue;
      if (currentPath && href.replace(/\/$/, '') === currentPath.replace(/\/$/, '')) continue;
      const lowerRemaining = remaining.toLowerCase();
      const index = lowerRemaining.indexOf(term.toLowerCase());
      if (index !== -1 && index < earliestIndex) {
        earliestMatch = { href, length: term.length };
        earliestIndex = index;
        matchedTerm = term;
      }
    }

    if (earliestMatch) {
      if (earliestIndex > 0) parts.push(remaining.substring(0, earliestIndex));
      parts.push({ text: remaining.substring(earliestIndex, earliestIndex + earliestMatch.length), href: earliestMatch.href });
      linked.add(matchedTerm);
      remaining = remaining.substring(earliestIndex + earliestMatch.length);
    } else {
      parts.push(remaining);
      remaining = '';
    }
  }
  return parts;
}
