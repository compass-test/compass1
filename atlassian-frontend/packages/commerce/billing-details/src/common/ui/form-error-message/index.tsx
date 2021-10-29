import React from 'react';

import styled from '@emotion/styled';

import SectionMessage, {
  SectionMessageAction,
} from '@atlaskit/section-message';
import { gridSize } from '@atlaskit/theme/constants';
import { getLinkTo } from '@atlassian/commerce-links';

import { ValidationError } from '../../../common/utils/validation-errors';

type FormErrorMessageProps = {
  error: Error | ValidationError | undefined;
};

type ValidationErrorLayoutProps = {
  error: ValidationError;
};

const FormErrorMessageContainer = styled.div`
  margin-top: ${gridSize() * 2}px;
`;

const messageActions = [
  {
    key: 'support',
    href: getLinkTo('support', 'en'),
    text: 'Contact support',
  },
];

const expectedError = (
  error: Error | ValidationError | undefined,
): error is ValidationError => error instanceof ValidationError;

export const UnexpectedErrorLayout: React.FC = () => (
  <SectionMessage
    appearance="error"
    actions={messageActions.map(({ text, ...restAction }) => (
      <SectionMessageAction {...restAction}>{text}</SectionMessageAction>
    ))}
    title="Something went wrong"
  >
    <p>
      An unexpected error occurred, try again later. If the problem persists,
      please contact support
    </p>
  </SectionMessage>
);

const ValidationErrorLayout: React.FC<ValidationErrorLayoutProps> = ({
  error,
}) => (
  <SectionMessage
    appearance="error"
    actions={messageActions.map(({ text, ...restAction }) => (
      <SectionMessageAction {...restAction}>{text}</SectionMessageAction>
    ))}
    title={
      error.formMessages.length > 0
        ? 'Unable to validate your address'
        : 'Incorrect address'
    }
  >
    {error.formMessages.length > 0 ? (
      error.formMessages.map((message) => <p key={message}>{message}</p>)
    ) : (
      <p>
        The address or tax id provided seems to be incorrect. Please check the
        details provided and then submit. If the problem persists, please
        contact support
      </p>
    )}
  </SectionMessage>
);

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  error,
}) => {
  const onlyHasFormMessages =
    expectedError(error) &&
    error.formMessages.length > 0 &&
    Object.keys(error.fieldMessages).length === 0;

  const doesNotHaveVisibleMessages =
    expectedError(error) &&
    error.formMessages.length === 0 &&
    Object.keys(error.fieldMessages).length === 0;

  const displayFormLevelError =
    !expectedError(error) || onlyHasFormMessages || doesNotHaveVisibleMessages;

  return error && displayFormLevelError ? (
    <FormErrorMessageContainer role="alert" data-testid="error-message">
      {expectedError(error) ? (
        <ValidationErrorLayout error={error} />
      ) : (
        <UnexpectedErrorLayout />
      )}
    </FormErrorMessageContainer>
  ) : null;
};
