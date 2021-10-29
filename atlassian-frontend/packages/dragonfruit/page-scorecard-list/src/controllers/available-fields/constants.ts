import { OptionType } from '@atlaskit/select';

export enum Values {
  OWNER = 'OWNER',
  DESCRIPTION = 'DESCRIPTION',
  DOCUMENT = 'DOCUMENT',
  CHAT_CHANNEL = 'CHAT_CHANNEL',
  REPOSITORY = 'REPOSITORY',
  ON_CALL = 'ON_CALL',
  PROJECT = 'PROJECT',
  DASHBOARD = 'DASHBOARD',
}

// TODO COMPASS-1121: populate this Set with relevant field definitions queried from backend
export const FIELDS = new Set<string>();

export const LINKS = new Set<string>([
  Values.DOCUMENT,
  Values.CHAT_CHANNEL,
  Values.REPOSITORY,
  Values.PROJECT,
  Values.ON_CALL,
  Values.DASHBOARD,
]);

export const OPTIONS: OptionType[] = [
  {
    label: 'Owner',
    value: Values.OWNER,
  },
  {
    label: 'Description',
    value: Values.DESCRIPTION,
  },
  {
    label: 'Documentation',
    value: Values.DOCUMENT,
  },
  {
    label: 'Chat channel',
    value: Values.CHAT_CHANNEL,
  },
  {
    label: 'Repository',
    value: Values.REPOSITORY,
  },
  {
    label: 'Project',
    value: Values.PROJECT,
  },
  {
    label: 'On-call',
    value: Values.ON_CALL,
  },
  {
    label: 'Dashboard',
    value: Values.DASHBOARD,
  },
];
