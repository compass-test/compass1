import React, { FC } from 'react';

import {
  contactSupportAction,
  ErrorMessage,
  tryAgainAction,
} from '@atlassian/commerce-layout';

export const FormErrorMessage: FC<{ retry(): void }> = ({ retry }) => (
  <ErrorMessage
    testId="commerce-payment-flow--error-message"
    actions={[
      tryAgainAction(retry, 'commerce-payment-flow--error-retry'),
      contactSupportAction(),
    ]}
  >
    We’re having trouble loading this form.
  </ErrorMessage>
);
