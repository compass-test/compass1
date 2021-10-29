import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  beforeAll(async () => {
    const { page } = global;
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);
  });

  // it('Charts pie example should match production', async () => {
  //   const url = getExampleUrl(
  //     'confluence',
  //     'charts',
  //     'pie',
  //     global.__BASEURL__,
  //   );
  //   const { page } = global;
  //   await loadPage(page, url);
  //   await page.waitForSelector('[data-testid="charts"]');

  //   const image = await page.screenshot({
  //     captureBeyondViewport: true,
  //     fullPage: true,
  //   });
  //   expect(image).toMatchProdImageSnapshot();
  // });

  it('Charts errors example should match production', async () => {
    const url = getExampleUrl(
      'confluence',
      'charts',
      'errors',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    const element = await page.waitForSelector('[data-testid="charts"]');

    const image = await element?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('Charts bar example should match production', async () => {
    const url = getExampleUrl(
      'confluence',
      'charts',
      'bar',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="charts"]');

    const image = await page.screenshot({
      captureBeyondViewport: true,
      fullPage: true,
    });
    expect(image).toMatchProdImageSnapshot();
  });
});
