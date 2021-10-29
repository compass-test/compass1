import { useMemo } from 'react';

import { Product, ProductTourKey, UrlData } from '../../types';

const { Welcome, ChangeManagement, IncidentManagement } = ProductTourKey;

// Url to restart the tour.
const getTourResetUrl = (
  { projectId, serviceDeskBaseUrl }: UrlData,
  tourKey: ProductTourKey,
) =>
  ({
    [Welcome]: `${serviceDeskBaseUrl}/rest/servicedesk/onboarding/1/your-coach/reset-tour/${projectId}/fsf-project-tour`,
    [ChangeManagement]: `${serviceDeskBaseUrl}/rest/servicedesk/onboarding/1/your-coach/reset-tour/${projectId}/change-management`,
    [IncidentManagement]: `${serviceDeskBaseUrl}/rest/servicedesk/onboarding/1/your-coach/reset-tour/${projectId}/incident-management`,
  }[tourKey]);

export const useTourReset = (urlData: UrlData, tourKey: ProductTourKey) => {
  return useMemo(
    () => () => {
      const url = getTourResetUrl(urlData, tourKey);
      const { product } = urlData;

      product === Product.Opsgenie
        ? window.open(url, '_blank')
        : window.location.assign(url);
    },
    [urlData, tourKey],
  );
};
