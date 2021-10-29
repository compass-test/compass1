import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import AkButtonGroup from '@atlaskit/button/button-group';
import AkButton from '@atlaskit/button/custom-theme-button';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Spinner from '@atlaskit/spinner';
import messages from './messages';
import { N200, R400 } from '@atlaskit/theme/colors';

import {
  CONNECT_ERROR,
  FETCH_ERROR,
  NO_ERROR,
} from '../../../state/ui/connect-space/types';
import { connectUIAnalytics } from '../../../common/analytics/util';

import {
  DefaultProps,
  Props,
  StateProps,
  DispatchProps,
  AnalyticsProps,
} from './types';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WrappedErrorIcon = styled(ErrorIcon)`
  margin-right: 8px;
`;

const ConnectionFailed = styled.div`
  align-items: center;
  color: ${N200};
  display: flex;
  font-size: 12px;
`;

const SpinnerDiv = styled.div`
  display: inline-block;
  margin-right: 10px;
  position: relative;
  top: 6px;
`;

class Footer extends PureComponent<Props> {
  static defaultProps: DefaultProps = {
    errorState: NO_ERROR,
  };

  renderConnectionFailedError = (onRetry: any) => {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <ConnectionFailed>
        <WrappedErrorIcon
          label={formatMessage(messages.error)}
          primaryColor={R400}
        />
        {formatMessage(messages.connectionError)}
        <AkButton
          appearance="link"
          onClick={(event, analyticsEvent) => {
            onRetry(analyticsEvent);
          }}
        >
          {formatMessage(messages.retry)}
        </AkButton>
      </ConnectionFailed>
    );
  };

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    const {
      isSubmitAllowed,
      isSubmitting,
      errorState,
      onFetch,
      onConnect,
      onCancel,
      onRetryClick,
      onConnectClick,
      onCancelClick,
    } = this.props;

    return (
      <Container>
        {errorState === CONNECT_ERROR &&
          this.renderConnectionFailedError((analyticsEvent: any) => {
            onConnect();
            onRetryClick('retryConnect', analyticsEvent);
          })}
        {errorState === FETCH_ERROR &&
          this.renderConnectionFailedError((analyticsEvent: any) => {
            onFetch();
            onRetryClick('retryFetch', analyticsEvent);
          })}
        {isSubmitting && (
          <SpinnerDiv>
            <Spinner size="small" />
          </SpinnerDiv>
        )}
        <AkButtonGroup>
          <AkButton
            appearance="primary"
            type="submit"
            isDisabled={!isSubmitAllowed || isSubmitting}
            onClick={(e, analyticsEvent) => {
              e.preventDefault();
              onConnect();
              onConnectClick(analyticsEvent);
            }}
          >
            {formatMessage(messages.connectSpace)}
          </AkButton>
          <AkButton
            appearance="link"
            isDisabled={isSubmitting}
            onClick={(_, analyticsEvent) => {
              onCancel();
              onCancelClick(analyticsEvent);
            }}
          >
            {formatMessage(messages.cancel)}
          </AkButton>
        </AkButtonGroup>
      </Container>
    );
  }
}

export default connectUIAnalytics<StateProps & DefaultProps & DispatchProps>({
  onRetryClick: (action: string) => ({ name: action }),
  onConnectClick: 'connect',
  onCancelClick: 'cancel',
})(
  injectIntl<StateProps & DefaultProps & DispatchProps & AnalyticsProps>(
    Footer,
  ),
);
