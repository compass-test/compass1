import { Page as PuppeteerPage } from 'puppeteer';
import mkdirp from 'mkdirp';

const formatFileName = (path: any) => {
  return path.toLowerCase().replace(/[\s.:/\\]/g, '-');
};

const hasSnapshotDiffFail = (failedExpectations: any) => {
  if (!failedExpectations || !failedExpectations.length) {
    return false;
  }
  return !!failedExpectations.find((failure: any) =>
    failure.message.match(/different from snapshot/),
  );
};

/**
 * Reporter that takes a screenshot when a VR test fails due to an error
 * This helps debug timeout or page error failures
 */
export default class ScreenshotReporter {
  page: PuppeteerPage;
  pendingScreenshots: Promise<any>[];

  constructor(page: PuppeteerPage) {
    this.page = page;
    this.pendingScreenshots = [];
  }

  reset(page: any) {
    this.page = page;
    this.pendingScreenshots = [];
  }

  async waitForPendingScreenshots() {
    await Promise.all(this.pendingScreenshots);
  }

  async specDone(result: any) {
    const { status, failedExpectations, fullName, testPath } = result;

    // Take screenshot if test failed for a reason other than screenshot diff - we will
    // already have a screenshot in that case so don't need to take another
    if (status === 'failed' && !hasSnapshotDiffFail(failedExpectations)) {
      const testDir = testPath.substring(0, testPath.lastIndexOf('/'));
      const testFileName = testPath.substring(testPath.lastIndexOf('/') + 1);
      const screenshotDir = `${testDir}/__image_snapshots__/__errors__`;
      const screenshotFileName = formatFileName(
        `${testFileName}-${fullName}-error`,
      );
      const path = `${screenshotDir}/${screenshotFileName}.png`;
      if (!this.page.isClosed()) {
        (mkdirp as any)(screenshotDir);
        this.pendingScreenshots.push(this.page.screenshot({ path }));
      }
    }
  }
}
