/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */

/*
 * Setup webdriver clients depending on environment on which the test is run against.
 * BrowserTestCase is customized wrapper over jest-test-runner handling test setup, execution and
 * teardown for webdriver tests .
 */
// increase default jasmine timeout not to fail on webdriver tests as tests run can
// take a while depending on the number of threads executing.

// increase this time out to handle queuing on browserstack
// eslint-disable-next-line no-undef
// @ts-ignore
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
// This timeout is in ms, so it is around 16 mins.
// TODO: Once the media-resize test is fixed please revert to 10 mins or 5 mins.
// TODO: Discuss with Sasha from Editor Media to update the media-resize to full VR or split the test again.
const isBrowserStack = process.env.TEST_ENV === 'browserstack';
const isBrowserStackMobile = process.env.TEST_ENV === 'browserstack_mobile';
import path from 'path';
import Queue from 'promise-queue';
import { remote } from 'webdriverio';
import {
  setBrowserStackDesktopClients,
  setBetaBrowserStackDesktopClients,
  setBrowserStackMobileClients,
  setLocalClients,
} from '../clients/setup-clients';
import {
  getBrowserTestCaseClients,
  getBetaBrowserTestCaseClients,
  getMobileTestCaseClients,
} from '../clients/client-filters';
import initBrowserStackReporter from '../reporting/browserstack-reporter';
import {
  Capabilities,
  BrowserTestCaseOptions,
  MobileTestCaseOptions,
  Browser,
} from '../../types';

export type { Browser, BrowserTestCaseOptions };

let clients: Object[] = [];

if (isBrowserStackMobile) {
  clients = setBrowserStackMobileClients();
} else if (isBrowserStack) {
  const normalClients = setBrowserStackDesktopClients();
  const betaClients = setBetaBrowserStackDesktopClients();
  clients = [...normalClients, ...betaClients];
} else {
  clients = setLocalClients();
}
const displayBrowserName = (browserName: string) =>
  browserName.replace(/^\w/, cb => cb.toUpperCase());

const getBrowserDetails = (browserName: string, capabilities: Capabilities) => {
  const {
    os,
    os_version: osVersion,
    device,
    real_mobile: realMobile,
  } = capabilities;
  if (realMobile) {
    return `${os} ${osVersion} on ${device}`;
  }
  return `${displayBrowserName(browserName)}`;
};

const browserstackReporter = (() => {
  if (isBrowserStack || isBrowserStackMobile) {
    const bsReporter = initBrowserStackReporter();
    // @ts-ignore
    jasmine.getEnv().addReporter(bsReporter.reporter);
    return bsReporter;
  }
  return undefined;
})();

const launchClient = (client: any) => {
  if (client && client.driver && client.driver.sessionId) {
    return client.driver;
  }

  if (isBrowserStack) {
    client.options.capabilities.name = fileName;
  }

  const init = remote(client.options);
  client.queue = new Queue(1, 180);

  // @ts-ignore
  init.then(driver => {
    driver.capabilities.os = client.options.capabilities.os;
    client.driver = driver;

    if (browserstackReporter) {
      const browserLabel = getBrowserDetails(
        client.browserName,
        client.options.capabilities,
      );
      browserstackReporter.addDriver(browserLabel, driver);
    }
  });

  return init;
};

const endSession = (client: any) => {
  if (!client || !client.driver) {
    return Promise.resolve();
  }

  return client.driver.deleteSession();
};

// Some files due to their nesting structure would need to be found by either `module.parent!.parent!.filename` or `module.parent!.filename`.
let fileName = '';
try {
  if (module.parent!.parent) {
    fileName = path.basename(module.parent!.parent!.filename);
  } else {
    fileName = path.basename(module.parent!.filename);
  }
} catch (err) {
  console.error('Issue to find the filename', err);
}

const launchedDrivers: any = {};
const launchedClients: any[] = [];

/**
 * Runs after all the test cases within a file have finished.
 *
 * Disconnects the session to the browser/device.
 */
// eslint-disable-next-line func-names
// @ts-ignore
afterAll(async function () {
  await Promise.all(launchedClients.map(endSession));
});

type Tester = (client: any, testCase: string) => Promise<any>;

function testCase(testName: string, tester: Tester, execClients: any[]) {
  // This label is used for the test name within BrowserStack’s session dashboard.
  // @ts-ignore
  describe(fileName, () => {
    if (!execClients.length) {
      // @ts-ignore
      test.skip(testName, () => {});
      return;
    }

    for (const c of execClients) {
      const client = c || {};
      const testCode = async () => tester(client.driver, testName);

      if (!launchedDrivers[client.browserName]) {
        launchedDrivers[client.browserName] = launchClient(client);
        launchedClients.push(client);
      }

      const browserLabel = getBrowserDetails(
        client.browserName,
        client.options.capabilities,
      );
      // eslint-disable-next-line no-loop-func
      // @ts-ignore
      describe(browserLabel, () => {
        // @ts-ignore
        test(testName, async () => {
          // Wait until the driver is ready before running the test
          await launchedDrivers[client.browserName];

          // The queue enforces running a single test case at a time per
          // desktop browser, or per mobile device.
          // (For each unique value of `client.browserName`)
          return client.queue.add(testCode);
        });
      });
    }
  });
}

// Test on a desktop browser
export function BrowserTestCase(
  testName: string,
  options: BrowserTestCaseOptions,
  tester: Tester,
) {
  const execClients = getBrowserTestCaseClients(clients, options);
  testCase(testName, tester, execClients);
}

// Test on a beta version of a desktop browser
// See https://product-fabric.atlassian.net/wiki/spaces/AFP/pages/1267927783/DACI+Should+we+enable+Beta+Browser+testing+by+default
export function BetaBrowserTestCase(
  testName: string,
  options: BrowserTestCaseOptions,
  tester: Tester,
) {
  const execClients = getBetaBrowserTestCaseClients(clients, options);
  testCase(testName, tester, execClients);
}

// Test on a physical mobile device
export function MobileTestCase(
  testName: string,
  options: MobileTestCaseOptions,
  tester: Tester,
) {
  const execClients = getMobileTestCaseClients(clients, options);
  testCase(testName, tester, execClients);
}
// @ts-ignore
expect.extend({
  toMatchDocSnapshot() {
    throw new Error('Please use toMatchCustomDocSnapshot on integration tests');
  },

  toMatchSnapshot() {
    throw new Error('Please use toMatchCustomSnapshot on integration tests');
  },
});
