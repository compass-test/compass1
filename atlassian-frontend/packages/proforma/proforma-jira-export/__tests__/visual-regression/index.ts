import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ProformaJiraExport example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-jira-export',
      'load-export',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//*[@id='exportProjectFormSelect']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
