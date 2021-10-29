import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ChromaPlansTable basic example should match production example', async () => {
    const url = getExampleUrl(
      'chroma',
      'plans-table',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    page.setViewport({ height: 800, width: 1280 });
    await page.waitForSelector('[data-testid="chroma-plans-table"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
