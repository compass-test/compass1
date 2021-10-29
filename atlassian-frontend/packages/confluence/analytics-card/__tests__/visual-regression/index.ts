import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('renders Analytics card correctly with users', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-card',
      'avatar-card',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-card"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders Analytics card correctly with icons', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-card',
      'icon-content-card',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-card"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders Analytics card correctly with icons', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-card',
      'icon-card',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-card"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders empty Analytics card correctly', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-card',
      'empty-card',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-card"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders search Analytics card correctly', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-card',
      'search-card',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-card"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
  it('renders search Analytics card correctly', async () => {
    const url = getExampleUrl(
      'confluence',
      'analytics-card',
      'interactive-rows-card',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="analytics-card"]');
    await page.mouse.move(100, 100);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
