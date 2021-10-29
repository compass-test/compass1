import { eventType } from './analyticsWebTypes';
import {
  Context,
  InternalProductInfoType,
} from './types';
import { isPlainObject } from './util/object-utils';

const libraryVersion = process.env._PACKAGE_VERSION_ as string;

function buildTenantFields(tenantInfo: any) {
  return {
    tenantIdType: tenantInfo.tenantIdType,
    tenantId: tenantInfo.tenantId,
  };
}

function buildUserFields(userInfo: any) {
  return {
    userIdType: userInfo.userIdType,
  };
}

function buildOrgFields(orgInfo: any) {
  return {
    orgId: orgInfo.orgId,
  };
}

function getProductField(field: any, override: any) {
  return override === undefined ? field : override;
}

function buildProductFields(productInfo: InternalProductInfoType, productOverrides?: Partial<InternalProductInfoType>) {
  const overrides = productOverrides || {};
  const env = getProductField(productInfo.env, overrides.env);
  const product = getProductField(productInfo.product, overrides.product);
  const subproduct = getProductField(
    productInfo.subproduct(),
    overrides.subproduct,
  );
  const version = getProductField(productInfo.version, overrides.version);
  const origin = getProductField(productInfo.origin, overrides.origin);
  const platform = getProductField(productInfo.platform, overrides.platform);

  return {
    env,
    product,
    subproduct,
    version,
    origin,
    platform,
  };
}

function isNotEmptyObject(obj: any) {
  return isPlainObject(obj) && Object.keys(obj).length > 0;
}

function buildAttributesWithName(name: any, attrObject: any) {
  return isNotEmptyObject(attrObject) ? { [name]: attrObject } : undefined;
}

function buildAttributes(attributes: any) {
  return buildAttributesWithName('attributes', attributes);
}

export function filterAndBuildContainers(containers: any) {
  const validContainers: any = {};

  Object.keys(containers).forEach((key) => {
    const value = containers[key];
    validContainers[key] = {
      id: value.id,
      type: value.type,
    };
  });

  return validContainers;
}

export function buildContainersWithName(containers: any) {
  if (isNotEmptyObject(containers)) {
    const validContainers = filterAndBuildContainers(containers);
    return buildAttributesWithName('containers', validContainers);
  }
  return undefined;
}

export function buildActionFields(event: any, actionEventType: any) {
  return {
    containerType: event.containerType,
    containerId: event.containerId,
    source: event.source,
    objectType: event.objectType,
    objectId: event.objectId,
    actionSubject: event.actionSubject,
    action: event.action,
    actionSubjectId: event.actionSubjectId,
    attributes: event.attributes,
    nonPrivacySafeAttributes: event.nonPrivacySafeAttributes,
    tags: event.tags,
    highPriority: event.highPriority,
    eventType: actionEventType,
    ...buildContainersWithName(event.containers),
  };
}

function buildNonPrivacySafeAttributes(nonPrivacySafeAttributes: any) {
  return buildAttributesWithName(
    'nonPrivacySafeAttributes',
    nonPrivacySafeAttributes,
  );
}

export function buildScreenEvent(
  productInfo: InternalProductInfoType,
  tenantInfo: any,
  userInfo: any,
  attributes: any,
  nonPrivacySafeAttributes: any,
  tags: any,
  tabId: any,
  sessionId: any,
  taskSessions: any,
  orgInfo: any,
  pageLoadId: string,
  containers?: any,
) {
  const productFields = buildProductFields(productInfo);
  const tenantFields = buildTenantFields(tenantInfo);
  const userFields = buildUserFields(userInfo);
  const orgFields = buildOrgFields(orgInfo);
  const overrides = {
    title: '',
    path: '',
    url: '',
    referrer: '',
    search: '',

    eventType: eventType.SCREEN,
  };

  return {
    ...productFields,
    ...tenantFields,
    ...userFields,
    ...orgFields,
    ...overrides,
    ...buildAttributes(attributes),
    ...buildNonPrivacySafeAttributes(nonPrivacySafeAttributes),
    ...buildContainersWithName(containers),
    tags,
    tabId,
    sessionId,
    taskSessions,
    pageLoadId
  };
}

export function buildActionName(event: any) {
  return `${event.actionSubject} ${event.action}`;
}

export function buildContext(productInfo: InternalProductInfoType): Context {
  const screen = window.screen || {};

  return {
    context: {
      locale: productInfo.locale,
      screen: {
        width: screen.width,
        height: screen.height,
        density: window.devicePixelRatio,
      },
      library: {
        name: 'analytics.js',
        version: libraryVersion,
      },
    },
  };
}

export function extractProductOverrides(event: any): Partial<InternalProductInfoType> {
  const {
    env, product, subproduct, version, origin, platform,
  } = event;
  return {
    env,
    product,
    subproduct,
    version,
    origin,
    platform,
  };
}

export function buildActionEvent(
  productInfo: InternalProductInfoType,
  tenantInfo: any,
  userInfo: any,
  event: any,
  actionEventType: any,
  tabId: any,
  sessionId: any,
  taskSessions: any,
  orgInfo: any,
  pageLoadId: string,
) {
  const productFields = buildProductFields(
    productInfo,
    extractProductOverrides(event),
  );
  const tenantFields = buildTenantFields(tenantInfo);
  const orgFields = buildOrgFields(orgInfo);
  const userFields = buildUserFields(userInfo);
  const actionFields = buildActionFields(event, actionEventType);

  return {
    ...productFields,
    ...tenantFields,
    ...orgFields,
    ...userFields,
    ...actionFields,
    tabId,
    sessionId,
    taskSessions,
    pageLoadId
  };
}
