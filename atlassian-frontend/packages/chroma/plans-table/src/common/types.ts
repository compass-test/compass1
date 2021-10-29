import { FormattedMessage } from 'react-intl';

export type SupportedProduct =
  | 'confluence'
  | 'jira-software'
  | 'jira-servicedesk';

export enum Plan {
  FREE = 'free',
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

type FeaturesTitleSubtitleString = {
  title: FormattedMessage.MessageDescriptor;
  subTitle: FormattedMessage.MessageDescriptor;
};

type FeaturesEditionValue =
  | FeaturesTitleSubtitleString
  | boolean
  | FormattedMessage.MessageDescriptor;

export type Feature = {
  key: string;
  name: FormattedMessage.MessageDescriptor;
  lozenge?: FormattedMessage.MessageDescriptor;
  free: FeaturesEditionValue;
  standard: FeaturesEditionValue;
  premium: FeaturesEditionValue;
};

export type Category = {
  key: string;
  name: FormattedMessage.MessageDescriptor;
};

export type TableItem = Feature | Category;

export type Features = {
  [key in SupportedProduct]: TableItem[];
};

export const ANALYTICS_SOURCE_NAME = 'plansTablesPackage';

export enum OriginProduct {
  ADMINHUB = 'admin',
  BITBUCKET = 'bitbucket',
  CONFLUENCE = 'confluence',
  JIRA_CORE = 'jira-core',
  JIRA_SERVICE_DESK = 'jira-servicedesk',
  JIRA_SOFTWARE = 'jira-software',
  JIRA_FAMILY = 'jira',
  TRELLO = 'trello',
  OPSGENIE = 'opsgenie',
  STATUSPAGE = 'statuspage',
  START = 'start',
}
