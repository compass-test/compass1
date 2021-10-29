// These types have been converted from frozen objects to enums.
// We cannot change their name, or even capitalise them without breaking API.
export enum envType {
  LOCAL = 'local',
  DEV = 'dev',
  STAGING = 'staging',
  PROD = 'prod',
}

export enum eventType {
  TRACK = 'track',
  UI = 'ui',
  OPERATIONAL = 'operational',
  SCREEN = 'screen',
  IDENTIFY = 'identify',
}

export enum platformType {
  MAC = 'mac',
  LINUX = 'linux',
  WINDOWS = 'windows',
  /**
   *  @deprecated desktop is here for retrocompatibility, please select one of the above OS instead.
   */
  DESKTOP = 'desktop',
  WEB = 'web',
  MOBILE_WEB = 'mobileWeb',
}

export enum originType{
  DESKTOP = 'desktop',
  WEB = 'web',
}

export enum tenantType {
  CLOUD_ID = 'cloudId',
  ORG_ID = 'orgId',
  OPSGENIE_CUSTOMER_ID = 'opsgenieCustomerId',
  NONE = 'none',
}

export enum userType {
  ATLASSIAN_ACCOUNT = 'atlassianAccount',
  HASHED_EMAIL = 'hashedEmail',
  TRELLO = 'trello',
  OPSGENIE = 'opsgenie',
  HALP = 'halp',
}

export enum apdexType {
  TRANSITION = 'transition',
  INITIAL_LOAD = 'initialLoad',
}

export const desktopPlatforms = Object.freeze([
  platformType.DESKTOP,
  platformType.MAC,
  platformType.LINUX,
  platformType.WINDOWS,
]);

export const webPlatforms = Object.freeze([
  platformType.WEB,
  platformType.MOBILE_WEB,
]);

export enum originTracingType {
  ATL_ORIGIN = 'atlOrigin',
}

export function objectValues(object: object) {
  return Object.values(object);
}

export function isType(type: object, value: any) {
  return Object.values(type).indexOf(value) > -1;
}
