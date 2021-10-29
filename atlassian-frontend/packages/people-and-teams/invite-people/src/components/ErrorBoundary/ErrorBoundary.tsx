import React from 'react';

import {
  useAnalyticsEvents,
  AnalyticsErrorBoundary,
} from '@atlaskit/analytics-next';

import {
  triggerAnalyticsForErrorBoundaryRendered,
  ANALYTICS_CHANNEL,
  triggerAnalyticsForInviteFormFailedToLoad,
} from '../analytics';

import { ErrorScreen } from './ErrorScreen';

interface AnalyticsDataProps {
  product: string;
  subProduct: string | undefined;
  source: string;
  viralSettingsCohort: string | undefined;
  thirdPartyInvitesCohort: string | undefined;
  invitePeopleDrawerMigrationCohort: string | undefined;
  enableInviteeList: boolean | undefined;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  analyticsData: AnalyticsDataProps;
}

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const { children, analyticsData } = props;

  const onError = (error: Error, info?: { componentStack: string }) => {
    triggerAnalyticsForErrorBoundaryRendered(
      {
        ...analyticsData,
        error: {
          message: error.message,
          stack: info?.componentStack || error.stack,
        },
      },
      createAnalyticsEvent,
    );

    triggerAnalyticsForInviteFormFailedToLoad(
      createAnalyticsEvent,
      analyticsData.source,
      {
        message: error.message,
        stack: info?.componentStack || error.stack,
      },
    );
  };

  return (
    <AnalyticsErrorBoundary
      channel={ANALYTICS_CHANNEL}
      data={analyticsData}
      ErrorComponent={ErrorScreen}
      onError={onError}
    >
      {children}
    </AnalyticsErrorBoundary>
  );
};

export default ErrorBoundary;
