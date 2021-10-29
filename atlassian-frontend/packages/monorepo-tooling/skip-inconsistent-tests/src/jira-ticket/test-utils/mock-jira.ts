import { JiraClient, ProjectDetails } from '@atlaskit/build-utils/jira';

export function mockIssueType(
  id: number,
  name: 'Task' | 'Bug' | 'Story' | 'Epic',
) {
  return {
    self: `https://product-fabric.atlassian.net/rest/api/3/issuetype/${id}`,
    id: `${id}`,
    description: `A ${name.toUpperCase()} that needs to be done.`,
    iconUrl:
      'https://product-fabric.atlassian.net/secure/viewavatar?size=medium&avatarId=12345&avatarType=issuetype',
    name,
    subtask: false,
    avatarId: 10318,
  };
}

export const ProjectKeyIdMap = new Map();

// Convert a alphabetical project key to a numerical id. e.g. 'AFP' => '0515', or 'MONO' to '12141314'.
// It uses a crude conversion of "a|A" to 0, "b|B" to 1, etc
function projectKeyToId(projectKey: string) {
  return projectKey
    .split('')
    .map((letter: string) => letter.toLowerCase().charCodeAt(0) - 97)
    .join('');
}

function getDefaultProjectMock(projectKey: string): ProjectDetails {
  let id: string;
  if (ProjectKeyIdMap.has(projectKey)) {
    id = ProjectKeyIdMap.get(projectKey);
  } else {
    // Lazily storing bidirectional lookups.
    // Key naming collisions aren't expected due to alphabetical project keys (e.g. AFP)
    // and numerical ids (e.g. 0515)
    id = projectKeyToId(projectKey);
    ProjectKeyIdMap.set(projectKey, id);
    ProjectKeyIdMap.set(id, projectKey);
  }
  return {
    expand: 'description,lead,issueTypes,url,projectKeys,permissions,insight',
    self: `https://product-fabric.atlassian.net/rest/api/3/project/${id}`,
    id,
    key: projectKey,
    description: 'Team Description',
    lead: {
      self:
        'https://product-fabric.atlassian.net/rest/api/3/user?accountId=aid:guid-a',
      accountId: 'aid:guid-a',
      avatarUrls: {
        '48x48':
          'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/aid:guid-a/guid-b/48',
        '24x24':
          'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/aid:guid-a/guid-b/24',
        '16x16':
          'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/aid:guid-a/guid-b/16',
        '32x32':
          'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/aid:guid-a/guid-b/32',
      },
      displayName: 'Important Person',
      active: true,
    },
    components: [
      {
        self: 'https://product-fabric.atlassian.net/rest/api/3/component/15650',
        id: '15650',
        name: 'Actions',
        isAssigneeTypeValid: false,
      },
    ],
    issueTypes: [mockIssueType(10002, 'Task')],
    assigneeType: 'UNASSIGNED',
    versions: [
      {
        self: 'https://product-fabric.atlassian.net/rest/api/3/version/11417',
        id: '11417',
        description: 'Bitbucket MVP',
        name: 'BB MVP',
        archived: false,
        released: false,
        projectId: 11001,
      },
    ],
    name: 'Team Name',
    roles: {
      'atlassian-addons-project-access': `https://product-fabric.atlassian.net/rest/api/3/project/${id}/role/10100`,
    },
    avatarUrls: {
      '48x48': `https://product-fabric.atlassian.net/secure/projectavatar?pid=${id}&avatarId=123`,
      '24x24': `https://product-fabric.atlassian.net/secure/projectavatar?size=small&s=small&pid=${id}&avatarId=123`,
      '16x16': `https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&s=xsmall&pid=${id}&avatarId=123`,
      '32x32': `https://product-fabric.atlassian.net/secure/projectavatar?size=medium&s=medium&pid=${id}&avatarId=123`,
    },
    projectTypeKey: 'software',
    simplified: false,
    style: 'classic',
    isPrivate: false,
    properties: {},
  };
}

export function mockProjectDetails(override: Partial<ProjectDetails> = {}) {
  jest
    .spyOn(JiraClient.prototype, 'getProjectDetails')
    .mockImplementation(projectKey => {
      return Promise.resolve({
        ...getDefaultProjectMock(projectKey),
        ...override,
      });
    });
}
