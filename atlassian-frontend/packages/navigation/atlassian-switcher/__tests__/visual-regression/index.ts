import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

const captureScreenshot = async (
  testName: string,
  itemKeys: string[],
  waitFor?: string[],
) => {
  const url = getExampleUrl(
    'navigation',
    'atlassian-switcher',
    testName,
    global.__BASEURL__,
  );

  const { page } = global;

  await loadPage(page, url, {
    disabledSideEffects: { transition: true, animation: true },
  });

  expect.assertions(1);
  try {
    const selectors = [
      ...(waitFor ? waitFor : ['[data-testid="switchTo__section"]']),
      ...itemKeys.map((item) => `[data-testid="switcher-item__${item}"]`),
    ];
    await Promise.all(
      selectors.map((selector) => page.waitForSelector(selector)),
    );
  } finally {
    jest.advanceTimersByTime(8000);

    // Can't use fake timers for CSS Fade in
    jest.useRealTimers();
    await new Promise((res) => setTimeout(res, 650));

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchProdImageSnapshot();
  }
};

const availableProductKeys = [
  'JIRA_SOFTWAREsome-random-instance-some-random-instance',
  'JIRA_SERVICE_DESKgrowth',
  'JIRA_BUSINESSatl-vertigo-product-fabric-testing',
  'CONFLUENCEsome-random-instance-some-random-instance',
  'OPSGENIEsome-random-instance-some-random-instance',
  'BITBUCKETBitbucket',
  'STATUSPAGEStatuspage instance',
  'administration',
];

beforeEach(() => {
  jest.useFakeTimers();
});

describe('Atlassian Switcher VR', () => {
  it('generic', async () =>
    captureScreenshot('generic-switcher', availableProductKeys));
  it('start-switcher', async () =>
    captureScreenshot('start-switcher', availableProductKeys));
  it('jira-switcher', async () =>
    captureScreenshot('jira-switcher', availableProductKeys));
  it('compass-switcher', async () =>
    captureScreenshot('compass-switcher', [
      'JIRA_SOFTWAREjira-with-compass',
      'COMPASSjira-with-compass',
      'administration',
    ]));
  it('confluence-switcher', async () =>
    captureScreenshot('confluence-switcher', availableProductKeys));
  it('trello-switcher', async () =>
    captureScreenshot(
      'trello-switcher',
      [
        'OPSGENIEsome-random-instance-some-random-instance',
        'STATUSPAGEStatuspage instance',
        'TRELLOTrello',
      ],
      ['[data-testid="suggested-product__link"]'],
    ));
  it('statuspage-switcher-as-admin', async () =>
    captureScreenshot('statuspage-switcher-as-admin', availableProductKeys));
  it('unverified-user-error', async () =>
    captureScreenshot(
      'unverified-user-error',
      [],
      ['[data-testid="error-boundary"]'],
    ));
  it('remote-product-configuration', async () =>
    captureScreenshot('remote-product-configuration', availableProductKeys));
});
