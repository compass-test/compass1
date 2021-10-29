import {
  getExampleUrl,
  loadPage,
  PuppeteerPage,
} from '@atlaskit/visual-regression/helper';

const Selectors = {
  UnreadToggleOn: 'label[data-checked="true"]',
  ReadStateToggle: '[data-testid="read-state-toggle"]',
  NotificationDocumentWrapper:
    '[data-testid="notification-item-document-wrapper"]',
  NotificationSkeleton: '[data-testid="notification-item-opt-skeleton"]',
  NotificationDocumentSkeleton:
    '[data-testid="notification-document-skeleton"]',
  Tab: '[role="tab"]',
};

const vrTestsUrl = getExampleUrl(
  'notifications',
  'notification-list',
  'vr-tests-playground',
  global.__BASEURL__,
);

const VR_STABILITY_BUFFER = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const setReadStateToggle = async (toggled: boolean, page: PuppeteerPage) => {
  // If this is truthy, it means the toggle is ON
  const unreadToggledOn = await page.$(Selectors.UnreadToggleOn);
  const toggle = await page.waitForSelector(Selectors.ReadStateToggle);

  // Click the toggle if its not the expected value
  if (Boolean(unreadToggledOn) !== toggled) {
    await toggle?.click();
    return;
  }
};

describe('Snapshot Test', () => {
  test('NotificationList basic example with Direct + Any read state should match production example', async () => {
    const { page } = global;
    await page.setViewport({
      width: 600,
      height: 1000,
    });

    await loadPage(page, vrTestsUrl);

    await setReadStateToggle(false, page);
    const tabs = await page.$$(Selectors.Tab);
    await tabs[0]?.click();

    await page.waitForSelector(Selectors.NotificationDocumentWrapper);
    await page.waitForFunction(
      `!document.querySelector('${Selectors.NotificationSkeleton}') && !document.querySelector('${Selectors.NotificationDocumentSkeleton}')`,
    );
    await sleep(VR_STABILITY_BUFFER);
    const image = await page.screenshot();

    expect(image).toMatchProdImageSnapshot();
  });

  test('NotificationList basic example with Watching + Any read state should match production example', async () => {
    const { page } = global;
    await page.setViewport({
      width: 600,
      height: 1000,
    });

    await loadPage(page, vrTestsUrl);

    await setReadStateToggle(false, page);
    const tabs = await page.$$(Selectors.Tab);
    await tabs[1]?.click(); // Click the watching tab

    await page.waitForSelector(Selectors.NotificationDocumentWrapper);
    await page.waitForFunction(
      `!document.querySelector('${Selectors.NotificationSkeleton}') && !document.querySelector('${Selectors.NotificationDocumentSkeleton}')`,
    );
    await sleep(VR_STABILITY_BUFFER);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('NotificationList basic example with Direct + Unread state should match production example', async () => {
    const { page } = global;
    await page.setViewport({
      width: 600,
      height: 1000,
    });

    await loadPage(page, vrTestsUrl);

    await setReadStateToggle(true, page);
    const tabs = await page.$$(Selectors.Tab);
    await tabs[0]?.click();

    await page.waitForSelector(Selectors.NotificationDocumentWrapper);
    await page.waitForFunction(
      `!document.querySelector('${Selectors.NotificationSkeleton}') && !document.querySelector('${Selectors.NotificationDocumentSkeleton}')`,
    );
    await sleep(VR_STABILITY_BUFFER);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('NotificationList basic example with Watching Tab + Unread state should match production example', async () => {
    const { page } = global;
    await page.setViewport({
      width: 600,
      height: 1000,
    });

    await loadPage(page, vrTestsUrl);

    await setReadStateToggle(true, page);
    const tabs = await page.$$(Selectors.Tab);
    await tabs[1]?.click();
    await page.waitForSelector(Selectors.NotificationDocumentWrapper);
    await page.waitForFunction(
      `!document.querySelector('${Selectors.NotificationSkeleton}') && !document.querySelector('${Selectors.NotificationDocumentSkeleton}')`,
    );
    await sleep(VR_STABILITY_BUFFER);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
