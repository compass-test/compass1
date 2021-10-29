import { useEffect } from 'react';

import { Progress, useProgress } from '../../common/utils/use-progress';

import {
  InitializeOptions,
  loadEnterpriseReCaptchaScript,
  loadFreeReCaptchaScript,
  LoadReCaptchaClient,
  ReCaptcha,
  ReCaptchaClient,
  RequestCaptchaChallengeForElementClientCallback,
  RequestCaptchaChallengeForElementOptions,
  SiteKey,
  TokenResult,
  TriggerReCaptchaChallengeCallback,
} from './load-recaptcha';

export type {
  SiteKey,
  Progress,
  InitializeOptions,
  RequestCaptchaChallengeForElementOptions,
  TokenResult,
  ReCaptcha,
  RequestCaptchaChallengeForElementClientCallback,
  TriggerReCaptchaChallengeCallback,
  LoadReCaptchaClient,
  ReCaptchaClient,
};

export { loadFreeReCaptchaScript, loadEnterpriseReCaptchaScript };

export type LoadReCaptchaOptions = {
  loadReCaptcha?: LoadReCaptchaClient;
} & InitializeOptions;

/**
 * Communicates with HAMS to determine whether ReCaptcha needs to be used for the specified operation.
 * @param operation Please see: https://hello.atlassian.net/wiki/spaces/~261604415/pages/1169536418/Hams%2BCaptcha%2BTech%2BImplementation%2BOverview?focusedCommentId=1180858296#Implementation%3A
 */
export const useReCaptchaService = ({
  locale,
  loadReCaptcha = loadEnterpriseReCaptchaScript,
}: LoadReCaptchaOptions = {}): Progress<ReCaptchaClient> => {
  const [intializeProgress, setLoaded, setLoading] = useProgress<
    ReCaptchaClient
  >();

  useEffect(() => {
    let stillMounted = true;
    (async () => {
      const reCaptchaClient = await loadReCaptcha({ locale });

      if (stillMounted) {
        setLoaded(reCaptchaClient);
      }
    })();

    return () => {
      stillMounted = false;
    };
  }, [locale, setLoaded, setLoading, loadReCaptcha]);

  return intializeProgress;
};
