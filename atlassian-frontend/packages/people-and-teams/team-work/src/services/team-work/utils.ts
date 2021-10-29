import { request } from '../generic-hook/utils';

export const urlJiraSearch = (baseUrl: string = '') =>
  `${baseUrl}/rest/api/3/search`;

export const jiraSearchJQL = (teamId: string) =>
  `"Team[Team]" = ${teamId} ORDER BY updated`;

export const jiraSearchRequestBody = (teamId: string) => ({
  expand: ['names', 'schema', 'operations'],
  jql: jiraSearchJQL(teamId),
  maxResults: 5,
  fieldsByKeys: false,
  fields: ['summary', 'status', 'project', 'priority', 'issuetype'],
  startAt: 0,
});

export const defaultRequest = (baseUrl?: string) => (teamId: string) =>
  request(urlJiraSearch(baseUrl), {
    body: JSON.stringify(jiraSearchRequestBody(teamId)),
  });
