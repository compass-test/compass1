import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/custom-theme-button';
import { LoadingButton } from '@atlaskit/button';
import { R400 } from '@atlaskit/theme/colors';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import ErrorIcon from '@atlaskit/icon/glyph/error';

import messages from '../../../../view/connect-space-dialog/footer/messages';
import {
  CONNECT_ERROR,
  FETCH_ERROR,
} from '../../../../state/ui/connect-space/types';
import { connectUIAnalytics } from '../../../../common/analytics/util';

import { Container, WrappedError } from './styled';
import {
  Props,
  OnRetryClickAnalyticsParams,
  OnConnectClickAnalyticsParams,
} from './types';

const Footer = ({
  isSubmitAllowed,
  isSubmitting,
  errorState,
  selectedSpace,
  onFetch,
  onConnect,
  onCancel,
  onRetryClick,
  onCancelClick,
  onConnectClick,
  intl: { formatMessage },
}: Props) => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const test =
      errorState === CONNECT_ERROR || errorState === FETCH_ERROR || false;
    setHasError(test);
  }, [errorState]);

  const handleSubmit = (analyticsEvent: UIAnalyticsEvent) => {
    const isPageSelected = selectedSpace?.isPage;
    if (errorState === CONNECT_ERROR) {
      onConnect();
      onRetryClick({ name: 'retryConnect', isPageSelected }, analyticsEvent);
    } else if (errorState === FETCH_ERROR) {
      onFetch();
      onRetryClick({ name: 'retryFetch', isPageSelected }, analyticsEvent);
    } else {
      onConnect();
      onConnectClick({ isPageSelected }, analyticsEvent);
    }
  };

  return (
    <Container>
      <WrappedError>
        {hasError && (
          <ErrorIcon
            label={formatMessage(messages.error)}
            primaryColor={R400}
          />
        )}
        {hasError && formatMessage(messages.connectionError)}
      </WrappedError>
      <ButtonGroup>
        <Button
          appearance="link"
          isDisabled={isSubmitting}
          onClick={(_, analyticsEvent) => {
            onCancel();
            onCancelClick(analyticsEvent);
          }}
        >
          {formatMessage(messages.cancel)}
        </Button>
        <LoadingButton
          appearance="primary"
          isLoading={isSubmitting}
          isDisabled={!isSubmitAllowed}
          onClick={(_, analyticsEvent) => handleSubmit(analyticsEvent)}
        >
          {hasError
            ? formatMessage(messages.retry)
            : formatMessage(messages.connectSpace)}
        </LoadingButton>
      </ButtonGroup>
    </Container>
  );
};

export default connectUIAnalytics({
  onRetryClick: ({ name, isPageSelected }: OnRetryClickAnalyticsParams) => ({
    name,
    isPageSelected,
  }),
  onConnectClick: ({ isPageSelected }: OnConnectClickAnalyticsParams) => ({
    name: 'connect',
    isPageSelected,
  }),
  onCancelClick: 'cancel',
})(injectIntl(Footer));
