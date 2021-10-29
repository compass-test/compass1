import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Textfield from '@atlaskit/textfield';

import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from '../QuestionSidebarMessages.intl';

import { PrescribedValue } from './PrescribedValue';
import { FieldLabel, MinMaxRow } from './styles';

interface MinMaxNumberProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const isIntegerString = (value: string) => /^(-?\d*|-|0)$/.test(value);

export const MinMaxNumber = injectIntl(
  ({
    label,
    onChange,
    placeholder,
    value,
    intl,
  }: MinMaxNumberProps & InjectedIntlProps) => {
    return (
      <>
        <FieldLabel>{label}</FieldLabel>
        <MinMaxRow>
          <Textfield
            placeholder={placeholder}
            width="xsmall"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newMinimum = e.target.value.trim();
              if (isIntegerString(newMinimum)) {
                onChange(newMinimum);
              }
            }}
          />
          <PrescribedValue
            value={intl.formatMessage(
              IntlQuestionSidebarMessages[
                QuestionSidebarMessage.ValidationNumber
              ],
            )}
          />
        </MinMaxRow>
      </>
    );
  },
);
