import merge from 'lodash/merge';
import uniq from 'lodash/uniq';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import {
  TRACK_ERROR,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  UI_EVENT_TYPE,
} from './util';
import last from 'lodash/last';

export const extractFromEventContext = (
  propertyNames: string[],
  event: UIAnalyticsEvent,
) =>
  event.context
    .reduce((acc: any[], contextItem: any) => {
      propertyNames.forEach((propertyName) => {
        acc.push(contextItem[propertyName]);
      });
      return acc;
    }, [])
    .filter(Boolean);

export const extractFromEventPayload = (
  propertyName: string,
  event: UIAnalyticsEvent,
) => event.payload[propertyName];

const formatActionSubjectId = (name: string, actionSubject: string) =>
  `${name}${actionSubject[0].toUpperCase()}${actionSubject.substring(1)}`;

export const getActionSubjectIdForEventType = (
  event: UIAnalyticsEvent,
  analyticsType: string,
  actionSubject: string,
) => {
  const name = getName(event);

  // for UI and operational events, the actionSubjectId is generated
  // but for operational events name is optional, since it doesnt always make sense.
  // Consider a high level component BespokeComponent. If this fires an internal event
  // The unique instance of the component is likely to be BespokeComponent (ie there is 1)
  // so if name wasn't optional we would end up with actionSubjectId=bespokeComponentBespokeComponent
  if (analyticsType === OPERATIONAL_EVENT_TYPE) {
    return name ? formatActionSubjectId(name, actionSubject) : actionSubject;
  }
  if (analyticsType === UI_EVENT_TYPE) {
    return formatActionSubjectId(name, actionSubject);
  }

  return getActionSubjectId(event);
};

export const extractFromPayloadOrContext = (
  propertyName: string,
  event: UIAnalyticsEvent,
) => {
  const payloadProp = extractFromEventPayload(propertyName, event);
  const contextProps = extractFromEventContext([propertyName], event);
  return payloadProp ? contextProps.concat(payloadProp) : contextProps;
};

export const extractPayloadAttributes = (event: UIAnalyticsEvent) => {
  const {
    tags,
    actionSubject,
    actionSubjectId,
    containerType,
    containerId,
    objectType,
    objectId,
    analyticsType,
    name,
    action,
    ...attributes
  } = event.payload;

  return attributes;
};

export const getComponents = (event: UIAnalyticsEvent) =>
  /*
    Temporary using 'component' and 'componentName' fields.
    This should be replaced with 'componentName' only once we bump all the ak components.
    */
  extractFromEventContext(['component', 'componentName'], event);

export const getActionSubjects = (event: UIAnalyticsEvent) =>
  extractFromPayloadOrContext('actionSubject', event);

export const getSources = (event: UIAnalyticsEvent) =>
  extractFromEventContext(['source'], event);

export const getAttributes = (event: UIAnalyticsEvent) =>
  merge(
    extractFromEventContext(['attributes'], event).reduce(
      (result, extraAttributes) => merge(result, extraAttributes),
      {},
    ),
    extractPayloadAttributes(event),
  );

export const getTags = (event: UIAnalyticsEvent) => {
  const tags = uniq(
    extractFromEventContext(['tags'], event)
      .reduce((result, extraTags) => result.concat(extraTags), [])
      .concat(extractFromEventPayload('tags', event))
      .filter(Boolean),
  );
  return tags.length > 0 ? tags : undefined;
};

export const getContainerTypes = (event: UIAnalyticsEvent) =>
  extractFromPayloadOrContext('containerType', event);

export const getContainerIds = (event: UIAnalyticsEvent) =>
  extractFromPayloadOrContext('containerId', event);

export const getObjectTypes = (event: UIAnalyticsEvent) =>
  extractFromPayloadOrContext('objectType', event);

export const getObjectIds = (event: UIAnalyticsEvent) =>
  extractFromPayloadOrContext('objectId', event);

// singluar extractors

export const getActionSubjectId = (event: UIAnalyticsEvent) =>
  extractFromEventPayload('actionSubjectId', event);

export const getAnalyticsType = (event: UIAnalyticsEvent) =>
  extractFromEventPayload('analyticsType', event);

export const getName = (event: UIAnalyticsEvent) =>
  extractFromEventPayload('name', event);

export const getAction = (event: UIAnalyticsEvent) =>
  extractFromEventPayload('action', event);

export const getActionSubjectForEventType = (
  event: UIAnalyticsEvent,
  analyticsType: string,
) => {
  if (analyticsType === TRACK_EVENT_TYPE || analyticsType === TRACK_ERROR) {
    return last(getActionSubjects(event));
  }
  return last(getComponents(event)) || last(getActionSubjects(event));
};
