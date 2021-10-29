// eslint-disable-next-line import/no-extraneous-dependencies
import nock, { Scope } from 'nock';

import { CURRENT_FFS_API_VERSION } from '../core/constants';
import { ResponseError } from '../fetcher/errors';
import { FeatureFlagRequest, FeatureFlagResponse } from '../fetcher/types';

export const mockServerCorsOptions = (): Scope => {
  return nock(/\.*.atlassian\.com/)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .intercept(
      `/flags/api/${CURRENT_FFS_API_VERSION}/frontend/featureFlagValues`,
      'OPTIONS',
    )
    .times(Number.MAX_VALUE)
    .reply(204, undefined, {
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers':
        'x-client-name, x-client-version, x-api-key',
    });
};

export const mockServer200 = (
  ffr: FeatureFlagResponse,
  requestBodyCallback?: (requestBody: FeatureFlagRequest) => void,
  delay = 0,
): Scope => {
  return nock(/\.*.atlassian\.com/)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .post(
      `/flags/api/${CURRENT_FFS_API_VERSION}/frontend/featureFlagValues`,
      (body: FeatureFlagRequest) => {
        if (requestBodyCallback) {
          requestBodyCallback(body);
        }
        return true;
      },
    )
    .delay(delay)
    .reply(200, ffr);
};

export const mockServer4xx = (status: number): Scope => {
  return nock(/\.*.atlassian\.com/)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .post(`/flags/api/${CURRENT_FFS_API_VERSION}/frontend/featureFlagValues`)
    .reply(status);
};

export const serverError4xx = (status: number): Error =>
  new Error(`Response Error: ${status}`);

export const responseErrorWithStatusCode = (status: number): ResponseError =>
  new ResponseError(status, `Response Error: ${status}`);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const waitForFetch = (
  fetchSpy: jest.SpyInstance,
  index = 0,
): Promise<FeatureFlagResponse> => fetchSpy.mock.results[index].value;
