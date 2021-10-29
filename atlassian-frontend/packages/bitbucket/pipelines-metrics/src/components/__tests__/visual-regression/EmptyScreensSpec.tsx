import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const openExamplesAndWaitFor = async (example: string, selector: string) => {
  const url = getExampleUrl(
    'bitbucket',
    'pipelines-metrics',
    example,
    global.__BASEURL__,
  );
  const { page } = global;

  await loadPage(page, url);
  await page.waitForSelector(selector);
};

describe('<NoMetrics />', () => {
  const selector = "[data-testid='no-metrics-screen']";

  it('should match no metrics screen', async () => {
    await openExamplesAndWaitFor('no-metrics', selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});

describe('<WaitingForMetricsScreen />', () => {
  const selector = "[data-testid='waiting-for-metrics-screen']";

  it('should match waiting for metrics screen', async () => {
    await openExamplesAndWaitFor('waiting-for-metrics', selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});

describe('<MetricsExpiredScreen />', () => {
  const selector = "[data-testid='metrics-expired-screen']";

  it('should match the metrics expired screen', async () => {
    await openExamplesAndWaitFor('metrics-expired', selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});

describe('<MetricsOnboardingScreen />', () => {
  const selector = "[data-testid='metrics-onboarding-screen']";

  it('should match the metrics onboarding screen', async () => {
    await openExamplesAndWaitFor('onboard-metrics', selector);

    expect(
      await takeElementScreenShot(global.page, selector),
    ).toMatchProdImageSnapshot();
  });
});
