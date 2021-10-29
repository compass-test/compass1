import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('renders customized analytics row correctly with users and space icons', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-row',
      'customized-avatar-rows',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-row"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
  it('renders icon analytics row correctly with users and space icons', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-row',
      'icon-rows',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-row"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
  it('renders tooltip when mouse is near a point', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-row',
      'interactive-rows',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-row"]');
    await page.mouse.move(100, 100);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
