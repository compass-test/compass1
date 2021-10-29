import { Component } from 'react';

import mapValues from 'lodash/mapValues';

import {
  AnalyticsEventPayload,
  withAnalyticsEvents,
} from '@atlaskit/analytics-next';

type EventMap = Record<string, AnalyticsEventPayload>;
type Callbacks<Props> = Record<keyof Props, string>;

export const map = <Props,>(
  callbacks: Callbacks<Props>,
  componentName: string,
): EventMap =>
  mapValues(callbacks, (value) => ({
    action: value,
    actionSubject: componentName,
  }));

export const AnalyticsEventToProps = <Props,>(
  componentName: string,
  eventActions: Callbacks<Props>,
) => (WrappedComponent: Component<Props>) =>
  // @ts-ignore
  withAnalyticsEvents(map(eventActions, componentName))(WrappedComponent);
