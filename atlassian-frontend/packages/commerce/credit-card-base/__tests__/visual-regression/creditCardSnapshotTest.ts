import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  test('Credit Card matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'credit-card-base',
      'basic-example',
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

  test('Loading and display CreditCard state matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'credit-card-base',
      'ui-examples',
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

  test('Loading and displaying CreditCard state with Japanese locale matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'credit-card-base',
      'i18n',
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

  test('Framebreaker matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'credit-card-base',
      'frame-breaker-vr',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);

    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('Credit card error matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'credit-card-base',
      'credit-card-error-vr',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);

    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
