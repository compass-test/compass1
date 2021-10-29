import { validateUrl } from './index';

describe('validateUrl', () => {
  it('Should return true for valid URLs', () => {
    expect(validateUrl('http://a.com')).toEqual(true);
    expect(validateUrl('https://a.com')).toEqual(true);
    expect(validateUrl('http://www.a.com')).toEqual(true);
    expect(validateUrl('https://www.a.com')).toEqual(true);
    expect(validateUrl('chrome://settings')).toEqual(true);
    expect(validateUrl('ftp://10.10.10.10')).toEqual(true);
    expect(validateUrl('slack://abc')).toEqual(true);
  });

  it('Should return false for invalid URLs', () => {
    expect(validateUrl('<>')).toEqual(false);
    expect(validateUrl('!!!')).toEqual(false);
    expect(validateUrl('abc')).toEqual(false);
    expect(validateUrl('/abc')).toEqual(false);
    expect(validateUrl(' ')).toEqual(false);
    expect(validateUrl('javascript://test.com')).toEqual(false);
    expect(
      validateUrl('git@bitbucket.org:atlassian/atlassian-frontend.git'),
    ).toEqual(false);
  });
});
