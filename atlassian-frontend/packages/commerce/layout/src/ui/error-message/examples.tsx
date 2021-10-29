import React from 'react';

import { contactSupportAction, ErrorMessage, tryAgainAction } from './index';

export const MinimalErrorMessage = () => (
  <ErrorMessage actions={[]}>Error description</ErrorMessage>
);

export const DefaultErrorMessage = () => (
  <ErrorMessage title="Error title">Error description</ErrorMessage>
);

export const ErrorMessageWithCustomActions = () => (
  <ErrorMessage
    title="Error title"
    actions={[
      tryAgainAction(() => alert('huuray')),
      contactSupportAction(),
      {
        key: 'detonate',
        text: 'Detonate',
        onClick: () => alert('Booom!'),
      },
    ]}
  >
    Error description
  </ErrorMessage>
);
