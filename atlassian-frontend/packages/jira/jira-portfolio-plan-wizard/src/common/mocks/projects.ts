import { Project, ProjectOption } from '../../common/types';

const IconBaseUrl =
  'https://jpoc.jira-dev.com/secure/projectavatar?size=medium&s=medium&pid=10000&avatarId=';

export function buildProject(payload?: Partial<Project>): Project {
  return Object.assign(
    {
      id: 0,
      key: 'SAMPLE_PROJECT',
      name: 'Sample project',
      avatarUrl: `${IconBaseUrl}10400`,
      type: 'project',
      issueTypeIds: [
        '10002',
        '10003',
        '10004',
        '10005',
        '10006',
        '10007',
        '10008',
        '10009',
      ],
      issueStatusIds: [],
    },
    payload,
  );
}

export const projects: Project[] = [
  buildProject({
    id: 1,
    name: 'Mobile App',
    key: 'MOB',
    avatarUrl: `${IconBaseUrl}10400`,
    issueTypeIds: ['10001'],
  }),
  buildProject({
    id: 2,
    key: 'WEB',
    name: 'Website',
    avatarUrl: `${IconBaseUrl}10401`,
  }),
  buildProject({
    id: 3,
    key: 'SER',
    name: 'Server 2.0',
    avatarUrl: `${IconBaseUrl}10402`,
  }),
  buildProject({
    id: 5,
    key: 'DES',
    name: 'Design UX',
    avatarUrl: `${IconBaseUrl}10403`,
  }),
  buildProject({
    id: 6,
    key: 'INT',
    name: 'Integrate with 3rd Party',
    avatarUrl: `${IconBaseUrl}10404`,
  }),
  buildProject({
    id: 7,
    key: 'HTP',
    name: 'Happy together',
    avatarUrl: `${IconBaseUrl}10405`,
  }),
  buildProject({
    id: 8,
    key: 'NGP',
    name: 'Team-managed project',
    avatarUrl: `${IconBaseUrl}10406`,
  }),
];

export const projectOptions: ProjectOption[] = projects.map(
  ({ id, avatarUrl, key, name }) => ({
    id,
    avatarUrl,
    key,
    name,
    hasNextGenProjects: name === 'Team-managed project',
  }),
);
