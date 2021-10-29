import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const exampleClaimBtn = 'button[name="claim"]';
const selectEnvironmentButton = 'div[id="select_environment"]';
const branchSelectOption =
  "div[id='react-select-select_environment-option-1-0']";

describe('<ManageRunners />', () => {
  const selector = "[data-testid='oidc']";

  it('should match oidc component', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-admin-oidc',
      'oidc-page',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });

  it('should match oidc component with claim expanded', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-admin-oidc',
      'oidc-page',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(selector);

    // expand claim
    await page.waitForSelector(exampleClaimBtn);
    await page.click(exampleClaimBtn);
    await page.waitForTimeout(400);

    await expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });

  it('should match oidc component with environment selected', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-admin-oidc',
      'oidc-page',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(selector);

    // expand claim
    await page.waitForSelector(exampleClaimBtn);
    await page.click(exampleClaimBtn);
    await page.waitForTimeout(400);

    // select environment
    await page.click(selectEnvironmentButton);
    await page.waitForSelector(branchSelectOption);
    await page.click(branchSelectOption);
    await page.waitForTimeout(400);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});
