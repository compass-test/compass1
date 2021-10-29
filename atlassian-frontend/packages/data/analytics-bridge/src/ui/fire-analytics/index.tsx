import React, { Component } from 'react';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

import {
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '../../constants';
import { EventType, ImperativeAnalyticsData } from '../../types';
import { fireAnalytics } from '../../utils/fire-analytics';

export interface Props extends ImperativeAnalyticsData {
  eventName?: string;
  componentName?: string;
}

interface ImplementationProps extends Props, WithAnalyticsEventsProps {
  type: EventType;
}

const getFixedActionAndActionSubject = (props: ImplementationProps) => {
  const { eventName, action, actionSubject } = props;

  if (eventName && (action || actionSubject)) {
    throw new Error(
      'eventName is an alias for action & actionSubject, provide only one of those',
    );
  }

  const eventNameSplit = eventName ? eventName.split(' ') : [];
  const fixedAction = action || eventNameSplit[1];
  const fixedActionSubject = actionSubject || eventNameSplit[0];

  if (!fixedAction || !fixedActionSubject) {
    throw new Error(
      'eventName should exist and be in the format "subject action", i.e. "button clicked", "menu opened", "issue created", etc',
    );
  }

  return { action: fixedAction, actionSubject: fixedActionSubject };
};

const getFixedActionSubjectId = (props: ImplementationProps) => {
  const { componentName, actionSubjectId } = props;

  if (componentName && actionSubjectId) {
    throw new Error(
      'componentName is an alias for actionSubjectId, provide only one of those',
    );
  }
  const fixedActionSubjectId = actionSubjectId || componentName;

  return { actionSubjectId: fixedActionSubjectId };
};

class FireComponent extends Component<ImplementationProps> {
  componentDidMount() {
    const { type, attributes } = this.props;

    if (!this.props.createAnalyticsEvent) {
      throw new Error(
        'Invalid use of component; must be wrapped by withAnalyticsEvents HOC',
      );
    }

    const { action, actionSubject } = getFixedActionAndActionSubject(
      this.props,
    );
    const { actionSubjectId } = getFixedActionSubjectId(this.props);

    const analyticsEvent = this.props.createAnalyticsEvent({ action });

    fireAnalytics(analyticsEvent, type, {
      action,
      actionSubject,
      actionSubjectId,
      attributes,
    });
  }

  render() {
    return null;
  }
}

const WithAnalytics = withAnalyticsEvents()(FireComponent);

export const FireUIAnalytics = (props: Props) => (
  <WithAnalytics {...props} type={UI_EVENT_TYPE} />
);

export const FireTrackAnalytics = (props: Props) => (
  <WithAnalytics {...props} type={TRACK_EVENT_TYPE} />
);

export const FireOperationalAnalytics = (props: Props) => (
  <WithAnalytics {...props} type={OPERATIONAL_EVENT_TYPE} />
);

export const FireScreenAnalytics = (props: Props) => (
  <WithAnalytics
    {...props}
    type={SCREEN_EVENT_TYPE}
    eventName="screen viewed"
  />
);
