import React, { Component, ErrorInfo, ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import {
  LoggerContextInterface,
  useLogger,
} from '../../../common/utils/logger';
import { Notification } from '../../types';
import {
  triggerErrorBoundaryRenderedEvent,
  useCreateFireAnalyticsFromTrigger,
} from '../../utils/analytics';
import messages from '../../utils/i18n/messages';

import { ErrorBoundaryBox, ErrorDescription, ErrorHeading } from './styled';

export type ErrorBoundaryProps = {
  subjectId:
    | 'adf'
    | 'root'
    | 'flag'
    | 'noNotifications'
    | 'avatarContainer'
    | 'document-chunk'
    | 'genericError'
    | 'shortcuts-pro-tip';
  fallbackUI?: ReactNode;
  notificationContext?: Notification;
  notificationPosition?: number;
  children: ReactNode;
  onErrorCallback?: () => void;
  logger?: LoggerContextInterface;
  isCritical?: boolean;
};

type AnalyticsTrigger = {
  fireErrorRenderedEvent: (
    actionSubjectId: string,
    isCritical: boolean,
    notificationContext?: Notification,
    listIndex?: number,
  ) => void;
};

type State = {
  hasError: boolean;
};

const DefaultError = () => (
  <ErrorBoundaryBox data-testid="error-boundary">
    <img
      src="https://home-static.us-east-1.prod.public.atl-paas.net/robot-error.png"
      height={200}
      width={200}
      aria-hidden={true}
    />
    <ErrorHeading>
      <FormattedMessage {...messages.notificationsLoadingErrorTitle} />
    </ErrorHeading>
    <ErrorDescription>
      <FormattedMessage {...messages.globalErrorBoundaryDescription} />
    </ErrorDescription>
  </ErrorBoundaryBox>
);

// eslint-disable-next-line @repo/internal/react/no-class-components
class ErrorBoundary extends Component<
  ErrorBoundaryProps & AnalyticsTrigger,
  State
> {
  constructor(props: ErrorBoundaryProps & AnalyticsTrigger) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, _: ErrorInfo) {
    this.props.fireErrorRenderedEvent(
      this.props.subjectId,
      this.props.isCritical ?? false,
      this.props.notificationContext,
      this.props.notificationPosition,
    );

    this.props.logger?.captureException(error, {
      source: this.props.subjectId,
    });

    this.props.onErrorCallback && this.props.onErrorCallback();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackUI || <DefaultError />;
    }

    return this.props.children;
  }
}

// A simple wrapper so that we can use the useCreateFireAnalyticsFromTrigger hook rather
// than using withAnalytics() + get context inside the error boundary.
const ErrorBoundaryAnalyticsWrapper = (props: ErrorBoundaryProps) => {
  const fireErrorBoundaryRenderedEvent = useCreateFireAnalyticsFromTrigger(
    triggerErrorBoundaryRenderedEvent,
  );
  const logger = useLogger();

  return (
    <ErrorBoundary
      {...props}
      fireErrorRenderedEvent={fireErrorBoundaryRenderedEvent}
      logger={logger}
    >
      {props.children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryAnalyticsWrapper;
