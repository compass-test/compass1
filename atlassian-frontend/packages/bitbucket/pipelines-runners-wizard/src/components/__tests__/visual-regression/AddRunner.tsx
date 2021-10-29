import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const modal = "[data-testid='configure-runner']";
const runnerNameField = '[name="runnerName"]';
const configureStepSubmitBtn = 'button[name="finishConfiguration"]';
const runStepSubmitBtn = 'button[name="finishRun"]';
const useStepSubmitButton = 'button[name="finishUse"]';
const errorCard = 'div[id="errorCard"]';
const selectSystem = 'div[id="select-system"]';
const windowsSystem = 'div[id="react-select-2-option-1"]';

describe('<AddLinuxRunner />', () => {
  it('should match runners modal configure screen', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'add-repository-runner',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match runners modal configure screen with windows feature enabled', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'add-windows-enabled-runner',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match runners modal run screen', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'add-repository-runner',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);
    await page.waitForSelector(runnerNameField);

    await page.focus(runnerNameField);
    await page.keyboard.type('testRunner');

    // go from configure to run step
    await page.waitForSelector(configureStepSubmitBtn);
    await page.click(configureStepSubmitBtn);

    // wait for the next button to appear on run step
    await page.waitForSelector(runStepSubmitBtn);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match runners modal use screen', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'add-repository-runner',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);
    const textField = await page.waitForSelector(runnerNameField);

    await textField?.focus();
    await page.keyboard.type('testRunner');

    // go from configure to run step
    await page.waitForSelector(configureStepSubmitBtn);
    await page.click(configureStepSubmitBtn);

    // go from run to use step
    const runBtn = await page.waitForSelector(runStepSubmitBtn);
    await runBtn?.click();

    // wait for the finish button to appear
    await page.screenshot();
    await page.waitForSelector(useStepSubmitButton);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });
});

describe('<AddWindowsRunner />', () => {
  it('should match windows runner run screen', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'add-windows-enabled-runner',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);
    await page.waitForSelector(runnerNameField);

    await page.focus(runnerNameField);
    await page.keyboard.type('testRunner');

    // select windows system
    await page.click(selectSystem);
    await page.waitForSelector(windowsSystem);
    await page.click(windowsSystem);

    // submit to create runner
    await page.click(configureStepSubmitBtn);
    await page.waitForSelector(runStepSubmitBtn);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });
});

describe('<AddRunnerError />', () => {
  it('should match runners modal configure screen with error', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-runners-wizard',
      'add-runner-error',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);
    await page.waitForSelector(runnerNameField);

    await page.focus(runnerNameField);
    await page.keyboard.type('testRunner');

    // submit to create runner
    await page.click(configureStepSubmitBtn);
    await page.waitForSelector(errorCard);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });
});
