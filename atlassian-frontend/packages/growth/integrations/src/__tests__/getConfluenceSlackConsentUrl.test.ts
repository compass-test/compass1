import { enableFetchMocks } from 'jest-fetch-mock';

jest.mock('../loadCookies');
enableFetchMocks();

import getConfluenceSlackConsentUrl from '../getConfluenceSlackConsentUrl';
import loadCookies from '../loadCookies';
import { ConfluenceSlackServiceAnalytics } from '../types';

describe('getConfluenceSlackConsentUrl', () => {
  const mockConfluenceAnalyics: ConfluenceSlackServiceAnalytics = {
    onFetchConnectMetadataFailed: jest.fn(),
    onFetchConnectMetadataSucceeded: jest.fn(),
    onRefreshIntegrationCsrfTokenFailed: jest.fn(),
    onRefreshIntegrationCsrfTokenSucceeded: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    fetchMock.resetMocks();
  });

  it('gets consent url for prod instance', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ contextJwt: '123', url: 'conf-integ-prod' }),
    );
    const result = await getConfluenceSlackConsentUrl(
      {
        hostname: 'test.atlassian.net',
        pathname: '/wiki',
      },
      mockConfluenceAnalyics,
    );

    expect(result.ok).toBe(true);
    expect(result.ok && result.result).toBe(
      'https://confluence-chats-integr.services.atlassian.com/api/slack/teams/login?source=invite-people&jwt=123',
    );
    expect(loadCookies).toHaveBeenCalledWith('conf-integ-prod', 2000);
    expect(
      mockConfluenceAnalyics.onFetchConnectMetadataSucceeded,
    ).toHaveBeenCalledTimes(1);
    expect(
      mockConfluenceAnalyics.onRefreshIntegrationCsrfTokenSucceeded,
    ).toHaveBeenCalledTimes(1);
  });

  it('gets consent url for stg instance', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ contextJwt: '345', url: 'conf-integ-stg' }),
    );
    const result = await getConfluenceSlackConsentUrl(
      {
        hostname: 'test.jira-dev.com',
        pathname: '/wiki',
      },
      mockConfluenceAnalyics,
    );

    expect(result.ok).toBe(true);
    expect(result.ok && result.result).toBe(
      'https://confluence-chats-integr.dev.services.atlassian.com/api/slack/teams/login?source=invite-people&jwt=345',
    );
    expect(loadCookies).toHaveBeenCalledWith('conf-integ-stg', 2000);
    expect(
      mockConfluenceAnalyics.onFetchConnectMetadataSucceeded,
    ).toHaveBeenCalledTimes(1);
    expect(
      mockConfluenceAnalyics.onRefreshIntegrationCsrfTokenSucceeded,
    ).toHaveBeenCalledTimes(1);
  });

  it('gets consent url and reports csrf failure if loadCookies fails', async () => {
    (loadCookies as jest.Mock).mockRejectedValue(new Error('failed!'));

    fetchMock.mockResponseOnce(
      JSON.stringify({ contextJwt: '345', url: 'conf-integ-stg' }),
    );
    const result = await getConfluenceSlackConsentUrl(
      {
        hostname: 'test.jira-dev.com',
        pathname: '/wiki',
      },
      mockConfluenceAnalyics,
    );

    expect(result.ok).toBe(true);
    expect(result.ok && result.result).toBe(
      'https://confluence-chats-integr.dev.services.atlassian.com/api/slack/teams/login?source=invite-people&jwt=345',
    );
    expect(loadCookies).toHaveBeenCalledWith('conf-integ-stg', 2000);
    expect(
      mockConfluenceAnalyics.onFetchConnectMetadataSucceeded,
    ).toHaveBeenCalledTimes(1);
    expect(
      mockConfluenceAnalyics.onRefreshIntegrationCsrfTokenFailed,
    ).toHaveBeenCalledTimes(1);
  });

  it('returns failed result if fetch metadata fails', async () => {
    fetchMock.mockRejectOnce(new Error('faield!'));
    const result = await getConfluenceSlackConsentUrl(
      {
        hostname: 'test.jira-dev.com',
        pathname: '/wiki',
      },
      mockConfluenceAnalyics,
    );

    expect(result.ok).toBe(false);
    expect(
      mockConfluenceAnalyics.onFetchConnectMetadataFailed,
    ).toHaveBeenCalledTimes(1);
  });
});
