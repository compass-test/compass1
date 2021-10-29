import type { CloudSite } from './types';

export const cloudSiteToOption = (site: CloudSite) => {
  return { data: site, label: site.cloudUrl, value: site.cloudId };
};

export const isSelectedFreeCloudSite = (
  selectedCloudSite?: CloudSite,
): boolean => {
  if (!selectedCloudSite) {
    return false;
  }
  return selectedCloudSite.edition === 'free';
};
