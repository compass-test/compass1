import { toAvailableLanguage } from './utils';

export type LinkType = Record<string, Record<string, string | undefined>>;

export const getLinkForLanguage = <T extends LinkType>(
  links: T,
  id: keyof T,
  language = 'en',
): string => {
  const linksById = links[id];
  if (!linksById) {
    throw new Error(`link id ${String(id)} does not exist`);
  }

  const linkByLanguage = linksById[toAvailableLanguage(language, linksById)]!;
  if (!linkByLanguage) {
    throw new Error(
      `link id ${String(id)} does not exist with default language`,
    );
  }

  return linkByLanguage;
};
