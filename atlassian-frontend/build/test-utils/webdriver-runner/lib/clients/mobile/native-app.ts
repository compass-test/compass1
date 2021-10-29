/**
 * Hybrid App containing a WebView to run our web tests.
 *
 * @see https://bitbucket.org/atlassian/afe-browserstack-android-app
 * @see https://bitbucket.org/atlassian/afe-browserstack-ios-app
 */

// Whether we're in CI
const isCI = !!process.env.CI;

// For local testing this is the developer's username defined in their bash profile.
// For CI testing this is a manager's username defined in Pipelines.
const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME;

// This should only be defined when you need to test updates to the native applications.
const BROWSERSTACK_MOBILE_USERNAME = process.env.BROWSERSTACK_MOBILE_USERNAME;

/**
 * We use a `shareable_id` to resolve the native app which requires the
 * username of the account which uploaded the app binaries. @see `getAppId`.
 *
 * To avoid requiring developers from having to upload the native app into
 * their own accounts we want to use the CI username for local runs too.
 *
 * Because the CI username isn't available locally we defined it here as
 * a hard coded fallback value. This fallback value needs to stay up to date
 * with the user defined in CI. Fortunately it's changed very rarely.
 */
const CI_BROWSERSTACK_USERNAME = isCI ? BROWSERSTACK_USERNAME : 'dnovoa1';

/**
 * This should return a `sharable_id` to ensure it resolves the latest
 * uploaded version of the app.
 *
 * `shareable_id` will be accessible to anyone on the same team account.
 *      example: `"shareable_id":"johnsmith1/afe-browserstack-ios-app"`
 *
 * Most of the time you'll be using the CI user's account to avoid having
 * to upload the native app binary into your own account.
 *
 * If you're changing the native application then you should temporarily
 * set the value of `BROWSERSTACK_MOBILE_USERNAME` to your own so that
 * you can test out your changes before deploying the updates into the
 * CI user's account. e.g.
 *
 * ```
 * # Temporarily point at your own account
 * export BROWSERSTACK_MOBILE_USERNAME=$BROWSERSTACK_USERNAME
 * ```
 */
function getAppId(customIdAppName: string) {
  const user = BROWSERSTACK_MOBILE_USERNAME
    ? BROWSERSTACK_MOBILE_USERNAME
    : CI_BROWSERSTACK_USERNAME;
  return `${user}/${customIdAppName}`;
}

// App identifiers
export const ANDROID_APP_ID = getAppId('afe-browserstack-android-app');
export const IOS_APP_ID = getAppId('afe-browserstack-ios-app');

// Constants
export const MOBILE_PLATFORM = {
  ANDROID: 'Android',
  IOS: 'iOS',
};

export const MOBILE_CONTEXT = {
  NATIVE: 'NATIVE',
  WEBVIEW: 'WEBVIEW',
};
export type MobileContext = keyof typeof MOBILE_CONTEXT;

export type HandheldManufacturer = 'UNKNOWN' | 'APPLE' | 'GOOGLE' | 'SAMSUNG';
