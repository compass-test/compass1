const { omitParent } = require('../');

describe('omitParent', () => {
  it('should return an object with the parent field removed', () => {
    const obj = {
      fields: {
        parent: 'someParentInfo',
      },
    };
    const result = omitParent(obj);
    expect(result.fields.parent).toEqual(undefined);
  });

  it('should not mutate the original object', () => {
    const obj = {
      fields: {
        parent: 'someParentInfo',
      },
    };
    omitParent(obj);
    expect(obj.fields.parent).toEqual('someParentInfo');
  });
});
