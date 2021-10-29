import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ExampleComponentPublic basic example should match production example', async () => {
    const url = getExampleUrl(
      'reference',
      'example-component-public',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="example-component"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
