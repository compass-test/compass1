import { parse as parseAri } from '@atlassian/cs-ari';

const BASE_URL = `${window.location.origin}/compass`;

export const mapAriToPublicId = (serviceAri: string): string => {
  return serviceAri.startsWith('b:')
    ? serviceAri
    : `b:${window.btoa(serviceAri)}`;
};

export const mapPublicIdToAri = (publicId: string): string => {
  return publicId.startsWith('ari')
    ? publicId
    : window.atob(publicId.split('b:')[1]);
};

export const ariToUrlParam = (serviceAri: string): string =>
  encodeURIComponent(
    serviceAri.startsWith('b:') ? serviceAri : mapAriToPublicId(serviceAri),
  );

export const decodeUrlParamToAri = (encoded: string): string | undefined => {
  try {
    return window.atob(decodeURIComponent(encoded).slice(2));
  } catch (e) {
    return undefined;
  }
};

export const getComponentLinkUrl = (componentId: string) =>
  `${BASE_URL}/component/${componentId}`;

export const getAppConfigUrl = (extensionId: string) =>
  `${BASE_URL}/settings/apps/${ariToUrlParam(extensionId)}`;

export const getTeamDashboardUrl = (teamId: string): string => {
  if (teamId.startsWith('ari')) {
    teamId = parseAri(teamId).resourceId ?? '';
  }
  return `${BASE_URL}/people/team/${teamId}`;
};
