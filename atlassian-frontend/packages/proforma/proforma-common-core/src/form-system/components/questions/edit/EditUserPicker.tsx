import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import {
  ActionMeta,
  AsyncSelect,
  OptionsType,
  ValueType,
} from '@atlaskit/select';

import { SelectOption } from '../../../models/SelectOption';

import {
  EditUserPickerMessage,
  IntlEditUserPickerMessages,
} from './EditUserPickerMessages.intl';

type EditUserPickerProps<IsMulti extends boolean> = {
  id: string;
  isMulti: IsMulti;
  value?: ValueType<SelectOption, IsMulti>;
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsType<SelectOption>) => void,
  ) => void;
  onChange?: (
    value: ValueType<SelectOption, IsMulti>,
    action: ActionMeta<SelectOption>,
  ) => void;
};

export const EditUserPicker = injectIntl(
  ({
    id,
    isMulti,
    value,
    loadOptions,
    onChange,
    intl,
  }: EditUserPickerProps<any> & InjectedIntlProps) => {
    return (
      <AsyncSelect<SelectOption>
        id={id}
        value={value}
        loadOptions={loadOptions}
        noOptionsMessage={(input?: { inputValue?: string }) => {
          if (input?.inputValue) {
            // The user entered something and we couldn't find a match.
            return intl.formatMessage(
              IntlEditUserPickerMessages[
                EditUserPickerMessage.UserPickerNoMatchesFound
              ],
            );
          }
          // The user hasn't started typing yet, or deleted what they had typed.
          return intl.formatMessage(
            IntlEditUserPickerMessages[
              EditUserPickerMessage.UserPickerStartTyping
            ],
          );
        }}
        cacheOptions
        isMulti={isMulti}
        isClearable
        loadingMessage={() =>
          intl.formatMessage(
            IntlEditUserPickerMessages[EditUserPickerMessage.UserPickerLoading],
          )
        }
        defaultOptions
        onChange={onChange}
        placeholder={
          <FormattedMessage
            {...IntlEditUserPickerMessages[
              EditUserPickerMessage.UserPickerSelect
            ]}
          />
        }
        menuPosition="fixed"
      />
    );
  },
);
