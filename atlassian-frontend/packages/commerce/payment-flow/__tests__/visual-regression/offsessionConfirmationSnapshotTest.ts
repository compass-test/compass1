import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Offsession payment confirm visual', () => {
  it('should display offsession payment confirmation ui', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'offsession-payment-confirm-vr',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.waitForSelector('button');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  // FIXME These tests were flakey in the Puppeteer v10 Upgrade
  it.skip('should display payment method update form', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'offsession-payment-confirm-update-payment-method-vr',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.click(
      '[data-testid="commerce-off-sesion-payment-flow.charge-error.update-payment-method"]',
    );
    await page.waitForSelector('button');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
