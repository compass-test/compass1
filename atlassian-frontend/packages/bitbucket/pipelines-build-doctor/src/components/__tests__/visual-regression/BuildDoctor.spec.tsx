import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const openExamplesAndWaitFor = async (example: string, selector: string) => {
  const url = getExampleUrl(
    'bitbucket',
    'pipelines-build-doctor',
    example,
    global.__BASEURL__,
  );
  const { page } = global;

  await loadPage(page, url);
  await page.waitForSelector(selector);
};

describe('<BuildDoctor />', () => {
  const selector = "[data-testid='pipelines-build-doctor']";
  const button = 'button:not([disabled])';
  it.skip('should render build doctor dialog', async () => {
    await openExamplesAndWaitFor('build-doctor', selector);
    await global.page.waitForSelector(button);
    await global.page.click(button);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});
