// Copied from xflow-ui. We post raw analytics events (context and payload only) from xflow-ui to consumer (CFE), transform on consumer and post to gasv3.

import {
  UI_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  DEFAULT_SOURCE,
} from '@atlaskit/analytics-gas-types';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

import { GasV3Payload, AnalyticsContext, AnalyticsPayload } from '../lib/types';

type Context = UIAnalyticsEvent['context'];

const GROWTH_TAG = 'growth';

const extractFromEventContext = (
  propertyNames: string[],
  context: Context,
): string[] =>
  context
    .reduce((acc: string[], contextItem) => {
      propertyNames.forEach((propertyName) => {
        const navContextProp: string = contextItem
          ? contextItem[propertyName]
          : null;
        acc.push(navContextProp || contextItem[propertyName]);
      });
      return acc;
    }, [])
    .filter(Boolean);

const getSources = (context: Context) =>
  extractFromEventContext(['source'], context);

const getExtraAttributes = (context: Context) =>
  context.reduce((ans, { attributes, ...contextProps }) => {
    const newAttributes = {
      ...ans,
      ...contextProps,
    };
    return attributes ? { ...newAttributes, ...attributes } : newAttributes;
  }, {});

const getPackageInfo = (context: Context) =>
  context
    .map((contextItem) => ({
      packageName: contextItem.packageName,
      packageVersion: contextItem.packageVersion,
    }))
    .filter((p) => p.packageName);

const last = <T>(values: T[]) => values[values.length - 1];

export const transformEvent = (event: {
  context: AnalyticsContext;
  payload: AnalyticsPayload;
}): GasV3Payload | null => {
  const { context, payload } = event;
  if (!payload) {
    return null;
  }
  const sources = getSources(context);
  const source = last(sources) || DEFAULT_SOURCE;
  const extraAttributes = getExtraAttributes(context);
  const { packageName = undefined, packageVersion = undefined } =
    last(getPackageInfo(context)) || {};
  const {
    eventType = UI_EVENT_TYPE,
    action,
    actionSubject,
    actionSubjectId,
    attributes: payloadAttributes,
    name,
  } = payload;
  const attributes = {
    packageName,
    packageVersion,
    ...extraAttributes,
    ...payloadAttributes,
  };

  const tags = payload.tags || [];
  tags.push(GROWTH_TAG);

  switch (eventType) {
    case UI_EVENT_TYPE:
    case OPERATIONAL_EVENT_TYPE:
    case TRACK_EVENT_TYPE:
      return {
        eventType,
        source,
        actionSubject,
        action,
        actionSubjectId,
        attributes,
        tags: tags.slice(0),
      };
    case SCREEN_EVENT_TYPE:
      return {
        eventType,
        name,
        attributes,
        source,
        tags: tags.slice(0),
      };
    default:
      break;
  }

  return null;
};
