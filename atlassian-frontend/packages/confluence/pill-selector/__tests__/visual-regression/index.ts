import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('PillSelector basic example should match production example', async () => {
    const url = getExampleUrl(
      'confluence',
      'pill-selector',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="pill-selector"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
