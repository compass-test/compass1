import {
  CohortType,
  Diff,
  Environment,
  Percentile,
  Product,
  ProductType,
} from './types';

export const PRODUCTS: Array<Product> = [
  { id: ProductType.JIRA, name: 'Jira' },
  { id: ProductType.CONFLUENCE, name: 'Confluence' },
  { id: ProductType.OPSGENIE, name: 'Opsgenie' },
  { id: ProductType.WATERMELON, name: 'Team Central' },
  { id: ProductType.COMPASS, name: 'Compass' },
  { id: ProductType.ADMIN, name: 'AdminHub' },
  { id: ProductType.DAC, name: 'Developer.A.C' },
  { id: ProductType.PERFORMANCE_PORTAL, name: 'Performance Portal' },
];

export const DIFF_THRESHOLD: Diff = {
  absoluteDiff: 100,
  percentageDiff: 2,
  smallValuePercentageDiff: 25,
  smallValueMax: 100,
};

export const NOT_APPLICABLE = `---`;

export const COHORT_TYPE_LABELS = {
  [CohortType.ALL]: 'none',
  [CohortType.REGION]: 'regions',
  [CohortType.ENTERPRISE]: 'enterprise',
  [CohortType.INSTANCE_SIZE]: 'instance size',
  [CohortType.BROWSER]: 'browser',
  [CohortType.JSM_ENTERPRISE]: 'enterprise (JSM definition)',
  [CohortType.ENABLED_USERS]: 'enabled users',
  [CohortType.OS]: 'OS',
  [CohortType.CPU]: 'CPU cores',
  [CohortType.MIGRATION_READINESS]: 'migration readiness',
};

export const ENVIRONMENT_OPTIONS = [
  {
    label: 'production',
    value: Environment.PROD,
  },
  {
    label: 'staging',
    value: Environment.STAGING,
  },
  {
    label: 'dev',
    value: Environment.DEV,
  },
];

export const PERCENTILE_OPTIONS = [
  {
    label: 'p50',
    value: Percentile.p50,
  },
  {
    label: 'p75',
    value: Percentile.p75,
  },
  {
    label: 'p90',
    value: Percentile.p90,
  },
];
