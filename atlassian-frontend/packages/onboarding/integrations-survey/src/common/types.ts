import { AnalyticsAttributes } from '@atlassian/analytics-bridge';

export type Integration = {
  name: string;
  fullName: string;
  imgSrc: string;
  isConnect?: boolean;
};

export type Integrations = {
  [key: string]: Integration;
};

export type IntegrationData = {
  key: string;
  installed?: boolean;
  requested?: boolean;
};

export type IntegrationsDataMap = {
  [key: string]: IntegrationData;
};

export type IntegrationsData = IntegrationData[];

export type IntegrationInstallStatusResponse = {
  key: string;
  installed?: boolean;
};

export type IntegrationInstallStatusMap = {
  [key: string]: IntegrationInstallStatusResponse;
};

// We are copying this type from analytics-bridge as they are not exported.
export interface ImperativeAnalyticsData {
  actionSubject?: string;
  action?: string;
  actionSubjectId?: string;
  attributes?: AnalyticsAttributes;
}
