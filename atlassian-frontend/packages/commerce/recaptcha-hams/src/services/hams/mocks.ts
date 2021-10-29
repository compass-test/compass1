import {
  empty,
  ok,
  Scenario,
  serverFailure,
  url,
} from '@atlassian/commerce-environment/mocks';

import type { HamsReCaptchaPayload } from './index';

const DEFAULT_HAMS_RECAPTCHA_BASE_URL = '/hamlet/1.0/public/reCaptcha/siteKey';

const TEST_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

export const createHAMSReCaptchaClientScenarios = (
  operation: string,
  baseUrl: string = DEFAULT_HAMS_RECAPTCHA_BASE_URL,
): Record<string, Scenario<HamsReCaptchaPayload>> => {
  const baseHamsReCaptchaUrl = `${baseUrl}/${operation}`;

  return {
    fetchReCaptchaSiteKeyEnabled: {
      request: url(baseHamsReCaptchaUrl, 'GET'),
      response: ok({
        siteKey: TEST_KEY,
      }),
    },
    fetchReCaptchaSiteKeyDisabled: {
      request: url(baseHamsReCaptchaUrl, 'GET'),
      response: empty(),
    },
    fetchReCaptchaSiteKeyServerFailure: {
      request: url(baseHamsReCaptchaUrl, 'GET'),
      response: serverFailure({
        error: 'error code',
        errorDetail: 'some details',
        errorKey: 'key',
        uuid: 'uwuid',
      }),
    },
    fetchReCaptchaSiteKeyWithBrokenContract: {
      request: url(baseHamsReCaptchaUrl, 'GET'),
      // TODO: Looks like this isn't currently supported by scenarios
      response: ok('Oh no! This isnt JSON :O' as any),
    },
  };
};
