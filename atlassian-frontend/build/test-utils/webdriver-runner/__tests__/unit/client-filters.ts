import {
  getBrowserTestCaseClients,
  getBetaBrowserTestCaseClients,
  getMobileTestCaseClients,
} from '../../lib/clients/client-filters';
import {
  setBrowserStackDesktopClients,
  setBetaBrowserStackDesktopClients,
  setBrowserStackMobileClients,
} from '../../lib/clients/setup-clients';

function flattenClientToBrowserName(clients: any[]) {
  return clients.map(client => {
    const { capabilities } = client.options;
    return capabilities.browserName.toLowerCase();
  });
}

function flattenClientToBrowserVersion(clients: any[]) {
  return clients.map(client => {
    const { browserName, browserVersion } = client.options.capabilities;
    return `${browserName}${
      browserVersion.includes('beta') ? ' beta' : ' stable'
    }`;
  });
}

function flattenClientToDeviceName(clients: any[]) {
  return clients.map(client => {
    const { os, os_version, device } = client.options.capabilities;
    return `${os} ${os_version} ${device}`;
  });
}

describe('BrowserStack', () => {
  // Desktop Browsers
  describe('getBrowserTestCaseClients', () => {
    const clients = setBrowserStackDesktopClients();
    it('should include only desktop browsers', () => {
      const execClients = getBrowserTestCaseClients(clients);
      const browsers = flattenClientToBrowserName(execClients);
      expect(browsers).toMatchSnapshot();
    });

    it('should filter out browser(s) when skipped via test case options', () => {
      const execClients = getBrowserTestCaseClients(clients, {
        skip: ['chrome'],
      });
      const browsers = flattenClientToBrowserName(execClients);
      expect(browsers).toMatchSnapshot();
    });

    it('should filter out all browsers when wildcard is passed via test case options', () => {
      const execClients = getBrowserTestCaseClients(clients, {
        skip: ['*'],
      });
      const browsers = flattenClientToBrowserName(execClients);
      expect(browsers).toMatchSnapshot();
    });

    it('should ignore invalid skipped browsers via test case options', () => {
      // @ts-ignore deliberately testing invalid browser name since this package is hybrid JS/TS.
      const execClients = getBrowserTestCaseClients(clients, { skip: ['foo'] });
      const browsers = flattenClientToBrowserName(execClients);
      expect(browsers).toMatchSnapshot();
    });
  });

  // Beta Desktop Browsers
  describe('getBetaBrowserTestCaseClients', () => {
    let originalBetaBrowsers = '';
    let clients: any[];

    beforeAll(() => {
      originalBetaBrowsers = process.env.BETA_BROWSERS || '';
      process.env.BETA_BROWSERS = `[{"os":"Windows","os_version":"10","browserName":"chrome","browser_version":"85.0 beta","RESOLUTION":"1920x1080"}]`;
      clients = setBetaBrowserStackDesktopClients();
    });

    it('should include only beta desktop browsers', () => {
      const execClients = getBetaBrowserTestCaseClients(clients);
      const browsers = flattenClientToBrowserVersion(execClients);
      expect(browsers).toMatchSnapshot();
    });

    afterAll(() => {
      process.env.BETA_BROWSERS = originalBetaBrowsers;
    });
  });

  // Mobile Browsers
  describe('getMobileTestCaseClients', () => {
    const clients = setBrowserStackMobileClients();
    it('should include a single iOS and Android device by default', () => {
      const execClients = getMobileTestCaseClients(clients);
      const browsers = flattenClientToDeviceName(execClients);
      expect(browsers).toMatchSnapshot();
    });

    it(`should augment additional devices when the 'DEFAULT' value is provided in options.versions`, () => {
      const execClients = getMobileTestCaseClients(clients, {
        versions: ['DEFAULT', 'ios 12'],
      });
      const browsers = flattenClientToDeviceName(execClients);
      expect(browsers).toMatchSnapshot();
    });

    it('should filter out platform and version based on skip options', () => {
      const execClients = getMobileTestCaseClients(clients, {
        skipPlatform: ['ios'],
        versions: ['DEFAULT', 'ios 12'],
      });
      const browsers = flattenClientToDeviceName(execClients);
      expect(browsers).toMatchSnapshot();
    });

    it('should filter out all platforms if wildcard is provided via skip options', () => {
      const execClients = getMobileTestCaseClients(clients, {
        skipPlatform: ['*'],
      });
      const browsers = flattenClientToDeviceName(execClients);
      expect(browsers).toMatchSnapshot();
    });

    it('should only target tablet devices', () => {
      const execClients = getMobileTestCaseClients(clients, {
        formFactors: ['tablet'],
      });
      const browsers = flattenClientToDeviceName(execClients);
      expect(browsers).toMatchSnapshot();
    });

    it('should only target samsung devices', () => {
      const execClients = getMobileTestCaseClients(clients, {
        skipPlatform: ['ios'],
        keyboards: ['samsung'],
      });
      const browsers = flattenClientToDeviceName(execClients);
      expect(browsers).toMatchSnapshot();
    });
  });
});
