/**
 * Note: this file was introduced as part of AFP migration in order to remove the @atlassian/analytics-web-react dependency
 * For historical context of the code, consider looking into https://bitbucket.org/atlassian/analytics-web-react/src/v0.0.34/
 */
import {
  withAnalyticsEvents,
  UIAnalyticsEvent,
  AnalyticsContext,
  withAnalyticsContext,
} from '@atlaskit/analytics-next';
import React, { ComponentType, Component } from 'react';
import pickBy from 'lodash/pickBy';
import last from 'lodash/last';
import {
  getSources,
  getAction,
  getAnalyticsType,
  getActionSubjectIdForEventType,
  getActionSubjectForEventType,
  getContainerIds,
  getContainerTypes,
  getObjectIds,
  getObjectTypes,
  getTags,
  getAttributes,
} from './extract-data-from-event';

export const PROJECT_PAGES_CHANNEL = 'project-pages';

interface Callbacks<Props> {
  [prop: string]: string;
}

interface ProvidedProps {
  [key: string]: string | Function;
}

interface StructuredAnalytics {
  type?: string;
  payload: any;
}

const map = (props: Callbacks<Object>) =>
  Object.keys(props).reduce(
    (result, key) => ({ ...result, [key]: { action: props[key] } }),
    {},
  );

export const SCREEN = 'Screen';
export const TAB = 'Tab';
export const DRAWER = 'Drawer';
export const MODAL = 'Modal';
export const INLINE_DIALOG = 'InlineDialog';
export const DROPDOWN = 'Dropdown';
export const PAGE_EVENT_ACTION = 'page-view';

export enum ScreenTypes {
  SCREEN = 'Screen',
  MODAL = 'Modal',
  DRAWER = 'Drawer',
  TAB = 'Tab',
  INLINE_DIALOG = 'InlineDialog',
  DROPDOWN = 'Dropdown',
  BANNER = 'Banner',
}

export const UI_EVENT_TYPE = 'UI';
export const TRACK_EVENT_TYPE = 'TRACK';
export const SCREEN_EVENT_TYPE = 'SCREEN';
export const OPERATIONAL_EVENT_TYPE = 'OPERATIONAL';
export const TRACK_ERROR = 'TRACK_ERROR';

export const ComponentWithAnalytics = (
  componentName: string,
  eventActions: Callbacks<Object>,
) => (WrappedComponent: any): any =>
  // @ts-ignore
  withAnalyticsContext({ componentName })(
    withAnalyticsEvents(map(eventActions))(WrappedComponent as any),
  );

export const connectUIAnalytics = <T extends any>(
  ConnectedProps: ProvidedProps,
) => {
  return (WrappedComponent: ComponentType<T | any>) => {
    const WithAnalytics = (props: any) => {
      const newMappedProps: any = {};
      Object.keys(ConnectedProps).forEach((key) => {
        newMappedProps[key] = (...attrs: any[]) => {
          // assume that analytics event is always the last one (it should be by convention)
          const analyticsEvent = attrs[attrs.length - 1].clone();
          const connectedProp = ConnectedProps[key];

          // example: { onSelect: 'select' }
          if (typeof ConnectedProps[key] === 'string') {
            analyticsEvent
              .update({
                name: connectedProp,
                analyticsType: UI_EVENT_TYPE,
              })
              .fire(PROJECT_PAGES_CHANNEL);
            // example: { onSelect: (value) => ({ name: 'select', value: value}) }
          } else if (typeof connectedProp === 'function') {
            const update = connectedProp(...attrs);
            analyticsEvent
              .update({ ...update, analyticsType: UI_EVENT_TYPE })
              .fire(PROJECT_PAGES_CHANNEL);
          }

          props[key] && props[key](...attrs);
        };
      });
      return <WrappedComponent {...props} {...newMappedProps} />;
    };
    return WithAnalytics as ComponentType<T>;
  };
};

const isNotUndefined = (a: any) => a !== undefined;

const mapAnalyticsDataPayloadToContext = (
  payload: Readonly<AnalyticsDataPayload>,
): AnalyticsContextPayload => {
  const {
    tags,
    containerId,
    containerType,
    objectId,
    objectType,
    attributes,
  } = payload;
  return {
    tags,
    containerId,
    containerType,
    objectId,
    objectType,
    attributes,
  };
};

export const ReactStateAnalyticsData = <
  OwnProps extends any,
  State extends any
>(
  mapStateToAnalytics: (
    state: State,
    ownProps: OwnProps,
  ) => AnalyticsDataPayload,
) => (WrappedComponent: ComponentType<OwnProps>): typeof WrappedComponent =>
  class ComponentWrappedInAnalytics extends Component<OwnProps, State> {
    static displayName = `ReactStateAnalyticsData(${
      WrappedComponent.displayName || WrappedComponent.name
    })`;

    render() {
      const { state, props } = this;
      const analyticsContext = mapAnalyticsDataPayloadToContext(
        mapStateToAnalytics(state, props),
      );
      return (
        <AnalyticsContext data={analyticsContext}>
          <WrappedComponent {...props} />
        </AnalyticsContext>
      );
    }
  };

const mapPayload = (payload: FireOperationalAnalyticsPayload) => {
  const context = mapAnalyticsDataPayloadToContext(payload);
  const { name } = payload;
  return pickBy(
    {
      ...context,
      ...context.attributes,
      attributes: undefined,
      name,
    },
    isNotUndefined,
  );
};

export const fireOperationalAnalytics = (
  event: UIAnalyticsEvent,
  payload: FireOperationalAnalyticsPayload,
) => {
  event
    .update({ ...mapPayload(payload), analyticsType: OPERATIONAL_EVENT_TYPE })
    .fire(PROJECT_PAGES_CHANNEL);
};

export type AnalyticsDataPayload = {
  containerId?: string;
  containerType?: string;
  objectType?: string;
  objectId?: string;
  tags?: string[];
  attributes?: { [attributeName: string]: any };
};

export interface FireOperationalAnalyticsPayload extends AnalyticsDataPayload {
  name?: string;
}

export interface FireUiAnalyticsPayload extends AnalyticsDataPayload {
  name?: string;
}

export interface AnalyticsContextPayload extends AnalyticsDataPayload {
  component?: string;
  actionSubject?: string;
}

export const AnalyticsSource = <OwnProps extends any>(
  name: string,
  type: ScreenTypes,
) => (WrappedComponent: ComponentType<OwnProps>): ComponentType<OwnProps> => {
  const analyticsContext = (props: any) => {
    return (
      <AnalyticsContext data={{ source: `${name}${type}` }}>
        <WrappedComponent {...props} />
      </AnalyticsContext>
    );
  };
  return analyticsContext;
};

export const fireUiAnalytics = (
  event: UIAnalyticsEvent,
  payload: FireUiAnalyticsPayload,
) => {
  event
    .update({ ...mapPayload(payload), analyticsType: UI_EVENT_TYPE })
    .fire(PROJECT_PAGES_CHANNEL);
};

export const getEvent = (event: UIAnalyticsEvent): StructuredAnalytics => {
  const sources = getSources(event);

  const analyticsType = getAnalyticsType(event);
  const actionSubject = getActionSubjectForEventType(event, analyticsType);

  const source = last(sources);
  const action = getAction(event);

  const attributes = {
    ...getAttributes(event),
    namespaces: sources.join('.'),
  };

  if (action === PAGE_EVENT_ACTION) {
    return {
      type: SCREEN_EVENT_TYPE,
      payload: {
        name: source,
        attributes,
      },
    };
  }

  switch (analyticsType) {
    case UI_EVENT_TYPE:
    case TRACK_EVENT_TYPE:
    case OPERATIONAL_EVENT_TYPE:
    case TRACK_ERROR: {
      const actionSubjectId = getActionSubjectIdForEventType(
        event,
        analyticsType,
        actionSubject,
      );
      const containerId = last(getContainerIds(event));
      const containerType = last(getContainerTypes(event));
      const objectId = last(getObjectIds(event));
      const objectType = last(getObjectTypes(event));
      const tags = getTags(event);
      return {
        type: analyticsType,
        payload: {
          action,
          actionSubject,
          actionSubjectId,
          source,
          tags,
          containerType,
          containerId,
          objectType,
          objectId,
          attributes,
        },
      };
    }
    default: {
      return {
        payload: {
          source,
          actionSubject,
          attributes,
        },
        type: undefined,
      };
    }
  }
};
