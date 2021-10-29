import React from 'react';

import { render, waitForElement } from '@testing-library/react';

import { fetchMockGet, MOCK_CLOUD_ID } from '@atlassian/dragonfruit-testing';

import { SearchJiraIssuesInput } from './types';

import { useSearchJiraIssues } from './index';

const Test = (input: Partial<SearchJiraIssuesInput>) => {
  const response = useSearchJiraIssues({
    ...input,
    cloudId: MOCK_CLOUD_ID,
  } as any);
  const issues = response.data?.issues || [];
  const error = response.error;

  return (
    <>
      {issues.map(i => (
        <div key={i.id}>{JSON.stringify(i)}</div>
      ))}
      {error && <div>Error: {error.toString()}</div>}
    </>
  );
};

const user2 = {
  accountId: '23rfnv09w4r23f4g',
  displayName: 'Kairo Bot',
  avatarUrls: {
    '16x16': 'https://avatars.atl-paas.net/23rfnv09w4r23f4g/afm3drq4rh5grf/16',
    '24x24': 'https://avatars.atl-paas.net/23rfnv09w4r23f4g/afm3drq4rh5grf/24',
    '32x32': 'https://avatars.atl-paas.net/23rfnv09w4r23f4g/afm3drq4rh5grf/32',
    '48x48': 'https://avatars.atl-paas.net/23rfnv09w4r23f4g/afm3drq4rh5grf/48',
  },
};

const issues = [
  {
    id: '10239',
    key: 'COMPASS-3',
    fields: {
      assignee: {
        accountId: '09385t3d50ta',
        displayName: 'Lodestone Bot',
        avatarUrls: {
          '16x16':
            'https://avatars.atl-paas.net/09385t3d50ta/3k0gkf4st6hsdf/16',
          '24x24':
            'https://avatars.atl-paas.net/09385t3d50ta/3k0gkf4st6hsdf/24',
          '32x32':
            'https://avatars.atl-paas.net/09385t3d50ta/3k0gkf4st6hsdf/32',
          '48x48':
            'https://avatars.atl-paas.net/09385t3d50ta/3k0gkf4st6hsdf/48',
        },
      },
      components: [
        { id: '3492', name: 'Automatic Coding Spectacular' },
        { id: '8342', name: 'Bot Work', description: 'Work done by the bot' },
      ],
      created: '2021-09-21T14:18:38.993-0700',
      creator: user2,
      labels: ['label1', '2label', '3label3'],
      issueType: {
        avatarId: 10318,
        description: 'A basic task',
        iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/viewavatar?size=medium&avatarId=10318&avatarType=issuetype`,
        name: 'Task',
        subtask: false,
      },
      priority: {
        id: '396',
        iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/images/icons/priorities/medium.svg`,
        name: 'Medium',
      },
      project: {
        avatarUrls: {
          '16x16': `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/projectavatar?size=xsmall&s=xsmall&pid=209385&avatarId=10421`,
          '24x24': `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/projectavatar?size=small&s=small&pid=209385&avatarId=10421`,
          '32x32': `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/projectavatar?size=medium&s=medium&pid=209385&avatarId=10421`,
          '48x48': `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/projectavatar?pid=209385&avatarId=10421`,
        },
        id: '209385',
        key: 'COMPASS',
        name: 'Compass',
      },
      reporter: user2,
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
      updated: '2021-09-23T10:14:08.593-0200',
      summary: 'Very Long Task',
    },
  },
  {
    id: '10429',
    key: 'COMPASS-21',
    fields: {
      assignee: {
        accountId: '3tgse4654ewa',
        displayName: 'Compass Bot',
        avatarUrls: {
          '16x16':
            'https://avatars.atl-paas.net/3tgse4654ewa/3k0gkf4st6hsdf/16',
          '24x24':
            'https://avatars.atl-paas.net/3tgse4654ewa/3k0gkf4st6hsdf/24',
          '32x32':
            'https://avatars.atl-paas.net/3tgse4654ewa/3k0gkf4st6hsdf/32',
          '48x48':
            'https://avatars.atl-paas.net/3tgse4654ewa/3k0gkf4st6hsdf/48',
        },
      },
      components: [],
      created: '2021-10-22T14:18:38.993-0700',
      creator: user2,
      labels: [],
      issueType: {
        avatarId: 1342,
        description: 'A story',
        iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/viewavatar?size=medium&avatarId=1342&avatarType=issuetype`,
        name: 'Story',
        subtask: false,
      },
      priority: {
        id: '3935',
        iconUrl: `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/images/icons/priorities/highest.svg`,
        name: 'Highest',
      },
      project: {
        avatarUrls: {
          '16x16': `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/projectavatar?size=xsmall&s=xsmall&pid=209385&avatarId=10421`,
          '24x24': `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/projectavatar?size=small&s=small&pid=209385&avatarId=10421`,
          '32x32': `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/projectavatar?size=medium&s=medium&pid=209385&avatarId=10421`,
          '48x48': `https://mysite.jira-dev.com/ex/jira/${MOCK_CLOUD_ID}/secure/projectavatar?pid=209385&avatarId=10421`,
        },
        id: '209385',
        key: 'COMPASS',
        name: 'Compass',
      },
      reporter: user2,
      status: {
        id: '98425',
        name: 'To Do',
        statusCategory: {
          colorName: 'blue-gray',
          key: 'todo',
          id: 1,
        },
      },
      updated: '2021-11-01T10:14:08.593-0200',
      summary: 'Hopefully a short story',
    },
  },
];

describe('useSearchJiraIssues', () => {
  it('should return issues without startBy or maxResults', async () => {
    const jql = `project = "COMPASS" ORDER BY created DESC`;
    const mock = fetchMockGet({
      request: {
        url: `/gateway/api/ex/jira/${MOCK_CLOUD_ID}/rest/api/3/search?jql=${encodeURIComponent(
          jql,
        )}&startAt=0&maxResults=50&validateQuery=strict`,
      },
      result: {
        issues,
        maxResults: 50,
        startAt: 0,
        total: issues.length,
      },
    });

    const mockOnCompleted = jest.fn();
    const { getByText, container } = render(
      <Test jql={jql} onCompleted={mockOnCompleted} />,
    );
    await waitForElement(() => getByText(/Hopefully a short story/i));
    expect(container).toMatchSnapshot();
    expect(mock.done()).toBe(true);
    expect(mockOnCompleted).toHaveBeenCalledWith({
      issues,
      maxResults: 50,
      startAt: 0,
      total: issues.length,
    });
  });

  it('should only query once due to caching', async () => {
    const jql = `project = "COMPASS" ORDER BY created DESC`;
    const mock = fetchMockGet({
      request: {
        url: `/gateway/api/ex/jira/${MOCK_CLOUD_ID}/rest/api/3/search?jql=${encodeURIComponent(
          jql,
        )}&startAt=100&maxResults=50&validateQuery=strict`,
      },
      result: {
        issues,
        maxResults: 50,
        startAt: 100,
        total: issues.length,
      },
    });
    let numCalls = mock._calls.length;

    const mockOnCompleted = jest.fn();
    const mockOnCompleted2 = jest.fn();
    const { getByText, rerender } = render(
      <Test jql={jql} startAt={100} onCompleted={mockOnCompleted} />,
    );
    await waitForElement(() => getByText(/Hopefully a short story/i));
    expect(mock._calls.length).toEqual(numCalls + 1);
    numCalls = mock._calls.length;
    expect(mock.done()).toBe(true);
    expect(mockOnCompleted).toHaveBeenCalledWith({
      issues,
      maxResults: 50,
      startAt: 100,
      total: issues.length,
    });

    rerender(<Test jql={jql} startAt={100} onCompleted={mockOnCompleted2} />);
    await waitForElement(() => getByText(/Hopefully a short story/i));
    expect(mockOnCompleted2).toHaveBeenCalledWith({
      issues,
      maxResults: 50,
      startAt: 100,
      total: issues.length,
    });
    expect(mock._calls.length).toEqual(numCalls);
  });

  it('should query appropriately with startBy and maxResults', async () => {
    const jql = `project = "COMPASS" ORDER BY created DESC`;
    const mock = fetchMockGet({
      request: {
        url: `/gateway/api/ex/jira/${MOCK_CLOUD_ID}/rest/api/3/search?jql=${encodeURIComponent(
          jql,
        )}&startAt=15&maxResults=22&validateQuery=strict`,
      },
      result: {
        issues,
        maxResults: 22,
        startAt: 15,
        total: issues.length,
      },
    });

    const { getByText } = render(
      <Test jql={jql} startAt={15} maxResults={22} />,
    );
    await waitForElement(() => getByText(/Hopefully a short story/i));
    expect(mock.done()).toBe(true);
  });

  it('should return errors appropriately', async () => {
    const jql = `BAD JQL`;
    const mock = fetchMockGet({
      request: {
        url: `/gateway/api/ex/jira/${MOCK_CLOUD_ID}/rest/api/3/search?jql=${encodeURIComponent(
          jql,
        )}&startAt=15&maxResults=22&validateQuery=strict`,
      },
      result: {
        throws: new Error(
          `FetchError: Unable to fetch /gateway/api/ex/jira/${MOCK_CLOUD_ID}/rest/api/3/search?jql=BAD%20JQL&startAt=15&maxResults=22`,
        ),
      },
    });

    const { getByText, container } = render(
      <Test jql={jql} startAt={15} maxResults={22} />,
    );
    await waitForElement(() => getByText(/FetchError/i));
    expect(container).toMatchSnapshot();
    expect(mock.done()).toBe(true);
  });

  it('dont make call when lazy is set', async () => {
    const jql = `project = "COMPASS" ORDER BY created DESC`;
    const mock = fetchMockGet({
      request: {
        url: `/gateway/api/ex/jira/${MOCK_CLOUD_ID}/rest/api/3/search?jql=${encodeURIComponent(
          jql,
        )}&startAt=10&maxResults=50&validateQuery=strict`,
      },
      result: {
        issues,
        maxResults: 50,
        startAt: 10,
        total: issues.length,
      },
    });

    render(<Test jql={jql} lazy={true} startAt={10} />);
    await new Promise(r => setTimeout(r, 1000));
    expect(mock.done()).toBe(false);
  });
});
