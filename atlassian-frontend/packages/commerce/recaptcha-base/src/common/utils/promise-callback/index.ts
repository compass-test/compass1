export type CallbackPromiseObject<T> = {
  resolve: (value: T) => void;
  promise: Promise<T>;
};

// TODO: Whatever is using this now should probably either live in this package or this function should live in its own package (it's quite reusable)
export const createPromiseThatResolvesViaACallback = <
  T
>(): CallbackPromiseObject<T> => {
  let resolveCommerceReCaptchaReadyPromise: (recaptchaObject: T) => void;

  const recaptchaReadyPromise = new Promise<T>((resolve) => {
    resolveCommerceReCaptchaReadyPromise = resolve;
  });

  return {
    promise: recaptchaReadyPromise,
    resolve: resolveCommerceReCaptchaReadyPromise!,
  };
};
