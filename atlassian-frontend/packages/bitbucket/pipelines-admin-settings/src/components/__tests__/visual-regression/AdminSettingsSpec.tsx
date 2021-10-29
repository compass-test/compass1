import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const openExamplesAndWaitFor = async (example: string, selector: string) => {
  const url = getExampleUrl(
    'bitbucket',
    'pipelines-admin-settings',
    example,
    global.__BASEURL__,
  );
  const { page } = global;

  await loadPage(page, url);
  await page.waitForSelector(selector);
};

describe('<AdminSettings />', () => {
  const selector = "[data-testid='pipelines-admin-settings']";

  it('should match Admin Settings screen', async () => {
    await openExamplesAndWaitFor('admin-settings', selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});
