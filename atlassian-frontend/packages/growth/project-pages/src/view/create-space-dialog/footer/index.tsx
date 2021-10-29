import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import AkButtonGroup from '@atlaskit/button/button-group';
import AkButton from '@atlaskit/button/custom-theme-button';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Spinner from '@atlaskit/spinner';
import { R400, N200 } from '@atlaskit/theme/colors';

import {
  CREATE_ERROR,
  KEY_ERROR,
  NO_ERROR,
} from '../../../state/ui/create-space/types';
import { connectUIAnalytics } from '../../../common/analytics/util';

import messages from './messages';
import {
  Props,
  DefaultProps,
  OwnProps,
  DispatchProps,
  StateProps,
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
  line-height: 1.25;
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

  renderConnectionError = (onRetry: any) => {
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
      isCreatingSpace,
      isGeneratingKey,
      errorState,
      suggestedKey,
      onSpaceNameChanged,
      onCreate,
      onCancel,
      userEnteredSpaceName,
      userEnteredSpaceNameInvalid,
      onRetryClick,
      onCancelClick,
      onCreateSpaceClick,
    } = this.props;
    return (
      <Container>
        {errorState === KEY_ERROR &&
          this.renderConnectionError((analyticsEvent: any) => {
            onSpaceNameChanged(userEnteredSpaceName);
            onRetryClick('retrySpaceNameChange', analyticsEvent);
          })}
        {errorState === CREATE_ERROR &&
          this.renderConnectionError((analyticsEvent: any) => {
            onCreate();
            onRetryClick('retrySpaceNameChange', analyticsEvent);
          })}
        {(isCreatingSpace || isGeneratingKey) && (
          <SpinnerDiv>
            <Spinner size="small" />
          </SpinnerDiv>
        )}
        <AkButtonGroup>
          <AkButton
            appearance="primary"
            isDisabled={
              userEnteredSpaceNameInvalid ||
              !suggestedKey ||
              isCreatingSpace ||
              isGeneratingKey
            }
            onClick={(_, analyticsEvent) => {
              onCreateSpaceClick(analyticsEvent);
              onCreate();
            }}
          >
            {formatMessage(messages.createSpace)}
          </AkButton>
          <AkButton
            appearance="link"
            isDisabled={isCreatingSpace}
            onClick={(_, analyticsEvent) => {
              onCancelClick(analyticsEvent);
              onCancel();
            }}
          >
            {formatMessage(messages.cancel)}
          </AkButton>
        </AkButtonGroup>
      </Container>
    );
  }
}

export default connectUIAnalytics<OwnProps & DispatchProps & StateProps>({
  onRetryClick: (action: string) => ({ name: action }),
  onCreateSpaceClick: 'create',
  onCancelClick: 'cancel',
})(injectIntl(Footer));
