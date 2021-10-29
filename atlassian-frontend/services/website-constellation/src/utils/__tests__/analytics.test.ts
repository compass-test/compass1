import { normalizeSourceName } from '../analytics';

describe('analytics utils', () => {
  describe('name normalizing', () => {
    it('should camel case a kebab case word', () => {
      const actual = normalizeSourceName('hello-world');

      expect(actual).toEqual('helloWorld');
    });

    it('should camel case a world separated by a space', () => {
      const actual = normalizeSourceName('hello world');

      expect(actual).toEqual('helloWorld');
    });

    it('should join multiple words together', () => {
      const actual = normalizeSourceName('hello world', 'foo-bar');

      expect(actual).toEqual('helloWorldFooBar');
    });
  });
});
