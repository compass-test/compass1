import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const openExamplesAndWaitFor = async (example: string, selector: string) => {
  const url = getExampleUrl(
    'bitbucket',
    'pipelines-admin-integrations',
    example,
    global.__BASEURL__,
  );
  const { page } = global;

  await loadPage(page, url);
  await page.waitForSelector(selector);
};

describe('<IntegrationsList />', () => {
  const selector = "[data-testid='pipelines-admin-integrations']";

  it('should match Integrations List screen', async () => {
    await openExamplesAndWaitFor('integrations-list', selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});
