import getJiraSlackConsentUrl from '../getJiraSlackConsentUrl';

describe('getJiraSlackConsentUrl', () => {
  it('gets consent url for prod instance', () => {
    const url = getJiraSlackConsentUrl({
      hostname: 'test.atlassian.net',
      pathname: '/browse/ISSUE-1',
    });
    expect(url).toBe(
      'https://atlassian-slack-integration.services.atlassian.com/api/slack/login?source=invite-people',
    );
  });

  it('gets consent url for stg instance', () => {
    const url = getJiraSlackConsentUrl({
      hostname: 'test.jira-dev.com',
      pathname: '/browse/ISSUE-1',
    });
    expect(url).toBe(
      'https://atlassian-slack-integration.stg.services.atlassian.com/api/slack/login?source=invite-people',
    );
  });
});
