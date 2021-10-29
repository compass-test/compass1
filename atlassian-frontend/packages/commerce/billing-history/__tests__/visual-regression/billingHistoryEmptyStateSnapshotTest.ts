import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Billing history empty state', () => {
  it('displays empty state', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'billing-history',
      'no-data',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="billing-history.empty-state"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
