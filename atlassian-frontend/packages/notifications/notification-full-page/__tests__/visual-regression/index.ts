import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it.skip('NotificationFullPage basic example should match production example', async () => {
    const url = getExampleUrl(
      'notifications',
      'notification-full-page',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="notification-full-page"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
