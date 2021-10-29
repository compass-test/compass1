import links from './links';
import { CommerceLanguages, CommerceLinks } from './types';
import { getLinkForLanguage } from './utils';

/**
 * Provides a link to a some specific "commerce" resource
 * @param id a resource id
 * @param region a language-based region, `en` or `ja`
 */
export const getLinkTo = (
  id: CommerceLinks,
  region: CommerceLanguages,
): string => getLinkForLanguage(links, id, region);
