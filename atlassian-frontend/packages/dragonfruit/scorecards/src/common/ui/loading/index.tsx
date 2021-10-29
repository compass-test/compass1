import React from 'react';

import Spinner, { Size as SpinnerSize } from '@atlaskit/spinner';

import { SpinnerWrapper } from './styled';

const Loading = ({
  height = 'auto',
  spinnerSize = 'large',
  testId = 'scorecard-loading',
}: {
  height?: string;
  spinnerSize?: SpinnerSize;
  testId?: string;
}) => {
  return (
    <SpinnerWrapper height={height}>
      <Spinner testId={testId} size={spinnerSize} />
    </SpinnerWrapper>
  );
};

export default Loading;
