import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Update your billing address', () => {
  test('Should display billing details form', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'add-payment-details-inc-cancel-vr',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.waitForSelector('button[type="submit"]');
    const image = await page.screenshot({
      fullPage: true,
      captureBeyondViewport: true,
    });
    expect(image).toMatchProdImageSnapshot();
  });

  test('Should display add payment method form', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'add-payment-details-inc-cancel-vr',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.click('button[type="submit"]');
    await page.waitForSelector('button[type="submit"]');
    await page.waitForSelector(
      '[data-testid="commerce-creditcard.complete-state"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('Should display summary form', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'add-payment-details-inc-cancel-vr',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.click('button[type="submit"]');
    await page.waitForSelector('button[type="submit"]');
    await page.waitForSelector(
      '[data-testid="commerce-creditcard.complete-state"]',
    );

    await page.type('input[name="cardholderName"]', 'Yo!');
    await page.click('button[type="submit"]');
    await page.waitForSelector('[property="address"]');

    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('Error loading flow data should match snapshot', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'error-loading-flow-data-vr',
      global.__BASEURL__,
    );

    await loadPage(page, url);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('Deferred payment-method payment method page should match snapshot', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'update-deferred-payment-method-vr',
      global.__BASEURL__,
    );

    await loadPage(page, url);
    await page.click('button[type="submit"]');
    await page.waitForSelector('button[type="submit"]');
    await page.waitForSelector(
      '[data-testid="commerce-payment-methods.deferred-content"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('Credit card payment-method payment method page should match snapshot', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'update-credit-card-payment-method-vr',
      global.__BASEURL__,
    );

    await loadPage(page, url);
    await page.click('button[type="submit"]');
    await page.waitForSelector('button[type="submit"]');
    await page.waitForSelector(
      '[data-testid="commerce-payment-methods.wallet.payment-list.collapsed"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('Credit card payment-method payment method with no default for invoice group page should match snapshot', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'payment-flow',
      'update-credit-card-no-default-set-for-ig-vr',
      global.__BASEURL__,
    );

    await loadPage(page, url);
    await page.click('button[type="submit"]');
    await page.waitForSelector('button[type="submit"]');
    await page.waitForSelector(
      '[data-testid="commerce-payment-methods.wallet.payment-list.collapsed"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
