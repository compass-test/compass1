export type Browser =
  | 'chrome'
  | 'edge'
  | 'safari'
  | 'firefox'
  | 'android'
  | 'ios'
  | '*';
export type BetaBrowser = Browser | 'beta';
export type DesktopOS = 'Windows' | 'OS X';
export type HandheldOS = 'android' | 'ios';
export type OperatingSystem = DesktopOS | HandheldOS;

type Platform = 'windows' | 'macos' | 'ios' | 'android' | '*';
type SoftwareKeyboard = 'apple' | 'gboard' | 'samsung';
type DeviceFormFactor = 'phone' | 'tablet';
type DeviceOrientation = 'portrait' | 'landscape';

export type OSVersion =
  | 'DEFAULT'
  | 'ios 12'
  | 'ios 13'
  | 'ios 14'
  | 'android 6'
  | 'android 7'
  | 'android 8'
  | 'android 9'
  | 'android 10'
  | 'android 11';

export type DeviceMeta = {
  name: string;
  formFactor: DeviceFormFactor;
  keyboard: DeviceSoftwareKeyboard;
  resolution?: {
    width: number;
    height: number;
  };
};

export type BrowserTestCaseOptions = {
  readonly skip?: Browser[];
};

export type MobileTestCaseOptions = {
  /** OPT OUT PROPERTIES  **/

  /**
   * Skip an entire platform if necessary.
   *
   * Defaults to undefined which yields all platforms.
   */
  readonly skipPlatform?: Platform[];

  /** OPT IN PROPERTIES  **/

  /**
   * Define explicit versions to run on if you need to target more than just the latest.
   *
   * Defaults to ['DEFAULT'] which yields the most widely used major version for each platform.
   */
  readonly versions?: OSVersion[];

  /**
   * Define explicit form factors to run on.
   *
   * Defaults to ['phone']
   */
  readonly formFactors?: DeviceFormFactor[];

  /**
   * Define explicit software keyboards to run on.
   *
   * Defaults to ['apple', 'gboard']
   */
  readonly keyboards?: SoftwareKeyboard[];
};

type AFBrowserCapability = {
  os?: OperatingSystem | string;
  os_version?: string;
  browserName?: Browser;
  resolution?: string;
};

type BrowserStackBrowser = {
  browser?: Browser; // FIXME: should be mandatory
  browser_version?: string | null; // FIXME: should be mandatory
  devices?: string[];
  real_devices?: string[];
} & AFBrowserCapability; // FIXME: Shouldn't blend..

type BrowserStackBrowsers = {
  [key in OperatingSystem]: {
    [key: string]: BrowserStackBrowser[];
  };
};

export type Capabilities = BrowserStackBrowser & {
  real_mobile?: string;
  browserVersion?: any;
  device?: any;
  device_orientation?: string;
};

type Launcher = Capabilities & {
  'browserstack.networkLogs'?: boolean | string;
  'browserstack.appiumLogs'?: boolean;
  'browserstack.appium_version'?: string;
  'browserstack.networkProfile'?: boolean;
  'browserstack.selenium_version'?: string;
  app?: any;
  name?: string;
};

export type ProductBS = 'automate' | 'app-automate';
