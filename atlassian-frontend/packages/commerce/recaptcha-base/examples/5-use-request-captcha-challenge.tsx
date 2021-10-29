import React, { useCallback, useState } from 'react';

import Button from '@atlaskit/button';

import {
  FetchServerSideSiteKey,
  ReCaptchaErrorMessage,
  ReCaptchaLegalText,
  ReCaptchaStateProvider,
  useRequestCaptchaChallenge,
} from '../src';

/**
 * Note that this method has been designed for support to
 * retrieve the site key from a server.
 */
const fetchMySiteKey: FetchServerSideSiteKey = async () => {
  console.log('Retrieving site key!');
  return {
    failed: false,
    siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  };
};

const SkipButtonExample = () => {
  const challenge = useRequestCaptchaChallenge(fetchMySiteKey);

  const [reCaptchaAlreadyRunning, setReCaptchaAlreadyRunning] = useState<
    boolean
  >(false);
  const onClick = useCallback(
    async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (reCaptchaAlreadyRunning) {
        // Will make the reCAPTCHA event reappear if the user dismissed it. See documentation for more info
        await challenge(event.target as HTMLElement);
        return;
      }

      setReCaptchaAlreadyRunning(true);
      // The reCATPCHA modal will be anchored to this element
      const token = await challenge(event.target as HTMLElement);
      setReCaptchaAlreadyRunning(false);

      console.log(token);
    },
    [setReCaptchaAlreadyRunning, challenge, reCaptchaAlreadyRunning],
  );

  return (
    <ReCaptchaStateProvider>
      <Button onClick={onClick}>
        Click me for a successful reCAPTCHA token
      </Button>
      <Button onClick={onClick}>
        Click me for another successful reCAPTCHA token
      </Button>
      <ReCaptchaLegalText />
      <ReCaptchaErrorMessage />
    </ReCaptchaStateProvider>
  );
};

export default SkipButtonExample;
