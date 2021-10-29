import React, { useCallback } from 'react';

import Button from '@atlaskit/button';

import {
  FetchServerSideSiteKey,
  ReCaptchaErrorMessage,
  ReCaptchaLegalText,
  ReCaptchaStateProvider,
  TokenResult,
  useCaptchaChallengeEventHandler,
} from '../src';

/**
 * Note that this method has been designed for support to
 * retrieve the site key from a server.
 */
const fetchMySiteKey: FetchServerSideSiteKey = async () => {
  console.log('Retrieving site key!');
  return {
    failed: false,
    siteKey: null, // null values skip ReCaptcha
  };
};

const SkipButtonExample = () => {
  const logReCaptchaCallback = useCallback(
    (tokenResult: TokenResult, event: Event) => {
      event.preventDefault();
      console.log('reCAPTCHA callback called!', tokenResult, event);
    },
    [],
  );
  const setElement = useCaptchaChallengeEventHandler(
    fetchMySiteKey,
    logReCaptchaCallback,
    {
      eventType: 'submit',
    },
  );

  return (
    <ReCaptchaStateProvider>
      <form ref={setElement} onSubmit={(e) => {}}>
        <Button type="submit">Click me for a successful ReCaptcha token</Button>
      </form>
      <ReCaptchaLegalText />
      <ReCaptchaErrorMessage />
    </ReCaptchaStateProvider>
  );
};

export default SkipButtonExample;
