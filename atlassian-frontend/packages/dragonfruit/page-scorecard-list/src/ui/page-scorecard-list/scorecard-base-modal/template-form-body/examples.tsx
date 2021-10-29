import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { AvailableFieldsProvider } from '../../../../controllers/available-fields';

import TemplateFormBody from './index';

export const BasicTemplateFormBody = () => {
  return (
    <AvailableFieldsProvider>
      <CompassTestProvider>
        <TemplateFormBody testId="storybook-example-form" />
      </CompassTestProvider>
    </AvailableFieldsProvider>
  );
};
