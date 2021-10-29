import { confluenceAdvancedSearchUrl } from '../confluence-url-utils';
import 'jest-extended';

describe('Confluence URL utils', () => {
  it('generates the right advanced search url with an empty query', () => {
    const url = confluenceAdvancedSearchUrl('', [], []);

    expect(url).toEqual('/wiki/search');
  });

  it('generates the right advanced search url with a query of only spaces', () => {
    const url = confluenceAdvancedSearchUrl('  ', [], []);

    expect(url).toEqual('/wiki/search');
  });

  it('generates the right advanced search url with a query of only spaces and siteUrl', () => {
    const url = confluenceAdvancedSearchUrl('  ', [], [], 'TEST_SITE_URL');

    expect(url).toEqual('TEST_SITE_URL/wiki/search');
  });

  it('generates the right advanced search url with a non-empty query and siteUrl', () => {
    const url = confluenceAdvancedSearchUrl('query', [], [], 'TEST_SITE_URL');

    expect(url).toStartWith('TEST_SITE_URL/wiki/search?');
    expect(url).toContain('?text=query');
  });

  it('generates the right advanced search url with a non-empty query', () => {
    const url = confluenceAdvancedSearchUrl('query', [], []);

    expect(url).toStartWith('/wiki/search?');
    expect(url).toContain('?text=query');
  });

  it('generates the right advanced search url with proper encoding for the query', () => {
    const url = confluenceAdvancedSearchUrl('???', [], []);

    expect(url).toStartWith('/wiki/search?');
    expect(url).toContain(`?text=${encodeURIComponent('???')}`);
  });

  it('generates the right advanced search url without additional whitespaces in the query', () => {
    const url = confluenceAdvancedSearchUrl(' query ', [], []);

    expect(url).toStartWith('/wiki/search?');
    expect(url).toContain(`?text=query`);
  });

  describe('for Spaces and Contributors filters', () => {
    it('with blank contributors should generate the correct url', () => {
      const url = confluenceAdvancedSearchUrl(' query ', ['ss', 'bb'], []);
      expect(url).toEqual('/wiki/search?text=query&spaces=ss%2Cbb');
    });

    it('with blank Spaces should generate the correct url', () => {
      const url = confluenceAdvancedSearchUrl(' query ', [], ['stark']);
      expect(url).toEqual('/wiki/search?text=query&contributors=stark');
    });

    it('should generate the correct url', () => {
      const url = confluenceAdvancedSearchUrl(
        ' query ',
        ['ss', 'bb'],
        ['stark', 'walker'],
      );
      expect(url).toEqual(
        '/wiki/search?text=query&spaces=ss%2Cbb&contributors=stark%2Cwalker',
      );
    });
  });
});
