import React from 'react';

import { IntlProvider } from 'react-intl';

import TaskListErrors from './index';

export const NonErrorState = () => {
  return (
    <IntlProvider locale="en">
      <div data-testid="non-error-state-wrapper">
        <p>This text appears BEFORE the component.</p>
        <p>This component does not render anything in its non-error state.</p>
        <TaskListErrors errorData={{ hasError: false }} />
        <p>This text appears AFTER the component.</p>
      </div>
    </IntlProvider>
  );
};

export const ErrorState = () => {
  return (
    <IntlProvider locale="en">
      <TaskListErrors
        errorData={{
          hasError: true,
          errorTitle: {
            id: 'some.id1',
            defaultMessage: 'Error Title',
          },
          errorDescription: {
            id: 'some.id2',
            defaultMessage: 'Description of the error.',
          },
        }}
      />
    </IntlProvider>
  );
};
