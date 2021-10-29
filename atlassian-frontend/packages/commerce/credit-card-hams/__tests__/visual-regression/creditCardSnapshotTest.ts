import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('Credit Card matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'credit-card-hams',
      'minimal-implementation',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      '[data-testid="commerce-creditcard.complete-state"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
