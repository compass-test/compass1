import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  test('PaymentMethodAppearances should match snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'payment-methods',
      'vr-ui-examples',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      '[data-testid="commerce-payment-methods.src.ui.edit-button"]',
    );
    const element = await page.waitForSelector('[data-testid="ui-demo"]');
    const image = await element?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
