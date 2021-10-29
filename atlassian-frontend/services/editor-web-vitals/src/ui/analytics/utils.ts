import { envType, platformType } from '@atlassiansox/analytics-web-client';

export const isMobileUserAgent = (): boolean => {
  // Copied from confluence-frontend repo, from file "next/packages/mobile-detection/src/MobileDetection.ts".
  const MOBILE_USER_AGENT_REGEX = /(iPhone;|iPad;|iPhone Simulator;|iPod;|iPod touch;|Linux; U; Android)/i;
  const ANDROID_CHROME = /Chrome\/[.\d]* Mobile/i;
  const OLD_ANDROID = /Linux; U; Android (?:[23]\.\d|4\.0\.[12])/i;

  const ua = window.navigator.userAgent;

  return (
    !!ua &&
    !OLD_ANDROID.test(ua) &&
    (MOBILE_USER_AGENT_REGEX.test(ua) || ANDROID_CHROME.test(ua))
  );
};

export const getPlatformType = (): typeof platformType => {
  return isMobileUserAgent() ? platformType.MOBILE_WEB : platformType.WEB;
};

export const getEnvironmentFromOrigin = () => {
  // Atlassian frontend service has no global variable exposed for environemnt.
  // Neither we have route to call and get session info at the moment.
  if (/\.ap-southeast-2.dev/.test(window.location.origin)) {
    return envType.PROD;
  } else if (/\.us-west-2.dev/.test(window.location.origin)) {
    return envType.PROD;
  } else if (/\/\/localhost/.test(window.location.origin)) {
    return envType.DEV;
  }
  // If it's an unknown origin, then be safe and set dev environment
  return envType.DEV;
};

export const getBuildInfo = () => {
  // Currently VERSION is hard coded and taken from package.json.
  return {
    VERSION: '1.0.2',
  };
};
