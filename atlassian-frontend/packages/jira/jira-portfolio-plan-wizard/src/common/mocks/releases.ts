import times from 'lodash/fp/times';

import { Release } from '../../common/types';

export const releases: Release[] = [
  {
    projectId: 1,
    start: '15/04/2020',
    userEndDate: '16/May/2020',
    name: 'Mvp',
  },
  {
    projectId: 1,
    userEndDate: '16/May/2020',
    name: 'First iteration',
    archived: true,
  },
  {
    projectId: 1,
    userStartDate: '10/May/2020',
    userEndDate: '20/Dec/2020',
    released: true,
    name: 'Bug fix',
  },
  {
    projectId: 1,
    userEndDate: '16/May/2020',
    id: '10108',
    name: 'Clean up',
  },
  {
    projectId: 2,
    id: '10200',
    name: 'Big fix',
  },
  {
    projectId: 2,
    userEndDate: '16/May/2020',
    name: 'Tech debt',
  },
  {
    projectId: 2,
    name: 'Version 2.0',
    userEndDate: '16/May/2020',
  },
  {
    projectId: 2,
    released: true,
    name: 'Version 3.0',
  },
  {
    projectId: 3,
    userStartDate: '10/May/2020',
    userEndDate: '20/Dec/2020',
    released: true,
    name: 'Version Final',
  },
  {
    projects: 3,
    start: '12/Mar/2020',
    userStartDate: '05/Jan/2020',
    userEndDate: '15/Jun/2020',
    name: 'Release 2.0',
  },
  {
    projects: 4,
    userEndDate: '16/May/2020',
    name: 'Launch',
  },
  // Fill project #2 for testing long list
  ...times(
    (index) => ({
      projects: 2,
      userStartDate: index % 3 ? undefined : '16/May/2020',
      userEndDate: index % 2 ? undefined : '23/08/2020',
      startDate: index % 4 ? undefined : '10/02/2020',
      released: index % 2 === 0,
    }),
    50,
  ),
].map((version, index) => ({
  name: `Version ${index}.0`,
  released: false,
  projectId: 1,
  ...version,
  id: String(index),
}));

export function buildRelease(payload?: Partial<Release>): Release {
  return Object.assign(releases[0], payload);
}
