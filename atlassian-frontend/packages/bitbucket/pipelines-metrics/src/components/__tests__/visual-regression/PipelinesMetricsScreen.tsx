import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('<PipelinesMetrics />', () => {
  // FIXME: This test was automatically skipped due to failure on 10/24/2021: https://product-fabric.atlassian.net/browse/SKIP-86
  it.skip('should match no metrics screen', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-metrics',
      'pipelines-metrics',
      global.__BASEURL__,
    );
    const { page } = global;
    await page.setViewport({ width: 700, height: 850 });
    await loadPage(page, url);
    const element = await page.waitForSelector('[data-testid="metrics"]');
    await page.waitForSelector(
      '[data-testid="pipelines-metrics-container-dropdown--trigger"]',
    );
    await page.click(
      '[data-testid="pipelines-metrics-container-dropdown--trigger"]',
    );
    const image = await element?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
