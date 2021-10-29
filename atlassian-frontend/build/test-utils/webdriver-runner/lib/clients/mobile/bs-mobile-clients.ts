import { DeviceMeta as Device, OSVersion } from '../../../types';

/**
 * Default mobile OS versions to run on.
 *
 * These are based on analytics usage which changes over time.
 * @see https://analytics.amplitude.com/atlassian/dashboard/aiv9477
 *
 * These versions should reflect the most widely used major version
 * for each platform. For iOS this will typically be the latest version,
 * and for Android it will typically be one or two major versions behind.
 */
export const DefaultOSVersion: { ANDROID: OSVersion; IOS: OSVersion } = {
  ANDROID: 'android 10',
  IOS: 'ios 14',
};

/**
 * Mobile Device Clients for use with BrowserStack's App Automate platform.
 *
 * https://www.browserstack.com/app-automate/capabilities
 * https://www.browserstack.com/list-of-browsers-and-platforms/app_automate
 */
function getDevicesForOSVersion(
  deviceNames: Device[],
  os: string,
  version: string,
) {
  return deviceNames.map(
    device =>
      ({
        device: device.name,
        os,
        os_version: version,
        device_form_factor: device.formFactor,
        device_resolution: device.resolution,
        device_keyboard: device.keyboard,
      } as const),
  );
}

const iOS14Devices = getDevicesForOSVersion(
  [
    {
      name: 'iPhone 12',
      formFactor: 'phone',
      keyboard: 'apple',
      resolution: {
        width: -1,
        height: -1,
      },
    },
    {
      name: 'iPad Pro 12.9 2020',
      formFactor: 'tablet',
      keyboard: 'apple',
      resolution: {
        width: 1024,
        height: 1366,
      },
    },
  ],
  'iOS',
  '14',
);

const iOS13Devices = getDevicesForOSVersion(
  [
    {
      name: 'iPhone 11 Pro',
      formFactor: 'phone',
      keyboard: 'apple',
      resolution: {
        width: 375,
        height: 812,
      },
    },
    {
      name: 'iPad Air 2019',
      formFactor: 'tablet',
      keyboard: 'apple',
      resolution: {
        width: 1112,
        height: 834,
      },
    },
  ],
  'iOS',
  '13',
);

const iOS12Devices = getDevicesForOSVersion(
  [
    {
      name: 'iPhone XS',
      formFactor: 'phone',
      keyboard: 'apple',
      resolution: {
        width: 375,
        height: 812,
      },
    },
    {
      name: 'iPad Air 2019',
      formFactor: 'tablet',
      keyboard: 'apple',
      resolution: {
        width: 1112,
        height: 834,
      },
    },
  ],
  'iOS',
  '12',
);

// Android 11 (API 30)
const android11Devices = getDevicesForOSVersion(
  [
    {
      name: 'Google Pixel 4',
      formFactor: 'phone',
      keyboard: 'gboard',
      resolution: {
        width: 411,
        height: 896,
      },
    },
  ],
  'Android',
  '11.0',
);

// Android 10 (API 29)
const android10Devices = getDevicesForOSVersion(
  [
    {
      name: 'Samsung Galaxy S20',
      formFactor: 'phone',
      keyboard: 'samsung',
      resolution: {
        width: 360,
        height: 760,
      },
    },
    {
      name: 'Google Pixel 4',
      formFactor: 'phone',
      keyboard: 'gboard',
      resolution: {
        width: 411,
        height: 896,
      },
    },
    {
      name: 'Samsung Galaxy Tab S10',
      formFactor: 'tablet',
      keyboard: 'samsung',
      resolution: {
        width: -1,
        height: -1,
      },
    },
  ],
  'Android',
  '10.0',
);

// Android 9: Pie (API 28)
const android9Devices = getDevicesForOSVersion(
  [
    {
      name: 'Samsung Galaxy S10',
      formFactor: 'phone',
      keyboard: 'samsung',
      resolution: {
        width: 360,
        height: 760,
      },
    },
    {
      name: 'Google Pixel 3',
      formFactor: 'phone',
      keyboard: 'gboard',
      resolution: {
        width: 393,
        height: 786,
      },
    },
    {
      name: 'Samsung Galaxy Tab S6',
      formFactor: 'tablet',
      keyboard: 'samsung',
      resolution: {
        width: 712,
        height: 970,
      },
    },
  ],
  'Android',
  '9.0',
);

// Android 8: Oreo (API 26-27)
const android8Devices = getDevicesForOSVersion(
  [
    {
      name: 'Samsung Galaxy S9',
      formFactor: 'phone',
      keyboard: 'samsung',
      resolution: {
        width: 360,
        height: 760,
      },
    },
    {
      name: 'Google Pixel 3',
      formFactor: 'phone',
      keyboard: 'gboard',
      resolution: {
        width: 412,
        height: 640,
      },
    },
    {
      name: 'Samsung Galaxy Tab S4',
      formFactor: 'tablet',
      keyboard: 'samsung',
      resolution: {
        width: -1,
        height: -1,
      },
    },
  ],
  'Android',
  '8.0',
);

// Android 7: Nougart (API 24-25)
const android7Devices = getDevicesForOSVersion(
  [
    {
      name: 'Samsung Galaxy S8',
      formFactor: 'phone',
      keyboard: 'samsung',
      resolution: {
        width: 360,
        height: 740,
      },
    },
    {
      name: 'Google Pixel',
      formFactor: 'phone',
      keyboard: 'gboard',
      resolution: {
        width: 360,
        height: 640,
      },
    },
    {
      name: 'Samsung Galaxy Tab S3',
      formFactor: 'tablet',
      keyboard: 'samsung',
      resolution: {
        width: 800,
        height: 1280,
      },
    },
  ],
  'Android',
  '7.0',
);

// Android 6: Marshmellow (API 23)
const android6Devices = getDevicesForOSVersion(
  [
    {
      name: 'Samsung Galaxy S7',
      formFactor: 'phone',
      keyboard: 'samsung',
      resolution: {
        width: 360,
        height: 640,
      },
    },
    {
      name: 'Google Nexus 6',
      formFactor: 'phone',
      keyboard: 'gboard',
      resolution: {
        width: 360,
        height: 640,
      },
    },
  ],
  'Android',
  '6.0',
);

// See OS Version usage statistics here: https://analytics.amplitude.com/atlassian/dashboard/aiv9477
const mobileDeviceClients = [
  ...iOS14Devices,
  ...iOS13Devices,
  ...iOS12Devices,
  ...android11Devices,
  ...android10Devices,
  ...android9Devices,
  ...android8Devices,
  ...android7Devices,
  ...android6Devices,
];

export default mobileDeviceClients;
