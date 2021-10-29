import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ProformaIssueView when add form button has not been clicked', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-jira-issue-view',
      'load-issue-view-closed',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//div[text()='A Simple Form']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('ProformaIssueView when add form button has been clicked', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-jira-issue-view',
      'load-issue-view-open',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//div[text()='A Simple Form']");
    /*
     * Wait for select options to load https://devhints.io/xpath#class-check
     * */
    await page.waitForXPath(
      "//div[contains(concat(' ',normalize-space(@class),' '),'atlaskit_select_1__option')]",
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
