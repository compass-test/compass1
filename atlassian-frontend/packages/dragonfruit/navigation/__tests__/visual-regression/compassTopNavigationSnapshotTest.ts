import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('CompassTopNavigation Snapshot Test', () => {
  it('CompassTopNavigation should match snapshot', async () => {
    const { page } = global;

    const url = getExampleUrl(
      'dragonfruit',
      'navigation',
      'top-navigation',
      global.__BASEURL__,
    );

    await loadPage(page, url);

    const navigation = await page.waitForSelector(
      '[data-testid="dragonfruit.navigation.examples.top-navigation"]',
    );
    const image = await navigation?.screenshot();

    expect(image).toMatchProdImageSnapshot();
  });
});
