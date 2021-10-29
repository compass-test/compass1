import React from 'react';

import { ErrorMessage as BaseErrorMessage } from '@atlaskit/form';

import { ErrorWrapper } from './styled';

interface ErrorMessageProps {
  testId?: string;
  message: string;
}

export const InlineErrorMessage: React.FC<ErrorMessageProps> = ({
  testId = 'dragonfruit-scorecards.ui.apply-scorecard-modal.applicable-scorecards-select-message',
  message,
}) => (
  <ErrorWrapper>
    <BaseErrorMessage testId={`${testId}-error`}>{message}</BaseErrorMessage>
  </ErrorWrapper>
);
