import React from 'react';

import { CompassIntlProvider } from '@atlassian/dragonfruit-utils';

import DeleteConfirmationDialog from './index';

export const DeleteConfirmationDialogExample = () => (
  <CompassIntlProvider locale="en">
    <DeleteConfirmationDialog
      name="Velocity"
      onClose={() => {}}
      onSubmit={() => {}}
    />
  </CompassIntlProvider>
);
