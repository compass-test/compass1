import { useEffect } from 'react';

import { useProgress } from '../../common/utils/use-progress';
import { SiteKey } from '../recaptcha';

export type DontUseReCaptcha = null;
export type ServerSideSiteKeySuccessPayload = {
  failed: false;
  siteKey: ServerSideSiteKey;
};

export type ServerSideSiteKeyFailurePayload = {
  failed: true;
  siteKey?: undefined;
};
export type ServerSideSiteKeyPayload =
  | ServerSideSiteKeySuccessPayload
  | ServerSideSiteKeyFailurePayload;

export type ServerSideSiteKey = SiteKey | DontUseReCaptcha;

export type FetchServerSideSiteKey = () =>
  | Promise<ServerSideSiteKeyPayload>
  | ServerSideSiteKeyPayload;

export const FAILED_SITE_KEY_RETRIEVAL = Object.freeze({
  failed: true,
  siteKey: undefined,
} as const);

/**
 * TODO: Could probably just use the Commerce service hook
 */
export const useSiteKeyService = (
  fetchServerSideSiteKey: FetchServerSideSiteKey,
) => {
  const [progress, setLoaded, setLoading] = useProgress<
    ServerSideSiteKeyPayload
  >();
  useEffect(() => {
    setLoading();

    let stillMounted = true;
    (async () => {
      try {
        const siteKeyPayload = await fetchServerSideSiteKey();
        if (stillMounted) {
          setLoaded(siteKeyPayload);
        }
      } catch (err) {
        if (stillMounted) {
          setLoaded(FAILED_SITE_KEY_RETRIEVAL);
        }
      }
    })();

    return () => {
      stillMounted = false;
    };
  }, [fetchServerSideSiteKey, setLoading, setLoaded]);

  // TODO: Allow for retrying
  return progress;
};

export const shouldSkipReCaptchaChallenge = (
  siteKey: ServerSideSiteKey,
): siteKey is DontUseReCaptcha => siteKey === null;
