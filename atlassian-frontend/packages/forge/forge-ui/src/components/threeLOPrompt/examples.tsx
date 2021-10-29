import React from 'react';
import { action } from '@storybook/addon-actions';
import { createDefaultExport } from '@atlassian/aux-test-utils';
import ThreeLOPrompt from './threeLOPrompt';
import ModalThreeLOPrompt from './modalThreeLOPrompt';

export default createDefaultExport();

export const basicPrompt = () => (
  <ThreeLOPrompt
    authUrl=""
    onSuccess={() => {
      action('authorized')();
      return Promise.resolve();
    }}
  />
);

export const ModalDialogPrompt = () => (
  <ModalThreeLOPrompt
    authUrl=""
    onClose={action('closed')}
    onSuccess={() => {
      action('authorized')();
      return Promise.resolve();
    }}
  />
);
