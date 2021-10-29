import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const openExamplesAndWaitFor = async (example: string, selector: string) => {
  const url = getExampleUrl(
    'bitbucket',
    'pipelines-admin-ssh-keys',
    example,
    global.__BASEURL__,
  );
  const { page } = global;

  await loadPage(page, url);
  await page.waitForSelector(selector);
};

describe('<KnownHosts />', () => {
  const selector = "[data-testid='pipelines-known-hosts']";
  // FIXME: Inconsistent test flags during the puppeteer's upgrade.
  // In CI, the page is not loaded at the right time and the screenshot results into a diff based on element position.
  it.skip('should render known hosts screen', async () => {
    await openExamplesAndWaitFor('known-hosts', selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});
