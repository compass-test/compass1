import React from 'react';

import { FormattedMessage } from 'react-intl';

import { ErrorMessage } from '@atlaskit/form';

import { IntlValidationErrorMessages } from '../../../utils/validation/validationErrorMessages.intl';

import { ErrorWrapper } from './questionWrappers';

// TODO: Pass in array of FormattedMessage rather than the error itself (or some other solution)
// since the messages are not part of the package.
export const QuestionErrorMsg = ({ validationErrors }: any) => {
  return (
    <ErrorWrapper>
      {validationErrors ? (
        <ErrorMessage>
          {validationErrors.map((error: any, index: number): any => {
            return (
              <span key={error.message}>
                <FormattedMessage
                  // @ts-ignore
                  {...IntlValidationErrorMessages[error.message]}
                  values={error.data}
                />
                &nbsp;
              </span>
            );
          })}
          &nbsp;
        </ErrorMessage>
      ) : null}
    </ErrorWrapper>
  );
};
