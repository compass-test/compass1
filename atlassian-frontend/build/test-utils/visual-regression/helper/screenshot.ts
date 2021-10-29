import type { CompareScreenshotOptions, PuppeteerPage } from './types';

// Minimum threshold chosen to be as close to 0 as possible.
// Small tolerance allowed as comparison library occasionally has false negatives
export const MINIMUM_THRESHOLD = 0.001;

export async function takeElementScreenShot(
  page: PuppeteerPage,
  selector: string,
) {
  const element = await page.$(selector);
  if (!element) {
    throw new Error(
      `Element with selector ${selector} does not exist to take a screenshot of`,
    );
  }
  return element.screenshot();
}

export async function compareScreenshot(
  screenshot: string,
  tolerance = MINIMUM_THRESHOLD,
  screenshotOptions: CompareScreenshotOptions = {},
) {
  if (tolerance >= 1) {
    throw Error(
      `Snapshot tolerance should be a decimal in the range [0.0, 1.0] and you have attempted to use a tolerance of ${tolerance}`,
    );
  } else if (
    tolerance > MINIMUM_THRESHOLD &&
    !screenshotOptions.useUnsafeThreshold
  ) {
    throw Error(
      `Snapshot tolerances greater than minimum threshold (${MINIMUM_THRESHOLD}) are considered unsafe, and you have attempted to use a tolerance of ${tolerance}. To use an unsafe threshold, set 'screenshotOptions.useUnsafeThreshold' to true. This is not advised.`,
    );
  }
  /* @ts-ignore eslint-disable-next-line no-undef */
  expect(screenshot).toMatchProdImageSnapshot({
    failureThreshold: `${tolerance}`,
    failureThresholdType: 'percent',
    customSnapshotIdentifier: screenshotOptions.customSnapshotIdentifier,
  });
}
