import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

import { AnalyticsAction, AnalyticsActionSubject } from '../analytics';
import { messages } from '../i18n';

import * as styled from './styled';

const ROBOTS_SRC =
  'https://home-static.us-east-1.prod.public.atl-paas.net/d138e521b9ef92669ae8d5c34874d91c.png';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps & InjectedIntlProps & WithAnalyticsEventsProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  private fireOperationalEvent = () => {
    const { createAnalyticsEvent } = this.props;

    if (createAnalyticsEvent) {
      createAnalyticsEvent({
        eventType: OPERATIONAL_EVENT_TYPE,
        actionSubject: AnalyticsActionSubject.ERROR_BOUNDARY,
        action: AnalyticsAction.RENDERED,
      }).fire();
    }
  };

  componentDidCatch(error: any) {
    // TODO: we need to pass `error` given by "componentDidCatch" to category kinds of errors and attach to payload of analytics events
    this.setState({ hasError: true }, this.fireOperationalEvent);
  }

  render() {
    const { intl, children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <styled.ErrorBoundaryBox>
          <styled.ErrorContent>
            <styled.RobotsImg
              src={ROBOTS_SRC}
              alt={intl.formatMessage(messages.errorImageAltText)}
            />
            <styled.ErrorHeading>
              <FormattedMessage {...messages.errorHeading} />
            </styled.ErrorHeading>
            <styled.ErrorMessage>
              <FormattedMessage {...messages.errorText} />
            </styled.ErrorMessage>
          </styled.ErrorContent>
        </styled.ErrorBoundaryBox>
      );
    }

    return children;
  }
}

export default withAnalyticsEvents()(injectIntl(ErrorBoundary));
