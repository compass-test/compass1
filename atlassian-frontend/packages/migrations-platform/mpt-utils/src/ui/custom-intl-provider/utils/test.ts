import { getCodesFromLocale } from './index';

describe('getCodesFromLocale', () => {
  const validLocales = new Map<string, ReturnType<typeof getCodesFromLocale>>([
    // input, expected
    ['en', { language: 'en', country: '' }],
    ['en_Us', { language: 'en', country: 'US' }],
    ['en_AU', { language: 'en', country: 'AU' }],
    ['en-US', { language: 'en', country: 'US' }],
    ['en-GB', { language: 'en', country: 'GB' }],
    ['pt-BR', { language: 'pt', country: 'BR' }],
    ['pt', { language: 'pt', country: '' }],
  ]);

  it('should return language and country correctly for valid locales', () => {
    validLocales.forEach((expected, locale) => {
      expect(getCodesFromLocale(locale)).toEqual(expected);
    });
  });
});
