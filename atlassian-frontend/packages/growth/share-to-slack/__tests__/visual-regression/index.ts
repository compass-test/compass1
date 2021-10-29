import type { Page } from 'puppeteer';

import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe.each([
  'slack-disabled-form--jira',
  'slack-disabled-form--confluence',
  'slack-consent-primer--jira',
  'slack-consent-primer--confluence',
  'share-to-slack-form--loading',
  'share-to-slack-form--loaded',
])('Snapshot Test', (exampleId: string) => {
  it(`should match visual snapshot for ${exampleId}`, async () => {
    const url = getExampleUrl(
      'growth',
      'share-to-slack',
      exampleId,
      global.__BASEURL__,
    );

    const page = global.page as Page;
    await loadPage(page, url);
    await page.setViewport({ width: 1280, height: 768 });
    await page.waitForSelector('[role="dialog"]');
    const screenshot = await page.screenshot();

    expect(screenshot).toMatchProdImageSnapshot();
  });
});
