import type {
  DocNode,
  PanelType,
  TableDefinition,
  TableRowDefinition,
} from '@atlaskit/adf-schema';

import type { Test } from '../types';

const {
  BITBUCKET_REPO_FULL_NAME,
  BITBUCKET_BUILD_NUMBER,
  SKIP_TESTS_SET_TICKET_DUE_DATE,
} = process.env;
const hasDueDate = SKIP_TESTS_SET_TICKET_DUE_DATE === 'true';

/**
 * Convert brackets to URL safe versions.
 *
 * e.g. id = "{701709b1-5f5b-4ff9-bc0b-4d12d02f000b}"
 *
 * '{' => '%7B' and '}' => '%7D'
 * @param id
 * @returns
 */
function encodeStepId(id: string) {
  if (id.includes('{') || id.includes('}')) {
    return encodeURIComponent(id);
  }
  return id;
}

// Construct link to pipeline build result page
function getPipelineUrl(pipelineStepId?: string) {
  pipelineStepId = encodeStepId(pipelineStepId || '');
  let pipelineUrl = `https://bitbucket.org/${BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}`;
  if (pipelineStepId) {
    pipelineUrl = `${pipelineUrl}/steps/${pipelineStepId}/test-report`;
  }
  return pipelineUrl;
}

function getTestCaseLabel(test: Test) {
  let name = test.testName;
  if (test.ancestorLabels) {
    name = `${test.ancestorLabels} › ${name}`;
  }
  return name;
}

function getSessionTableRow(sessionUrl: string): TableRowDefinition {
  return {
    type: 'tableRow',
    content: [
      {
        type: 'tableHeader',
        attrs: {
          colwidth: [120],
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Session:',
                marks: [
                  {
                    type: 'strong',
                  } as const,
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'tableCell',
        attrs: {
          colwidth: [640],
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: sessionUrl,
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: sessionUrl,
                    },
                  } as const,
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

function getTable(failedTest: Test): TableDefinition {
  return {
    type: 'table',
    attrs: {
      isNumberColumnEnabled: false,
      layout: 'default',
    },
    content: [
      {
        type: 'tableRow',
        content: [
          {
            type: 'tableHeader',
            attrs: {
              colwidth: [100],
            },
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Test case:',
                    marks: [
                      {
                        type: 'strong',
                      } as const,
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'tableCell',
            attrs: {
              colwidth: [640],
            },
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: getTestCaseLabel(failedTest),
                    marks: [
                      {
                        type: 'code',
                      } as const,
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'tableRow',
        content: [
          {
            type: 'tableHeader',
            attrs: {
              colwidth: [100],
            },
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'File:',
                    marks: [
                      {
                        type: 'strong',
                      } as const,
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'tableCell',
            attrs: {
              colwidth: [640],
            },
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: failedTest.path,
                    marks: [
                      {
                        type: 'code',
                      } as const,
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'tableRow',
        content: [
          {
            type: 'tableHeader',
            attrs: {
              colwidth: [120],
            },
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Error:',
                    marks: [
                      {
                        type: 'strong',
                      } as const,
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'tableCell',
            attrs: {
              colwidth: [640],
            },
            content: [
              {
                type: 'codeBlock',
                attrs: {},
                content: [
                  {
                    type: 'text',
                    text: failedTest.errors[0],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

export default function getDescription(
  failedTest: Test,
  sessionUrl?: string,
): DocNode {
  const description: DocNode = {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'panel',
        attrs: {
          panelType: 'warning' as PanelType,
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This test was ',
              },
              {
                type: 'text',
                text: 'automatically skipped',
                marks: [
                  {
                    type: 'em',
                  } as const,
                  {
                    type: 'strong',
                  } as const,
                  {
                    type: 'link',
                    attrs: {
                      href: failedTest.pullRequestUrl || '',
                    },
                  } as const,
                ],
              },
              {
                type: 'text',
                text:
                  ' due to failing during a scheduled inconsistent test results ',
              },
              {
                type: 'text',
                text: 'pipeline',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: getPipelineUrl(failedTest.pipelineStepId),
                    },
                  } as const,
                ],
              },
              {
                type: 'text',
                text: ' on ',
              },
              {
                type: 'date',
                attrs: {
                  timestamp: `${Date.now()}`,
                },
              },
              {
                type: 'text',
                text: '. See ',
              },
              {
                type: 'text',
                text: 'go/af-inconsistent-tests-faq',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href:
                        'https://go.atlassian.com/af-inconsistent-tests-faq',
                    },
                  } as const,
                ],
              },
              {
                type: 'text',
                text: ' to learn more.',
              },
            ],
          },
        ],
      },
      {
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Please triage and investigate the test instability',
                marks: [
                  {
                    type: 'strong',
                  } as const,
                ],
              },
              {
                type: 'text',
                text: `, and work to restore it at your earliest convenience${
                  hasDueDate ? ' before the due date' : ''
                }.`,
              },
            ],
          },
        ],
      },
    ],
  };

  const table = getTable(failedTest);
  if (sessionUrl) {
    // Add an extra session row to the table when we have a URL available for it.
    table.content.push(getSessionTableRow(sessionUrl));
  }
  description.content.push(table);

  return description;
}
