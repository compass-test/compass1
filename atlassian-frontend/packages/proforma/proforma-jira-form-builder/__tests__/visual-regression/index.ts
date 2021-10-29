import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it.skip('ProformaJiraFormBuilder example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-jira-form-builder',
      'load-jira-form-builder',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//span[text()='Image URL']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
