import { DEFAULT_LANGUAGE, toAvailableLanguage } from './utils';

describe('toAvailableLanguage', () => {
  it('should return en for en-US', () => {
    expect(toAvailableLanguage('en-US', { en: 'test' })).toBe('en');
    expect(toAvailableLanguage('en_US', { en: 'test' })).toBe('en');
  });

  it('should return en-US if exists', () => {
    expect(toAvailableLanguage('en-US', { en: 'test', 'en-US': 'test' })).toBe(
      'en-US',
    );
    expect(toAvailableLanguage('en', { en: 'test', 'en-US': 'test' })).toBe(
      'en',
    );
  });

  it('should return default if requested does not exists', () => {
    expect(toAvailableLanguage('es', { en: 'test' })).toBe(DEFAULT_LANGUAGE);
  });
});
