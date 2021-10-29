import type { AppCloudCapability } from '../../../types';

import type { CloudLinkValue } from './types';

export const getCloudLinkValue = ({
  hasCloudVersion,
  hasFeatureDifferences,
  featureDifferencesUrl,
  cloudVersionDevelopmentRoadmap,
}: {
  hasCloudVersion: boolean;
  hasFeatureDifferences: AppCloudCapability;
  featureDifferencesUrl?: string;
  cloudVersionDevelopmentRoadmap?: string;
}): CloudLinkValue => {
  if (!hasCloudVersion) {
    return 'None';
  }
  switch (hasFeatureDifferences) {
    case 'no':
      return 'Listing';
    case 'yes':
      if (featureDifferencesUrl) {
        return 'Differences';
      } else if (cloudVersionDevelopmentRoadmap) {
        return 'Roadmap';
      }
      return 'Listing';
    default:
      return 'ContactVendor';
  }
};
