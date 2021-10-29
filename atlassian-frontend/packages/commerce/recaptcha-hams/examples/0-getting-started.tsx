import React, { useCallback } from 'react';

import Button from '@atlaskit/button';

import {
  HAMSReCaptchaErrorMessage,
  ReCaptchaLegalText,
  TokenResult,
  useHAMSCaptchaChallengeEventHandler,
} from '../src';

const SuccessfulButtonExample = () => {
  const logReCaptchaCallback = useCallback(
    (reCaptchaToken: TokenResult, event: Event) => {
      console.log('reCAPTCHA callback called!', reCaptchaToken, event);
    },
    [],
  );

  const callback = useHAMSCaptchaChallengeEventHandler(
    // This depends on your product. See https://hello.atlassian.net/wiki/spaces/~261604415/pages/1169536418/Hams+Captcha+Tech+Implementation+Overview
    'processOrderWithCreditCard',
    logReCaptchaCallback,
  );

  return (
    <>
      <Button ref={callback}>Click me for a successful ReCaptcha token</Button>
      <ReCaptchaLegalText />
      <HAMSReCaptchaErrorMessage />
    </>
  );
};

export default SuccessfulButtonExample;
