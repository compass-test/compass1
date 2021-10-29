import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('HowFormsWork basic example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-common-core',
      'how-forms-work',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector("[data-testid='proforma-how-forms-work']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('ExportJiraFieldsModal basic example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-common-core',
      'export-jira-fields-modal',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      "[data-testid='proforma-export-jira-fields-modal']",
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('ListProjectForms with nested intl provider should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-common-core',
      'list-project-forms-nested-intl',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//*[text()='Template 1']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('ListProjectForms with custom nested intl provider should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-common-core',
      'list-project-forms-custom-nested-intl',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//*[text()='Template 1']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
