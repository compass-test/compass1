import React from 'react';

import Spinner from '@atlaskit/spinner';

import { LoadingContainer } from './styled';

export const Loading = () => (
  <LoadingContainer>
    <Spinner size="xlarge" />
  </LoadingContainer>
);
