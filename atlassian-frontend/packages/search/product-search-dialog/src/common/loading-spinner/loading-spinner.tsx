import React from 'react';
import {
  HorizontalCenteredContainer,
  SpinnerContainer,
} from './loading-spinner.styled';
import Spinner from '@atlaskit/spinner';

export const LoadingSpinner = () => (
  <SpinnerContainer data-testid="search-dialog-loading-spinner">
    <HorizontalCenteredContainer>
      <Spinner />
    </HorizontalCenteredContainer>
  </SpinnerContainer>
);
