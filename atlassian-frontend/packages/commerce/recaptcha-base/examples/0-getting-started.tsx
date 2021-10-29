import React, { useCallback } from 'react';

import Button from '@atlaskit/button';

import {
  FetchServerSideSiteKey,
  ReCaptchaErrorMessage,
  ReCaptchaLegalText,
  ReCaptchaStateProvider,
  useCaptchaChallengeEventHandler,
} from '../src';

const EXAMPLE_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

/**
 * Note that this method has been designed for support to
 * retrieve the site key from a server.
 */
const fetchMySiteKey: FetchServerSideSiteKey = async () => {
  console.log('Retrieving site key!');
  return {
    failed: false,
    siteKey: EXAMPLE_SITE_KEY,
  };
};

const SuccessfulButtonExample = () => {
  const logReCaptchaCallback = useCallback((...reCaptchaArgs) => {
    console.log('reCAPTCHA callback called!', reCaptchaArgs);
  }, []);

  // Pass this into an element's ref prop. The element will then trigger reCAPTCHA on click (by default)
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

export default SuccessfulButtonExample;
