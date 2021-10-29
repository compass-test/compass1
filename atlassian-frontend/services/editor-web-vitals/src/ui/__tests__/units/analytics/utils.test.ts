import { envType, platformType } from '@atlassiansox/analytics-web-client';

import {
  isMobileUserAgent,
  getEnvironmentFromOrigin,
  getPlatformType,
} from '../../../analytics/utils';

describe('isMobileUserAgent and getPlatformType', () => {
  let originalNavigator: Navigator;
  let mockUserAgent = '';
  beforeEach(() => {
    originalNavigator = window.navigator;

    // @ts-ignore
    delete window.navigator;
    // @ts-ignore
    window.navigator = {};

    Object.defineProperty(window.navigator, 'userAgent', {
      get() {
        return mockUserAgent;
      },
    });
  });

  afterEach(() => {
    // @ts-ignore
    window.navigator = originalNavigator;
  });

  it('should return isMobileUserAgent:false and getPlatformType:WEB, when user agent string does not exist', () => {
    expect(isMobileUserAgent()).toBe(false);
    expect(getPlatformType()).toBe(platformType.WEB);
  });

  it('should return isMobileUserAgent:false and getPlatformType:WEB, on old android User Agent', () => {
    mockUserAgent = 'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us;';
    expect(isMobileUserAgent()).toBe(false);
    expect(getPlatformType()).toBe(platformType.WEB);
  });

  it('should return isMobileUserAgent:false and getPlatformType:MOBILE_WEB, on newer android, chrome mobile, or iphone User Agent', () => {
    mockUserAgent = 'Mozilla/5.0 (Linux; U; Android 4.0.0; en-us;';
    expect(isMobileUserAgent()).toBe(true);
    expect(getPlatformType()).toBe(platformType.MOBILE_WEB);

    mockUserAgent = 'iPhone;';
    expect(isMobileUserAgent()).toBe(true);
    expect(getPlatformType()).toBe(platformType.MOBILE_WEB);

    mockUserAgent =
      'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19';
    expect(isMobileUserAgent()).toBe(true);
    expect(getPlatformType()).toBe(platformType.MOBILE_WEB);
  });
});

describe('getEnvironmentFromOrigin', () => {
  let originalLocation: Location;
  let mockLocationOrigin = '';
  const locationOriginFunc = jest.fn(() => mockLocationOrigin);

  beforeEach(() => {
    originalLocation = window.location;

    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {};

    Object.defineProperty(window.location, 'origin', {
      get() {
        return locationOriginFunc();
      },
    });
  });

  afterEach(() => {
    // @ts-ignore
    window.location = originalLocation;
  });

  it('should return DEV for unknown origin and localhost', () => {
    expect(getEnvironmentFromOrigin()).toBe(envType.DEV);

    mockLocationOrigin = 'http:localhost:9001';
    expect(getEnvironmentFromOrigin()).toBe(envType.DEV);
  });

  it('should return DEV for localhost', () => {
    expect(getEnvironmentFromOrigin()).toBe(envType.DEV);
  });

  // Check README.md for service url for ddev and dev-west2 environment.
  //  Checking against those urls in below unit test.
  it('should return PROD for ddev and dev-west2 micros env', () => {
    mockLocationOrigin =
      'https://editor-web-vitals.ap-southeast-2.dev.atl-paas.net';
    expect(getEnvironmentFromOrigin()).toBe(envType.PROD);

    mockLocationOrigin = 'https://editor-web-vitals.us-west-2.dev.atl-paas.net';
    expect(getEnvironmentFromOrigin()).toBe(envType.PROD);
  });
});
