import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('SmartLinkListItem should match snapshot', async () => {
    const { page } = global;

    const url = getExampleUrl(
      'dragonfruit',
      'common-ui',
      'smart-link-list',
      global.__BASEURL__,
    );

    await loadPage(page, url);

    const list = await page.waitForSelector(
      '[data-testid="dragonfruit.common-ui.examples.smart-link-list.list"]',
    );
    const image = await list?.screenshot();

    expect(image).toMatchProdImageSnapshot();
  });
});
