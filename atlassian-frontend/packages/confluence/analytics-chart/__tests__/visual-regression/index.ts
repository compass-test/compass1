import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('render analytics chart linear chart correctly', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-chart',
      'linear-chart',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-chart"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
  it('render analytics chart with one value correctly', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-chart',
      'linear-chart-one-value',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-chart"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
  it('render analytics chart with only zero values correctly', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-chart',
      'linear-chart-all-zeros',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-chart"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
  it('render tooltip when mouse is near a point', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-chart',
      'linear-chart-all-zeros',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-chart"]');
    await page.mouse.move(100, 100);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
