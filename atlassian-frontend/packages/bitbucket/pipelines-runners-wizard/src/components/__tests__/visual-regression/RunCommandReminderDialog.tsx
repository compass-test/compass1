import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const modal = "[data-testid='configure-runner']";

describe('<CopyCommandDialog />', () => {
  it('should match copy command dialog', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'download-script-modal',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match copy command dialog', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'copy-command-modal',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });
});
