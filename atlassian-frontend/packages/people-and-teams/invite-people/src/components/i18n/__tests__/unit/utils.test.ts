import { getCodesFromLocale } from '../../utils';

describe('getCodesFromLocale', () => {
  it('should return language and country codes', () => {
    const actual1 = getCodesFromLocale('uk-UK');
    expect(actual1).toEqual({
      language: 'uk',
      country: 'UK',
    });

    const actual2 = getCodesFromLocale('uk_UK');
    expect(actual2).toEqual({
      language: 'uk',
      country: 'UK',
    });
  });

  it('when missing country code, should return correct country code', () => {
    const actual1 = getCodesFromLocale('uk');
    expect(actual1).toEqual({
      language: 'uk',
      country: '',
    });
  });
});
