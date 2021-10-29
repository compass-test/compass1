import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('PaginatedPickerSingle example should match production example', async () => {
    const url = getExampleUrl(
      'jira',
      'paginated-picker',
      'single-options',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//div[text()='Jira Software']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('PaginatedPickerInvalid example should match production example', async () => {
    const url = getExampleUrl(
      'jira',
      'paginated-picker',
      'invalid-selection',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//div[text()='Rocket Launch']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('PaginatedPickerGrouped example should match production example', async () => {
    const url = getExampleUrl(
      'jira',
      'paginated-picker',
      'grouped-options',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//div[text()='Email Request']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('PaginatedPickerAvatar example should match production example', async () => {
    const url = getExampleUrl(
      'jira',
      'paginated-picker',
      'avatar-options',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//div[text()='Email Request']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('PaginatedPickerLozenge example should match production example', async () => {
    const url = getExampleUrl(
      'jira',
      'paginated-picker',
      'lozenge-options',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//span[text()='Email Request']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('PaginatedPickerGroupedSelectedNotFirst example should match production example', async () => {
    const url = getExampleUrl(
      'jira',
      'paginated-picker',
      'grouped-options-selected-not-first',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForXPath("//div[text()='Email Request']");
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
