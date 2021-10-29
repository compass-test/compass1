import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe.skip('Snapshot Test', () => {
  it('NotificationStore basic example should match production example', async () => {
    const url = getExampleUrl(
      'notifications',
      'notification-store',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="notification-store"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
