import React from 'react';

import Spinner, { SpinnerProps } from '@atlaskit/spinner';

import { SpinnerContainer } from './styled';

export default function LoadingView({ size = 'large', ...rest }: SpinnerProps) {
  return (
    <SpinnerContainer>
      <Spinner
        size={size}
        {...rest}
        testId="dragonfruit-common-ui.loading-view.loading-spinner"
      />
    </SpinnerContainer>
  );
}
