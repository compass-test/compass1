import { Filter } from '../../common/types';

export function buildFilter(payload?: Partial<Filter>): Filter {
  return Object.assign(
    {
      id: 0,
      name: 'LAZY Filter',
      hasNextGenProjects: false,
    },
    payload,
  );
}

export const filters: Filter[] = [
  buildFilter({
    id: 2,
    name: 'LAZY Filter',
  }),
  buildFilter({
    id: 3,
    name: 'SUPER_LAZY Filter',
  }),
  buildFilter({
    id: 5,
    name: 'SIMPLE Filter',
  }),
  buildFilter({
    id: 6,
    name: 'COMPLEX Filter',
  }),
  buildFilter({
    id: 7,
    name: 'SOME Filter',
  }),
  buildFilter({
    id: 8,
    name: 'TEAM-MANAGED Filter',
    hasNextGenProjects: false,
  }),
];
