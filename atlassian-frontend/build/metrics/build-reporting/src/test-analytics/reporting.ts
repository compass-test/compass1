/* eslint-disable global-require */
/* eslint-disable consistent-return */
import path from 'path';
import readPkgUp from 'read-pkg-up';
import stripAnsi from 'strip-ansi';

import { AggregatedResult, AssertionResult } from '@jest/test-result';

import { analyticsClient } from '@atlassiansox/analytics-node-client';

import type { ActionSubject, AnalyticsModifier } from './types';

type FormatReport = {
  count: number;
  type: 'inconsistent' | 'blocking' | 'failure' | 'success' | 'execution time';
};

export type AnalyticsEventPayload = ReturnType<typeof testProperties> & {
  testFilePath: string;
  [key: string]: any;
  inconsistentTests?: number;
  failingTests?: number;
  successTests?: number;
};

const countResults = (
  results: AnalyticsEventPayload[],
  fn: (payload: Partial<AnalyticsEventPayload>) => number,
) => {
  return results
    .map(fn)
    .filter((prop: any) => typeof prop === 'number')
    .reduce((acc: number, i: number) => acc + i, 0);
};

const formatReport = (
  { count, type }: FormatReport,
  actionSubject: ActionSubject,
) => {
  return `Sent ${count} ${type} ${actionSubject.replace('_', ' ')} event${
    count && count > 1 ? 's' : ''
  }`;
};

const formatFailureMessage = (message: string) => {
  if (!message) {
    return '';
  }
  return stripAnsi(message).replace('●', '').trim().split('at ')[0];
};

const getPackageName = (filePath: string) => {
  let packageName: string;
  try {
    const cwd = path.dirname(filePath);
    const pkg = readPkgUp.sync({ cwd });
    packageName = pkg!.packageJson ? pkg!.packageJson.name : (pkg as any).name;
  } catch (err) {
    console.error(err);
    packageName = 'no package name found';
  }
  return packageName;
};

async function modifyEventProperties(
  analyticsEvents: AnalyticsEventPayload[],
  modifiers: AnalyticsModifier[],
) {
  for (const event of analyticsEvents) {
    for (const modify of modifiers) {
      await modify(event);
    }
  }
}

export async function sendAnalytics(
  analyticsEvents: AnalyticsEventPayload[],
  action: string,
  actionSubject: ActionSubject,
) {
  const { ANALYTICS_ENV } = process.env;
  const client = analyticsClient({
    env: ANALYTICS_ENV || 'prod',
    product: 'atlaskit',
  });

  const all = Promise.all.bind(Promise);
  const _allSettled = Promise.allSettled
    ? Promise.allSettled.bind(Promise)
    : undefined;

  const allSettled =
    _allSettled ||
    ((promises: Promise<any>[]) =>
      all(
        promises.map(p =>
          p
            .then(
              value =>
                ({ status: 'fulfilled', value } as PromiseFulfilledResult<any>),
            )
            .catch(
              reason =>
                ({ status: 'rejected', reason } as PromiseRejectedResult),
            ),
        ),
      ));

  const testsAnalyticsEventsResults = await allSettled(
    analyticsEvents.map(event =>
      client.sendTrackEvent({
        anonymousId: 'unknown',
        trackEvent: {
          tags: ['atlaskit'],
          source: '@atlaskit/build-reporting',
          action,
          actionSubject,
          attributes: event,
          origin: 'console',
          platform: 'bot',
        },
      }),
    ),
  );

  testsAnalyticsEventsResults.forEach((analyticsResult, i) => {
    if (analyticsResult.status === 'rejected') {
      const event = analyticsEvents[i];
      console.error(
        `Something went wrong while sending analytics for:
Action: ${action}
Event: ${JSON.stringify(event, null, 2)}
Reason: ${analyticsResult.reason}`,
      );
    }
  });
}

const testProperties = (
  test: AssertionResult,
  filePath: string,
  iteration = 0,
) => {
  const {
    BITBUCKET_BRANCH,
    BITBUCKET_BUILD_NUMBER,
    BITBUCKET_COMMIT,
    BITBUCKET_PIPELINE_UUID,
    BITBUCKET_PR_DESTINATION_BRANCH,
    BITBUCKET_PR_ID,
    BITBUCKET_STEP_TRIGGERER_UUID,
    BITBUCKET_STEP_UUID,
    CUSTOM_BUILD,
  } = process.env;
  const buildNumber = BITBUCKET_BUILD_NUMBER || '-1';
  const branch = BITBUCKET_BRANCH;
  const buildType = CUSTOM_BUILD ? 'custom' : 'default';
  const duration = test.duration || 0;
  const packageName = getPackageName(filePath);
  const testFullName = test.fullName;
  const testName = test.title;
  const ancestorTitles = test.ancestorTitles;
  return {
    // https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/
    BITBUCKET_BUILD_NUMBER,
    BITBUCKET_BRANCH,
    BITBUCKET_COMMIT,
    BITBUCKET_PIPELINE_UUID,
    BITBUCKET_PR_ID,
    BITBUCKET_PR_DESTINATION_BRANCH,
    BITBUCKET_STEP_TRIGGERER_UUID,
    BITBUCKET_STEP_UUID,
    iteration,
    ancestorTitles,
    buildNumber,
    branch,
    buildType,
    duration,
    packageName,
    testFullName,
    testName,
  };
};

const extractTestTime = (
  results: AggregatedResult,
  threshold: number,
  iteration = 0,
) => {
  const returnResults: AnalyticsEventPayload[] = [];
  results.testResults
    .filter(test => {
      const timeTaken = (test.perfStats.end - test.perfStats.start) / 3600;
      return timeTaken > threshold;
    })
    .map(test => {
      const timeTaken = (
        (test.perfStats.end - test.perfStats.start) /
        3600
      ).toFixed(2);
      const testFilePath = path.relative(process.cwd(), test.testFilePath);
      test.testResults.forEach(test => {
        returnResults.push({
          testFilePath,
          timeTaken: Number(timeTaken),
          ...testProperties(test, testFilePath, iteration),
        });
      });
    });
  return returnResults;
};

const extractPassingTest = (results: AggregatedResult, iteration: number) => {
  const passingTests: AnalyticsEventPayload[] = [];
  const passedSuites = results.testResults.filter(
    suite => suite.numPassingTests > 0,
  );
  passedSuites.forEach(suite => {
    const testFilePath = path.relative(process.cwd(), suite.testFilePath);
    suite.testResults.forEach(test => {
      if (test.status === 'passed') {
        passingTests.push({
          successTests: 1,
          testFilePath,
          ...testProperties(test, testFilePath, iteration),
        });
      }
    });
  });
  return passingTests;
};

/**
 * Tests that fail, cause other blocks in the same file to cascade fail
 * So as a result we only pull out the first error as the cascade results aren't useful
 * To determine flaky tests.
 */
const extractFailingTest = (
  results: AggregatedResult,
  startRetryTime: number,
  iteration: number,
) => {
  const retryTime = Math.floor((Date.now() - startRetryTime) / 1000);
  const failedTests: AnalyticsEventPayload[] = [];
  const failedSuites = results.testResults.filter(
    suite => suite.numFailingTests > 0,
  );
  failedSuites.forEach(suite => {
    const testFilePath = path.relative(process.cwd(), suite.testFilePath);
    suite.testResults.forEach(test => {
      if (test.status === 'failed') {
        failedTests.push({
          retryTime,
          failingTests: 1,
          failureMessage: formatFailureMessage(
            test.failureMessages[0] || suite.failureMessage || '',
          ),
          testFilePath,
          ...testProperties(test, testFilePath, iteration),
        });
      }
    });
  });
  return failedTests;
};

const extractInconsistentTest = (
  results: AggregatedResult,
  startRetryTime: number,
  iteration: number,
) => {
  const retryTime = Math.floor((Date.now() - startRetryTime) / 1000);
  const inconsistentTests: AnalyticsEventPayload[] = [];
  const passedSuites = results.testResults.filter(
    suite => suite.numPassingTests > 0,
  );
  passedSuites.forEach(suite => {
    const testFilePath = path.relative(process.cwd(), suite.testFilePath);
    suite.testResults.forEach(test => {
      if (test.status === 'passed') {
        inconsistentTests.push({
          retryTime,
          inconsistentTests: 1,
          testFilePath,
          ...testProperties(test, testFilePath, iteration),
        });
      }
    });
  });
  return inconsistentTests;
};

export function log(...messages: string[]) {
  const { CI, ANALYTICS_DEBUG } = process.env;
  if (CI || ANALYTICS_DEBUG) {
    console.log(...messages);
  }
}

export async function reportInconsistentTest(
  results: AggregatedResult,
  retryTime: number,
  actionSubject: ActionSubject,
  iteration = 0,
  modifiers: AnalyticsModifier[] = [],
) {
  try {
    const events = extractInconsistentTest(results, retryTime, iteration);
    if (!events.length) {
      return '';
    }
    await modifyEventProperties(events, modifiers);
    await sendAnalytics(events, 'inconsistency', actionSubject);
    const count = countResults(events, p => p.inconsistentTests || 0);
    return formatReport({ count, type: 'inconsistent' }, actionSubject);
  } catch (err) {
    log(err);
  }
  return '';
}
export async function reportBlockingTest(
  results: AggregatedResult,
  retryTime: number,
  actionSubject: ActionSubject,
  iteration = 0,
  modifiers: AnalyticsModifier[] = [],
) {
  const events = extractFailingTest(results, retryTime, iteration);
  // Reading BITBUCKET_BRANCH directly here (instead of a root extraction)
  // to allow runtime overrides within unit tests.
  const currentBranch = process.env.BITBUCKET_BRANCH;
  if (currentBranch === 'develop' || currentBranch === 'master') {
    if (!events.length) {
      return '';
    }
    try {
      await modifyEventProperties(events, modifiers);
      await sendAnalytics(events, 'blocking', actionSubject);
      const count = countResults(events, p => p.failingTests || 0);
      return formatReport({ type: 'blocking', count: count }, actionSubject);
    } catch (err) {
      log(err);
    }
  }
  return '';
}

export async function reportFailingTest(
  results: AggregatedResult,
  retryTime: number,
  actionSubject: ActionSubject,
  iteration = 0,
  modifiers: AnalyticsModifier[] = [],
) {
  try {
    const events = extractFailingTest(results, retryTime, iteration);
    if (!events.length) {
      return '';
    }
    await modifyEventProperties(events, modifiers);
    await sendAnalytics(events, 'failure', actionSubject);
    const count = countResults(events, p => p.failingTests || 0);
    return formatReport({ count, type: 'failure' }, actionSubject);
  } catch (err) {
    log(err);
  }
  return '';
}

export async function reportTestTimeExecution(
  results: AggregatedResult,
  actionSubject: ActionSubject,
  iteration = 0,
  modifiers: AnalyticsModifier[] = [],
) {
  try {
    const events = extractTestTime(results, 0, iteration);
    if (!events.length) {
      return '';
    }
    await modifyEventProperties(events, modifiers);
    await sendAnalytics(events, 'testtimes', actionSubject);
    return formatReport(
      { count: events.length, type: 'execution time' },
      actionSubject,
    );
  } catch (err) {
    log(err);
  }
  return '';
}

export async function reportPassingTest(
  results: AggregatedResult,
  actionSubject: ActionSubject,
  iteration = 0,
  modifiers: AnalyticsModifier[] = [],
) {
  try {
    const events = extractPassingTest(results, iteration);
    if (!events.length) {
      return '';
    }
    await modifyEventProperties(events, modifiers);
    await sendAnalytics(events, 'success', actionSubject);
    const count = countResults(events, p => p.successTests || 0);
    return formatReport({ count, type: 'success' }, actionSubject);
  } catch (err) {
    log(err);
  }
  return '';
}
