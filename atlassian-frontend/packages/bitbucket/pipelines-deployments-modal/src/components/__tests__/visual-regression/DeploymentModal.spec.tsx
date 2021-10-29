import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const modal = "[data-testid='deployment-modal']";

describe('<Modal />', () => {
  it('should match deployments preview modal', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-deployments-modal',
      'deployment-preview-with-changes',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();

    // show diff view
    await page.click('#deployment-changes-tabs-1');

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();

    // show pr view
    await page.click('#deployment-changes-tabs-2');

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();

    // show issues view
    await page.click('#deployment-changes-tabs-3');

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match deployments summary modal', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-deployments-modal',
      'deployment-summary-modal',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match redeploy modal', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-deployments-modal',
      'redeployment-modal',
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
