import { getLinkForLanguage } from './index';

describe('getLink', () => {
  const links = {
    faq: {
      en: 'en-faq',
      fr: 'fr-faq',
      'pt-BR': 'pt-BR-faq',
    },
    support: {
      es: 'es-support',
    },
  };

  it('should return an existing link with the requested language', () => {
    expect(getLinkForLanguage(links, 'faq')).toBe('en-faq');
    expect(getLinkForLanguage(links, 'support', 'es')).toBe('es-support');
    expect(getLinkForLanguage(links, 'faq', 'fr')).toBe('fr-faq');
    expect(getLinkForLanguage(links, 'faq', 'en')).toBe('en-faq');
    expect(getLinkForLanguage(links, 'faq', 'pt-BR')).toBe('pt-BR-faq');
  });

  it('should fallback when missing language', () => {
    expect(getLinkForLanguage(links, 'faq', 'es')).toBe('en-faq');
    expect(getLinkForLanguage(links, 'faq', 'pt')).toBe('pt-BR-faq');
  });

  it('should throw when non-existent id', () => {
    expect(() => getLinkForLanguage(links, 'something' as any)).toThrow();
    expect(() => getLinkForLanguage(links, 'support', 'en')).toThrow();
  });
});
