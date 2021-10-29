import React from 'react';
import { action } from '@storybook/addon-actions';
import ErrorPanel from './errorPanel';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

class AuxPipelineUserVisibleError extends Error {
  public errorDetails?: string;
  public errorMessage: string;

  public constructor(
    message: string,
    errorMessage: string,
    errorDetails?: string,
  ) {
    super(message);
    this.errorMessage = errorMessage;
    this.errorDetails = errorDetails;
  }
}
const error = new AuxPipelineUserVisibleError(
  'Error in Forge app: <app name>',
  'Oops. We did something wrong.',
);

const errorWithStack = new AuxPipelineUserVisibleError(
  'Error in Forge app: <app name>',
  'Oops. We did something wrong.',
  `TypeError: (void 0) is not a function,
      at Object.App [as type] (index.js:1:262195),
      at index.js:1:258898,
      at index.js:1:1985,
      at Object.next (index.js:1:2090),
      at index.js:1:1018,
      at new Promise (<anonymous>),
      at __awaiter (index.js:1:795),
      at index.js:1:258020,
      at index.js:1:259519,
      at index.js:1:1985`,
);

export const basic = () => (
  <ErrorPanel
    error={error}
    dispatch={async () => {
      action('dispatch');
    }}
  />
);

export const withStackTrace = () => (
  <ErrorPanel
    error={errorWithStack}
    dispatch={async () => {
      action('dispatch');
    }}
  />
);
