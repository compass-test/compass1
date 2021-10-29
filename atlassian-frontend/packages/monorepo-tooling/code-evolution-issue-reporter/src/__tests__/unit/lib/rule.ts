// this is more of an integration
import { Rule } from '../../../lib/rule';
import { Config } from '../../../lib/config';
import { JiraClient } from '../../../lib/api/jira';

import type { BaseRule } from '../../../types';
import type { Version3 } from 'jira.js';

jest.mock('../../../lib/api/jira');

describe('Rule', () => {
  let jiraClient: JiraClient;
  let rule: Rule;
  let config: Config;

  const closableIssues: Version3.Version3Models.IssueBean[] = [
    {
      id: 'id1',
      key: 'ID-1',
      fields: {
        labels: ['no-match'],
      } as Version3.Version3Models.Fields,
    },
    {
      id: 'id2',
      key: 'ID-2',
      fields: {
        labels: ['no-match'],
      } as Version3.Version3Models.Fields,
    },
  ];
  const updateableIssue: Version3.Version3Models.IssueBean = {
    id: 'id3',
    key: 'ID-3',
    fields: {
      labels: [
        // hash for `foo` and `team-foo`
        'ceir-ash-acbd18db4cc2f85cedef654fccc4a4d8-acbd18db4cc2f85cedef654fccc4a4d8',
      ],
    } as Version3.Version3Models.Fields,
  };

  const fileForUpdateableIssue = {
    name: 'file-3',
    lines: [{ from: 1, to: 5 }],
  };
  const fileForCreateIssue = { name: 'file-4', lines: [{ from: 1, to: 5 }] };

  const baseRule: BaseRule = {
    ruleName: 'foo',
    description: 'foo description',
    helpLink: 'some link to foo',
    title: 'Very foo!',
    type: 'regex',
  };

  beforeEach(async () => {
    config = await Config.loadFromPath(
      require.resolve('./__fixtures__/issue-reporter.config.js'),
    );
    jest
      .spyOn(config, 'getAssigneeForFile')
      .mockImplementation(async (file) => {
        if (file === 'file-3') {
          return 'foo';
        }
        return 'bar';
      });
    jest
      .spyOn(config, 'getPackageDataForFile')
      .mockImplementation(async (file) => {
        if (file === 'file-3') {
          return {
            name: 'foo',
            team: 'team-foo',
          };
        }

        return {
          name: 'bar',
          team: 'team-bar',
        };
      });

    jiraClient = new JiraClient('https://example.com');
    jest.spyOn(jiraClient, 'getUserData').mockImplementation(async () => ({
      accountId: 'foo-id',
      active: true,
    }));
    jest
      .spyOn(jiraClient, 'findIssuesByLabels')
      .mockImplementation(async () => [...closableIssues, updateableIssue]);

    rule = new Rule(
      baseRule,
      [fileForCreateIssue, fileForUpdateableIssue],
      jiraClient,
      config,
    );
  });

  it('should close issues that are no longer valid', async () => {
    await rule.closeIssues();
    console.log();
    expect((jiraClient.closeIssues as jest.Mock).mock.calls[0][0])
      .toMatchInlineSnapshot(`
      Array [
        "id1",
        "id2",
      ]
    `);
  });

  it('should update issues that already exist and are still valid', async () => {
    await rule.updateIssues();
    const mockCall = (jiraClient.updateIssues as jest.Mock).mock.calls[0][0];
    expect(JSON.stringify(mockCall)).toContain(fileForUpdateableIssue.name);
    expect(mockCall).toMatchInlineSnapshot(`
      Array [
        Object {
          "fields": Object {
            "assignee": Object {
              "accountId": "foo-id",
            },
            "customfield_45339": "team-foo",
            "customfield_45340": "foo",
            "description": Object {
              "content": Array [
                Object {
                  "content": Array [
                    Object {
                      "text": "foo description",
                      "type": "text",
                    },
                  ],
                  "type": "paragraph",
                },
                Object {
                  "attrs": Object {
                    "level": 3,
                  },
                  "content": Array [
                    Object {
                      "text": "Rule:",
                      "type": "text",
                    },
                  ],
                  "type": "heading",
                },
                Object {
                  "content": Array [
                    Object {
                      "text": "foo",
                      "type": "text",
                    },
                  ],
                  "type": "paragraph",
                },
                Object {
                  "attrs": Object {
                    "level": 3,
                  },
                  "content": Array [
                    Object {
                      "text": "Help link:",
                      "type": "text",
                    },
                  ],
                  "type": "heading",
                },
                Object {
                  "content": Array [
                    Object {
                      "marks": Array [
                        Object {
                          "attrs": Object {
                            "href": "some link to foo",
                          },
                          "type": "link",
                        },
                      ],
                      "text": "some link to foo",
                      "type": "text",
                    },
                  ],
                  "type": "paragraph",
                },
                Object {
                  "attrs": Object {
                    "level": 3,
                  },
                  "content": Array [
                    Object {
                      "text": "Files:",
                      "type": "text",
                    },
                  ],
                  "type": "heading",
                },
                Object {
                  "content": Array [
                    Object {
                      "content": Array [
                        Object {
                          "content": Array [
                            Object {
                              "marks": Array [
                                Object {
                                  "attrs": Object {
                                    "href": "https://bitbucket.org/atlassian/atlassian-frontend/src/master/file-3#lines-1:5",
                                  },
                                  "type": "link",
                                },
                              ],
                              "text": "file-3",
                              "type": "text",
                            },
                          ],
                          "type": "paragraph",
                        },
                      ],
                      "type": "listItem",
                    },
                  ],
                  "type": "bulletList",
                },
              ],
              "type": "doc",
              "version": 1,
            },
            "issuetype": Object {
              "name": "IssueType",
            },
            "labels": Array [
              "ceir-ash-acbd18db4cc2f85cedef654fccc4a4d8-acbd18db4cc2f85cedef654fccc4a4d8",
              "ceir-rr-acbd18db4cc2f85cedef654fccc4a4d8-86415ce122575be4ba8d533bbf88b883",
            ],
            "project": Object {
              "key": "PK",
            },
            "summary": "Very foo! in \\"foo\\"",
          },
          "key": "ID-3",
        },
      ]
    `);
  });

  it('should create issues for violations that do not have a corresponding ticket yet', async () => {
    await rule.createIssues();
    const mockCall = (jiraClient.createIssues as jest.Mock).mock.calls[0][0];
    expect(JSON.stringify(mockCall)).toContain(fileForCreateIssue.name);
    expect(mockCall).toMatchInlineSnapshot(`
      Array [
        Object {
          "fields": Object {
            "assignee": Object {
              "accountId": "foo-id",
            },
            "customfield_45339": "team-bar",
            "customfield_45340": "bar",
            "description": Object {
              "content": Array [
                Object {
                  "content": Array [
                    Object {
                      "text": "foo description",
                      "type": "text",
                    },
                  ],
                  "type": "paragraph",
                },
                Object {
                  "attrs": Object {
                    "level": 3,
                  },
                  "content": Array [
                    Object {
                      "text": "Rule:",
                      "type": "text",
                    },
                  ],
                  "type": "heading",
                },
                Object {
                  "content": Array [
                    Object {
                      "text": "foo",
                      "type": "text",
                    },
                  ],
                  "type": "paragraph",
                },
                Object {
                  "attrs": Object {
                    "level": 3,
                  },
                  "content": Array [
                    Object {
                      "text": "Help link:",
                      "type": "text",
                    },
                  ],
                  "type": "heading",
                },
                Object {
                  "content": Array [
                    Object {
                      "marks": Array [
                        Object {
                          "attrs": Object {
                            "href": "some link to foo",
                          },
                          "type": "link",
                        },
                      ],
                      "text": "some link to foo",
                      "type": "text",
                    },
                  ],
                  "type": "paragraph",
                },
                Object {
                  "attrs": Object {
                    "level": 3,
                  },
                  "content": Array [
                    Object {
                      "text": "Files:",
                      "type": "text",
                    },
                  ],
                  "type": "heading",
                },
                Object {
                  "content": Array [
                    Object {
                      "content": Array [
                        Object {
                          "content": Array [
                            Object {
                              "marks": Array [
                                Object {
                                  "attrs": Object {
                                    "href": "https://bitbucket.org/atlassian/atlassian-frontend/src/master/file-4#lines-1:5",
                                  },
                                  "type": "link",
                                },
                              ],
                              "text": "file-4",
                              "type": "text",
                            },
                          ],
                          "type": "paragraph",
                        },
                      ],
                      "type": "listItem",
                    },
                  ],
                  "type": "bulletList",
                },
              ],
              "type": "doc",
              "version": 1,
            },
            "issuetype": Object {
              "name": "IssueType",
            },
            "labels": Array [
              "ceir-ash-37b51d194a7513e45b56f6524f2d51f2-37b51d194a7513e45b56f6524f2d51f2",
              "ceir-rr-acbd18db4cc2f85cedef654fccc4a4d8-86415ce122575be4ba8d533bbf88b883",
            ],
            "project": Object {
              "key": "PK",
            },
            "summary": "Very foo! in \\"bar\\"",
          },
          "update": Object {},
        },
      ]
    `);
  });
});
