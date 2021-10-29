import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import TextField from '@atlaskit/textfield';
import { ErrorMessage } from '@atlaskit/form';
import { gridSize } from '@atlaskit/theme/constants';

import messages from './messages';
import { Props, StateProps, DispatchProps, OwnProps } from './types';

const Container = styled.div`
  margin-top: ${gridSize}px;
`;

class Content extends PureComponent<Props> {
  handleKeyPress = ({ key }: any) => {
    const { onCreate, userEnteredSpaceName } = this.props;
    const containsAtLeastTwoAlphanumericValues = (str: any) =>
      /[a-zA-Z0-9]{2,}/g.test(str);
    if (
      key === 'Enter' &&
      containsAtLeastTwoAlphanumericValues(userEnteredSpaceName)
    ) {
      onCreate();
    }
  };

  renderAppropriateInvalidMessage = () => {
    const {
      intl: { formatMessage },
      userEnteredSpaceName,
    } = this.props;
    return (
      <ErrorMessage>
        {formatMessage(
          userEnteredSpaceName.length < 1
            ? messages.emptyName
            : messages.invalidName,
        )}
      </ErrorMessage>
    );
  };

  render() {
    const {
      intl: { formatMessage },
      isCreatingSpace,
      spaceNameInvalid,
      userEnteredSpaceName,
      onSpaceNameChanged,
    } = this.props;

    return (
      <Container>
        <Fragment>
          <TextField
            autoFocus
            disabled={isCreatingSpace}
            placeholder={formatMessage(messages.placeholder)}
            onChange={(input: any) => onSpaceNameChanged(input.target.value)}
            onKeyPress={this.handleKeyPress}
            isInvalid={spaceNameInvalid}
            value={userEnteredSpaceName}
            label=""
            maxLength={80}
          />
          {spaceNameInvalid && this.renderAppropriateInvalidMessage()}
        </Fragment>
      </Container>
    );
  }
}

export default injectIntl<StateProps & DispatchProps & OwnProps>(Content);
