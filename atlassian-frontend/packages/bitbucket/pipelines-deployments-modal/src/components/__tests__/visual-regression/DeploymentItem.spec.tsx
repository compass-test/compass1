import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const modal = "[data-testid='deployment-item-statuses']";

describe('<Modal />', () => {
  it('should match deployment item states', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-deployments-modal',
      'deployment-item-states',
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
