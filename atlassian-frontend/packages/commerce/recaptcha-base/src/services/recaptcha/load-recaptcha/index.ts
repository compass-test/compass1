import {
  createExceptionResult,
  createSuccessResult,
} from '@atlassian/commerce-resultful';

import {
  createReCaptchaClientFactory,
  InitializeOptions,
  LoadReCaptchaClient,
  ReCaptcha,
  ReCaptchaClient,
  RequestCaptchaChallengeForElementClientCallback,
  RequestCaptchaChallengeForElementOptions,
  SiteKey,
  TokenResult,
  TriggerReCaptchaChallengeCallback,
} from './client';
import {
  ENTERPRISE_DIRECT_RECAPTCHA_SCRIPT_URL,
  ENTERPRISE_GOOGLE_RECAPTCHA_SCRIPT_URL,
  FREE_DIRECT_RECAPTCHA_SCRIPT_URL,
  FREE_GOOGLE_RECAPTCHA_SCRIPT_URL,
} from './constants';

export type {
  RequestCaptchaChallengeForElementOptions,
  InitializeOptions,
  ReCaptchaClient,
  ReCaptcha,
  LoadReCaptchaClient,
  SiteKey,
  TokenResult,
  RequestCaptchaChallengeForElementClientCallback,
  TriggerReCaptchaChallengeCallback,
};

const isScriptSrcAlreadyDeclared = (src: string) => {
  return document.querySelector(`script[src*="${src}"]`) !== null;
};

export const isFreeReCaptchaScriptAlreadyDeclared = (): boolean => {
  return (
    isScriptSrcAlreadyDeclared(FREE_DIRECT_RECAPTCHA_SCRIPT_URL) ||
    isScriptSrcAlreadyDeclared(FREE_GOOGLE_RECAPTCHA_SCRIPT_URL)
  );
};

export const isEnterpriseReCaptchaScriptAlreadyDeclared = (): boolean => {
  return (
    isScriptSrcAlreadyDeclared(ENTERPRISE_DIRECT_RECAPTCHA_SCRIPT_URL) ||
    isScriptSrcAlreadyDeclared(ENTERPRISE_GOOGLE_RECAPTCHA_SCRIPT_URL)
  );
};

/**
 * @see https://www.google.com/recaptcha/about/
 */
export const loadFreeReCaptchaScript = createReCaptchaClientFactory({
  isScriptAlreadyDeclared: isFreeReCaptchaScriptAlreadyDeclared,
  getGlobalReCaptchaObject: () => globalThis.grecaptcha,
  reCaptchaScriptUrl: FREE_DIRECT_RECAPTCHA_SCRIPT_URL,
  triggerReCaptchaChallenge: (grecaptcha, sitekey, element, options = {}) => {
    let resolve: (token: string) => void;
    let reject: (err: any) => void;
    const tokenPromise = new Promise<string>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const widgetId = grecaptcha.render(element, {
      ...options,
      sitekey,
      // In the free tier version of reCAPTCHA - tokens appear here
      callback: (token: string) => {
        try {
          grecaptcha.reset(widgetId);
          resolve(token);
        } catch (err) {
          reject(err);
        }
      },
      isolated: true,
      size: 'invisible',
    });

    const retriggerReCaptcha = async (): Promise<TokenResult> => {
      try {
        // Note: Type definitions says it execute returns void but it's actually a promise
        ((await grecaptcha.execute(widgetId)) as any) as Promise<null>;
        const token = await tokenPromise;

        return createSuccessResult(token);
      } catch (err) {
        return createExceptionResult(err);
      }
    };

    const tokenResultPromise = retriggerReCaptcha();

    return {
      tokenResultPromise,
      retriggerReCaptcha,
    };
  },
});

/**
 * @see https://cloud.google.com/recaptcha-enterprise
 */
export const loadEnterpriseReCaptchaScript = createReCaptchaClientFactory({
  isScriptAlreadyDeclared: isEnterpriseReCaptchaScriptAlreadyDeclared,
  getGlobalReCaptchaObject: () => globalThis.grecaptcha.enterprise,
  reCaptchaScriptUrl: ENTERPRISE_DIRECT_RECAPTCHA_SCRIPT_URL,
  triggerReCaptchaChallenge: (grecaptcha, sitekey, element, options = {}) => {
    const widgetId = grecaptcha.render(element, {
      ...options,
      sitekey,
      isolated: true,
      size: 'invisible',
    });

    const retriggerReCaptcha = async (): Promise<TokenResult> => {
      try {
        // In the Enterprise version of reCAPTCHA - tokens appear here
        // Note: Type definitions says it execute returns void but it's actually a promise
        const token = await ((grecaptcha.execute(widgetId) as any) as Promise<
          string
        >);
        return createSuccessResult(token);
      } catch (err) {
        return createExceptionResult(err);
      }
    };

    const firstTokenResultPromise = retriggerReCaptcha().then((result) => {
      grecaptcha.reset(widgetId);

      return result;
    });

    return {
      tokenResultPromise: firstTokenResultPromise,
      retriggerReCaptcha,
    };
  },
});
