import { CURRENT_FFS_API_VERSION } from '../../core/constants';
import { EnvironmentType, Identifiers } from '../../index';
import {
  fullFlagResponse,
  fullMetadata,
  fullUser,
  minimalUser,
} from '../../testUtil/mockData';
import { ResponseError } from '../errors';
import Fetcher from '../index';
import { FeatureFlagRequest, FeatureFlagResponse } from '../types';
import 'jest-fetch-mock'; // import the types for fetchMock

const EXPECTED_PRD_URL = `https://api.atlassian.com/flags/api/${CURRENT_FFS_API_VERSION}/frontend/featureFlagValues`;
const EXPECTED_STG_URL = `https://api.stg.atlassian.com/flags/api/${CURRENT_FFS_API_VERSION}/frontend/featureFlagValues`;
const EXPECTED_DEV_URL = `https://api.dev.atlassian.com/flags/api/${CURRENT_FFS_API_VERSION}/frontend/featureFlagValues`;

const createExpectedRequest = (body: any): any => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'someApiKey',
      'X-Client-Name': fullMetadata.client.name,
      'X-Client-Version': fullMetadata.client.version,
    },
    body: JSON.stringify(body),
  };
};

describe('Fetcher', () => {
  let fetcher: Fetcher;

  beforeEach(() => {
    fetcher = new Fetcher('someApiKey');
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('calls api with minimal request', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fullFlagResponse));
    await fetcher.fetchFeatureFlags(minimalUser, fullMetadata);

    const expectedBody: FeatureFlagRequest = {
      apiKey: 'someApiKey',
      identifier: {
        type: Identifiers.TRELLO_USER_ID,
        value: 'someTrelloUser',
      },
      metadata: fullMetadata,
    };

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(EXPECTED_PRD_URL);
    expect(fetchMock.mock.calls[0][1]).toMatchObject(
      createExpectedRequest(expectedBody),
    );
  });

  test('calls api with full request', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fullFlagResponse));
    await fetcher.fetchFeatureFlags(fullUser, fullMetadata, 'someVersionData');

    const expectedBody: FeatureFlagRequest = {
      apiKey: 'someApiKey',
      identifier: fullUser.identifier,
      isAnonymous: true,
      additionalIdentifiers: fullUser.additionalIdentifiers,
      customAttributes: fullUser.custom,
      versionData: 'someVersionData',
      metadata: fullMetadata,
    };

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(EXPECTED_PRD_URL);
    expect(fetchMock.mock.calls[0][1]).toMatchObject(
      createExpectedRequest(expectedBody),
    );
  });

  test('returns feature flags if successful', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fullFlagResponse));
    const response: FeatureFlagResponse = await fetcher.fetchFeatureFlags(
      minimalUser,
      fullMetadata,
    );
    expect(response).toEqual(fullFlagResponse);
  });

  test('returns empty response on 204', async () => {
    fetchMock.mockResponseOnce('', { status: 204 });
    const response: FeatureFlagResponse = await fetcher.fetchFeatureFlags(
      minimalUser,
      fullMetadata,
    );
    expect(response).toEqual({});
  });

  test('returns response error on failure', async () => {
    expect.hasAssertions();

    fetchMock.mockResponseOnce('something went wrong', {
      status: 500,
    });

    const promise = fetcher.fetchFeatureFlags(minimalUser, fullMetadata);
    await expect(promise).rejects.toBeInstanceOf(ResponseError);
    await expect(promise).rejects.toMatchObject({
      message: 'Response Error: 500',
      status: 500,
      body: 'something went wrong',
    });
  });

  test('handles empty 200 response', async () => {
    fetchMock.mockResponseOnce('', { status: 200 });
    const response: FeatureFlagResponse = await fetcher.fetchFeatureFlags(
      minimalUser,
      fullMetadata,
    );
    expect(response).toEqual({});
  });

  test('uses prod URL by default', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fullFlagResponse));
    await fetcher.fetchFeatureFlags(minimalUser, fullMetadata);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(EXPECTED_PRD_URL);
  });

  test('uses staging URL if selected', async () => {
    fetcher = new Fetcher('someApiKey', EnvironmentType.STAGING);

    fetchMock.mockResponseOnce(JSON.stringify({}));
    await fetcher.fetchFeatureFlags(minimalUser, fullMetadata);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(EXPECTED_STG_URL);
  });

  test('uses dev URL if selected', async () => {
    fetcher = new Fetcher('someApiKey', EnvironmentType.DEV);

    fetchMock.mockResponseOnce(JSON.stringify({}));
    await fetcher.fetchFeatureFlags(minimalUser, fullMetadata);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(EXPECTED_DEV_URL);
  });

  test('uses provided baseUrl is set', async () => {
    fetcher = new Fetcher('someApiKey', EnvironmentType.DEV, 'someBaseUrl');

    fetchMock.mockResponseOnce(JSON.stringify({}));
    await fetcher.fetchFeatureFlags(minimalUser, fullMetadata);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      `someBaseUrl/api/${CURRENT_FFS_API_VERSION}/frontend/featureFlagValues`,
    );
  });
});
