import {
  BrowserTestCaseOptions,
  MobileTestCaseOptions,
  Browser,
} from '../../types';
import { getBlendedMobileOptions } from './mobile/mobile-options';
import {
  filterClientsByPlatform,
  filterClientsByPlatformVersion,
  filterClientsByFormFactor,
  filterClientsByKeyboard,
} from './mobile/client-filters';

/**
 * Filter out the skipped clients from the supported clients list
 * for use in a test run.
 *
 * Note that `client.browserName` is in the form of "<OS> <browser> <version>",
 * where as the `skip[n]` is in the form of just `<browser>`.
 */
const clientsFilter = (skip: string[]) => (client: any) => {
  if (!client || !client.browserName) {
    return false;
  }
  const browserName = client.browserName.toLowerCase();
  const shouldSkip = skip.find(browser =>
    browserName.includes(browser.toLowerCase()),
  );
  return !shouldSkip;
};

/**
 * Get clients for use with `BrowserTestCase`.
 *
 * @param clients An array of WD client capability configurations
 * @param options Optional configuration object for skipping browsers
 */
export function getBrowserTestCaseClients(
  clients: any[],
  options: BrowserTestCaseOptions = {},
) {
  let skip = options.skip ?? [];
  if (skip.includes('*')) {
    // Wilcard: skip all browsers, which skips the test(s) entirely.
    console.warn(
      `Test skipped due to use of '*' wildcard in browser \`skip\` array: [${skip}]`,
    );
    skip = skipAllBrowsers(clients);
  }
  // Desktop clients are a blended mix of stable and beta browsers
  // so we explicitly opt out of beta ones here.
  // For beta testing use `getBetaBrowserTestCaseClients`
  return clients.filter(clientsFilter([...skip, 'beta']));
}

/**
 * Get clients for use with `BetaBrowserTestCase`.
 *
 * @see https://product-fabric.atlassian.net/wiki/spaces/AFP/pages/1267927783/DACI+Should+we+enable+Beta+Browser+testing+by+default
 *
 * @param clients An array of WD client capability configurations
 * @param options Optional configuration object for skipping browsers
 */
export function getBetaBrowserTestCaseClients(
  clients: any[],
  options: BrowserTestCaseOptions = {},
) {
  let skip = options.skip ?? [];
  if (skip.includes('*')) {
    skip = skipAllBrowsers(clients);
  }
  return clients.filter(clientsFilter(skip));
}

/**
 * Get clients for use with `MobileTestCase`.
 *
 * By default we run on as few devices as possible. This means running
 * only on the most widely used Android and iOS versions as per our usage
 * analytics. You can opt in and out of additional devices/platforms using
 * the options object.
 *
 * @param clients An array of WD client capability configurations
 * @param options Optional configuration object for skipping or targetting devices
 */
export function getMobileTestCaseClients(
  clients: any[],
  options: MobileTestCaseOptions = {},
) {
  // Blend defaults with test specific overrides
  options = getBlendedMobileOptions(options);

  /*
    Multi-step filtering is performed to accomodate the complex options for
    opting in or out of specific devices.

    The order of these filters is performance driven to filter out undesired
    devices earlier (in the case of multiple options provided).

    Essentially `platform > versions > formFactors > keyboards`.
  */
  return clients
    .filter(filterClientsByPlatform(options))
    .filter(filterClientsByPlatformVersion(options))
    .filter(filterClientsByFormFactor(options))
    .filter(filterClientsByKeyboard(options));
}

const skipAllBrowsers = (clients: any[]): Browser[] => {
  return clients.map(
    client => client.options.capabilities.browserName as Browser,
  );
};
