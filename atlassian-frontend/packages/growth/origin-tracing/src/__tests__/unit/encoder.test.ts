import { toJSONObject } from '../../encoder';

describe('OriginTracer encoder', () => {
  describe('.toJSONObject()', () => {
    test('returns an object that can be serialized in a compact way', () => {
      const obj = toJSONObject({
        id: 'foobar',
        product: 'jira',
      });
      expect(obj).toEqual({
        i: 'foobar',
        p: 'j',
      });
    });

    describe('compacting product', () => {
      const id = 'mockId';

      test('jira', () => {
        expect(toJSONObject({ id, product: 'jira' })).toHaveProperty('p', 'j');
      });

      test('confluence', () => {
        expect(toJSONObject({ id, product: 'confluence' })).toHaveProperty(
          'p',
          'c',
        );
      });

      test('stride', () => {
        expect(toJSONObject({ id, product: 'stride' })).toHaveProperty(
          'p',
          's',
        );
      });

      test('bitbucket', () => {
        expect(toJSONObject({ id, product: 'bitbucket' })).toHaveProperty(
          'p',
          'b',
        );
      });

      test('trello', () => {
        expect(toJSONObject({ id, product: 'trello' })).toHaveProperty(
          'p',
          't',
        );
      });

      test('anything else', () => {
        expect(toJSONObject({ id, product: 'customProduct' })).toHaveProperty(
          'p',
          'customProduct',
        );
      });
    });
  });
});
