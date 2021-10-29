import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ProformaJiraDataConnections example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-jira-data-connections',
      'load-data-connections',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//span[text()='Add Connection']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
