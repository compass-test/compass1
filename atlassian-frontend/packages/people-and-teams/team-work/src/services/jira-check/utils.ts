import { request } from '../generic-hook/utils';

export const urlJiraCheck = (baseUrl: string = '') =>
  `${baseUrl}/gateway/api/permissions/permitted`;

export const jiraCheckRequestBody = (cloudId: string) => ({
  permissionId: 'write',
  resourceId: `ari:cloud:jira-software::site/${cloudId}`,
});

export const defaultRequest = (baseUrl?: string) => (cloudId?: string) =>
  cloudId
    ? request(urlJiraCheck(baseUrl), {
        body: JSON.stringify(jiraCheckRequestBody(cloudId)),
      })
    : Promise.resolve(new Response());
