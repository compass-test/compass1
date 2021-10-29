import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Billing address details form', () => {
  it('Loading and display state matches each other', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'billing-details',
      'vr-loading-state',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    const element = await page.waitForSelector(
      '[data-testid="vr-loading-state"]',
    );
    const image = await element?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
