import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const modal = "[data-testid='configure-runner']";
const configureStepSubmitBtn = 'button[name="finishConfiguration"]';
const errorCard = 'div[id="errorCard"]';

describe('<EditRunner />', () => {
  it('should match runners modal', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'edit-runner',
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

describe('<EditRunnerError />', () => {
  it('should match runners modal configure screen with error', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'edit-runner-error',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(modal);

    // submit to create runner
    await page.click(configureStepSubmitBtn);
    await page.waitForSelector(errorCard);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });
});
