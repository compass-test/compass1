import { Result } from '@atlassian/commerce-resultful';

import {
  createCachedLoadReCaptchaScriptFn,
  InitializeOptions,
  LoadReCaptchaScriptInfo,
  ReCaptcha,
} from './script';

export type { LoadReCaptchaScriptInfo, InitializeOptions, ReCaptcha };

export type RequestCaptchaChallengeForElementOptions = Omit<
  ReCaptchaV2.Parameters,
  'callback' | 'isolated' | 'sitekey'
>;

// Note: Could make this opaque :thinking:
export type SiteKey = string;

export type ReTriggerReCaptchaChallengeCallback = () => Promise<TokenResult>;

export type TriggerReCaptchaChallengeCallback = (
  grecaptcha: ReCaptcha,
  siteKey: SiteKey,
  element: HTMLElement,
  parameters?: RequestCaptchaChallengeForElementOptions,
) => {
  tokenResultPromise: Promise<TokenResult>;
  retriggerReCaptcha: ReTriggerReCaptchaChallengeCallback;
};

export type TokenResult = Result<string | null, any, any>;

export type RequestCaptchaChallengeForElementClientCallback = (
  element: HTMLElement,
  siteKey: SiteKey,
  parameters?: RequestCaptchaChallengeForElementOptions,
) => Promise<TokenResult>;

export type ReCaptchaScriptInfo = {
  triggerReCaptchaChallenge: TriggerReCaptchaChallengeCallback;
} & LoadReCaptchaScriptInfo;

export type ReCaptchaClient = {
  requestCaptchaChallengeForElement: RequestCaptchaChallengeForElementClientCallback;
};

export type LoadReCaptchaClient = (
  options?: InitializeOptions,
) => Promise<ReCaptchaClient>;

/**
 * reCAPTCHA doesn't allow you to render a CAPTCHA challenge within a
 * populated element so we make a temporary empty one.
 *
 * This enables this method to be able to render an element from anywhere
 * for a better developer experience.
 */
const withinTemporaryDiv = async <T>(
  element: Element,
  onDivMounted: (element: HTMLDivElement) => Promise<T>,
): Promise<T> => {
  const reCaptchaContainer = document.createElement('div');

  /*
   * The only reason we add this to the element and not, say, in the document
   * body is because reCAPTCHA puts the CAPTCHA challenge next to the element
   * that it was initiated from for a better UX.
   */
  element.appendChild(reCaptchaContainer);

  const result = await onDivMounted(reCaptchaContainer);

  element.removeChild(reCaptchaContainer);

  return result;
};

/**
 * ReCaptcha doesn't let you run .render(...) twice, so to avoid doing so without
 * too much extra code, just store mappings between each element and and queue of token promise resolvers.
 *
 * Not ideal but at least we don't have to track state about whether we have or haven't rendered the state anywhere else this way.
 */
const createRequestOrRetrigger = (
  onRequestChallenge: TriggerReCaptchaChallengeCallback,
) => {
  const renderedElementToReTrigger = new WeakMap<
    HTMLElement,
    ReTriggerReCaptchaChallengeCallback
  >();

  const requestOrRetrigger = async (
    grecaptcha: ReCaptcha,
    siteKey: SiteKey,
    element: HTMLElement,
    parameters?: RequestCaptchaChallengeForElementOptions,
  ) => {
    if (renderedElementToReTrigger.has(element)) {
      return renderedElementToReTrigger.get(element)!();
    }

    const { tokenResultPromise, retriggerReCaptcha } = onRequestChallenge(
      grecaptcha,
      siteKey,
      element,
      parameters,
    );
    renderedElementToReTrigger.set(element, retriggerReCaptcha);

    const token = await tokenResultPromise;

    renderedElementToReTrigger.delete(element);

    return token;
  };

  return requestOrRetrigger;
};

export const createReCaptchaClientFactory = (
  scriptInfo: ReCaptchaScriptInfo,
): LoadReCaptchaClient => {
  const loadReCaptcha = createCachedLoadReCaptchaScriptFn(scriptInfo);
  const requestOrRetriggerChallenge = createRequestOrRetrigger(
    scriptInfo.triggerReCaptchaChallenge,
  );

  const createReCaptchaClient = async (
    options: InitializeOptions = {},
  ): Promise<ReCaptchaClient> => {
    const grecaptcha = await loadReCaptcha(options);

    const requestCaptchaChallengeForElement = async (
      anchoredElement: HTMLElement,
      siteKey: SiteKey,
      parameters?: RequestCaptchaChallengeForElementOptions,
    ) => {
      const token = await withinTemporaryDiv(
        anchoredElement,
        (reCaptchaContainer) =>
          requestOrRetriggerChallenge(
            grecaptcha,
            siteKey,
            reCaptchaContainer,
            parameters,
          ),
      );

      return token;
    };

    return {
      requestCaptchaChallengeForElement,
    };
  };

  return createReCaptchaClient;
};
