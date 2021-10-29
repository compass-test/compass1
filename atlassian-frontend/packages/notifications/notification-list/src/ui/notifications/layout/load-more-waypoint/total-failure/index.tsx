import React, { lazy, ReactElement, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';

import { ErrorBoundarySuspense } from '../../../../../common/ui/error-boundary-suspense';
import {
  triggerFailedToRetrieveNotificationsEvent,
  useCreateFireAnalyticsFromTrigger,
} from '../../../../../common/utils/analytics';
import messages from '../../../../../common/utils/i18n/messages';

import {
  CenterLayout,
  Heading,
  LargeSVGContainer,
  MediumSVGContainer,
  Text,
} from './styled';

interface TotalFailureProps {
  notificationsRendered: number;
}

const GenericError = lazy(
  () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_notification-list/GenericError" */
      '../../../../../common/ui/generic-error'
    ),
);

export const TotalFailure = ({
  notificationsRendered,
}: TotalFailureProps): ReactElement => {
  const fireFailedToRetrieveNotificationsEvent = useCreateFireAnalyticsFromTrigger(
    triggerFailedToRetrieveNotificationsEvent,
  );
  useEffect(() => {
    fireFailedToRetrieveNotificationsEvent(notificationsRendered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CenterLayout>
      {notificationsRendered > 0 ? (
        <MediumSVGContainer>
          <ErrorBoundarySuspense
            loadingFallback={<svg />}
            errorFallback={<svg />}
            subjectId="genericError"
          >
            <GenericError />
          </ErrorBoundarySuspense>
        </MediumSVGContainer>
      ) : (
        <React.Fragment>
          <LargeSVGContainer>
            <ErrorBoundarySuspense
              loadingFallback={<svg />}
              errorFallback={<svg />}
              subjectId="genericError"
            >
              <GenericError />
            </ErrorBoundarySuspense>
          </LargeSVGContainer>
        </React.Fragment>
      )}
      <Heading>
        <FormattedMessage {...messages.notificationsLoadingErrorTitle} />
      </Heading>
      <Text>
        <FormattedMessage {...messages.notificationsLoadingErrorDescription} />
      </Text>
    </CenterLayout>
  );
};
