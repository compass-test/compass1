import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('AddLinkForm Snapshot Test', () => {
  it('AddLinkForm should match snapshot', async () => {
    const { page } = global;

    const url = getExampleUrl(
      'dragonfruit',
      'components',
      'add-link-form',
      global.__BASEURL__,
    );

    await loadPage(page, url);

    const form = await page.waitForSelector(
      '[data-testid="dragonfruit.components.examples.add-link-form"]',
    );
    const image = await form?.screenshot();

    expect(image).toMatchProdImageSnapshot();
  });
});
