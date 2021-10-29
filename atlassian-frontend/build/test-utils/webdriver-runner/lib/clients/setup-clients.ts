import mobileDeviceClients from './mobile/bs-mobile-clients';
import {
  MOBILE_PLATFORM,
  ANDROID_APP_ID,
  IOS_APP_ID,
} from './mobile/native-app';
import {
  getSessionIdentifier,
  getLocalIdentifier,
} from './desktop/browserstack';
import { Capabilities, Launcher } from '../../types';

const { LANDKID } = process.env;

// BrowserStack session IDs
const BS_LOCAL_ID = getLocalIdentifier();
const BS_SESSION_ID = getSessionIdentifier();

/**
 * To prevent tests interfering with each other, the queue enforces a single test running
 * at a time within each environment.
 *
 * This string identifier is used to determine whether two tests are attempting to run in
 * the same environment at the same time.
 *
 * Consider this:
 *
 * If you ran Chrome on both Windows and Mac OS, using 'Chrome' as the Id would mean both
 * systems couldn't run in parallel, where as 'Chrome Win' and 'Chrome Mac' are unique, so
 * both platforms could run at the same time without concern.
 *
 * A descriptive identifier is even more useful for mobile testing. 'iOS' or 'Safari Mobile'
 * would be inefficient, reducing us to runnong on a single handheld device at a time,
 * compared to 'iOS 12 on iPhone XS' and 'iOS 13 on iPhone XS' allowing us to run in parallel
 * on separate devices.
 */
function getQueueIdentifier(env: Capabilities) {
  const {
    os,
    os_version: osVersion,
    browserName,
    device: deviceName,
    browser_version: browserVersion,
  } = env;
  // `browserName` is used for desktop, and `device` is used for mobile.
  const name = browserName || deviceName;
  // `browserVersion` is applicable for desktop, but static for mobile (bound to `osVersion`).
  const version = browserVersion ? ` ${browserVersion}` : '';
  return `${os} ${osVersion} ${name}${version}`;
}

/**
 * Desktop Browser Clients for use with BrowserStack's Automate platform.
 *
 * https://www.browserstack.com/automate/capabilities
 */
export function setBrowserStackDesktopClients(): Object[] {
  const RESOLUTION = '1920x1080';

  let launchers: Launcher[] = [
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'chrome',
      browser_version: '94.0',
      'browserstack.selenium_version': '2.53.0',
      resolution: RESOLUTION,
    },
  ];

  if (LANDKID) {
    process.env.BITBUCKET_BRANCH = 'Landkid';
  } else {
    launchers = [
      ...launchers,
      {
        os: 'Windows',
        os_version: '10',
        browserName: 'firefox',
        browser_version: '92.0',
        'browserstack.selenium_version': '4.0.0-alpha-1',
        resolution: RESOLUTION,
      },
      {
        os: 'OS X',
        os_version: 'Big Sur',
        browserName: 'Safari' as any,
        browser_version: '14.0',
        'browserstack.selenium_version': '4.0.0-alpha-1',
        resolution: RESOLUTION,
        'browserstack.networkLogs': 'true',
      },
      {
        name: 'edge',
        os: 'Windows',
        os_version: '10',
        browserName: 'edge',
        browser_version: '94.0',
        'browserstack.selenium_version': '4.0.0-alpha-1',
        resolution: RESOLUTION,
      },
    ];
  }

  return generateBrowserstackClients(launchers);
}

export function setBetaBrowserStackDesktopClients() {
  if (!process.env.CI && !process.env.BETA_BROWSERS) {
    process.env.BETA_BROWSERS = '[]';
  }
  let betaBrowserLaunchers = process.env.BETA_BROWSERS as any;
  try {
    betaBrowserLaunchers = JSON.parse(process.env.BETA_BROWSERS!);
  } catch {
    betaBrowserLaunchers = [];
  }

  return generateBrowserstackClients(betaBrowserLaunchers);
}

/**
 * Mobile Device Clients for use with BrowserStack's App Automate platform.
 *
 * https://www.browserstack.com/app-automate/capabilities
 * https://www.browserstack.com/list-of-browsers-and-platforms/app_automate
 * https://www.browserstack.com/local-testing/app-automate
 */
export function setBrowserStackMobileClients(
  clients = mobileDeviceClients,
): Object[] {
  const commonProps: Launcher = {
    real_mobile: 'true',
    'browserstack.appiumLogs': true,
    'browserstack.networkLogs': true,
  };
  const androidProps: Launcher = {
    os: 'android',
    'browserstack.appium_version': '1.19.1',
    app: ANDROID_APP_ID,
  };
  const iosProps: Launcher = {
    os: 'ios',
    'browserstack.appium_version': '1.19.1',
    app: IOS_APP_ID,
  };

  const launchers: Launcher[] = clients.map(device => ({
    ...commonProps,
    ...(device.os === MOBILE_PLATFORM.IOS ? iosProps : androidProps),
    ...device,
  }));

  return generateBrowserstackClients(launchers);
}

/**
 * Common configuration for running on BrowserStack.
 */
function generateBrowserstackClients(launchers: Launcher[] = []): Object[] {
  return launchers.map(launcher => ({
    browserName: getQueueIdentifier(launcher),
    options: {
      capabilities: {
        os: launcher.os,
        os_version: launcher.os_version,
        browser: launcher.browser,
        browserName: launcher.browserName,
        browserVersion: launcher.browser_version,
        device: launcher.device,
        deviceOrientation: launcher.device_orientation,
        real_mobile: launcher.real_mobile,
        app: launcher.app,
        project: 'Atlassian Frontend Webdriver Tests',
        build: BS_SESSION_ID,
        'browserstack.local': true,
        'browserstack.debug': true,
        'browserstack.idleTimeout': 300,
        'browserstack.console': 'errors',
        'browserstack.localIdentifier': BS_LOCAL_ID,
        'browserstack.appium_version': launcher['browserstack.appium_version'],
        'browserstack.appiumLogs': launcher['browserstack.appiumLogs'],
        'browserstack.networkLogs': launcher['browserstack.networkLogs'],
        'browserstack.networkProfile': launcher['browserstack.networkProfile'],
        'browserstack.selenium_version':
          launcher['browserstack.selenium_version'],
        resolution: launcher.resolution,
        acceptSslCerts: true,
        ...launcher,
      },
      logLevel: 'error',
      user: process.env.BROWSERSTACK_USERNAME || '',
      key: process.env.BROWSERSTACK_KEY || '',
      waitforTimeout: 3000,
    },
  }));
}

/**
 * Chromedriver client for local machine testing.
 */
export function setLocalClients() /*: Array<?Object>*/ {
  // eslint-disable-next-line global-require
  const { port } = require('./desktop/chrome-driver');
  const chromeOptions = ['--window-size=1920,1200'];

  // Headless by default unless there is an explicit opt-out.
  const headed = process.env.HEADLESS === 'false';
  if (!headed) {
    chromeOptions.push('--headless');
  }

  // open devtools by default
  const devtools = process.env.DEVTOOLS === 'true';
  if (!devtools) {
    chromeOptions.push('--auto-open-devtools-for-tabs');
  }

  const options = {
    port,
    logLevel: 'error',
    hostname: 'localhost',
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        w3c: false,
        args: chromeOptions,
      },
    },
  };
  return [{ browserName: 'chrome', options }];
}
