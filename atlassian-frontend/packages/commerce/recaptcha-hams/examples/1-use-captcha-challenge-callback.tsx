import React, { useCallback } from 'react';

import Button from '@atlaskit/button';

import {
  HAMSReCaptchaErrorMessage,
  ReCaptchaLegalText,
  TokenResult,
  useHAMSCaptchaChallengeCallback,
} from '../src';

const SuccessfulButtonExample = () => {
  const logReCaptchaCallback = useCallback(
    (reCaptchaToken: TokenResult, event: React.BaseSyntheticEvent) => {
      console.log('reCAPTCHA callback called!', reCaptchaToken, event);
    },
    [],
  );

  const callback = useHAMSCaptchaChallengeCallback(
    // This depends on your product. See https://hello.atlassian.net/wiki/spaces/~261604415/pages/1169536418/Hams+Captcha+Tech+Implementation+Overview
    'processOrderWithCreditCard',
    logReCaptchaCallback,
  );

  return (
    <>
      <Button onClick={callback}>
        Click me for a successful ReCaptcha token
      </Button>
      <ReCaptchaLegalText />
      <HAMSReCaptchaErrorMessage />
    </>
  );
};

export default SuccessfulButtonExample;
