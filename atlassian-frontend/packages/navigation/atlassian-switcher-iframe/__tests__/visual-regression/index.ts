import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('AtlassianSwitcherIframe basic example should match production example', async () => {
    const url = getExampleUrl(
      'navigation',
      'atlassian-switcher-iframe',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="atlassian-switcher-iframe"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('AtlassianSwitcherIframe drawer example should match production example', async () => {
    const url = getExampleUrl(
      'navigation',
      'atlassian-switcher-iframe',
      'drawer',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector('[data-testid="atlassian-switcher-iframe"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
