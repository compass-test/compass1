import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('TEMPLATE_COMPONENT_NAME basic example should match production example', async () => {
    const url = getExampleUrl(
      'template-dir',
      'template-package',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="TEMPLATE_TEST_ID"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
