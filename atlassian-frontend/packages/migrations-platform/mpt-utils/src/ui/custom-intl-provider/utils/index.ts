export const getCodesFromLocale = (locale: string) => {
  const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale);
  if (!match) {
    throw Error('Unable to get language and country from invalid Locale');
  }
  const [, language, country] = match;

  return {
    language: language.toLowerCase(),
    // when country code is missed, let it empty and we will use language/locale to find language file
    country: country ? country.toUpperCase() : '',
  };
};
