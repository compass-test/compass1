import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  // FIXME: This test was automatically skipped due to failure on 10/21/2021: https://product-fabric.atlassian.net/browse/SKIP-85
  it.skip('ProformaPortalView example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-jira-portal-view',
      'load-portal-view',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//div[text()='A Simple Form']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
