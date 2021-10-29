import {
  INTEGRATION_TRANSFORMER_PATH,
  VR_TRANSFORMER_PATH,
} from '../constants';
import * as io from '../io/io';
import * as jira from '../jira-ticket';
import type { JiraTicket, Test } from '../types';

import { skipFailedTests } from './skip-failed-tests';

const pullRequestUrl = 'https://bitbucket.org/acme-inc/pull-requests/123';
const jiraTicketUrl = 'https://product-fabric.atlassian.net/browse/FOO-1234';
const comment =
  'FIXME: This test was automatically skipped due to failure on 8/16/2017';
const commentWithTicket = `${comment}: ${jiraTicketUrl}`;

describe('skipFailedTests', () => {
  let execSpy: jest.SpyInstance<Promise<any>, any>;
  let jiraSpy: jest.SpyInstance<Promise<JiraTicket>, any>;
  beforeAll(() => {
    // Mock jira ticket creation
    jiraSpy = jest.spyOn(jira, 'createUnskipJiraTicket').mockResolvedValue({
      key: 'ED',
      browseUrl: jiraTicketUrl,
      assignee: 'Jane Doe',
    });

    // Silence logs
    jest.spyOn(console, 'log').mockImplementation((_msg: string) => {});
    jest.spyOn(console, 'warn').mockImplementation((_msg: string) => {});
  });

  beforeEach(() => {
    // Mock codemod
    execSpy = jest
      .spyOn(io, 'exec')
      .mockImplementation(() => Promise.resolve({ stdout: '', stderr: '' }));
  });

  afterEach(() => {
    // Reset between test cases as we count the calls in some of them
    execSpy.mockReset();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should execute codemod for VR tests', async () => {
    const data: Test[] = [
      {
        path:
          'packages/editor/editor-core/src/__tests__/visual-regression/table/distribute-columns.ts',
        testName: 'on a resized normal cells with specified colwidths',
        ancestorLabels:
          'Distribute Columns with feature flag › columns should distribute correctly',
        errors: [],
      },
      {
        path:
          'packages/design-system/portal/src/__tests__/visual-regression/portalSnapshotTest.ts',
        testName: 'Portal should create portals',
        ancestorLabels: 'Snapshot Test',
        errors: [],
      },
    ];

    await skipFailedTests(
      'vr',
      'https://bitbucket.org/acme-inc/pull-requests/123',
      data,
    );

    const expectedFlags1 = [
      `--comment='${commentWithTicket}'`,
      `--testName='on a resized normal cells with specified colwidths'`,
      `--ancestorLabels='${data[0].ancestorLabels}'`,
      '--parser ts',
      '--extensions ts,tsx,js,jsx',
      `--transform ${VR_TRANSFORMER_PATH}`,
      data[0].path,
    ];
    const expectedFlags2 = [
      `--comment='${commentWithTicket}'`,
      `--testName='Portal should create portals'`,
      `--ancestorLabels='${data[1].ancestorLabels}'`,
      '--parser ts',
      '--extensions ts,tsx,js,jsx',
      `--transform ${VR_TRANSFORMER_PATH}`,
      data[1].path,
    ];

    expect(execSpy).toBeCalledTimes(2);
    expect(execSpy).toHaveBeenNthCalledWith(
      1,
      `npx jscodeshift ${expectedFlags1.join(' ')}`,
    );
    expect(execSpy).toHaveBeenNthCalledWith(
      2,
      `npx jscodeshift ${expectedFlags2.join(' ')}`,
    );
  });

  it('should execute codemod for integration tests', async () => {
    const data: Test[] = [
      {
        path: 'packages/confluence/charts/src/__tests__/integration/index.ts',
        testName: 'Charts should be able to be identified by data-testid',
        ancestorLabels: '',
        errors: [],
      },
      {
        path:
          'packages/editor/editor-core/src/__tests__/integration/alignment/alignment.ts',
        testName: 'alignment: should be able to add alignment to paragraphs',
        ancestorLabels: '',
        errors: [],
      },
    ];

    await skipFailedTests('integration', pullRequestUrl, data);

    const expectedFlags1 = [
      `--comment='${commentWithTicket}'`,
      `--testName='${data[0].testName}'`,
      `--ancestorLabels='${data[0].ancestorLabels}'`,
      '--parser ts',
      '--extensions ts,tsx,js,jsx',
      `--transform ${INTEGRATION_TRANSFORMER_PATH}`,
      data[0].path,
    ];
    const expectedFlags2 = [
      `--comment='${commentWithTicket}'`,
      `--testName='${data[1].testName}'`,
      `--ancestorLabels='${data[1].ancestorLabels}'`,
      '--parser ts',
      '--extensions ts,tsx,js,jsx',
      `--transform ${INTEGRATION_TRANSFORMER_PATH}`,
      data[1].path,
    ];

    expect(execSpy).toBeCalledTimes(2);
    expect(execSpy).toHaveBeenNthCalledWith(
      1,
      `npx jscodeshift ${expectedFlags1.join(' ')}`,
    );
    expect(execSpy).toHaveBeenNthCalledWith(
      2,
      `npx jscodeshift ${expectedFlags2.join(' ')}`,
    );
  });

  it('should return tests which the codemod failed to skip', async () => {
    execSpy.mockRestore();
    execSpy = jest.spyOn(io, 'exec').mockImplementation(() =>
      Promise.resolve({
        stdout: `All done.
        Results:
        0 errors
        1 unmodified
        0 skipped
        0 ok
        Time elapsed: 00.000 seconds`,
        stderr: '',
      }),
    );

    const tests: Test[] = [
      {
        path: 'path/to/test.ts',
        testName: 'should do a thing',
        ancestorLabels: '',
        errors: ['failed miserably at the thing'],
      },
    ];
    const unmodified = await skipFailedTests('vr', pullRequestUrl, tests);
    expect(unmodified).toEqual([{ ...tests[0], skipped: false }]);
  });

  it('should not return anything if all tests were successfully skipped by the codemod', async () => {
    execSpy.mockRestore();
    execSpy = jest.spyOn(io, 'exec').mockImplementation(() =>
      Promise.resolve({
        stdout: `All done.
          Results:
          0 errors
          0 unmodified
          0 skipped
          1 ok
          Time elapsed: 00.000 seconds`,
        stderr: '',
      }),
    );

    const tests: Test[] = [
      {
        path: 'path/to/test.ts',
        testName: 'should do a thing',
        ancestorLabels: '',
        errors: ['failed miserably at the thing'],
      },
    ];
    const nothing = await skipFailedTests('vr', pullRequestUrl, tests);
    expect(nothing).toBe(undefined);
  });

  it('should not include Jira ticket URL in codemod comment when unavailable', async () => {
    const data: Test[] = [
      {
        path: 'path/to/test.ts',
        testName: 'should do a thing',
        ancestorLabels: '',
        errors: ['failed miserably at the thing'],
      },
    ];
    // Similuate not creating a ticket (e.g. due to unsupported instance, or disabled via environment variable)
    jiraSpy.mockRestore();
    jiraSpy = jest.spyOn(jira, 'createUnskipJiraTicket').mockResolvedValue({
      key: '',
      browseUrl: '',
      assignee: '',
    });
    await skipFailedTests('integration', pullRequestUrl, data);

    const expectedFlags1 = [
      `--comment='${comment}'`,
      `--testName='${data[0].testName}'`,
      `--ancestorLabels='${data[0].ancestorLabels}'`,
      '--parser ts',
      '--extensions ts,tsx,js,jsx',
      `--transform ${INTEGRATION_TRANSFORMER_PATH}`,
      data[0].path,
    ];
    expect(execSpy).toHaveBeenCalledWith(
      `npx jscodeshift ${expectedFlags1.join(' ')}`,
    );
  });
});
