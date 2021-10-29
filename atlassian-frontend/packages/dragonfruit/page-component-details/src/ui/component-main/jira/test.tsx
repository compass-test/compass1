import React from 'react';

import { render } from '@testing-library/react';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import {
  CompassComponentDetailViewFragment,
  CompassComponentType,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { useSearchJiraIssues } from '@atlassian/dragonfruit-rest';
import {
  CompassTestProvider,
  MOCK_CLOUD_ID,
} from '@atlassian/dragonfruit-testing';

import issueSectionMessages from './jira-project-section/jira-issue-section/messages';
import projectSectionMessages from './jira-project-section/messages';
import { JiraComponentPage } from './main';
import messages from './messages';

jest.mock('@atlassian/dragonfruit-utils', () =>
  Object.assign({}, jest.requireActual('@atlassian/dragonfruit-utils'), {
    useSmartLinks: () => ({
      client: {
        fetchData: jest.fn().mockImplementation((url: string) => ({
          data: mockResolvedLinks.find((link) => link.url === url),
        })),
      },
    }),
  }),
);

jest.mock('@atlassian/dragonfruit-rest', () =>
  Object.assign({}, jest.requireActual('@atlassian/dragonfruit-rest'), {
    useSearchJiraIssues: jest.fn(),
  }),
);

jest.mock('@atlassian/analytics-bridge', () =>
  Object.assign({}, jest.requireActual('@atlassian/analytics-bridge'), {
    fireUIAnalytics: jest.fn(),
  }),
);

const mockResolvedLinks = [
  {
    name: 'Compass Project',
    summary: '',
    icon: { url: '' },
    url: 'https://lodestone.jira-dev.com/browse/COMPASS',
  },
  {
    name: 'Jira Project',
    summary: '',
    icon: { url: '' },
    url: 'https://lodestone.jira-dev.com/browse/JIRA',
  },
];

const links = [
  {
    id: 'compass-id',
    name: 'Compass',
    url: 'https://lodestone.jira-dev.com/browse/COMPASS',
    type: CompassLinkType.PROJECT,
  },
  {
    id: 'jira-id',
    name: 'Jira',
    url: 'https://lodestone.jira-dev.com/browse/JIRA',
    type: CompassLinkType.PROJECT,
  },
];

const component: CompassComponentDetailViewFragment = {
  name: 'Lorem ipsum',
  id:
    'ari:cloud:compass:4958bb5d-3970-4a13-bebc-62bbca57f370:component/5ce8c075-7b72-4455-9be9-7f0a1c6e6db4/a60d9b0f-fa86-436c-b3c2-0eece8e94fdb',
  type: CompassComponentType.SERVICE,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris leo nisi, ultricies gravida orci ut, maximus auctor orci. Morbi venenatis.',
  ownerId: 'someownerarigoeshere',
  links: links,
};

const compassEpicIssues = {
  issues: [
    {
      key: 'COMPASS-3',
      id: '23453',
      fields: {
        summary: 'Compass Number One!',
        issuetype: {
          avatarId: '35563',
          iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/viewavatar?size=medium&avatarId=35563&avatarType=issuetype`,
          subtask: false,
          name: 'Epic',
        },
        priority: {
          id: '7542',
          name: 'Highest',
          iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/images/icons/priorities/highest.svg`,
        },
      },
    },
    {
      key: 'COMPASS-8',
      id: '23492',
      fields: {
        summary: 'Compass Number Two!',
        issuetype: {
          avatarId: '35563',
          iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/viewavatar?size=medium&avatarId=35563&avatarType=issuetype`,
          subtask: false,
          name: 'Epic',
        },
        priority: {
          id: '9834',
          name: 'Medium',
          iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/images/icons/priorities/medium.svg`,
        },
      },
    },
  ],
};
const jiraEpicIssues = { issues: [] };

function setJiraIssues(overrides?: any) {
  (useSearchJiraIssues as any).mockImplementation(
    ({ jql }: { jql: string }) => {
      const returnValue = overrides ? overrides(jql) : undefined;
      if (returnValue) {
        return returnValue;
      }

      if (jql.includes(`"Compass Project" AND type = "Epic"`)) {
        return { data: compassEpicIssues, loading: false, error: undefined };
      } else if (jql.includes(`"Compass Project" AND "Epic Link" = EMPTY`)) {
        return { data: { issues: [] }, loading: false, error: undefined };
      } else if (jql.includes(`"Jira Project" AND type = "Epic"`)) {
        return { data: jiraEpicIssues, loading: false, error: undefined };
      } else if (jql.includes(`"Jira Project" AND "Epic Link" = EMPTY`)) {
        return { data: { issues: [] }, loading: false, error: undefined };
      }

      return { data: undefined, loading: true, error: undefined };
    },
  );
}

describe('JiraComponentPage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    setJiraIssues();
  });

  test('should render projects appropriately', async () => {
    const { getByText, getByTestId, findByText } = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <JiraComponentPage component={component} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(getByText(messages.pageHeader.defaultMessage)).toBeDefined();
    expect(getByText(messages.pageDescription.defaultMessage)).toBeDefined();
    expect(
      getByText(messages.issueFilterExplanation.defaultMessage),
    ).toBeDefined();
    expect(
      getByTestId('dragonfruit.jira-issue-explanation.component-name'),
    ).toBeDefined();
    expect(
      getByText(messages.issueFilterExplanation2.defaultMessage),
    ).toBeDefined();
    expect(getByText(messages.jiraAdvSearch.defaultMessage)).toBeDefined();

    expect(await findByText('Compass Project')).toBeInTheDocument();
    expect(await findByText('Jira Project')).toBeInTheDocument();
  });

  test('should render epic sections appropriately', async () => {
    const { getByText, findByText, queryByText } = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <JiraComponentPage component={component} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(await findByText('Compass Project')).toBeInTheDocument();
    expect(await findByText('Jira Project')).toBeInTheDocument();

    expect(useSearchJiraIssues).toHaveBeenCalledWith({
      cloudId: '7550aec5-71ad-43de-8402-8f7d2d37398c',
      jql:
        'project = "Compass Project" AND type = "Epic" AND component = "Lorem ipsum" ORDER BY updated DESC',
      validateQuery: 'warn',
    });

    expect(useSearchJiraIssues).toHaveBeenCalledWith({
      cloudId: '7550aec5-71ad-43de-8402-8f7d2d37398c',
      jql:
        'project = "Compass Project" AND "Epic Link" = EMPTY and issuetype != Epic AND component = "Lorem ipsum" ORDER BY updated DESC',
      lazy: false,
      validateQuery: 'warn',
    });

    expect(useSearchJiraIssues).toHaveBeenCalledWith({
      cloudId: '7550aec5-71ad-43de-8402-8f7d2d37398c',
      jql:
        'project = "Jira Project" AND type = "Epic" AND component = "Lorem ipsum" ORDER BY updated DESC',
      validateQuery: 'warn',
    });

    expect(useSearchJiraIssues).toHaveBeenCalledWith({
      cloudId: '7550aec5-71ad-43de-8402-8f7d2d37398c',
      jql:
        'project = "Jira Project" AND "Epic Link" = EMPTY and issuetype != Epic AND component = "Lorem ipsum" ORDER BY updated DESC',
      lazy: false,
      validateQuery: 'warn',
    });

    // Compass Issues are there
    expect(getByText('Compass Number One!')).toBeInTheDocument();
    expect(getByText('Compass Number Two!')).toBeInTheDocument();

    // No Jira Issues
    expect(
      getByText(projectSectionMessages.emptySection.defaultMessage),
    ).toBeInTheDocument();
    // Make sure there are no "Issues without Epics Sections"
    expect(
      queryByText(issueSectionMessages.noEpic.defaultMessage),
    ).not.toBeInTheDocument();
  });

  test('should render empty state for project if "component = <component name> doesnt exist" jql error is returned', async () => {
    setJiraIssues((jql: string) => {
      if (jql.includes(`"component = ${component.name}"`)) {
        throw new Error(
          `Unable to fetch /gateway/api/ex/jira/${MOCK_CLOUD_ID}/rest/api/3/search?jql=${encodeURIComponent(
            jql,
          )} . {"errorMessages":["The value 'Lorem ipsum' does not exist for the field 'component'."],"warningMessages":[]}`,
        );
      }
    });
    const { getByText, findByText, queryByText } = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <JiraComponentPage component={component} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(getByText(messages.pageHeader.defaultMessage)).toBeDefined();
    expect(getByText(messages.pageDescription.defaultMessage)).toBeDefined();
    expect(getByText(messages.jiraAdvSearch.defaultMessage)).toBeDefined();

    expect(await findByText('Compass Project')).toBeInTheDocument();
    expect(await findByText('Jira Project')).toBeInTheDocument();

    expect(
      getByText(projectSectionMessages.emptySection.defaultMessage),
    ).toBeInTheDocument();
    expect(
      queryByText(projectSectionMessages.fetchIssuesError.defaultMessage),
    ).not.toBeInTheDocument();
  });

  test('should render issues for epic when there are issues', async () => {
    setJiraIssues((jql: string) => {
      if (
        jql.includes(
          `"Compass Project" AND parentEpic = "${compassEpicIssues.issues[1].key}"`,
        )
      ) {
        return {
          data: {
            issues: [
              compassEpicIssues.issues[1],
              {
                key: 'COMPASS-14',
                id: '23492',
                fields: {
                  summary: 'A Buggy Bug',
                  status: {
                    id: '23435',
                    name: 'In Progress',
                    description: 'This is actively being worked on',
                    statusCategory: {
                      colorName: 'yellow',
                      key: 'indeterminate',
                      id: 4,
                    },
                  },
                  issuetype: {
                    avatarId: '8743',
                    iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/viewavatar?size=medium&avatarId=8743&avatarType=issuetype`,
                    subtask: false,
                    name: 'Bug',
                  },
                  priority: {
                    id: '9834',
                    name: 'Medium',
                    iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/images/icons/priorities/medium.svg`,
                  },
                },
              },
            ],
          },
        };
      }
    });

    const { getByText, findByText } = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <JiraComponentPage component={component} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(await findByText('Compass Project')).toBeInTheDocument();
    expect(await findByText('Jira Project')).toBeInTheDocument();

    const epic = getByText('Compass Number Two!');
    expect(epic).toBeInTheDocument();
    epic.click();

    expect(await findByText('A Buggy Bug')).toBeInTheDocument();

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);

    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'click',
          actionSubject: 'epicExpanded',
        }),
      }),
    );
  });

  test('should render issues for epic when there are no issues', async () => {
    setJiraIssues((jql: string) => {
      if (
        jql.includes(
          `"Compass Project" AND parentEpic = "${compassEpicIssues.issues[0].key}"`,
        )
      ) {
        return {
          data: {
            issues: [],
          },
        };
      }
    });

    const { getByText, findByText } = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <JiraComponentPage component={component} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(await findByText('Compass Project')).toBeInTheDocument();
    expect(await findByText('Jira Project')).toBeInTheDocument();

    const epic = getByText('Compass Number One!');
    expect(epic).toBeInTheDocument();
    epic.click();

    expect(
      getByText(issueSectionMessages.emptySection.defaultMessage),
    ).toBeInTheDocument();
  });

  test('should render issues without epics sections appropriately', async () => {
    setJiraIssues((jql: string) => {
      if (jql.includes(`"Jira Project" AND "Epic Link" = EMPTY`)) {
        return {
          data: {
            issues: [
              {
                key: 'JIRA-93',
                id: '54635',
                fields: {
                  summary: 'Jira Integration!',
                  status: {
                    id: '23435',
                    name: 'In Progress',
                    description: 'This is actively being worked on',
                    statusCategory: {
                      colorName: 'yellow',
                      key: 'indeterminate',
                      id: 4,
                    },
                  },
                  issuetype: {
                    avatarId: '45345',
                    iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/viewavatar?size=medium&avatarId=45345&avatarType=issuetype`,
                    subtask: false,
                    name: 'Task',
                  },
                  priority: {
                    id: '9834',
                    name: 'Medium',
                    iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/images/icons/priorities/medium.svg`,
                  },
                },
              },
              {
                key: 'JIRA-99',
                id: '35632',
                fields: {
                  summary: 'Jira Importer!',
                  status: {
                    id: '98425',
                    name: 'To Do',
                    statusCategory: {
                      colorName: 'blue-gray',
                      key: 'todo',
                      id: 1,
                    },
                  },
                  issuetype: {
                    avatarId: '45345',
                    iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/viewavatar?size=medium&avatarId=45345&avatarType=issuetype`,
                    subtask: false,
                    name: 'Task',
                  },
                  priority: {
                    id: '5743',
                    name: 'High',
                    iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/images/icons/priorities/high.svg`,
                  },
                },
              },
            ],
          },
          loading: false,
          error: undefined,
        };
      }
    });

    const { findByText, getByText } = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <JiraComponentPage component={component} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(await findByText('Compass Project')).toBeInTheDocument();
    expect(await findByText('Jira Project')).toBeInTheDocument();

    const noEpicSection = getByText(issueSectionMessages.noEpic.defaultMessage);
    expect(noEpicSection).toBeInTheDocument();
    noEpicSection.click();

    expect(await findByText('Jira Integration!')).toBeInTheDocument();
    expect(await findByText('Jira Importer!')).toBeInTheDocument();
  });

  test('should render no projects empty state appropriately', async () => {
    const componentWithNoProjectLinks = {
      ...component,
      links: [
        {
          id: '93613adq-1ba2-480d-8b43-2acf9cd533aa',
          name: null,
          url: 'https://bitbucket.org/test/123',
          type: CompassLinkType.REPOSITORY,
        },
      ],
    };

    const { findByText, findByLabelText } = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <JiraComponentPage component={componentWithNoProjectLinks} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(
      await findByText("See what's happening with your component"),
    ).toBeInTheDocument();

    // Find the add project link form.
    expect(await findByLabelText('Form for adding a link')).toBeInTheDocument();
  });
});
