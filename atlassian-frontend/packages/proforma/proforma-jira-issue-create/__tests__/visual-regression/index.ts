import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ProformaIssueCreate example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-jira-issue-create',
      'load-issue-create',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//span[text()='Create']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('ProformaIssueCreateDirect example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-jira-issue-create',
      'load-issue-create-direct',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//span[text()='Create']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
