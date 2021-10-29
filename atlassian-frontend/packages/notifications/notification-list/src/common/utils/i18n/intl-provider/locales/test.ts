import { getCodesFromLocale } from './index';

describe('getCodesFromLocale', () => {
  const cases: [string, ReturnType<typeof getCodesFromLocale>][] = [
    // input, expected
    ['en', { language: 'en', country: '' }],
    ['en_US', { language: 'en', country: 'US' }],
    ['en_AU', { language: 'en', country: 'AU' }],
    ['en-US', { language: 'en', country: 'US' }],
    ['en-GB', { language: 'en', country: 'GB' }],
    ['pt-BR', { language: 'pt', country: 'BR' }],
    ['pt', { language: 'pt', country: '' }],
  ];
  test.each(cases)('given %s should output %j', (locale, expected) => {
    expect(getCodesFromLocale(locale)).toEqual(expected);
  });
});
