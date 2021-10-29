/**
 * Note: If you add a service here please name after what's mentioned in Microscope.
 * It'll make figuring out who to page (if we need to) easier. See: https://microscope.prod.atl-paas.net/services/commerce-libraries
 *
 * TODO: Probably worth adding some sort of build check to make sure this is enforced
 */

/**
 * It's not enforced, but if you add a service here
 */

/**
 * Generally, you'll want to use this value if you're not 100% sure who can cause the error.
 */
export const UNKNOWN = 'unknown';

/**
 * Use this if you know for a fact that the error isn't coming from Commerce Libraries but it's coming from somewhere else.
 * It's technically better to specify the actual service since it'll save some time with diagnosis.
 */
export const UNKNOWN_EXTERNAL = 'unknown-external';

/**
 * Only use this if you're 100% sure the error can only be caused by Commerce Libraries. This means that the code that's
 * throwing the error has no dependency on data or communication from other external services.
 *
 * In terms of getting paged this and {@link UNKNOWN} are no different, but the value gets specified in Sentry
 * and it could cause some confusion if someone's reading the Sentry error and it says "commerce-libraries" but the
 * error isn't actually caused by Commerce Libraries.
 *
 * @see https://microscope.prod.atl-paas.net/services/billing-console
 */
export const COMMERCE_LIBRARIES = 'commerce-libraries';

/**
 * Only use this if you're 99% sure the error can only be caused by HAMS (we'll never be 100% sure since we can cause bugs in external services).
 * 5xx are a good example of this.
 *
 * @see https://microscope.prod.atl-paas.net/services/hams
 */
export const HAMS = 'hams';

export type CommerceService =
  | typeof UNKNOWN
  | typeof UNKNOWN_EXTERNAL
  | typeof COMMERCE_LIBRARIES
  | typeof HAMS;

export type UnknownServiceType = typeof UNKNOWN | typeof UNKNOWN_EXTERNAL;
