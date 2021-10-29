import { Variable } from '@atlassian/pipelines-variables';

export const variables: Variable[] = [
  {
    uuid: 'var-1',
    key: 'FOO',
    value: 'FOO',
    secured: false,
    isSyncing: false,
  },
  {
    uuid: 'var-2',
    key: 'BAR',
    value: 'BAR',
    secured: false,
    isSyncing: false,
  },
  {
    uuid: 'var-3',
    key: 'BAZ',
    value: 'BAZ',
    secured: true,
    isSyncing: false,
  },
];
