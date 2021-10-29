import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('LinkList Snapshot Test', () => {
  it('LinkList should match snapshot', async () => {
    const { page } = global;

    const url = getExampleUrl(
      'dragonfruit',
      'components',
      'link-list',
      global.__BASEURL__,
    );

    await loadPage(page, url);

    const list = await page.waitForSelector(
      '[data-testid="dragonfruit.components.examples.link-list"]',
    );
    const image = await list?.screenshot();

    expect(image).toMatchProdImageSnapshot();
  });
});
