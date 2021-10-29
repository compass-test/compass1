import {
  EventType,
  ProductType,
  ToplineGoalType,
} from '@atlassian/performance-portal-common';

import type {
  BrowserMetricEventType,
  PageLoadToplineType,
  Product,
  ToplineAggregation,
} from './ui/metric-editor-modal/metric-editor-fields/__generated__/metricEditorFieldsFragment.graphql';

export type MetricType = {
  eventType: EventType;
  eventKey: string;
  product: ProductType;
  id: string;
  key: string;
  name: string;
  slackChannel: string;
  owner: {
    id: string;
    teamName: string;
  };
  toplineGoals: ToplineGoalType[];
};
export enum MutationMode {
  NEW = 'new',
  EDIT = 'edit',
}

export type ProductOptionType = {
  label: string;
  value: ProductType;
};

export type EventOptionType = {
  label: string;
  value: EventType;
};

export type MetricFormData = {
  'event-type': BrowserMetricEventType;
  'metric-name': string;
  'slack-channel': string;
  'team-id': string;
  'event-id': string;
  product: Product;
  goals: MetricFormData_Goals[];
};

export type MetricFormData_Goals = {
  id?: string;
  name: string;
  value: number;
  percentile: ToplineAggregation;
  toplineType: PageLoadToplineType;
  isDeleted: boolean;
};
