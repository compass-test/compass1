import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ProformaFormBuilder example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-form-builder',
      'load-form-builder-empty',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath(
      "//span[text()='To help you start building a form you can use the form templates in the right sidebar.']",
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
