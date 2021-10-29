import { useCallback } from 'react';

import { useCommerceFetch } from '@atlassian/commerce-environment';
import { get, isError, isSuccessful } from '@atlassian/commerce-hams-client';
import {
  FAILED_SITE_KEY_RETRIEVAL,
  FetchServerSideSiteKey,
  ServerSideSiteKeyPayload,
  SiteKey,
} from '@atlassian/commerce-recaptcha-base';
import {
  ProbabilityOfBug,
  Service,
  useTaskTracker,
} from '@atlassian/commerce-telemetry';

import { DEFAULT_HAMS_RECAPTCHA_BASE_URL } from './constants';

export type HamsReCaptchaPayload = {
  siteKey: SiteKey;
};

export const useHAMSRequestSiteKey = (
  /**
   * This depends on your product. See: https://hello.atlassian.net/wiki/spaces/~261604415/pages/1169536418/Hams+Captcha+Tech+Implementation+Overview
   */
  operation: string,
  baseUrl: string = DEFAULT_HAMS_RECAPTCHA_BASE_URL,
): FetchServerSideSiteKey => {
  const fetch = useCommerceFetch();

  /*
    TODO: We're probably never going to register the track events for "loading" tasks so
    maybe we should make a version of this method called useLoadTracker or something since they
    have different telemetry requirements.
  */
  const startTask = useTaskTracker({
    action: 'load',
    actionSubject: 'hamsReCaptchaSiteKey',
  });

  const fetchSiteKey = useCallback(async (): Promise<
    ServerSideSiteKeyPayload
  > => {
    const taskResult = await startTask(async () => {
      const payload = await get<null | HamsReCaptchaPayload>(
        fetch,
        `${baseUrl}/${operation}`,
      );

      if (isSuccessful(payload)) {
        return {
          succeed: {
            payload,
          },
        };
      } else {
        const isInternalHAMSError =
          isError(payload) &&
          payload.error.status >= 500 &&
          payload.error.status <= 599
            ? Service.HAMS
            : undefined;

        return {
          fail: {
            payload,
            // There's no non-buggy error for this endpoint, something's going wrong somewhere
            probabilityOfBug: ProbabilityOfBug.GUARANTEED,
            responsibleService: isInternalHAMSError ? Service.HAMS : undefined,
            loggablePayload: isError(payload)
              ? payload.error
              : payload.exception,
          },
        };
      }
    });

    if (taskResult.fail !== undefined) {
      return FAILED_SITE_KEY_RETRIEVAL;
    } else {
      const successResult = taskResult.succeed.payload;

      if (successResult.payload === null) {
        return {
          failed: false,
          siteKey: null,
        };
      } else {
        return {
          failed: false,
          siteKey: successResult.payload.siteKey,
        };
      }
    }
  }, [fetch, operation, baseUrl, startTask]);

  return fetchSiteKey;
};

export type { SiteKey };
