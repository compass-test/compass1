import type { AppCloudCapability, AssessmentApp } from '../../../common/types';

import type { CloudLinkValue } from './app-has-cloud-value';

export const MIGRATION_STATUS_PRIORITY: AssessmentApp['migrationStatus'][] = [
  'Needed',
  'NotNeeded',
  'Alternative',
  'Unassigned',
];

export const CLOUD_LINK_PRIORIRY: CloudLinkValue[] = [
  'None',
  'ContactVendor',
  'Differences',
  'Roadmap',
  'Listing',
];

export const CAN_BE_MIGRATED_PRIORITY: AppCloudCapability[] = [
  'yes',
  'install_only',
  'upgrade',
  'manual',
  'unknown',
  'discarded',
  'no',
];
