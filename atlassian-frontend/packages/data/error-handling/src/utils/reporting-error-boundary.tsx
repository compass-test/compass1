import React, { Component } from 'react';

import {
  CreateUIAnalyticsEvent,
  UIAnalyticsEvent,
  withAnalyticsEvents,
} from '@atlaskit/analytics-next';
import { AnalyticsAttributes } from '@atlassian/analytics-bridge';

import fireErrorAnalytics from './fire-error-analytics';

// it's a workaround since React doesn't provide native types for this
interface ErrorInfo {
  componentStack: string;
}

interface Props {
  attributes?: AnalyticsAttributes;
  children: React.ReactNode;
  // this prop is coming from Atlaskit, can't rename it
  createAnalyticsEvent: CreateUIAnalyticsEvent;
  id: string;
  packageName: string;
}

interface State {
  analyticsEvent: UIAnalyticsEvent | null;
}

class CatchAndReportErrors extends Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { packageName, id, attributes, createAnalyticsEvent } = this.props;
    const analyticsEvent = createAnalyticsEvent({ action: 'failed' });
    fireErrorAnalytics({
      event: analyticsEvent,
      errorInfo,
      error,
      meta: {
        id,
        packageName,
      },
      attributes,
    });

    throw error;
  }

  render() {
    const { children } = this.props;

    return <>{children}</>;
  }
}

export default withAnalyticsEvents()(CatchAndReportErrors);
