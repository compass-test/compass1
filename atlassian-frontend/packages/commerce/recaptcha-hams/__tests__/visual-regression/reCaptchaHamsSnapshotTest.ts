import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  test('0-getting-started example matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'recaptcha-hams',
      'getting-started',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
