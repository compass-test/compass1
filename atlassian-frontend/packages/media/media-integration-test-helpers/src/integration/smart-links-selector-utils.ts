import { CardType, CardAppearance } from '@atlaskit/smart-card/types';

import { PuppeteerPage } from '@atlaskit/visual-regression/helper';
import {
  default as WebDriverPage,
  BrowserObject,
} from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  MOCK_AUTH_PROVIDER_URL,
  SmartLinkTestWindow,
} from './smart-links-mock-client-utils';

type TestPage = PuppeteerPage | WebDriverPage;
export function isPuppeteer(page: TestPage): page is PuppeteerPage {
  return !!process.env.VISUAL_REGRESSION;
}
declare let window: SmartLinkTestWindow;

export const lazyCardSelector = `[data-testid="lazy-render-placeholder"]`;
export const inlineCardSelector = (status: CardType = 'resolved') =>
  `[data-testid="inline-card-${status.replace(/_/g, '-')}-view"]`;
export const blockCardSelector = (status: CardType = 'resolved') =>
  `[data-testid="block-card-${status.replace(/_/g, '-')}-view"]`;
export const embedCardSelector = (status: CardType = 'resolved') =>
  `[data-testid="embed-card-${status.replace(/_/g, '-')}-view"]`;
const getSelector = (
  appearance: CardAppearance = 'inline',
  status: CardType = 'resolved',
) => {
  switch (appearance) {
    case 'inline': {
      return inlineCardSelector(status);
    }
    case 'block': {
      return blockCardSelector(status);
    }
    case 'embed': {
      return embedCardSelector(status);
    }
  }
};

export const waitForLazyRenderedCard = async (page: TestPage) => {
  await page.waitForSelector(lazyCardSelector);
};
export const getLazyRenderedCards = () => {
  return document.querySelectorAll(lazyCardSelector);
};
export const getCards = (
  appearance: CardAppearance = 'inline',
  status: CardType = 'resolved',
) => {
  return document.querySelectorAll(getSelector(appearance, status));
};

export const waitForResolvedInlineCard = async (
  page: TestPage,
  status?: CardType,
) => {
  await page.waitForSelector(inlineCardSelector(status));
  if (status === 'resolving') {
    await page.waitForSelector('.inline-resolving-spinner');
  }
};

export const waitForResolvedBlockCard = async (
  page: TestPage,
  status?: CardType,
) => {
  await page.waitForSelector(blockCardSelector(status));
};

/**
 * This is a helper for VR and WD tests that is used in `waitForSuccessfullyResolvedEmbedCard` method
 * to determine when all embed iframes have been fully loaded.
 * It is done in two ways:
 *
 * When `countOneEventPerIframe` is `true` this will resolve when
 * `resizeMessageNumber` is equal to number of unique iframes sending at least one `height` message.
 *
 * When it is false, it is resolved when `resizeMessageNumber` is equal to or less then
 * total number of `height` events send from all iframes.
 *
 * Please see other parts of this algorithmic dance over here:
 * - packages/editor/editor-core/examples/88-media-embed-html-source.tsx
 *  ^ this is the content of iframe that being loaded as an embed.
 *
 * - packages/media/media-integration-test-helpers/src/integration/embed-helper.tsx
 *  ^ this is the the helper for test example that listens for 'height' events from iframes and stores them
 *    into a global variable that current method then reads.
 */
const waitForIFrameToSendResizeMessageTimes = async (
  page: TestPage,
  resizeMessageNumber: number,
  countOneEventPerIframe: boolean,
) => {
  let predicate: (...args: any[]) => boolean;

  if (countOneEventPerIframe) {
    predicate = (timesExpected: number) => {
      return (
        timesExpected <=
        Object.keys((window as any).resizeHasBeenSentCount).length
      );
    };
  } else {
    predicate = (timesExpected: number) => {
      return (
        timesExpected <=
        Object.values(
          (window as any).resizeHasBeenSentCount as number[],
        ).reduce((a, b) => a + b, 0)
      );
    };
  }

  if (isPuppeteer(page)) {
    try {
      await page.waitForFunction(predicate, {}, resizeMessageNumber);
    } catch (e) {
      const actualObject = await page.evaluate(
        () => (window as any).resizeHasBeenSentCount,
      );
      // eslint-disable-next-line no-console
      console.error(
        `ERROR: Expected ${resizeMessageNumber} entries, but got`,
        JSON.stringify(actualObject, null, 2),
      );
      throw e;
    }
  } else {
    await page.waitUntil(async () =>
      page.execute(predicate, resizeMessageNumber),
    );
  }
};

export const waitForResolvedEmbedCard = async (
  page: TestPage,
  status?: CardType,
) => {
  await page.waitForSelector(embedCardSelector(status));
};

export const waitForSuccessfullyResolvedEmbedCard = async (
  page: TestPage,
  iframeHeightEventsCount = 1,
  countyOneEventPerIframe = true,
) => {
  const status = 'resolved';
  await page.waitForSelector(embedCardSelector(status));
  await page.waitForSelector('iframe');
  await waitForIFrameToSendResizeMessageTimes(
    page,
    iframeHeightEventsCount,
    countyOneEventPerIframe,
  );
  if (isPuppeteer(page)) {
    await page.waitForTimeout(500);
  } else {
    await page.pause(500);
  }
};

export const waitForInlineCardSelection = async (
  page: TestPage,
  prefix: string = '',
) => {
  await page.waitForSelector(`${prefix}.inlineCardView-content-wrap`);
  await page.click(`${prefix}.inlineCardView-content-wrap`);
  await page.waitForSelector('div[aria-label="Floating Toolbar"]');
};

export const waitForBlockCardSelection = async (
  page: TestPage,
  status?: CardType,
) => {
  const selector = status
    ? blockCardSelector(status)
    : '.blockCardView-content-wrap';
  await page.waitForSelector(selector);
  await page.click(selector);
  await page.waitForSelector('div[aria-label="Floating Toolbar"]');
};

export const waitForEmbedCardSelection = async (
  page: TestPage,
  status?: CardType,
) => {
  const selector = status
    ? embedCardSelector(status)
    : '.embedCardView-content-wrap';
  await page.waitForSelector(selector);
  // In order to properly simulate click on the frame.
  await page.click(`${selector} .embed-header`);
  await page.waitForSelector('div[aria-label="Floating Toolbar"]');
};

export const openPreviewState = async (page: TestPage) => {
  const selector = '[data-testid="button-preview-content"]';
  await page.waitForSelector(selector);
  await page.click(selector);
};

export const waitForPreviewState = async (page: TestPage) => {
  const selector = 'iframe[name="twp-editor-preview-iframe"]';
  await page.waitForSelector(selector, { visible: true });
  await waitForIFrameToSendResizeMessageTimes(page, 1, true);
};

export const getRequestedCards = async (
  page: WebDriverPage,
): Promise<string[]> => {
  return await page.$eval('window', () => window.SMART_LINKS_REQUESTED);
};

export class AuthorizationWindow {
  private client: BrowserObject;
  private page: TestPage;
  private handle?: string;

  constructor(client: BrowserObject, page: TestPage) {
    this.client = client;
    this.page = page;
    this.handle = undefined;
  }

  private getButtonSelector(status: CardType): string | undefined {
    if (status === 'unauthorized') {
      return 'connect-account';
    } else if (status === 'forbidden') {
      return 'connect-other-account';
    } else {
      return undefined;
    }
  }

  public async open(status: CardType = 'unauthorized'): Promise<void> {
    this.handle = await this.client.getWindowHandle();
    const selector = this.getButtonSelector(status);
    if (selector) {
      const selectorWithTestId = `[data-testid="button-${selector}"]`;
      await this.page.waitForSelector(selectorWithTestId);
      await this.page.click(selectorWithTestId);
    }
  }

  public async checkUrl(): Promise<boolean> {
    const handles = await this.client.getWindowHandles();
    const handleForAuth = handles.find((handle) => handle !== this.handle);
    if (handleForAuth) {
      await this.client.switchToWindow(handleForAuth);
      let url = await this.page.url();

      if (!isPuppeteer(this.page)) {
        // await until we've redirected from about:blank page in firefox
        await this.page.waitUntil(async () => {
          url = await this.page.url();
          return url !== 'about:blank';
        }, 'new window never changed from about:blank');
      }

      return url.includes(new URL(MOCK_AUTH_PROVIDER_URL).hostname);
    } else {
      return false;
    }
  }

  public async close(): Promise<void> {
    await this.client.closeWindow();
  }
}
