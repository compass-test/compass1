import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('SmartLinkWithDelete Snapshot Test', () => {
  it('SmartLinkWithDelete should match snapshot', async () => {
    const { page } = global;

    const url = getExampleUrl(
      'dragonfruit',
      'components',
      'smart-link-with-delete',
      global.__BASEURL__,
    );

    await loadPage(page, url);

    const link = await page.waitForSelector(
      '[data-testid="dragonfruit.components.examples.smart-link-with-delete"]',
    );
    const image = await link?.screenshot();

    expect(image).toMatchProdImageSnapshot();
  });
});
