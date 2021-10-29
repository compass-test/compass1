import { WaitUntilOptions } from 'webdriverio';
import { mockBrowserDate } from '../../utils/mock-browser-date';
import { performance } from 'perf_hooks';

// WARNING: don't import BrowserObject dynamically, it has side-effects
import type { BrowserObject } from 'webdriverio';
export type { BrowserObject };

const { BuildReporter } = require('@atlaskit/build-reporting');

async function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const assert = require('assert').strict;
const WAIT_TIMEOUT = 5000;
const PAGE_LOAD_WAIT_TIMEOUT = 60000;

interface BBoxWithId {
  left: number;
  top: number;
  width: number;
  height: number;
  id: string;
}

const defaultWaitingOptions: WaitUntilOptions = { timeout: WAIT_TIMEOUT };

type Done<T> = (result: T) => any;
type VoidDone = () => any;

// https://github.com/webdriverio/webdriverio/blob/e78ecef891b2de4a2f7c198117d35db8debf1c68/packages/webdriverio/src/constants.ts#L316-L392
const UNICODE_CHARACTERS = {
  NULL: '\uE000',
  Unidentified: '\uE000',
  Cancel: '\uE001',
  Help: '\uE002',
  'Back space': '\uE003',
  Backspace: '\uE003',
  Tab: '\uE004',
  Clear: '\uE005',
  Return: '\uE006',
  Enter: '\uE007',
  Shift: '\uE008',
  Control: '\uE009',
  'Control Left': '\uE009',
  'Control Right': '\uE051',
  Alt: '\uE00A',
  Pause: '\uE00B',
  Escape: '\uE00C',
  Space: '\uE00D',
  ' ': '\uE00D',
  Pageup: '\uE00E',
  PageUp: '\uE00E',
  Page_Up: '\uE00E',
  Pagedown: '\uE00F',
  PageDown: '\uE00F',
  Page_Down: '\uE00F',
  End: '\uE010',
  Home: '\uE011',
  'Left arrow': '\uE012',
  Arrow_Left: '\uE012',
  ArrowLeft: '\uE012',
  'Up arrow': '\uE013',
  Arrow_Up: '\uE013',
  ArrowUp: '\uE013',
  'Right arrow': '\uE014',
  Arrow_Right: '\uE014',
  ArrowRight: '\uE014',
  'Down arrow': '\uE015',
  Arrow_Down: '\uE015',
  ArrowDown: '\uE015',
  Insert: '\uE016',
  Delete: '\uE017',
  Semicolon: '\uE018',
  Equals: '\uE019',
  'Numpad 0': '\uE01A',
  'Numpad 1': '\uE01B',
  'Numpad 2': '\uE01C',
  'Numpad 3': '\uE01D',
  'Numpad 4': '\uE01E',
  'Numpad 5': '\uE01F',
  'Numpad 6': '\uE020',
  'Numpad 7': '\uE021',
  'Numpad 8': '\uE022',
  'Numpad 9': '\uE023',
  Multiply: '\uE024',
  Add: '\uE025',
  Separator: '\uE026',
  Subtract: '\uE027',
  Decimal: '\uE028',
  Divide: '\uE029',
  F1: '\uE031',
  F2: '\uE032',
  F3: '\uE033',
  F4: '\uE034',
  F5: '\uE035',
  F6: '\uE036',
  F7: '\uE037',
  F8: '\uE038',
  F9: '\uE039',
  F10: '\uE03A',
  F11: '\uE03B',
  F12: '\uE03C',
  Command: '\uE03D',
  Meta: '\uE03D',
  Zenkaku_Hankaku: '\uE040',
  ZenkakuHankaku: '\uE040',
};

type Modifier = keyof typeof UNICODE_CHARACTERS | 'Mod';

/*
 * wrapper on top of webdriver-io apis to give a feel of puppeteer api
 */
export default class Page {
  protected browser: BrowserObject;

  constructor(browserObject: BrowserObject) {
    this.browser = browserObject;
  }

  async type(
    selector: string,
    text: string | string[],
    options: {
      delay?: number;
    } = {},
  ) {
    if (Array.isArray(text)) {
      for (const subText of text) {
        await this.type(selector, subText, options);
      }

      return;
    }

    await this.waitForSelector(selector);
    const { delay = 0 } = options;
    if (delay > 0) {
      for (const ch of text) {
        // fetched each time as a precaution
        const elem = await this.browser.$(selector);
        await elem.addValue(ch);
        await sleep(delay);
      }
    } else {
      const elem = await this.browser.$(selector);
      await elem.addValue(text);
    }
  }

  // Remap the browser vendor bespoke errors from `browser.setTimeout({ 'pageLoad' })`
  protected standardisePageTimeoutError(message: string) {
    if (
      message &&
      (message.includes('TimedPromise timed out after') ||
        message === 'unknown error' ||
        message.includes('Timed out receiving message from renderer'))
    ) {
      // Page load timed out
      return `Page loading exceeded timeout set for pageLoad`;
    }
    return message;
  }

  /**
   * Goto the given URL and mock Date in the browser.
   * The Date mock is set to Wed Aug 16 00:00:00 2017 +0000, 1502841600 seconds (1502841600000
   * milliseconds) since epoch, the start of the UTC day of the first commit in atlassian-frontend.
   * Use teardownMockDate() to remove the mock.
   * Goto the given URL. No mock is applied.
   */
  async goto(url: string, pageLoadTimeout = PAGE_LOAD_WAIT_TIMEOUT) {
    const start = performance.now();
    const reporter = BuildReporter.create();

    try {
      // Enforce a page load timeout (will error if the page hasn't loaded within the timeframe)
      // https://webdriver.io/docs/timeouts/#session-page-load-timeout
      await this.browser.setTimeout({ pageLoad: pageLoadTimeout });

      // Load url
      await this.browser.url(url);

      // Ensure the page has finished loading
      await this.waitUntil(
        async () => {
          const readyState = await this.browser.execute<string>(
            'return document.readyState',
          );
          return readyState === 'complete';
        },
        // Error message thrown if it exceeds timeout
        'Timed out waiting for document.readyState',
      );

      // Ensure the page exists
      const pageTitle = await this.title();
      if (pageTitle === 'Page not found' || pageTitle === '404 Not Found') {
        throw new Error('Page not found (404)');
      }

      const duration = performance.now() - start;

      reporter.sendOperationalEvent({
        actionSubject: 'testing-example-page',
        actionSubjectId: url,
        action: 'loaded',
        attributes: {
          type: 'webdriver',
          method: 'goto',
          duration,
        },
      });
    } catch (err) {
      const duration = performance.now() - start;

      reporter.sendOperationalEvent({
        actionSubject: 'testing-example-page',
        actionSubjectId: url,
        action: 'failed',
        attributes: {
          type: 'webdriver',
          method: 'goto',
          duration,
        },
      });

      if (err.message) {
        // Remap the browser vendor bespoke errors from `browser.setTimeout({ 'pageLoad' })`
        err.message = this.standardisePageTimeoutError(err.message);
      }

      // Rethrow to fail the test. If a page load didn't work, the test is destined to fail
      // which would be considered an environmental failure.
      throw new Error(
        `PageLoadError: failed to load url for test.\n${err.message || err}`,
      );
    }

    await this.mockStandardDate();
  }

  async refresh() {
    const start = performance.now();
    const reporter = BuildReporter.create();

    try {
      await this.browser.refresh();
      const duration = performance.now() - start;
      reporter.sendOperationalEvent({
        actionSubject: 'testing-example-page',
        actionSubjectId: await this.browser.getUrl(),
        action: 'loaded',
        attributes: {
          type: 'webdriver',
          method: 'refresh',
          duration,
        },
      });
      return;
    } catch (err) {
      const duration = performance.now() - start;
      reporter.sendOperationalEvent({
        actionSubject: 'testing-example-page',
        actionSubjectId: await this.browser.getUrl(),
        action: 'failed',
        attributes: {
          type: 'webdriver',
          method: 'refresh',
          duration,
        },
      });
    }
  }

  async moveTo(selector: string, x: number, y: number) {
    await this.waitForSelector(selector);
    if (this.isBrowser('Safari')) {
      await this.getBoundingRect(selector);
      await this.SafariMoveTo([{ x, y }]);
    } else {
      const elem = await this.browser.$(selector);
      await elem.moveTo({ xOffset: x, yOffset: y });
    }
  }

  // This function simulates user select multiple document node by drag and drop.
  async simulateUserSelection(
    startSelector: string,
    targetSelector: string,
    calcOffset?: (
      element: 'start' | 'target',
      side: 'left' | 'top',
      rect: BBoxWithId,
    ) => number,
  ) {
    const startBounds = await this.getBoundingRect(startSelector);
    const targetBounds = await this.getBoundingRect(targetSelector);

    // Note 1: Bound with 1 px so would not go over the elements.
    // Note 2: Assume the content layout is from left to right and top to bottom.
    const [startXOffset, startYOffset, targetXOffset, targetYOffset] =
      startBounds.top > targetBounds.top
        ? [startBounds.width - 1, startBounds.height - 1, 1, 1]
        : [1, 1, targetBounds.width - 1, targetBounds.height - 1];

    return this.simulateUserDragAndDrop(
      startBounds.left +
        startXOffset +
        (calcOffset ? calcOffset('start', 'left', targetBounds) : 0),
      startBounds.top + startYOffset,
      targetBounds.left +
        targetXOffset +
        (calcOffset ? calcOffset('target', 'left', targetBounds) : 0),
      targetBounds.top + targetYOffset,
    );
  }

  async simulateUserDragAndDrop(
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    duration: number = 2000,
  ) {
    // Protocol requires these numbers to be Integers (not floating)
    // Some browsers were taking offence with decimal number (Edge, Safari)
    [startX, startY, targetX, targetY] = [startX, startY, targetX, targetY].map(
      Math.floor,
    );
    if (this.isBrowser('chrome')) {
      return this.simulateUserDragAndDropChrome(
        startX,
        startY,
        targetX,
        targetY,
      );
    }

    const moveToStart = {
      type: 'pointerMove',
      duration: 0,
      x: startX,
      y: startY,
    };
    const pointerDown = { type: 'pointerDown', button: 0 };
    const pause = { type: 'pause', duration: 100 };
    const moveToTarget = {
      type: 'pointerMove',
      duration,
      x: targetX,
      y: targetY,
    };
    const pointerUp = {
      type: 'pointerUp',
      button: 0,
    };

    return this.browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'mouse' },
        actions: [
          moveToStart,
          pause,
          pointerDown,
          pause,
          moveToTarget,
          pause,
          pointerUp,
          pause,
        ],
      },
    ]);
  }

  async simulateUserDragAndDropChrome(
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
  ) {
    await this.moveTo('body', startX, startY);
    await this.browser.buttonDown();
    await this.moveTo('body', targetX, targetY);
    await this.browser.buttonUp();
    return this.browser.pause(500);
  }

  async hover(selector: string) {
    await this.waitForSelector(selector);
    if (this.isBrowser('Safari')) {
      const bounds = await this.getBoundingRect(selector);
      await this.SafariMoveTo([{ x: bounds.left, y: bounds.top }]);
    } else {
      const elem = await this.browser.$(selector);
      await elem.moveTo({ xOffset: 1, yOffset: 1 });
      return this.browser.pause(500);
    }
  }

  // TODO: Remove it after the fix been merged on webdriver.io:
  // https://github.com/webdriverio/webdriverio/pull/4330
  async SafariMoveTo(coords: { x: number; y: number }[]) {
    const actions = coords.map(set => ({
      type: 'pointerMove',
      duration: 0,
      x: set.x,
      y: set.y,
    }));

    return this.browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'mouse' },
        actions,
      },
    ]);
  }

  async getBoundingRect(selector: string): Promise<BBoxWithId> {
    const bbox = await this.execute((selector: string) => {
      const element = document.querySelector(selector);
      if (element) {
        // Result of next call is ClientRect | DOMRect, one contains left/right props, other x/y
        const rect = element.getBoundingClientRect();
        const { left, top, width, height } = rect;
        const { x, y } = rect as DOMRect;
        return {
          left: x || left,
          top: y || top,
          width,
          height,
          id: element.id,
        };
      }
    }, selector);
    if (!bbox) {
      throw new Error(`${selector} couldn't been found`);
    }
    return bbox;
  }

  async title() {
    return this.browser.getTitle();
  }

  async $(selector: string) {
    return this.browser.$(selector);
  }

  async $$(selector: string) {
    return this.browser.$$(selector);
  }

  async setValue(selector: string, text: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.setValue(text);
  }

  async count(selector: string) {
    const result = await this.browser.$$(selector);
    return result.length;
  }

  async clear(selector: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.clearValue();
  }

  /**
   * Clear an input, textarea or contenteditable element by backspacing
   * Use this to clear controlled React elements
   *
   * @param textInputSelector selector of the input to clear
   */
  async emptyTextFieldByBackspacing(textInputSelector: string) {
    await this.click(textInputSelector);
    const text = await this.getProperty(textInputSelector, 'value');
    await this.keys(Array(text.toString().length).fill('Backspace'));
  }

  async click(selector?: string) {
    try {
      if (selector) {
        await this.waitForSelector(selector);
        const elem = await this.browser.$(selector);
        return elem.click();
      } else {
        return this.browser.positionClick();
      }
    } catch (e) {
      return e;
    }
  }

  async undo() {
    const meta = this.toChar('Mod');
    await this.browser.keys([meta, 'z']);
    await this.browser.keys([meta]); // release modifier key
  }

  async redo() {
    const meta = this.toChar('Mod');
    if (this.isWindowsPlatform()) {
      await this.browser.keys([meta, 'y']);
    } else {
      const shift = this.toChar('Shift');
      await this.browser.keys([meta, shift, 'z']);
    }
    await this.browser.keys([meta]); // release modifier key
  }

  /**
   * For some reason sometimes (Safari?) clicking via `page.click()` just doesn't work.
   * In situations like that nothing beats native click via DOM
   */
  async remoteDOMClick(selector: string) {
    await this.waitForSelector(selector);
    await this.execute((selector: string) => {
      const el: HTMLElement | null = document.querySelector(selector);
      if (el) {
        el.click();
      }
    }, selector);
  }

  // see https://w3c.github.io/webdriver/#keyboard-actions
  async keys(values: string | string[], directCall: boolean = false) {
    if (directCall) {
      await this.browser.keys(values);
    } else {
      const keys = Array.isArray(values) ? values : [values];
      for (const key of keys) {
        await this.browser.keys(key);
      }
    }
  }

  private toChar = (rawMod: Modifier): string => {
    const modChar = !this.isWindowsPlatform() ? 'Meta' : 'Control';
    const modifier = rawMod === 'Mod' ? modChar : rawMod;
    return UNICODE_CHARACTERS[modifier];
  };

  public keyboard = {
    type: async (
      value: string,
      modifiers: (keyof typeof UNICODE_CHARACTERS | 'Mod')[],
    ) => {
      const modChars = modifiers.map(this.toChar).filter(Boolean);

      if (typeof this.browser.performActions !== 'function') {
        return this.keys([...modChars, ...value, 'NULL'], true);
      }

      return this.browser.performActions([
        {
          type: 'key',
          id: 'keyboard',
          actions: [
            ...modChars.map(value => ({ type: 'keyDown', value })),
            ...[...value].map(value => ({ type: 'keyDown', value })),
            { type: 'pause', duration: 10 },
            ...modChars.map(value => ({ type: 'keyUp', value })),
            ...[...value].map(value => ({ type: 'keyUp', value })),
          ],
        },
      ]);
    },
  };

  debug() {
    return this.browser.debug();
  }

  async getCSSProperty(selector: string, cssProperty: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.getCSSProperty(cssProperty);
  }

  async getLocation(selector: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.getLocation();
  }

  getAlertText() {
    return this.browser.getAlertText();
  }

  async getAttribute(selector: string, attributeName: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.getAttribute(attributeName);
  }

  url() {
    return this.browser.getUrl();
  }

  // Protocol
  goBack() {
    return this.browser.back();
  }

  acceptAlert() {
    return this.browser.acceptAlert();
  }

  close() {
    return this.browser.closeWindow();
  }

  async checkConsoleErrors() {
    // Console errors can only be checked in Chrome
    if (this.isBrowser('chrome')) {
      const logs = await this.browser.getLogs('browser');
      if (logs.length) {
        logs.forEach((log: any) => {
          assert.notStrictEqual(log.level, 'SEVERE', `Error : ${log.message}`);
        });
      }
    }
  }

  backspace(selector: string) {
    this.browser.execute(selector => {
      return document
        .querySelector(selector)
        .trigger({ type: 'keydown', which: 8 });
    });
  }

  // To be replaced by those puppeeter functions
  //  keyboard.down('KeyA');
  //  keyboard.press('KeyA');
  //  keyboard.up('Shift');

  //will need to have wrapper for these once moved to puppeteer
  async getText(selector: string) {
    // replace with await page.evaluate(() => document.querySelector('p').textContent)
    // for puppeteer
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    let text = await elem.getText();
    if (text === '' || text === undefined || text === null) {
      text = await elem.getAttribute('textContent');
    }
    return text;
  }

  async getValue(selector: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.getValue();
  }

  async evaluate(func: (...args: any[]) => void, ...args: any[]) {
    return await this.browser.execute(func, ...args);
  }

  $eval<T, P>(
    selector: string,
    pageFunction: (element: HTMLElement | null, params?: P) => T,
    param?: P,
  ): Promise<T> {
    return this.browser.execute(
      `return (${pageFunction}(document.querySelector("${selector}"), ${JSON.stringify(
        param,
      )}))`,
    ) as Promise<T>;
  }

  async execute<T, P extends any[]>(
    script: string | ((...args: P) => T),
    ...args: P
  ): Promise<T> {
    return this.browser.execute(
      script as string | ((...args: any[]) => T),
      ...args,
    ) as Promise<T>;
  }

  async executeAsync<T>(func: (done: Done<T>) => void): Promise<T>;
  async executeAsync(func: (done: VoidDone) => void): Promise<void>;

  async executeAsync<A, T>(
    func: (arg1: A, done: Done<T>) => void,
    arg: A,
  ): Promise<T>;
  async executeAsync<A>(
    func: (arg1: A, done: VoidDone) => void,
    arg: A,
  ): Promise<void>;

  async executeAsync<A, B, T>(
    func: (arg1: A, arg2: B, done: Done<T>) => void,
    ...args: [A, B]
  ): Promise<T>;
  async executeAsync<A, B>(
    func: (arg1: A, arg2: B, done: VoidDone) => void,
    ...args: [A, B]
  ): Promise<void>;

  async executeAsync<A, B, C, T>(
    func: (arg1: A, arg2: B, arg3: C, done: Done<T>) => void,
    ...args: [A, B, C]
  ): Promise<T>;
  async executeAsync<A, B, C>(
    func: (arg1: A, arg2: B, arg3: C, done: VoidDone) => void,
    ...args: [A, B, C]
  ): Promise<void>;

  async executeAsync<A, B, C, T>(
    func:
      | ((done: Done<T>) => void)
      | ((done: VoidDone) => void)
      | ((arg1: A, done: Done<T>) => void)
      | ((arg1: A, done: VoidDone) => void)
      | ((arg1: A, arg2: B, done: Done<T>) => void)
      | ((arg1: A, arg2: B, done: VoidDone) => void)
      | ((arg1: A, arg2: B, arg3: C, done: Done<T>) => void)
      | ((arg1: A, arg2: B, arg3: C, done: VoidDone) => void),
    ...args: [] | [A] | [A, B] | [A, B, C]
  ): Promise<T> {
    return this.browser.executeAsync(func, ...args);
  }

  getBrowserName() {
    return this.browser.capabilities.browserName;
  }

  isBrowser(browserName: 'msedge' | 'Safari' | 'firefox' | 'chrome') {
    return this.getBrowserName() === browserName;
  }

  async getElementSize(selector: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.getSize();
  }

  async getHTML(selector: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.getHTML(false);
  }

  async getProperty(selector: string, property: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.getProperty(property);
  }

  async isEnabled(selector: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.isEnabled();
  }

  async isExisting(selector: string) {
    const elem = await this.browser.$(selector);
    return elem.isExisting();
  }

  async isVisible(selector: string) {
    return this.waitFor(selector);
  }

  async getTagName(selector: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.getTagName();
  }

  async isSelected(selector: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.isSelected();
  }

  async hasFocus(selector: string) {
    await this.waitForSelector(selector);
    const elem = await this.browser.$(selector);
    return elem.isFocused();
  }

  isWindowsPlatform() {
    const { platformName } = this.browser.capabilities;
    // In current version of webdriverio capabilities defined platformName,
    // but somehow in runtime it filled with os I am not where it is coming from.
    const { os } = this.browser.capabilities as any;
    return platformName === 'Windows' || os === 'Windows';
  }

  async paste() {
    let keys;
    if (this.isWindowsPlatform()) {
      keys = ['Control', 'v'];
    } else if (this.isBrowser('chrome')) {
      // Workaround for https://bugs.chromium.org/p/chromedriver/issues/detail?id=30
      keys = ['Shift', 'Insert'];
    } else {
      keys = ['Command', 'v'];
    }

    await this.browser.keys(keys);
    return this.browser.keys(keys[0]);
  }

  async copy() {
    let keys;
    if (this.isWindowsPlatform()) {
      keys = ['Control', 'c'];
    } else if (this.isBrowser('chrome')) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Commands
      return await this.execute('document.execCommand("copy")');
    } else {
      keys = ['Command', 'c'];
    }

    if (this.isWindowsPlatform() && this.isBrowser('chrome')) {
      // For Windows we need to send a keyup signal to release Control key
      // https://webdriver.io/docs/api/browser/keys.html
      await this.browser.keys(keys);
      return this.browser.keys('Control');
    }

    return this.browser.keys(keys);
  }

  // behaviour is OS specific:
  // windows moves to next paragraph up
  // osx moves to top of document
  moveUp(selector: string) {
    let control: string = 'Command';
    if (this.isWindowsPlatform()) {
      control = 'Control';
    }

    const keys = [control, 'ArrowUp'];
    if (this.isBrowser('chrome')) {
      return this.type(selector, keys);
    }

    return this.browser.keys(keys);
  }

  // Wait
  async waitForSelector(
    selector: string,
    options: WaitUntilOptions = defaultWaitingOptions,
    reverse = false,
  ) {
    const elem = await this.browser.$(selector);

    return elem.waitForExist({ timeout: options.timeout, reverse });
  }

  async waitForVisible(
    selector: string,
    options: WaitUntilOptions = defaultWaitingOptions,
  ) {
    const elem = await this.browser.$(selector);

    return elem.waitForDisplayed({ timeout: options.timeout });
  }

  async waitForInvisible(
    selector: string,
    options: WaitUntilOptions = defaultWaitingOptions,
  ) {
    const elem = await this.browser.$(selector);

    return elem.waitForDisplayed({ timeout: options.timeout, reverse: true });
  }

  async waitUntilContainsText(selector: string, text: string) {
    await this.waitUntil(async () => {
      const content = await this.getText(selector);
      return content.indexOf(text) !== -1;
    });
  }

  waitFor(
    selector: string,
    ms: number | undefined = undefined,
    reverse: boolean = false,
  ) {
    const options = ms !== undefined ? { timeout: ms } : undefined;
    return this.waitForSelector(selector, options, reverse);
  }

  waitUntil(predicate: () => Promise<boolean>, errorMessage?: string) {
    return this.browser.waitUntil(predicate, {
      timeout: WAIT_TIMEOUT,
      timeoutMsg: errorMessage,
    });
  }

  waitForElementCount(selector: string, count: number) {
    return this.waitUntil(async () => {
      return (await this.count(selector)) === count;
    });
  }

  // Window
  setWindowSize(width: number, height: number) {
    return this.browser.setWindowSize(width, height);
  }

  /*
   * Mock the current date in the browser, make sure to await. Mock is set to
   * Wed Aug 16 00:00:00 2017 +0000, 1502841600 seconds since epoch, or 1502841600000 milliseconds
   * since epoch, the start of the UTC day of the first commit in atlassian-frontend.
   */
  async mockStandardDate() {
    const AUG_16TH_2017_00_00_00_UTC = {
      year: 2017,
      monthIndex: 7, // 0 based, Aug is 8th month
      day: 16,
      hour: 0,
      minute: 0,
      second: 0,
      tz: 0,
    };
    await this.mockDate(AUG_16TH_2017_00_00_00_UTC);
  }

  /**
   * Mock the Date object in the browser, make sure to await. You must tear it down with
   * await page.teardownMockDate() after your test.
   */
  async mockDate({
    year,
    monthIndex,
    day,
    hour,
    minute,
    tz,
  }: {
    year: number;
    monthIndex: number;
    day: number;
    hour: number;
    minute: number;
    tz: number;
  }) {
    await this.browser.execute(
      mockBrowserDate,
      year,
      monthIndex,
      day,
      hour,
      minute,
      tz,
    );
  }

  /**
   * Reset the date mock in the browser. Make sure to await. If no mock is active this is a noop.
   */
  async teardownMockDate() {
    await this.browser.execute(() => {
      if ((window as any)._Date) {
        window.Date = (window as any)._Date;
        (window as any)._Date = undefined;
      }
    });
  }

  async safariCompatibleTab() {
    if (this.isBrowser('Safari')) {
      await this.keys('\ue00A\ue004');
    } else {
      await this.keys('\ue004');
    }
  }

  async pause(timeInMilliseconds: number = 1000) {
    await this.browser.pause(timeInMilliseconds);
  }

  async maximizeWindow() {
    await this.browser.maximizeWindow();
  }

  hasCapabilities() {
    return !!this.browser.capabilities;
  }

  async uploadFile(localFilePath: string) {
    // Any is because there is a bug in webdriverio types in version 5.11.0
    // It is only fixed in 5.11.14, but that version introduces bigger problem.
    const filename: string = (await this.browser.uploadFile(
      localFilePath,
    )) as any;
    return filename;
  }

  async modifierClick(mod: Modifier) {
    await this.browser.performActions([
      {
        type: 'key',
        id: 'keyboard',
        actions: [{ type: 'keyDown', value: this.toChar(mod) }],
      },
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'mouse' },
        actions: [{ type: 'pointerDown', button: 0 }],
      },
    ]);
    await this.browser.releaseActions();
  }
}
