import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('LinkSection Snapshot Test', () => {
  it('LinkSection empty state should match snapshot', async () => {
    const { page } = global;

    const url = getExampleUrl(
      'dragonfruit',
      'components',
      'link-section',
      global.__BASEURL__,
    );

    await loadPage(page, url);

    const list = await page.waitForSelector(
      '[data-testid="dragonfruit.components.examples.link-section.empty"]',
    );
    const image = await list?.screenshot();

    expect(image).toMatchProdImageSnapshot();
  });
  it('LinkSection limit reached state should match snapshot', async () => {
    const { page } = global;

    const url = getExampleUrl(
      'dragonfruit',
      'components',
      'link-section',
      global.__BASEURL__,
    );

    await loadPage(page, url);

    const list = await page.waitForSelector(
      '[data-testid="dragonfruit.components.examples.link-section.limit-reached"]',
    );
    const image = await list?.screenshot();

    expect(image).toMatchProdImageSnapshot();
  });
});
