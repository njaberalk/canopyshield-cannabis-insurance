import { statesPart1 } from './states-part1.js';
import { statesPart2 } from './states-part2.js';

export const states = [...statesPart1, ...statesPart2];
export function getStateBySlug(slug) { return states.find(s => s.slug === slug); }
