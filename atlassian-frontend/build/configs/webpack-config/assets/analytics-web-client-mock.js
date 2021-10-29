/* eslint-disable class-methods-use-this */

const warned = new Set();
const noop = () => {};

const warn = key => {
  if (!warned.has('constructor')) {
    console.warn(
      `${key} is a noop during testing. Please don't rely on analytics-web-client without checking for undefined.`,
    );
  } else {
    warned.add(key);
  }
};

console.warn(
  'Please refrain from using this mock. This is meant to allow Visual Regressions test to pass while bringing over Analytics Web Client to Atlassian Frontend',
);

// Note: Technically speaking, there are other methods in AnalyticsWebClient so this isn't a perfect mock
class AnalyticsWebClientMock {
  constructor() {
    warn('new AnalyticsWebClient()');
  }

  sendScreenEvent(...args) {
    warn(`sendScreenEvent(${args})`);
    return noop;
  }

  sendUIEvent(...args) {
    warn(`sendUIEvent(${args})`);
    return noop;
  }

  sendTrackEvent(...args) {
    warn(`sendTrackEvent(${args})`);
    return noop;
  }

  sendOperationalEvent(...args) {
    warn(`sendOperationalEvent(${args})`);
    return noop;
  }

  setTenantInfo(...args) {
    warn(`setTenantInfo(${args})`);
    return noop;
  }

  setUserInfo(...args) {
    warn(`setUserInfo(${args})`);
    return noop;
  }
}

/*
 TODO: Would be a more accurate mock if we rexported from @atlassiansox/analytics-web-client instead
 */
export const envType = {
  get LOCAL() {
    warn('envType.LOCAL');
    return 'local';
  },
  get DEV() {
    warn('envType.DEV');
    return 'dev';
  },
};

export const tenantType = {
  get CLOUD_ID() {
    warn('tenantType.CLOUD_ID');
    return 'TEST--00000000-0000-0000-0000-000000000000';
  },
};

export const userType = {
  get ATLASSIAN_ACCOUNT() {
    warn('userType.ATLASSIAN_ACCOUNT');
    return '000000000000000000000000';
  },
};

export const eventType = {
  get UI() {
    warn('eventType.UI');
    return 'ui';
  },
  get TRACK() {
    warn('eventType.TRACK');
    return 'track';
  },
  get OPERATIONAL() {
    warn('eventType.OPERATIONAL');
    return 'operational';
  },
  get SCREEN() {
    warn('eventType.SCREEN');
    return 'screen';
  },
};

export const CompressionRule = {};
export const originType = {};
export const platformType = {};

export default AnalyticsWebClientMock;
