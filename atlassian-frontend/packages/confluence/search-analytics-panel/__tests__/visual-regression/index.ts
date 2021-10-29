import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('renders menu for panel', async () => {
    const url = getExampleUrl(
      'confluence',
      'search-analytics-panel',
      'menu',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="search-analytics-panel-menu"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
  it('renders icon analytics row correctly with users and space icons', async () => {
    const url = getExampleUrl(
      'confluence',
      'search-analytics-panel',
      'basic-table',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="search-analytics-panel-table"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
  it('renders analytics icon and tooltip when mouse hovers over a row', async () => {
    const url = getExampleUrl(
      'confluence',
      'search-analytics-panel',
      'interactive-table',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="search-analytics-panel-table"]');
    await page.mouse.move(100, 100);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
