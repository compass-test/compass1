import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { createLabels } from '../../../../../../common/utils/labels';

import { ComponentLabelsViewer } from './index';

// This example is used for the unit tests
export const LabelsViewerExample = () => {
  return (
    <CompassTestProvider>
      <ComponentLabelsViewer labels={createLabels(3)} />
    </CompassTestProvider>
  );
};
