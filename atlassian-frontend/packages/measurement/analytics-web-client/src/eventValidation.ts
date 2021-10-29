import {
  desktopPlatforms,
  eventType,
  isType,
  objectValues,
  originType,
  platformType,
  userType,
  webPlatforms,
} from './analyticsWebTypes';
import { ProductInfoType } from './types';
import { isPlainObject } from './util/object-utils';

const actionEventTypes = Object.freeze([
  eventType.OPERATIONAL,
  eventType.TRACK,
  eventType.UI,
]);

export function validateContainersObject(container: any) {
  if (!isPlainObject(container)) {
    throw new Error('properties.containers must be an Object');
  }

  if (!('id' in container)) {
    throw new Error("properties.containers is missing field 'id'");
  }

  if (typeof container.id !== 'string') {
    throw new Error('properties.containers.id must be of type String');
  }

  if ('type' in container && typeof container.type !== 'string') {
    throw new Error('properties.containers.type must be of type String');
  }
}

// the validation logic is documented here
// https://hello.atlassian.net/wiki/spaces/MEASURE/pages/545900273/Validating+containers+object
export function validateContainers(containers: any) {
  if (!containers) {
    return;
  }

  if (containers && containers.constructor !== Object) {
    throw new Error('properties.containers must be an Object');
  }

  Object.values(containers).forEach((container) => validateContainersObject(container),);
}

export function isActionEventType(type: string): boolean {
  switch (type) {
    case eventType.OPERATIONAL:
    case eventType.TRACK:
    case eventType.UI:
      return true;
    default:
      return false;
  }
}

export function validateActionEventType(type: string) {
  if (!isActionEventType(type)) {
    throw new Error(
      `Invalid action event type: ${type}, must be one of: [${actionEventTypes}]`,
    );
  }
  return true;
}

export function validateActionEvent(event: any) {
  if (!event) {
    throw new Error('Missing event');
  }

  if (!event.source) {
    throw new Error('Missing event.source');
  }

  if (!event.actionSubject) {
    throw new Error('Missing event.actionSubject');
  }

  if (!event.action) {
    throw new Error('Missing event.action');
  }

  validateContainers(event.containers);
}

export function validateScreenEvent(name: string) {
  if (!name) {
    throw new Error('Missing name');
  }
}

export function validateTrackEvent(event: any) {
  validateActionEvent(event);
}

export function validateDwellBaseEvent(event: any) {
  if (!event) {
    throw new Error('Missing event');
  }

  if (!event.source) {
    throw new Error('Missing event.source');
  }

  if (!event.actionSubject) {
    throw new Error('Missing event.actionSubject');
  }
}

export function validateUIEvent(event: any) {
  validateActionEvent(event);
}

export function validateOperationalEvent(event: any) {
  validateActionEvent(event);
}

export function validateIdentifyEvent(userIdType: string, userId: string) {
  if (!userIdType) {
    throw new Error('Missing userIdType');
  }

  if (!userId) {
    throw new Error('Missing userId');
  }

  if (!isType(userType, userIdType)) {
    throw new Error(
      `Invalid userIdType '${userIdType}', `
        + `must be an userType: [${objectValues(userType)}]`,
    );
  }
}

export function validatePlatform(productInfo: ProductInfoType) {
  if (!isType(platformType, productInfo.platform)) {
    throw new Error(
      `Invalid productInfo.platform '${productInfo.platform}', `
        + `must be a platformType: [${objectValues(platformType)}]`,
    );
  }

  if (
    productInfo.origin === originType.DESKTOP
    && !isType(desktopPlatforms, productInfo.platform)
  ) {
    throw new Error(
      `Invalid productInfo.platform '${productInfo.platform}', `
        + 'must be one of [mac, linux, windows]',
    );
  }

  if (
    productInfo.origin === originType.WEB
    && !isType(webPlatforms, productInfo.platform)
  ) {
    throw new Error(
      `Invalid productInfo.platform '${productInfo.platform}', must be one of [web, mobileWeb]`,
    );
  }
}
