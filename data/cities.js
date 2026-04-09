import { citiesPart1 } from './cities-part1.js';
import { citiesPart2 } from './cities-part2.js';

export const cities = [...citiesPart1, ...citiesPart2];
export function getCityBySlug(slug) { return cities.find(c => c.slug === slug); }
