import { addQuery, addQueryParams } from '../url-utils';
import 'jest-extended';

describe('URL utils', () => {
  describe('addQuery', () => {
    it('query is added to url with no query params correctly', () => {
      const result = addQuery('/some/url', 'query', 'value');

      expect(result).toIncludeRepeated('\\?', 1);
      expect(result).toEndWith('?query=value');
    });

    it('query is added to url with query params correctly', () => {
      const result = addQuery('/some/url?existing=param', 'query', 'value');

      expect(result).toIncludeRepeated('\\?', 1);
      expect(result).toInclude('existing=param');
      expect(result).toEndWith('&query=value');
    });

    it('query value is encoded correctly', () => {
      const result = addQuery('/some/url', 'query', '???');

      expect(result).toIncludeRepeated('\\?', 1);
      expect(result).toEndWith(`?query=${encodeURIComponent('???')}`);
    });

    it('query key is encoded correctly', () => {
      const result = addQuery('/some/url', '???', 'value');

      expect(result).toIncludeRepeated('\\?', 1);
      expect(result).toEndWith(`?${encodeURIComponent('???')}=value`);
    });

    it('query is added correctly to urls with a trailing "?"', () => {
      const result = addQuery('/some/url?', 'key', 'value');

      expect(result).toIncludeRepeated('\\?', 1);
      expect(result).toEndWith(`?key=value`);
    });

    it('query is added correctly to urls with a trailing "&"', () => {
      const result = addQuery('/some/url?exisiting=param&', 'key', 'value');

      expect(result).toIncludeRepeated('\\?', 1);
      expect(result).toEndWith(`&key=value`);
      expect(result).not.toInclude(`&&`);
    });

    it('query is not added when an empty key is provided', () => {
      const result = addQuery('/some/url', '', 'value');

      expect(result).not.toInclude('?');
      expect(result).not.toInclude('&');
      expect(result).not.toInclude(`=value`);
    });

    it('query is added correctly when an empty value is provided', () => {
      const result = addQuery('/some/url', 'key', '');

      expect(result).toIncludeRepeated('\\?', 1);
      expect(result).toInclude(`key=`);
    });
  });

  describe('addQueryParms', () => {
    it('can add multiple queries', () => {
      const result = addQueryParams('/some/url', {
        query: 'value',
        alsoQuery: 'alsoValue',
      });

      expect(result).toIncludeRepeated('\\?', 1);
      expect(result).toEndWith('?query=value&alsoQuery=alsoValue');
    });

    it('works with empty values', () => {
      const result = addQueryParams('/some/url', {
        query: '',
        alsoQuery: 'alsoValue',
      });

      expect(result).toIncludeRepeated('\\?', 1);
      expect(result).toEndWith('?query=&alsoQuery=alsoValue');
    });
  });
});
