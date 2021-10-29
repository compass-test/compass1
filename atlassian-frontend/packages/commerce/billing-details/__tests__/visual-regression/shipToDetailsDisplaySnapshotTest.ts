import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('renders correctly ship-to details inline', async () => {
    const url = getExampleUrl(
      'commerce',
      'billing-details',
      'ship-to-details-inline',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('div[data-testid="examples"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders correctly ship-to details panel', async () => {
    const url = getExampleUrl(
      'commerce',
      'billing-details',
      'ship-to-details-form',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('div[data-testid="examples"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders correctly ship-to details form', async () => {
    const url = getExampleUrl(
      'commerce',
      'billing-details',
      'ship-to-details-panel',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    const element = await page.waitForSelector('div[data-testid="examples"]');
    const image = await element?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders correctly ship-to details form with copy bill-to', async () => {
    const url = getExampleUrl(
      'commerce',
      'billing-details',
      'vr-ship-to-details-form-with-copy',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    const element = await page.waitForSelector('div[data-testid="examples"]');
    const image = await element?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('ship-to details copies bill-to details across and renders', async () => {
    const url = getExampleUrl(
      'commerce',
      'billing-details',
      'vr-ship-to-details-form-with-copy',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      'label[data-testid="commerce.billing-details.ship-to-details-form.checkbox--checkbox-label"]',
    );
    await page.click(
      'label[data-testid="commerce.billing-details.ship-to-details-form.checkbox--checkbox-label"]',
    );

    await page.waitForSelector('input[value="341 George St"]');
    const element = await page.waitForSelector('[data-testid="examples"]');
    const image = await element?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
