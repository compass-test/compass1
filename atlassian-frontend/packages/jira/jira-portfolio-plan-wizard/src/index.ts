/**
 * Jfe types override
 */

export type { Dispatch, SetStateAction } from 'react';

type MessageDescriptor = {
  [key: string]: any;
  id: string;
  default: string;
};

export type InjectedIntl = {
  formatDate: (value: any, options?: Object) => string;
  formatTime: (value: any, options?: Object) => string;
  formatRelative: (value: any, options?: Object) => string;
  formatNumber: (value: any, options?: Object) => string;
  formatPlural: (value: any, options?: Object) => string;
  formatMessage: (
    messageDescriptor: MessageDescriptor,
    values?: Object,
  ) => string;
  formatHTMLMessage: (
    messageDescriptor: MessageDescriptor,
    values?: Object,
  ) => string;
};

/**
 * END: Jfe types override
 */

export type {
  API,
  Board,
  FeatureFlags,
  Filter,
  Issue,
  IssueSource,
  Plan,
  Project,
  PlanUpdate,
  Team,
  OptionType,
} from './common/types';
export {
  default,
  IssueSourcesSettingsPage,
  SetExclusionRulesSettingsPage,
  RemovedIssuesSettingsPage,
  ProjectOverLimitPage,
} from './ui';
export type {
  TeamPickerComponent,
  TeamPickerProps,
  IssueSourcesSettingsPageProps,
  SetExclusionRulesSettingsPageProps,
} from './ui';
export { APIProvider } from './controllers/api';
export { FeatureFlagsProvider } from './controllers/feature-flags';
export { ANALYTICS_BRIDGE_CHANNEL } from './common/constants/analytics';
