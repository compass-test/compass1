import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ProformaPortalCreate example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-jira-portal-create',
      'load-portal-create',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//span[text()='α: Alpha']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
