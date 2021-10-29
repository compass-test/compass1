import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Select from '@atlaskit/select';

import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from '../QuestionSidebarMessages.intl';
import { SideBarSelectStyles } from '../styles';

interface MinMaxDropdownProps {
  value: MinMaxType;
  onChange: (value: MinMaxType) => void;
}

export enum MinMaxType {
  characters,
  words,
}

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    flexGrow: 2,
  }),
  ...SideBarSelectStyles,
};

export const MinMaxDropdown = injectIntl(
  ({ value, onChange, intl }: MinMaxDropdownProps & InjectedIntlProps) => {
    const types = {
      [MinMaxType.characters]: {
        label: intl.formatMessage(
          IntlQuestionSidebarMessages[
            QuestionSidebarMessage.ValidationCharacters
          ],
        ),
        value: 'characters',
      },
      [MinMaxType.words]: {
        label: intl.formatMessage(
          IntlQuestionSidebarMessages[QuestionSidebarMessage.ValidationWords],
        ),
        value: 'words',
      },
    };

    const minMaxOptions = [
      types[MinMaxType.characters],
      types[MinMaxType.words],
    ];

    return (
      <Select
        options={minMaxOptions}
        value={types[value]}
        onChange={e => {
          if (e === types[MinMaxType.characters]) {
            onChange(MinMaxType.characters);
          } else if (e === types[MinMaxType.words]) {
            onChange(MinMaxType.words);
          }
        }}
        styles={customStyles}
      />
    );
  },
);
