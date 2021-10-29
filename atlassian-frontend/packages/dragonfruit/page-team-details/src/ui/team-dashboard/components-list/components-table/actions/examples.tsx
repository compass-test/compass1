import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Actions } from './index';

export const ActionsExample = () => {
  return (
    <CompassTestProvider>
      <Actions
        component={{ id: 'foo', name: 'foo' }}
        onDelete={(componentId) => alert(componentId)}
      />
    </CompassTestProvider>
  );
};
