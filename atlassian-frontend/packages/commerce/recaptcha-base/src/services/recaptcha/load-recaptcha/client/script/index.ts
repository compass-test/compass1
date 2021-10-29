import { createPromiseThatResolvesViaACallback } from '../../../../../common/utils/promise-callback';

export type ReCaptcha = ReCaptchaV2.ReCaptcha;

export type LoadReCaptchaScriptInfo = {
  isScriptAlreadyDeclared: () => boolean;
  getGlobalReCaptchaObject: () => ReCaptcha;
  reCaptchaScriptUrl: string;
};

export type InitializeOptions = {
  /**
   * @see https://developers.google.com/recaptcha/docs/language
   */
  locale?: string;
};

export type LoadReCaptchaCallback = (
  options?: InitializeOptions,
) => Promise<ReCaptcha>;

export const ONLOAD_CALLBACK_KEY = 'resolveCommerceReCaptchaReadyPromise';
const loadReCaptchaScript = async (
  { reCaptchaScriptUrl, getGlobalReCaptchaObject }: LoadReCaptchaScriptInfo,
  { locale }: InitializeOptions = {},
): Promise<ReCaptcha> => {
  const reCaptchaReady = createPromiseThatResolvesViaACallback<ReCaptcha>();
  // Note: It's technically possible to conflict with an existing variable but this is how reCAPTCHA currently signals that it's ready/loaded
  // and the string is quite unique
  // TODO: Add this to global scope type definitions
  (globalThis as any)[ONLOAD_CALLBACK_KEY] = () => {
    reCaptchaReady.resolve(getGlobalReCaptchaObject());
  };

  // Please see: https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
  const collapseBadgeStyleElement = globalThis.document.createElement('style');
  collapseBadgeStyleElement.innerHTML =
    '.grecaptcha-badge { visibility: collapse; }';
  globalThis.document.head.appendChild(collapseBadgeStyleElement);

  const scriptElement = globalThis.document.createElement('script');
  const url = new URL(reCaptchaScriptUrl);
  url.searchParams.set('onload', ONLOAD_CALLBACK_KEY);
  url.searchParams.set('render', 'explicit');
  if (locale !== undefined) {
    url.searchParams.set('hl', locale);
  }

  scriptElement.src = url.href;
  scriptElement.async = true;
  scriptElement.defer = true;

  globalThis.document.head.appendChild(scriptElement);

  return reCaptchaReady.promise;
};

/**
 * This method attemps to 'abstract' (or at least, mask) the global state & DOM pollution
 * that is required for loading ReCAPTCHA.
 *
 * Note that, as of writing (26/03/2021) ReCAPTCHA does not provide any
 * pre-downloaded/bundleable/ESM-importable way of initializing the
 * ReCAPTCHA script.
 */
export const createCachedLoadReCaptchaScriptFn = (
  scriptInfo: LoadReCaptchaScriptInfo,
): LoadReCaptchaCallback => {
  let loadReCaptchaPromise: Promise<ReCaptcha> | undefined;

  /**
   * Immediately returns ReCaptcha if it already exists, otherwise, it loads the script from {@link loadReCaptchaCallback}
   */
  const loadCacheElseRunLoadReCaptcha: LoadReCaptchaCallback = async (
    options,
  ) => {
    if (!scriptInfo.isScriptAlreadyDeclared()) {
      loadReCaptchaPromise = loadReCaptchaScript(scriptInfo, options);
    } else if (loadReCaptchaPromise === undefined) {
      // In this case, the user has loaded up reCAPTCHA via a totally different API (maybe they're using it for something else)
      // FIXME: Technically this can run into a race condition where the script is mounted but the script is still executing. This branch currently doesn't occur in the real applications yet though.
      loadReCaptchaPromise = Promise.resolve(
        scriptInfo.getGlobalReCaptchaObject(),
      );
    }

    const grecaptcha = await loadReCaptchaPromise;

    return grecaptcha;
  };

  return loadCacheElseRunLoadReCaptcha;
};
