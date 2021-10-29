import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Billing history', () => {
  it('Loading and display state matches each other', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'billing-history',
      'mocked-data',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.waitForSelector('tbody');
    const example = await page.waitForSelector('[data-testid="mocked-data"]');
    const image = await example?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
