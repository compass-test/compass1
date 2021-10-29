import WebdriverIO, { WaitUntilOptions } from 'webdriverio';
import {
  MOBILE_CONTEXT,
  MobileContext,
  HandheldManufacturer,
} from '../clients/mobile/native-app';
import { SPECIAL_KEYS } from '../appium/keyboard/common-osk';
import { sendKeysAndroid } from '../appium/keyboard/android-osk';
import { sendKeysIOS } from '../appium/keyboard/ios-osk';
import WebviewPage from './wd-wrapper';

/**
 * AF BrowserStack App Appium Selectors
 *
 * https://bitbucket.org/atlassian/afe-browserstack-android-app
 * https://bitbucket.org/atlassian/afe-browserstack-ios-app
 *
 * Functional and tested on Android 6.0 - 11.0 and iOS 12 - 14.
 *
 * Attempt to use the fastest lookups possible to expedite test execution times.
 * Use unique identifiers where possible.
 *
 * If you modify the app you may need to these selectors.
 * Consult the README.md in each repo for instructions.
 */
const ANDROID_AFE_BS_APP_INPUT_SELECTOR =
  'android=new UiSelector().resourceId("com.example.browserstackmobilebridgeapp:id/webview_url_input")';
const ANDROID_AFE_BS_APP_WEBVIEW_SELECTOR =
  '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.webkit.WebView';
const IOS_AFE_BS_APP_INPUT_SELECTOR = `//XCUIElementTypeTextField[@name="url"]`;
const IOS_AFE_BS_APP_WEBVIEW_SELECTOR = `//XCUIElementTypeWebView`;

const WAIT_TIMEOUT = 60000; // 1 minute (older handheld hardware is slow)
const defaultWaitingOptions: WaitUntilOptions = { timeout: WAIT_TIMEOUT };

// This proxy URL is provided by BrowserStack for use with both iOS and Android when using BrowserStack Local.
// Use this as a prefix for your localhost testing within a WebView.
// See https://www.browserstack.com/question/759
export const BS_LOCAL_PROXY_DOMAIN = 'bs-local.com';

type PageOptions = {
  context: {
    current: string;
    app: string;
    web: string;
  };
};

type DeviceOrientation = 'LANDSCAPE' | 'PORTRAIT';

type SafariConsoleLogLevel = 'ALL' | 'INFO' | 'WARNING' | 'SEVERE';

type SafariConsoleLog = {
  level: SafariConsoleLogLevel;
  timestamp: number;
  message: string;
};

/**
 * Wrapper on top of WebdriverIO Appium APIs.
 * Used when running mobile integration tests on real devices.
 *
 * Your tests will switch back and forth between the native and
 * webview contexts to perform various actions.
 *
 * APIs that only work for within a single context will automatically
 * switch to the correct context when invoked. Some APIs work in
 * both contexts, so it's the test author's responsibility to switch
 * to the appropriate context manually before invoking their method.
 *
 * For example, selectors are available for both contexts, but it's
 * ambiguous which one is needed for a given selector string.
 *
 * There is a performance penalty each time you switch context,
 * so try and batch your interactions together within each one
 * before switching.
 *
 * An example of the back and forth would be loading a page within
 * the web context, focusing a text input within the DOM, then to
 * type on the software keyboard it needs to switch back to the native
 * context to tap the keys, and then you switch back to the web context
 * to validate the result within the DOM.
 */
export default class Page {
  // Connected device session
  protected browser: WebdriverIO.BrowserObject;

  // For performance reasons we keep track of the contexts to avoid
  // looking them up every time we need to switch.
  protected activeContext?: MobileContext;

  // The WebView context has a dynamic name that differs per platform.
  // Android uses the package name, and iOS uses a random number.
  // e.g. WEBVIEW_1337.1 or WEBVIEW_com.package.appname
  protected contextNameWebView?: string; // e.g. 'WEBVIEW_TBC'
  protected contextNameNative?: string; // e.g. 'NATIVE_APP'

  /**
   * Static constructor to create a new Page instance.
   *
   * We recycle connected sessions to a device when a test file
   * contains multiple `MobileTestCase`s.
   *
   * Appium API methods require switching between the native and
   * webview contexts to accomodate their actions, so we need to
   * know in which context we are to begin with.
   *
   * This static initialisation lets us request the asynchronous
   * context up front so that tests can correctly perform their
   * actions.
   *
   * @see http://appium.io/docs/en/commands/context/get-context/
   * @see http://appium.io/docs/en/commands/context/get-contexts/
   */
  public static async create(browser: WebdriverIO.BrowserObject) {
    // Check context state
    const contextState = await Promise.all([
      browser.getContext(),
      Page.getContexts(browser),
    ]);
    const startingContext = contextState[0] || '';
    const [nativeContext, webViewContext] = contextState[1];

    // Return new Page instance using context state
    const page = new Page(browser, {
      context: {
        current: startingContext,
        app: nativeContext,
        web: webViewContext,
      },
    });

    return page;
  }

  // Private constructor. Instantiate statically via `Page.create` instead.
  private constructor(
    browser: WebdriverIO.BrowserObject,
    options: PageOptions,
  ) {
    // Store session & context state
    this.browser = browser;
    this.storeContexts(options);
  }

  /*****************************/
  /* Context State             */
  /*****************************/

  /**
   * Get the names of the available contexts.
   * We need to know the names of both the native and webview contexts.
   *
   * @see http://appium.io/docs/en/commands/context/get-contexts/
   */
  static async getContexts(
    browser: WebdriverIO.BrowserObject,
  ): Promise<string[]> {
    const contexts = await browser.getContexts();

    if (contexts.length < 2) {
      await Page.waitForWebViewContextLoaded(browser);
      return browser.getContexts();
    }

    return contexts;
  }

  // The WebView Context is sometimes delayed on initial application startup,
  // so we need to wait for its availability.
  private static async waitForWebViewContextLoaded(
    browser: WebdriverIO.BrowserObject,
  ) {
    await browser.waitUntil(
      async () => {
        const currentContexts = await Page.getContexts(browser);
        return !!(
          currentContexts.length > 1 &&
          currentContexts.find(context =>
            context.startsWith(MOBILE_CONTEXT.WEBVIEW),
          )
        );
      },
      {
        timeout: 10000,
        timeoutMsg: 'WebView context not loaded',
        interval: 100,
      },
    );
  }

  // Once the application is initialised we can store the context names
  // to avoid looking them up each time we wish to switch context between
  // native and webview. This speeds up test execution.
  private storeContexts(options: PageOptions) {
    const { current, app, web } = options.context;

    // Store current context
    if (current === app) {
      this.activeContext = 'NATIVE';
    } else if (current === web) {
      this.activeContext = 'WEBVIEW';
    } else {
      throw new Error(`Unexpected Initial context: ${current}`);
    }

    // Store context names for later use
    this.contextNameNative = app;
    this.contextNameWebView = web;
  }

  /*****************************/
  /* Context Switching         */
  /*****************************/

  /**
   * Switch to the WebView context before performing operations
   * on the WebView or within the loaded page.
   */
  async switchToWeb() {
    if (this.activeContext !== 'WEBVIEW') {
      await this.switchContext(this.contextNameWebView);
    }
  }

  /**
   * Switch to the Native context before performing operations
   * on the native OS, or within the native UI elements.
   */
  async switchToNative() {
    if (this.activeContext !== 'NATIVE') {
      await this.switchContext(this.contextNameNative);
    }
  }

  /**
   * Switch to an iFrame within a website loaded within the WebView.
   *
   * @see http://appium.io/docs/en/commands/web/frame/switch/
   */
  async switchToIframe(iframe: string | number | Object) {
    await this.switchToWeb();
    await this.browser.switchToFrame(iframe);
  }

  // Get the current context.
  // @see http://appium.io/docs/en/commands/context/get-context/
  protected async getCurrentContext(useCache = true): Promise<MobileContext> {
    if (useCache && this.activeContext) {
      return this.activeContext;
    }
    const context = await this.browser.getContext();
    const isWebContext = (context || '').startsWith(MOBILE_CONTEXT.WEBVIEW);
    return (this.activeContext = isWebContext ? 'WEBVIEW' : 'NATIVE');
  }

  // Switch to a new context by name.
  // Uses the cached named `contextNameNative` and `contextNameWebView`.
  // @see http://appium.io/docs/en/commands/context/set-context/
  protected async switchContext(context?: string) {
    if (!context) {
      throw new Error(`Unable to switchContext to undefined 'context'`);
    }
    const switchingToNative = context === this.contextNameNative;
    const switchingToWeb = context === this.contextNameWebView;
    if (
      (this.activeContext === 'NATIVE' && switchingToNative) ||
      (this.activeContext === 'WEBVIEW' && switchingToWeb)
    ) {
      console.info(
        `switchContext is already set to '${context}'. Ignoring request.`,
      );
      return;
    }
    // Store the new choice and switch to it.
    this.activeContext = switchingToWeb ? 'WEBVIEW' : 'NATIVE';
    await this.browser.switchContext(context);
  }

  /*****************************/
  /* WebView Interaction       */
  /*****************************/

  /**
   * Get the URL of the webpage loaded within the WebView.
   *
   * @see http://appium.io/docs/en/commands/web/navigation/url/
   */
  async getLoadedUrl() {
    await this.switchToWeb();
    return this.browser.getUrl();
  }

  /**
   * Load a URL within the WebView
   *
   * @see http://appium.io/docs/en/commands/web/navigation/go-to-url/
   *
   * @param url The url to load
   * @param webpageSelector Optional selector to wait for on page load.
   */
  async loadUrl(url: string, webpageSelector?: string) {
    // We need to be in the web context to load a url within the webview.
    // The url API in native context is used for universal app switching (app://).
    // We don't use the native URL input in the app because it's faster to load
    // directly within the WebView instance to avoid surplus selector lookups
    // and context switching.
    await this.switchToWeb();

    // Note that this command works for both native and webview contexts,
    // but use with the native context is for universal app switching `app://`
    await this.browser.url(url);

    if (webpageSelector) {
      // Wait for a selector on the loaded page to validate that it's loaded correcty.
      await this.waitForSelector(webpageSelector);
    }
  }

  /**
   * Reload the URL that's currently loaded within the WebView.
   *
   * @see http://appium.io/docs/en/commands/web/navigation/refresh/
   */
  async refreshWebView() {
    await this.switchToWeb();
    return this.browser.refresh();
  }

  /*****************************/
  /* Device Interaction        */
  /*****************************/

  /**
   * Stub method to guide developers porting tests from desktop to handheld
   * where the equivalent method is frequently used.
   *
   * @deprecated Use `tapKeys` or `insertText` instead.
   */
  async type(
    _selectorOrElement: string | WebdriverIO.Element | undefined,
    text: string | string[],
  ) {
    throw new Error(
      `page.type: This method isn't supported on this platform. Use \`page.insertText\` or \`page.tapKeys\` instead.
      Unable to insert '${text}'.`,
    );
  }

  /**
   * Tap on keys within the native software keyboard (OSK).
   *
   * For text insertion, this is significantly slower than the `insertText` method!
   *
   * Use this method sparingly. It's ideal for tapping special keys, or for testing
   * compositional input flows.
   *
   * This method expects a text input to be focused, and for the software keyboard to be shown
   * prior to invoking this method.
   *
   * Pass a string and each letter will be clicked separately, pass an array when you want
   * to click special keys such as enter, shift, space, etc.
   *
   * @param keys The value you wish to insert / type.
   */
  async tapKeys(keys: string | string[]) {
    await this.switchToNative();

    if (typeof keys === 'string') {
      const isSpecialKey = SPECIAL_KEYS.hasOwnProperty(keys);
      keys = isSpecialKey ? [keys] : keys.split('');
    }

    if (this.isAndroid()) {
      await sendKeysAndroid(this.browser, keys);
    } else if (this.isIOS()) {
      await sendKeysIOS(this, keys);
    }
  }

  /**
   * Sets the text content of an element within either the native or web context.
   *
   * Use this as a quicker way of typing, but note that it is not using the on screen keyboard.
   * If you rely on composition events use sendKeys instead.
   *
   * This API works for both the Native and WebView context, so ensure you're in the correct
   * context for your selector prior to invoking this.
   *
   * @see https://webdriver.io/docs/api/element/addValue.html
   * @see http://appium.io/docs/en/commands/element/actions/send-keys/
   *
   * @param selectorOrElement The element you wish to insert text into.
   * @param text The value you wish to insert / type.
   */
  async insertText(
    selectorOrElement: string | WebdriverIO.Element,
    text: string | string[],
  ) {
    const element = await this.resolveElement(selectorOrElement);
    if (element) {
      // Click to focus. This will raise the software keyboard, which isn't necessary for this
      // text insertion method, but is more representative of regular user interactions.
      await element.click();

      if (this.isIOS()) {
        // FIXME: ED-10399 `element.addValue(text)` Silently fails to insert text into the DOM for iOS without error.
        // So we use tapKeys for now to ensure the text is still inserted.
        // We ensure we restore the original context for this workaround in case it switched.
        console.warn(
          `insertText isn't functional on iOS at this stage. See ED-10399.`,
        );
        const currentContext = await this.getCurrentContext();
        await this.tapKeys(text);
        await (currentContext === 'WEBVIEW'
          ? this.switchToWeb()
          : this.switchToNative());
      } else {
        // Insert text into the element. This bypasses the software keyboard.
        await element.addValue(text);
      }
    }
  }

  /**
   * Whether the software keyboard is currently raised and visible.
   *
   * @see http://appium.io/docs/en/commands/device/keys/is-keyboard-shown/
   */
  async isKeyboardShown() {
    await this.switchToNative();
    return this.browser.isKeyboardShown();
  }

  /**
   * Dismiss the software keyboard if it's currently visible.
   *
   * @see http://appium.io/docs/en/commands/device/keys/hide-keyboard/
   */
  async hideKeyboard() {
    await this.switchToNative();

    if (this.isIOS()) {
      // we click on the "Done" button in order to hide the IOS keyboard
      // since hideKeyboard() method does nothing
      await this.tapKeys(SPECIAL_KEYS.DONE);
    } else {
      await this.browser.hideKeyboard();
    }
    await this.waitToHideKeyboard();
  }

  /**
   * Periodically checks if the native keyboard is hidden,
   * returns true when the keyboard was hidden before the interval finished
   */
  protected async waitToHideKeyboard(): Promise<boolean> {
    return new Promise(resolve => {
      let attempts = 0;
      const intervalId = setInterval(async () => {
        const isKeyboardShown = await this.browser.isKeyboardShown();
        attempts++;

        if (!isKeyboardShown) {
          resolve(true);
          clearInterval(intervalId);
        } else if (attempts >= 10) {
          resolve(false);
          clearInterval(intervalId);
        }
      }, 100);
    });
  }

  /**
   * Set the value of the clipboard (copy/paste).
   *
   * @see http://appium.io/docs/en/commands/device/clipboard/set-clipboard/
   */
  async setClipboard(value: string) {
    await this.browser.setClipboard(value, 'plaintext');
  }

  /**
   * Get the value from the clipboard (copy/paste)
   *
   * @see http://appium.io/docs/en/commands/device/clipboard/get-clipboard/
   */
  async getClipboard() {
    return this.browser.getClipboard();
  }

  /**
   * Get the device's current orientation.
   *
   * Note that devices start in Portrait orientation based on our webdriver
   * capabilities configuration.
   *
   * @see http://appium.io/docs/en/commands/session/orientation/get-orientation/
   */
  async getDeviceOrientation(): Promise<DeviceOrientation> {
    const orientation = (await this.browser.getOrientation()) as DeviceOrientation;
    return orientation;
  }

  /**
   * Change device orientation
   *
   * @see http://appium.io/docs/en/commands/session/orientation/set-orientation/
   */
  async rotateDevice(orientation: DeviceOrientation) {
    await this.browser.setOrientation(orientation);
  }

  /**
   * Execute a native mobile command
   *
   * @see http://appium.io/docs/en/commands/mobile-command/index.html
   */
  async executeMobileCommand(command: string, options: object = {}) {
    await this.switchToNative();
    return this.browser.execute(command, options);
  }

  /*****************************/
  /* Element Interaction       */
  /*****************************/

  /**
   * Get a single element match for a selector (the first in case of many matches)
   *
   * @see https://webdriver.io/docs/api/browser/$.html
   */
  async $(selector: string): Promise<WebdriverIO.Element> {
    return this.browser.$(selector);
  }

  /**
   * Get mulitple element matches for a selector (all possible matches)
   *
   * @see https://webdriver.io/docs/api/browser/$$.html
   */
  async $$(selector: string): Promise<WebdriverIO.Element[]> {
    return this.browser.$$(selector);
  }

  // Helper for resolving an element for use with functions that accept an element
  // or a selector.
  protected async resolveElement(
    selectorOrElement: string | WebdriverIO.Element,
  ): Promise<WebdriverIO.Element> {
    return typeof selectorOrElement === 'string'
      ? await this.$(selectorOrElement)
      : selectorOrElement;
  }

  /**
   * Check whether an element exists
   *
   * @see https://webdriver.io/docs/api/element/isExisting.html
   */
  async isExisting(
    selectorOrElement: string | WebdriverIO.Element,
  ): Promise<boolean> {
    const element = await this.resolveElement(selectorOrElement);
    return element.isExisting();
  }

  /**
   * Wait for an element to exist before proceeding.
   *
   * @see https://webdriver.io/docs/api/element/waitForExist.html
   */
  async waitForSelector(
    selector: string,
    options: WaitUntilOptions = defaultWaitingOptions,
    reverse = false,
  ): Promise<boolean> {
    const elem = await this.browser.$(selector);

    return elem.waitForExist({ timeout: options.timeout, reverse });
  }

  /**
   * Click on an element within either the native or web context
   *
   * @see http://appium.io/docs/en/commands/element/actions/click/
   */
  async click(selectorOrElement: string | WebdriverIO.Element) {
    const element = await this.resolveElement(selectorOrElement);
    if (element) {
      await element.click();
    }
  }

  /**
   * Tap on an element within the native context
   *
   * @see http://appium.io/docs/en/commands/interactions/touch/tap/
   */
  async tap(selectorOrElement: string | WebdriverIO.Element) {
    this.switchToNative();
    const element = await this.resolveElement(selectorOrElement);
    if (element) {
      await element.touchAction('tap');
    }
  }

  /**
   * Get the text content from a DOM-element
   *
   * @see https://webdriver.io/docs/api/element/getText.html
   */
  async getTextOfElement(element: string) {
    return await (await this.$(element)).getText();
  }

  /**
   * Get an attribute from a DOM-element based on the attribute name
   *
   * @see https://webdriver.io/docs/api/element/getAttribute.html
   */
  async getAttributeValue(element: string, attributeName: string) {
    return await (await this.$(element)).getAttribute(attributeName);
  }

  /*****************************/
  /* Web Browser Interaction   */
  /*****************************/

  /**
   * Execute a JS snippet synchronously within the web context
   *
   * @see http://appium.io/docs/en/commands/web/execute/
   */
  async execute<T>(script: string | ((...args: any[]) => T), ...args: any[]) {
    await this.switchToWeb();
    return this.browser.execute<T>(script, ...args);
  }

  /**
   * Execute a JS snippet asynchroniously within the web context
   *
   * @see http://appium.io/docs/en/commands/web/execute-async/
   */
  async executeAsync(
    script: string | ((...args: any[]) => void),
    timeout?: number,
    ...args: any[]
  ) {
    await this.switchToWeb();
    if (timeout) {
      await this.browser.setAsyncTimeout(timeout);
    }
    return this.browser.executeAsync(script, ...args);
  }

  /**
   * Get the raw console output from the WebView (iOS Only).
   *
   * @see http://appium.io/docs/en/commands/session/logs/get-log/
   *
   * You can use this to assist debugging since the safari logs
   * aren't shown within BrowserStack's UI.
   *
   * Android supports logs for: ['logcat', 'bugreport', 'server']
   * iOS supports logs for ['syslog', 'crashlog', 'performance', 'server', 'safariConsole', 'safariNetwork']
   * @see http://appium.io/docs/en/commands/session/logs/get-log-types/
   *
   * @param level Optional log level filtering.
   */
  async getWebConsoleLogs(level: SafariConsoleLogLevel = 'ALL') {
    if (this.isIOS()) {
      const safariLogs = (await this.browser.getLogs(
        'safariConsole',
      )) as SafariConsoleLog[];
      if (level === 'ALL') {
        return safariLogs;
      }
      return safariLogs.filter(log => log.level === level);
    }

    console.warn(
      'getWebConsoleLogs is only available for iOS at this stage.\bPlease debug using iOS.',
    );
    return [];
  }

  /*****************************/
  /** Platform Utils           */
  /*****************************/

  isAndroid() {
    return this.browser.isAndroid;
  }

  isIOS() {
    return this.browser.isIOS;
  }

  platform() {
    const { platformName } = this.browser.capabilities;
    return platformName;
  }

  platformVersion() {
    const { platformVersion } = this.browser.capabilities;
    return platformVersion;
  }

  manufacturer() {
    // @ts-ignore This is a custom BrowserStack extension property.
    let manufacturer: string = this.browser.capabilities.deviceManufacturer;
    if (!manufacturer) {
      manufacturer = this.isIOS() ? 'Apple' : 'Unknown';
    }
    return manufacturer.toUpperCase() as HandheldManufacturer;
  }

  /*****************************/
  /* Appium Advanced Settings  */
  /*****************************/

  /**
   * @see http://appium.io/docs/en/advanced-concepts/settings/
   */

  async enablePredictiveKeyboard() {
    if (this.isIOS()) {
      await this.browser.updateSettings({
        keyboardPrediction: true,
        keyboardAutocorrection: true,
      });
    }
  }

  async disablePredictiveKeyboard() {
    if (this.isIOS()) {
      await this.browser.updateSettings({
        keyboardPrediction: false,
        keyboardAutocorrection: false,
      });
    }
  }

  /*****************************/
  /* Generic WebView App Utils */
  /*****************************/

  /**
   * Get the selector for the Native TextInput instance
   *
   * This input exists as a convenience when performing manual testing within
   * the Appium Desktop app. We bypass the URL in our automation tests.
   *
   * @deprecated We used to load a URL via this input.
   */
  getAppInputSelector() {
    return this.isAndroid()
      ? ANDROID_AFE_BS_APP_INPUT_SELECTOR
      : IOS_AFE_BS_APP_INPUT_SELECTOR;
  }

  /**
   * Get the selector for the Native WebView instance
   */
  getAppWebviewSelector() {
    return this.isAndroid()
      ? ANDROID_AFE_BS_APP_WEBVIEW_SELECTOR
      : IOS_AFE_BS_APP_WEBVIEW_SELECTOR;
  }

  async useHDScreenshots() {
    // https://github.com/appium/appium-xcuitest-driver#settings-api
    await this.browser.updateSettings({
      screenshotQuality: 0,
    });
  }

  /**
   * returns a base64 png of the current native context viewport
   */
  async takeScreenshot(): Promise<string> {
    if (await this.isKeyboardShown()) {
      await this.hideKeyboard();
    }

    return this.browser.takeScreenshot();
  }

  /**
   * Wait until a predicate is true
   */
  waitUntil(predicate: () => Promise<boolean>, errorMessage?: string) {
    return this.browser.waitUntil(predicate, {
      timeout: WAIT_TIMEOUT,
      timeoutMsg: errorMessage,
    });
  }

  /**
   * Simulate user drag and drop in webview component
   */
  async simulateWebViewUserDragAndDrop(
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    duration: number = 2000,
  ) {
    if (this.activeContext !== 'WEBVIEW') {
      throw new Error(
        `This page method is only available in webview context. Current active context is ${this.activeContext}`,
      );
    }
    const webviewPage = new WebviewPage(this.browser);
    return webviewPage.simulateUserDragAndDrop(
      startX,
      startY,
      targetX,
      targetY,
      duration,
    );
  }
}
