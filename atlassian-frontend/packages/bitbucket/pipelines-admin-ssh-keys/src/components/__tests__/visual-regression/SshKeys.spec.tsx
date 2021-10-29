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

const addKeysButton = '#add-keys';

describe('<SshKeys />', () => {
  const selector = "[data-testid='pipelines-ssh-keys']";

  it('should render ssh keys splash screen', async () => {
    await openExamplesAndWaitFor('ssh-keys', selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });

  it('should render ssh keys add screen', async () => {
    await openExamplesAndWaitFor('ssh-keys', selector);

    await global.page.waitForSelector(addKeysButton);
    await global.page.click(addKeysButton);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});
