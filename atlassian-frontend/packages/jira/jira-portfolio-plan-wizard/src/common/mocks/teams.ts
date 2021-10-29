import { Team } from '../../common/types';

const IconBaseUrl =
  'https://jpoc.jira-dev.com/secure/projectavatar?size=medium&s=medium&pid=10000&avatarId=';

export const teams: Team[] = [
  {
    id: 1,
    title: 'Mobile Team',
    avatarUrl: `${IconBaseUrl}10400`,
    type: 'shared',
  },
  {
    id: 2,
    title: 'Wensleydale',
    avatarUrl: `${IconBaseUrl}10500`,
    type: 'shared',
  },
  {
    id: 3,
    title: 'Team Without Avatar',
    type: 'shared',
  },
  {
    id: 4,
    title: 'Team X',
    avatarUrl: `${IconBaseUrl}10600`,
    type: 'shared',
  },
  {
    id: 5,
    title: 'Cheesecake',
    avatarUrl: `${IconBaseUrl}10300`,
    type: 'shared',
  },
];
