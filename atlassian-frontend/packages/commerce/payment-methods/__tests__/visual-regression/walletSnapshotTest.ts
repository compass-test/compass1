import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Wallet Snapshot Test', () => {
  test('PaymentMethodWallets should match snapshot when default selected payment method provided', async () => {
    const url = getExampleUrl(
      'commerce',
      'payment-methods',
      'vr-wallet-selected-default-payment-method',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      'button[data-testid="commerce-payment-methods.wallet.view-more"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('PaymentMethodWallets should match snapshot when no default or select payment method provided', async () => {
    const url = getExampleUrl(
      'commerce',
      'payment-methods',
      'vr-wallet-no-selected-default-payment-method',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      'button[data-testid="commerce-payment-methods.wallet.view-more"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('PaymentMethodWallets should match snapshot when selected method is not the default', async () => {
    const url = getExampleUrl(
      'commerce',
      'payment-methods',
      'vr-wallet-selected-nondefault-payment-method',
      global.__BASEURL__,
    );

    const { page } = global;
    await loadPage(page, url);

    await page.waitForSelector(
      'button[data-testid="commerce-payment-methods.wallet.view-more"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
