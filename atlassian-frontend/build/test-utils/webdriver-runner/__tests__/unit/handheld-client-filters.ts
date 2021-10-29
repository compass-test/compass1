import { setBrowserStackMobileClients } from '../../lib/clients/setup-clients';
import {
  filterClientsByPlatform,
  filterClientsByPlatformVersion,
  filterClientsByFormFactor,
  filterClientsByKeyboard,
  ClientsFilter,
} from '../../lib/clients/mobile/client-filters';
import { MobileTestCaseOptions } from '../../types/';

function flattenClientToDeviceName(clients: any[]) {
  return clients.map(client => {
    const { os, os_version, device } = client.options.capabilities;
    return `${os} ${os_version} ${device}`;
  });
}

const clients = setBrowserStackMobileClients();

function snapshot(filterFunc: ClientsFilter, options: MobileTestCaseOptions) {
  const filtered = clients.filter(filterFunc(options));
  return flattenClientToDeviceName(filtered);
}

describe('BrowserStack', () => {
  describe('filterClientsByPlatform', () => {
    it('should skip entire platform', () => {
      const iosOnly = snapshot(filterClientsByPlatform, {
        skipPlatform: ['android'],
      });
      expect(iosOnly).toMatchSnapshot('iOS only');
      const androidOnly = snapshot(filterClientsByPlatform, {
        skipPlatform: ['ios'],
      });
      expect(androidOnly).toMatchSnapshot('Android only');
    });

    it('should skip all platforms', () => {
      const devices = snapshot(filterClientsByPlatform, {
        skipPlatform: ['android', 'ios'],
      });
      expect(devices.length).toBe(0);
    });

    it('should not skip when not used', () => {
      const emptyArray = snapshot(filterClientsByPlatform, {
        skipPlatform: [],
      });
      expect(emptyArray.length).toBe(clients.length);
      const explicitUndefined = snapshot(filterClientsByPlatform, {
        skipPlatform: undefined,
      });
      expect(explicitUndefined.length).toBe(clients.length);
      const undefinedParam = snapshot(filterClientsByPlatform, {});
      expect(undefinedParam.length).toBe(clients.length);
    });
  });

  describe('filterClientsByPlatformVersion', () => {
    it('should filter out the default version key when provided directly', () => {
      const filtered = snapshot(filterClientsByPlatformVersion, {
        versions: ['DEFAULT'],
      });
      expect(filtered.length).toBe(clients.length);
    });

    it('should target specific versions', () => {
      const filtered = snapshot(filterClientsByPlatformVersion, {
        versions: ['ios 12', 'android 9'],
      });
      expect(filtered).toMatchSnapshot();
    });

    it('should not skip when not used', () => {
      const emptyArray = snapshot(filterClientsByPlatformVersion, {
        versions: [],
      });
      expect(emptyArray.length).toBe(clients.length);
      const explicitUndefined = snapshot(filterClientsByPlatformVersion, {
        versions: undefined,
      });
      expect(explicitUndefined.length).toBe(clients.length);
      const undefinedParam = snapshot(filterClientsByPlatformVersion, {});
      expect(undefinedParam.length).toBe(clients.length);
    });
  });

  describe('filterClientsByFormFactor', () => {
    it('should target specific form factor devices', () => {
      const phonesOnly = snapshot(filterClientsByFormFactor, {
        formFactors: ['phone'],
      });
      expect(phonesOnly).toMatchSnapshot('Phones only');
      const tabletsOnly = snapshot(filterClientsByFormFactor, {
        formFactors: ['tablet'],
      });
      expect(tabletsOnly).toMatchSnapshot('Tablets only');
      const phonesAndTablets = snapshot(filterClientsByFormFactor, {
        formFactors: ['phone', 'tablet'],
      });
      expect(phonesAndTablets).toMatchSnapshot('Phones & Tablets');
    });

    it('should not skip when not used', () => {
      const emptyArray = snapshot(filterClientsByFormFactor, {
        formFactors: [],
      });
      expect(emptyArray.length).toBe(clients.length);
      const explicitUndefined = snapshot(filterClientsByFormFactor, {
        formFactors: undefined,
      });
      expect(explicitUndefined.length).toBe(clients.length);
      const undefinedParam = snapshot(filterClientsByFormFactor, {});
      expect(undefinedParam.length).toBe(clients.length);
    });
  });

  describe('filterClientsByKeyboard', () => {
    it('should target specific keyboards', () => {
      const samsung = snapshot(filterClientsByKeyboard, {
        keyboards: ['samsung'],
      });
      expect(samsung).toMatchSnapshot('Samsung only');
      const appleGoogle = snapshot(filterClientsByKeyboard, {
        keyboards: ['apple', 'gboard'],
      });
      expect(appleGoogle).toMatchSnapshot('Apple & Google');
    });

    it('should not skip when not used', () => {
      const emptyArray = snapshot(filterClientsByKeyboard, {
        keyboards: [],
      });
      expect(emptyArray.length).toBe(clients.length);
      const explicitUndefined = snapshot(filterClientsByKeyboard, {
        keyboards: undefined,
      });
      expect(explicitUndefined.length).toBe(clients.length);
      const undefinedParam = snapshot(filterClientsByKeyboard, {});
      expect(undefinedParam.length).toBe(clients.length);
    });
  });
});
