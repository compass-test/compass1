import { Page as PuppeteerPage } from 'puppeteer';
import { mockBrowserDate, teardownMockDate } from './mocks/mock-browser-date';

// Wed Aug 16 00:00:00 2017 +0000
export const standardDateMockUnixTime = 1502841600;

// Wed Aug 16 00:00:00 2017 +0000
export const standardDateMockMillisUnixTime = standardDateMockUnixTime * 1000;

/*
 * Mock the current date in the browser to be Wed Aug 16 00:00:00 2017 +0000,
 * 1502841600 seconds since epoch, or 1502841600000 milliseconds since epoch,
 * the start of the UTC day of the first commit in atlassian-frontend
 */
export async function mockStandardDate(page: PuppeteerPage) {
  // This mock is tested by "should underline the current (non-selected) day" in
  // packages/editor/editor-core/src/__tests__/visual-regression/common/date.ts
  const year = 2017;
  const monthIndex = 7; // 0 based; Aug is 8th month
  const day = 16;
  const hour = 0;
  const minute = 0;
  const tz = 0;

  await page.evaluateOnNewDocument(
    mockBrowserDate,
    year,
    monthIndex,
    day,
    hour,
    minute,
    tz,
  );
}

export async function evaluateTeardownMockDate(page: PuppeteerPage) {
  await page.evaluate(teardownMockDate);
}
