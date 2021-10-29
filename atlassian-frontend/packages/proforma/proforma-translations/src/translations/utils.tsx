import { DEFAULT_LOCALE, Locale } from './locales';
import './setupLocales';

export function truncateToLanguageCode(
  localeCodeOrLanguageTag: string,
): string {
  return localeCodeOrLanguageTag.substr(0, 2);
}

export const parseLanguageTag = (
  languageTag: string,
  defaultLocale: Locale = DEFAULT_LOCALE,
): Locale => {
  const localeCode = languageTag.replace('-', '_');
  return parseLocaleCode(localeCode, defaultLocale);
};

export const toLanguageTag = (locale: Locale): string =>
  locale.replace('_', '-');

export const parseLocaleCode = (
  localeCode: string,
  defaultLocale: Locale = DEFAULT_LOCALE,
): Locale => {
  // @ts-ignore
  const locale = Locale[localeCode];
  if (locale) {
    return locale;
  }
  if (localeCode === 'en_UK') {
    return Locale.en_GB; // Jira Server uses 'en_UK' which is not a valid locale.
  }
  // eslint-disable-next-line no-console
  console.warn(
    `Unable to parse locale code [${localeCode}], defaulting to [${defaultLocale}].`,
  );
  return defaultLocale;
};
