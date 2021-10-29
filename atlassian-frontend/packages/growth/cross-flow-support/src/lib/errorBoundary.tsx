import { Component } from 'react';
import { OnUIAnalyticsEvent } from './types';
import {
  OPERATIONAL_EVENT_TYPE,
  source,
  errorBoundaryAction,
  errorBoundaryActionSubject,
} from './constants';

const name = process.env._PACKAGE_NAME_;
const version = process.env._PACKAGE_VERSION_;

interface ErrorBoundaryProps {
  onAnalyticsEvent: OnUIAnalyticsEvent;
  onError?: (error: Error) => void;
}

const payload = {
  eventType: OPERATIONAL_EVENT_TYPE,
  action: errorBoundaryAction,
  actionSubject: errorBoundaryActionSubject,
};

const context = [
  { source },
  {
    packageName: name,
    packageVersion: version,
  },
];

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onAnalyticsEvent({
      payload,
      context,
    });
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
