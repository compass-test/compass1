import fs from 'fs';

import { JiraClient } from '@atlaskit/build-utils/jira';

import * as io from '../io/io';
import { determineJiraProjectForFilePath } from '../package-metadata/json-parsing';

import { mockProjectDetails, ProjectKeyIdMap } from './test-utils/mock-jira';

import { createUnskipJiraTicket } from './index';

describe('Create Jira ticket', () => {
  beforeEach(() => {
    // Silence logs
    jest.spyOn(console, 'log').mockImplementation((_msg: string) => {});
    jest.spyOn(console, 'info').mockImplementation((_msg: string) => {});
    // Mock file reading
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(io, 'readFile').mockImplementation(path => {
      let payload = '["UNSUPPORTED MOCKED FILE PATH"]';
      const p = String(path);
      if (p.endsWith('editor-core/package.json')) {
        payload = `{ "atlassian": { "team": "Editor" } }`;
      }
      if (p.endsWith('button/package.json')) {
        payload = `{ "atlassian": { "team": "Design System Team" } }`;
      }
      if (p.endsWith('teams.json')) {
        payload = `{
          "Editor": { "project": "https://product-fabric.atlassian.net/browse/ED" },
          "Design System Team": { "project": "https://ecosystem.atlassian.net/browse/DS" }
        }`;
      }
      return Promise.resolve(payload);
    });
    jest.spyOn(JiraClient.prototype, 'createIssue').mockImplementation(body => {
      const projectKey = ProjectKeyIdMap.get(body.fields.project.id);
      const ticketKey = `${projectKey}-1234`;
      return Promise.resolve({
        browseUrl: `https://product-fabric.atlassian.net/browse/${ticketKey}`,
        id: '123456',
        key: ticketKey,
        self: 'https://product-fabric.atlassian.net/rest/api/3/issue/123456',
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should create jira ticket in owners project if team uses product-fabric`, async () => {
    mockProjectDetails();
    const result = await createUnskipJiraTicket({
      testName: 'should do a thing',
      ancestorLabels: '',
      path: 'packages/editor/editor-core/src/__tests__/integration/foo.ts',
      errors: ['I fail, therefore I am'],
    });

    expect(result.key).toBe('ED-1234');
    expect(result.browseUrl).toBe(
      'https://product-fabric.atlassian.net/browse/ED-1234',
    );
  });

  it(`should create jira ticket in SKIP project instead of owners project if DRY_RUN is true`, async () => {
    mockProjectDetails();

    // editor-core would normally return ED like the above test, however DRY_RUN will instead use SKIP
    process.env.DRY_RUN = 'true';

    const test = {
      testName: 'should do a thing',
      ancestorLabels: '',
      path: 'packages/editor/editor-core/src/__tests__/integration/foo.ts',
      errors: ['I fail, therefore I am'],
    };

    const jiraProjectUrl = await determineJiraProjectForFilePath(test);
    expect(jiraProjectUrl).toBe(
      'https://product-fabric.atlassian.net/browse/ED',
    );

    const result = await createUnskipJiraTicket(test);
    expect(result.key).toBe('SKIP-1234');
    expect(result.browseUrl).toBe(
      'https://product-fabric.atlassian.net/browse/SKIP-1234',
    );
    process.env.DRY_RUN = '';
  });

  it(`should create a ticket in the SKIP project if team's jira instance isn't product-fabric`, async () => {
    const consoleSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation((_msg: string) => {});

    const test = {
      testName: 'should do a thing',
      ancestorLabels: '',
      path: 'packages/design-system/button/src/__tests__/integration/foo.ts',
      errors: ['I fail, therefore I am'],
    };

    const jiraProjectUrl = await determineJiraProjectForFilePath(test);
    expect(jiraProjectUrl).toBe('https://ecosystem.atlassian.net/browse/DS');

    const result = await createUnskipJiraTicket(test);
    expect(result.key).toBe('SKIP-1234');
    expect(result.browseUrl).toBe(
      'https://product-fabric.atlassian.net/browse/SKIP-1234',
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Instance (ecosystem) isn't supported yet. Jira ticket created in SKIP project on product-fabric.",
    );
    consoleSpy.mockRestore();
  });
});
