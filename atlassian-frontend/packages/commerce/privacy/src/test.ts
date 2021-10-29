import { sanitizeUrlString } from './url';

describe(sanitizeUrlString.name, () => {
  it('retains non-UGC Atlassian domains', () => {
    expect(sanitizeUrlString('http://atlassian.com')).toBe(
      'http://atlassian.com',
    );
    expect(sanitizeUrlString('https://atlassian.com')).toBe(
      'https://atlassian.com',
    );
    expect(sanitizeUrlString('atlassian.com')).toBe('atlassian.com');
  });
  it('retains non-UGC paths', () => {
    expect(sanitizeUrlString('http://bitbucket.org/non/ugc/path')).toBe(
      'http://bitbucket.org/non/ugc/path',
    );
  });
  it('sanitizes query params', () => {
    expect(
      sanitizeUrlString(
        'http://admin.atlassian.com/non/ugc/path?probablyUGC=123',
      ),
    ).toBe('http://admin.atlassian.com/non/ugc/path');
  });
});
