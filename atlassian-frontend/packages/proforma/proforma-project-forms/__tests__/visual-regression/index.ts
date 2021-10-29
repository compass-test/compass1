import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ProformaProjectForms basic example should match production example', async () => {
    const url = getExampleUrl(
      'proforma',
      'proforma-project-forms',
      'project-forms',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//span//*[contains(text(), 'Template 12')]");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
