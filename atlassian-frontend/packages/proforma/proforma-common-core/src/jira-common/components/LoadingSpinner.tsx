import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Spinner from '@atlaskit/spinner';

interface LoadingSpinnerProps {
  message: ReactIntl.FormattedMessage.MessageDescriptor;
  values?: { [key: string]: any };
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  values,
  size,
}) => (
  <LoadingSpinnerContainer>
    <Spinner size={size || 'medium'} />
    <LoadingSpinnerMessage>
      <FormattedMessage {...message} values={values} />
    </LoadingSpinnerMessage>
  </LoadingSpinnerContainer>
);

const LoadingSpinnerContainer = styled.div`
  text-align: center;
`;

const LoadingSpinnerMessage = styled.p``;
