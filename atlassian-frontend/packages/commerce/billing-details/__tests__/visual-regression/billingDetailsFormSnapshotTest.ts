import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Billing address details form', () => {
  it('Renders correctly on initial empty state', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'billing-details',
      'billing-details-form-empty',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.waitForSelector("button[type='submit']");
    const image = await page.screenshot({
      fullPage: true,
      captureBeyondViewport: true,
    });
    expect(image).toMatchProdImageSnapshot();
  });

  it('shows all validation messages when required fields are not filled', async () => {
    const { page } = global;
    const url = getExampleUrl(
      'commerce',
      'billing-details',
      'client-side-validation',
      global.__BASEURL__,
    );
    await loadPage(page, url);
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');
    await page.waitForSelector('span[aria-label="error"]');
    const image = await page.screenshot({
      fullPage: true,
      captureBeyondViewport: true,
    });
    expect(image).toMatchProdImageSnapshot();
  });
});

it('shows form validation messages when response has corresponding error code', async () => {
  const { page } = global;
  const url = getExampleUrl(
    'commerce',
    'billing-details',
    'unrececognized-address-error-messages',
    global.__BASEURL__,
  );
  await loadPage(page, url);
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
  await page.waitForSelector('div[role="alert"]');
  const image = await page.screenshot({
    fullPage: true,
    captureBeyondViewport: true,
  });
  expect(image).toMatchProdImageSnapshot();
});

it('shows form message when response is general failure', async () => {
  const { page } = global;
  const url = getExampleUrl(
    'commerce',
    'billing-details',
    'form-error-message-server-error',
    global.__BASEURL__,
  );
  await loadPage(page, url);
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
  await page.waitForSelector('div[role="alert"]');
  const image = await page.screenshot({
    fullPage: true,
    captureBeyondViewport: true,
  });
  expect(image).toMatchProdImageSnapshot();
});
