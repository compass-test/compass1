import { AnalyticsClient as BaseClient } from '@atlassiansox/analytics-node-client';

import { Test, TestType } from '../../src/types';
import { TestResults } from '../test-results/types';

interface DefaultAttributes {
  testPath: string;
  testCase: string;
  testAncestorLabels: string;
  errorReason: string;
  branchName?: string;
  pullRequestUrl?: string;
  pipelineUrl?: string;
}

interface AnalyticsEvent<T = DefaultAttributes> {
  actionSubject: 'skip_inconsistent_tests';
  attributes: T;
  tags: string[];
  source: string;
  origin: string;
  platform: string;
}

export interface CodemodFailedEvent extends AnalyticsEvent {
  action: 'codemod_failed';
}

export interface FailedTestExemptedEvent
  extends AnalyticsEvent<
    DefaultAttributes & {
      exemption: string;
      testType: TestType;
    }
  > {
  action: 'failed_test_exempted';
}

export interface CreateTicketFailedEvent extends AnalyticsEvent {
  action: 'create_ticket_failed';
}

export interface SummaryEvent
  extends AnalyticsEvent<
    Omit<TestResults, 'skippableTestCases' | 'exemptTestCases'>
  > {
  action: 'pipeline_completed';
}

export type AnalyticsEventPayload =
  | CodemodFailedEvent
  | FailedTestExemptedEvent
  | CreateTicketFailedEvent
  | SummaryEvent;

export function getAnalyticsPayload(
  test: Test,
  action: 'codemod_failed' | 'failed_test_exempted' | 'create_ticket_failed',
  attributes?: {
    testType?: TestType;
    exemption?: string;
  },
): AnalyticsEventPayload {
  const defaultPayload = {
    actionSubject: 'skip_inconsistent_tests' as const,
    attributes: {
      testPath: test.path,
      testCase: test.testName,
      testAncestorLabels: test.ancestorLabels,
      errorReason: test.errors[0],
      pullRequestUrl: test.pullRequestUrl,
      pipelineUrl: getPipelineUrl(test),
      branchName: process.env.BITBUCKET_BRANCH,
    },
    tags: ['atlaskit'],
    source: 'atlassian-frontend',
    origin: 'console',
    platform: 'bot',
  };

  if (action === 'failed_test_exempted') {
    return {
      action,
      ...defaultPayload,
      attributes: {
        ...defaultPayload.attributes,
        testType: attributes?.testType || 'vr',
        exemption: attributes?.exemption || '',
      },
    };
  }

  return {
    action,
    ...defaultPayload,
  };
}

export function getSummaryAnalyticsPayload(
  testResults: TestResults,
): SummaryEvent {
  const { skippableTestCases, exemptTestCases, ...rest } = testResults;

  return {
    action: 'pipeline_completed',
    actionSubject: 'skip_inconsistent_tests' as const,
    attributes: rest,
    tags: ['atlaskit'],
    source: 'atlassian-frontend',
    origin: 'console',
    platform: 'bot',
  };
}

function getPipelineUrl(test: Test) {
  const { BITBUCKET_REPO_FULL_NAME, BITBUCKET_BUILD_NUMBER } = process.env;

  return (
    `https://bitbucket.org/${BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}` +
    (test.pipelineStepId ? `/steps/${test.pipelineStepId}/test-report` : '')
  );
}

export default class AnalyticsClient extends BaseClient {
  private dry: boolean;

  constructor({ dev, dry }: { dev?: boolean; dry?: boolean }) {
    super({
      env: dev ? 'dev' : 'prod',
      product: 'atlaskit',
    } as any);
    this.dry = !!dry || process.env.NODE_ENV === 'test';
  }

  sendEvent(event: AnalyticsEventPayload) {
    if ('testPath' in event.attributes) {
      console.log(
        `Dispatch analytics${this.dry ? ' (dry run)' : ''}: action = ${
          event.action
        }, test = ${event.attributes.testPath}`,
      );
    }

    if (this.dry) {
      console.log(`\n${JSON.stringify(event)}\n`);
      return Promise.resolve();
    }
    return this.sendOperationalEvent({
      anonymousId: 'unknown',
      operationalEvent: event,
    });
  }
}
const isTest = process.env.NODE_ENV === 'test';
export const analyticsClient = new AnalyticsClient({
  dev: isTest,
  dry: isTest,
});
