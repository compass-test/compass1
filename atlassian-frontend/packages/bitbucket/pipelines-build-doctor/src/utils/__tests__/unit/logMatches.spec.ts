import logMatches from '../../logMatches';

describe('logMatches', () => {
  it('should match log lines', () => {
    expect(logMatches('foo bar', 'foo')).toBeTruthy();
  });
  it('should not match log lines', () => {
    expect(logMatches('foo bar', 'baz')).toBeFalsy();
  });
});
