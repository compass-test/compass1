import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('CommerceForm snapshot Test', () => {
  it('CommerceForm disabled example should match snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'final-form',
      'vr-with-disabled-fields',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('button[type="submit"]');
    const example = await page.$('[data-testid="examples"]');
    if (example) {
      const image = await example.screenshot();
      expect(image).toMatchProdImageSnapshot();
    }
  });

  it('CommerceForm vr validation example should display error', async () => {
    const url = getExampleUrl(
      'commerce',
      'final-form',
      'vr-with-validation',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');
    await page.waitForSelector('span[aria-label="error"]');
    const example = await page.$('[data-testid="examples"]');
    if (example) {
      const image = await example.screenshot();
      expect(image).toMatchProdImageSnapshot();
    }
  });
});
