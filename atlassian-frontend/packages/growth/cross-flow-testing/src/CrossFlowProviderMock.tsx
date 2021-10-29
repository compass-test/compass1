import React from 'react';
import {
  BaseCrossFlowApiProvider,
  OnOpen,
} from '@atlassiansox/cross-flow-api-internals';

type MockProviderProps = {
  onOpen: OnOpen;
};

export const CrossFlowProviderMock: React.ComponentType<MockProviderProps> = (
  props,
) => {
  return <BaseCrossFlowApiProvider {...props} />;
};
