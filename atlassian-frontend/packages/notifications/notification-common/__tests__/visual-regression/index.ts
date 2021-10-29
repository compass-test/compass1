import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it.skip('NotificationCommon basic example should match production example', async () => {
    const url = getExampleUrl(
      'notifications',
      'notification-common',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="notification-common"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
