import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { messages } from './messages';
import { FormNameArea } from './styled';

interface FormNameInputProps {
  value?: string;
  onChange: (updatedFormName: string) => void;
}

export const FormNameInput = injectIntl(
  ({ value, onChange, intl }: FormNameInputProps & InjectedIntlProps) => {
    return (
      <FormNameArea
        id="editor-form-name"
        data-test-id="editor-form-name"
        type="text"
        placeholder={intl.formatMessage(messages.editorFormNamePlaceholder)}
        value={value}
        onChange={event => onChange(event.target.value)}
        onKeyDown={event => {
          if (event.keyCode === 13) {
            // If enter key pressed, then simulate tab key.
            event.preventDefault();
            const siblingElement =
              event.currentTarget.nextElementSibling?.nextElementSibling;
            if (siblingElement) {
              (siblingElement as HTMLElement).focus();
            }
          }
        }}
      />
    );
  },
);
