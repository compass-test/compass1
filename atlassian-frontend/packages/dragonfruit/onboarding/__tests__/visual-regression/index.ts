import {
  getExampleUrl,
  loadPage,
  waitForLoadedImageElements,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('Onboarding basic example should match production example', async () => {
    const url = getExampleUrl(
      'dragonfruit',
      'onboarding',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;
    await page.setViewport({ width: 800, height: 800 });
    const nextButton = "[label='next-button']";

    await loadPage(page, url);
    await page.waitForSelector('[data-testid="dragonfruit-onboarding"]');

    // Step 1
    await page.waitForSelector('[data-testid="dragonfruit-onboarding-header"]');
    await waitForLoadedImageElements(page, 3000);
    const image1 = await page.screenshot();
    expect(image1).toMatchProdImageSnapshot({
      customSnapshotIdentifier: () => 'step-1',
    });

    // Step 2
    await page.click(nextButton);
    await page.waitForSelector('[data-testid="dragonfruit-onboarding-header"]');
    await waitForLoadedImageElements(page, 3000);
    const image2 = await page.screenshot();
    expect(image2).toMatchProdImageSnapshot({
      customSnapshotIdentifier: () => 'step-2',
    });

    // Step 3
    await page.click(nextButton);
    await page.waitForSelector('[data-testid="dragonfruit-onboarding-header"]');
    await waitForLoadedImageElements(page, 3000);
    const image3 = await page.screenshot();
    expect(image3).toMatchProdImageSnapshot({
      customSnapshotIdentifier: () => 'step-3',
    });

    // Start a new team modal
    await page.click(nextButton);
    await page.waitForSelector('[data-testid="team-name-input"]');
    const image4 = await page.screenshot();
    expect(image4).toMatchProdImageSnapshot({
      customSnapshotIdentifier: () => 'start-a-new-team-modal',
    });
  });
});
