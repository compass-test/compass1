import { Page, devices, CDPSession, Device, Protocol } from 'puppeteer';

/**
 * Connect to Chrome Dev Tools via a CDP Session.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/
 */
export async function getDevToolsClient(page: Page): Promise<CDPSession> {
  return page.target().createCDPSession();
}

/**
 * Throttle Network Connection Speed (Emulated)
 *
 * https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-emulateNetworkConditions
 *
 * @param client Dev tools client
 * @param preset Preset to use instead of default values (e.g. NETWORK_PRESETS)
 * @param downloadKbps Maximal aggregated download throughput (bytes/sec). -1 disables download throttling.
 * @param uploadKbps Maximal aggregated upload throughput (bytes/sec). -1 disables upload throttling.
 * @param latencyMs Minimum latency from request sent to response headers received (ms).
 * @param offline True to emulate internet disconnection.
 */
export async function setNetworkConnection(
  client: CDPSession,
  preset: Protocol.Network.EmulateNetworkConditionsRequest,
) {
  // Init spoofed connection
  await client.send('Network.enable');
  await client.send('Network.emulateNetworkConditions', preset);
  return client;
}

type NetworkPreset = {
  // Whether network connectivity is offline
  offline: boolean;
  // Download speed in bytes per second (e.g. downloadKbps * 1024 / 8)
  downloadThroughput: number;
  // Upload speed in bytes per second (e.g. (uploadKbps * 1024) / 8)
  uploadThroughput: number;
  // Simulated latency in milliseconds
  latency: number;
};

type NetworkPresets = {
  [key: string]: NetworkPreset;
};

export const NETWORK_PRESETS: NetworkPresets = {
  Regular3G: {
    offline: false,
    downloadThroughput: (750 * 1024) / 8,
    uploadThroughput: (250 * 1024) / 8,
    latency: 100,
  },
  Good3G: {
    offline: false,
    downloadThroughput: (1.5 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    latency: 40,
  },
  Regular4G: {
    offline: false,
    downloadThroughput: (4 * 1024 * 1024) / 8,
    uploadThroughput: (3 * 1024 * 1024) / 8,
    latency: 20,
  },
  DSL: {
    offline: false,
    downloadThroughput: (2 * 1024 * 1024) / 8,
    uploadThroughput: (1 * 1024 * 1024) / 8,
    latency: 5,
  },
};

/**
 * Throttle CPU Processing Speed (Emulated)
 *
 * https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setCPUThrottlingRate
 *
 * @param client Chrome Dev Tools client
 * @param rate Throttling rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc).
 */
export async function throttleCpuProcessing(client: CDPSession, rate = 4) {
  await client.send('Emulation.setCPUThrottlingRate', { rate });
}

export async function disableBrowserCaching(page: Page) {
  await page.setCacheEnabled(false);
}

export async function clearBrowserCache(client: CDPSession) {
  await client.send('Network.clearBrowserCache');
}

/**
 * Emulate Device
 *
 * https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pageemulateoptions
 *
 * It's recommended to emulate the device prior to loading the page.
 *
 * ```
 * const nonEmulatedSettings = await emulateDevice(page, 'iPad landscape');
 * await page.goto(url);
 * ...
 * await disableDeviceEmulation(nonEmulatedSettings);
 * ```
 *
 * You can see the list of device names at:
 * https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
 *
 * After you're done, invoke `disableDeviceEmulation` to remove device emulation.
 *
 * @param {Page} page Reference to a test page
 * @param {string} device Device name (e.g. 'iPhone X', 'Pixel 2' etc)
 *
 * @returns A cleanup method to disable device emulation and restore previous settings.
 */
export async function emulateDevice(page: Page, device: string) {
  // Find device
  const deviceDescriptor: Device = devices[device];
  if (!deviceDescriptor) {
    const closeMatches = Object.keys(devices).filter(deviceName =>
      deviceName.includes(device.split(' ')[0]),
    );
    throw new Error(
      `emulateDevice: Unable to find a matching device for '${device}'.\n\nTry one of these similar ones:\n${closeMatches}`,
    );
  }

  // Store current user agent and viewport for later restoration
  // Note that page.browser().userAgent() isn't representative of device emulation.
  const originalUserAgent = await page.evaluate(() => navigator.userAgent);
  const originalViewport = await page.viewport();

  // Emulate chosen device
  await page.emulate(deviceDescriptor);

  // Return a cleanup method to disable emulation later on
  return async function disableDeviceEmulation() {
    await page.setUserAgent(originalUserAgent);

    if (originalViewport) {
      await page.setViewport(originalViewport);
    }
  };
}
