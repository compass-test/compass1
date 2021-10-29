import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  test('Commerce policy subscription matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'legal-notes',
      'commerce-policy-subscription',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      '[data-testid="commerce-legal-notes.legal-note"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('Implicit policy agreement matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'legal-notes',
      'policy-agreement-implicit',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      '[data-testid="commerce-legal-notes.legal-note"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('Explicit policy agreement matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'legal-notes',
      'policy-agreement-explicit',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid*="policy-checkbox"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  test('Visa legal note matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'legal-notes',
      'visa-legal-note',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      '[data-testid="commerce-legal-notes.legal-note"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
