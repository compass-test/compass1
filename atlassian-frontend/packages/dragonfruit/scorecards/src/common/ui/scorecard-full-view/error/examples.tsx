import React from 'react';

import { OnCloseHandler } from '@atlaskit/modal-dialog';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { mockOnClose } from './mocks';

import Error from './index';

export const ErrorExample = () => {
  return (
    <CompassTestProvider>
      <Error onClose={mockOnClose as OnCloseHandler} />
    </CompassTestProvider>
  );
};
