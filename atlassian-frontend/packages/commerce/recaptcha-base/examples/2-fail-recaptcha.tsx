import React, { useCallback } from 'react';

import Button from '@atlaskit/button';

import {
  FetchServerSideSiteKey,
  ReCaptchaErrorMessage,
  ReCaptchaLegalText,
  ReCaptchaStateProvider,
  useCaptchaChallengeEventHandler,
} from '../src';

/**
 * Note that this method has been designed for support to
 * retrieve the site key from a server.
 */
const fetchMySiteKey: FetchServerSideSiteKey = async () => {
  console.log('Retrieving site key!');
  return {
    failed: true,
    siteKey: undefined,
  };
};

const SkipButtonExample = () => {
  const logReCaptchaCallback = useCallback((...reCaptchaArgs) => {
    console.log('reCAPTCHA callback called!', reCaptchaArgs);
  }, []);
  const setElement = useCaptchaChallengeEventHandler(
    fetchMySiteKey,
    logReCaptchaCallback,
  );

  return (
    <ReCaptchaStateProvider>
      <Button ref={setElement}>
        Click me for a successful ReCaptcha token
      </Button>
      <ReCaptchaLegalText />
      <ReCaptchaErrorMessage />
    </ReCaptchaStateProvider>
  );
};

export default SkipButtonExample;
