import React from 'react';
import {
  HorizontalCenteredContainer,
  SpinnerContainer,
} from './loading-spinner.styled';
import Spinner from '@atlaskit/spinner';

export const LoadingSpinner = () => (
  <SpinnerContainer>
    <HorizontalCenteredContainer>
      <Spinner />
    </HorizontalCenteredContainer>
  </SpinnerContainer>
);
