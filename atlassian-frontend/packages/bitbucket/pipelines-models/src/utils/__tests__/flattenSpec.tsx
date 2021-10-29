import { flatten, unflatten } from '../flatten';

describe('flatten util', () => {
  const testObj = {
    value: {
      foo: {
        bar: 'yes',
        baz: {
          bax: 'val',
        },
      },
    },
    array: [true, false, [null, undefined, 1]],
    empty_array: [],
    empty_obj: {},
    'have.dots': 'should work',
    'override.dots': 'huh',
    override: { dots: 'override' },
  };

  it('should flatten object', () => {
    expect(flatten(testObj)).toEqual({
      'array.0': true,
      'array.1': false,
      'array.2.0': null,
      'array.2.1': undefined,
      'array.2.2': 1,
      empty_array: [],
      empty_obj: {},
      'value.foo.bar': 'yes',
      'value.foo.baz.bax': 'val',
      'have.dots': 'should work',
      'override.dots': 'override',
    });
  });

  it('should unflatten object', () => {
    expect({
      'have.dots': 'should work',
      'override.dots': 'huh',
      ...unflatten({
        'array.0': true,
        'array.1': false,
        'array.2.0': null,
        'array.2.1': undefined,
        'array.2.2': 1,
        empty_array: [],
        empty_obj: {},
        'value.foo.bar': 'yes',
        'value.foo.baz.bax': 'val',
        'override.dots': 'override',
      }),
    }).toEqual(testObj);
  });
});
