// Re-exporting to avoid changing pre-existing entry points
import {
  BetaBrowserTestCase,
  BrowserTestCase,
  MobileTestCase,
} from '../lib/runner/runner';
import type { Browser, BrowserTestCaseOptions } from '../lib/runner/runner';

export { BetaBrowserTestCase, BrowserTestCase, MobileTestCase };
export type { Browser, BrowserTestCaseOptions };
