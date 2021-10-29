import { integrationsKeys } from '../../common/constants';

import { UserSegmentationDataMapping } from './types';

const softwareDevelopment = [
  integrationsKeys.SLACK,
  integrationsKeys.MICROSOFT_TEAMS,
  integrationsKeys.GITHUB,
  integrationsKeys.GITLAB,
  integrationsKeys.CIRCLECI,
  integrationsKeys.ZENDESK,
  integrationsKeys.GOOGLE_SHEETS,
  integrationsKeys.SENTRY,
  integrationsKeys.JENKINS,
];

const itAndCustomerSupport = [
  integrationsKeys.SLACK,
  integrationsKeys.MICROSOFT_TEAMS,
  integrationsKeys.GITHUB,
  integrationsKeys.GITLAB,
  integrationsKeys.ZENDESK,
  integrationsKeys.HALP,
  integrationsKeys.MINDVILLE,
  integrationsKeys.ZOOM,
  integrationsKeys.CIRCLECI,
];

const businessManagementAndOps = [
  integrationsKeys.SLACK,
  integrationsKeys.MICROSOFT_TEAMS,
  integrationsKeys.MICROSOFT_OUTLOOK,
  integrationsKeys.ZENDESK,
  integrationsKeys.GOOGLE_SHEETS,
  integrationsKeys.ZOOM,
  integrationsKeys.CIRCLECI,
  integrationsKeys.ZEPLIN,
  integrationsKeys.FIGMA,
];

export const userSegmentationDataMapping: UserSegmentationDataMapping = {
  'Software Development': softwareDevelopment,
  'IT Support': itAndCustomerSupport,
  'Customer Service': itAndCustomerSupport,
  Sales: itAndCustomerSupport,
  Operations: businessManagementAndOps,
  Marketing: businessManagementAndOps,
  Finance: businessManagementAndOps,
  Legal: businessManagementAndOps,
  Other: businessManagementAndOps,
};

export const defaultIntegrationKeys = [
  integrationsKeys.SLACK,
  integrationsKeys.MICROSOFT_TEAMS,
  integrationsKeys.GITHUB,
  integrationsKeys.GITLAB,
  integrationsKeys.ZENDESK,
  integrationsKeys.GOOGLE_SHEETS,
  integrationsKeys.CIRCLECI,
  integrationsKeys.SENTRY,
  integrationsKeys.JENKINS,
];

export const MAX_INTEGRATION_KEYS = 6;
export const AT_LEAST_ONE_KEY_IS_REQUIRED_ERROR_MESSAGE =
  'At least one integration key is required.';
