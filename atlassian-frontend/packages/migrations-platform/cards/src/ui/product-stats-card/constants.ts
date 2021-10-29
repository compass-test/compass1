import type { ProductFamilyKey, ProductKey } from './types';

type ProductConstants = {
  containersUnit: string;
  familyKey: ProductFamilyKey;
  name: string;
  objectsUnit: string;
  objectsUnitPlural?: string;
};

export const productConstants: Record<ProductKey, ProductConstants> = {
  'jira-server': {
    name: 'Jira',
    containersUnit: 'project',
    objectsUnit: 'issue',
    familyKey: 'jira',
  },
  'confluence-server': {
    name: 'Confluence',
    containersUnit: 'space',
    objectsUnit: 'page',
    familyKey: 'confluence',
  },
  'bitbucket-server': {
    name: 'Bitbucket',
    containersUnit: 'project',
    objectsUnit: 'repository',
    objectsUnitPlural: 'repositories',
    familyKey: 'bitbucket',
  },
};
