import React from 'react';

import { FormattedMessage } from 'react-intl';

import Spinner from '@atlaskit/spinner';

import { StyledBox, StyledText } from '../../../../common/ui/picker/styled';

import messages from './messages';

export const LoadingMessage = () => (
  <StyledBox>
    <StyledBox height={72}>
      <Spinner size="large" />
    </StyledBox>
    <StyledText>
      <FormattedMessage {...messages.loadingMessage} />
    </StyledText>
  </StyledBox>
);
