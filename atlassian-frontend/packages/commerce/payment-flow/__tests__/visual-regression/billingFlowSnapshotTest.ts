import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Update your billing address', () => {
  test('Should display billing details form', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'billing-flow-vr',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.waitForSelector('button[type="submit"]');
    const example = await page.waitForSelector('[data-testid="billing-flow"]');
    const image = await example?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
