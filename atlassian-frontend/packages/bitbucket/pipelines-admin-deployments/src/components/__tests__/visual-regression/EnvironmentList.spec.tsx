import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const openExamplesAndWaitFor = async (example: string, selector: string) => {
  const url = getExampleUrl(
    'bitbucket',
    'pipelines-admin-deployments',
    example,
    global.__BASEURL__,
  );
  const { page } = global;

  await loadPage(page, url);
  await page.waitForSelector(selector);
};

describe('<EnvironmentList />', () => {
  const selector = "[data-testid='environment-list']";
  const headerSelector = "[data-testid='environment-header']";

  it('should render deployment settings screen', async () => {
    await openExamplesAndWaitFor('environment-list', selector);

    await global.page.waitForSelector(headerSelector);
    await global.page.click(headerSelector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});
