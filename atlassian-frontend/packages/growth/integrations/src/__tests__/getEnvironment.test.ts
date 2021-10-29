import getEnvironment from '../getEnvironment';

describe('getEnvironment', () => {
  it('gets staging env for staging host', () => {
    const env = getEnvironment('test.jira-dev.com');
    expect(env).toBe('staging');
  });

  it('gets prod env for prod host', () => {
    const env = getEnvironment('test.atlassian.net');
    expect(env).toBe('prod');
  });
});
