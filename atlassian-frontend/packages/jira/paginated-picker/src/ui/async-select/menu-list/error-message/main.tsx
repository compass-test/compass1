import React, { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { N500 } from '@atlaskit/theme/colors';
// TODO: FORM-629 Analytics:
// import {
//   fireOperationalAnalytics,
//   useAnalyticsEvents,
// } from '@atlassian/jira-product-analytics-bridge';

import { StyledBox, StyledText } from '../../../../common/ui/picker/styled';

import messages from './messages';

interface Props {
  onRetry: (() => void) | null;
}

const ErrorMessage = ({ onRetry }: Props) => {
  // const { createAnalyticsEvent } = useAnalyticsEvents();

  const onClick = useCallback(() => {
    onRetry?.();
    // fireOperationalAnalytics(
    //   createAnalyticsEvent({}),
    //   'refinementBarSelectRetry clicked',
    // );
  }, [onRetry]);

  return (
    <StyledBox height={144}>
      <StyledBox height={72} iconSize={72}>
        <ErrorIcon primaryColor={N500} label="" />
      </StyledBox>
      <StyledText>
        <FormattedMessage {...messages.errorMessage} />
      </StyledText>
      <Button onClick={onClick} appearance="link">
        <FormattedMessage {...messages.retryMessage} />
      </Button>
    </StyledBox>
  );
};

export default ErrorMessage;
