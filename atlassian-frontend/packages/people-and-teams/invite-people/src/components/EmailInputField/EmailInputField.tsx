import React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import debounce from 'lodash/debounce';

import TextField, { TextFieldProps } from '@atlaskit/textfield';
import { ErrorMessage } from '@atlaskit/form';
import { messages } from '../i18n';
import { FieldWrapper, Label } from '../InvitePeople/styled';

export interface OwnProps {
  index: number;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  errorMessage: {
    id: string;
    defaultMessage: string;
  };
  isInvalid: boolean;
}

const EmailInputField: React.FC<
  TextFieldProps & InjectedIntlProps & OwnProps
> = ({
  index,
  intl: { formatMessage },
  isReadOnly,
  onInputChange,
  errorMessage,
  isInvalid,
  value,
}) => {
  const render = React.useCallback(() => {
    const debounced = debounce(
      (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        onInputChange(e, index);
      },
      100,
    );

    // to capture the very first focus
    // so that the first empty input error could be captured
    const onFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
      e.persist();
      if (index === 0 && !value) {
        onInputChange(e, index);
      }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.persist();
      debounced(e, index);
    };

    return (
      <FieldWrapper>
        <Label htmlFor={`email-field-${index}`}>
          {formatMessage(messages.emailInputLabel)}
        </Label>
        <TextField
          name={`email-field-${index}`}
          id={`email-field-${index}`}
          autoComplete="on"
          isReadOnly={isReadOnly}
          onFocus={onFocus}
          onChange={onChange}
          placeholder=""
          type="email"
          isInvalid={isInvalid}
        />
        {isInvalid && (
          <ErrorMessage>
            <FormattedMessage {...errorMessage} />
          </ErrorMessage>
        )}
      </FieldWrapper>
    );
  }, [
    index,
    formatMessage,
    isReadOnly,
    isInvalid,
    errorMessage,
    onInputChange,
    value,
  ]);

  return render();
};

export default injectIntl(EmailInputField);
