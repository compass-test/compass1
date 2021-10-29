import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const labelsButtonIndex1 = 'button[name="labels-popup-1"]';
const popupContent = '#popup-content-1';

describe('<ManageRunners />', () => {
  const selector = "[data-testid='manage-runners']";

  it('should match runners management table', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-management',
      'manage-runners',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });

  it('should match runners management workspace table', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-management',
      'manage-runners-workspace',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });

  it('should match runners management table with labels expanded', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-management',
      'manage-runners',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(selector);

    await page.waitForSelector(labelsButtonIndex1);
    await page.click(labelsButtonIndex1);
    await page.waitForSelector(popupContent);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});
