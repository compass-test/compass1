import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import Select, {
  ActionMeta,
  AsyncSelect,
  OptionsType,
  ValueType,
} from '@atlaskit/select';

import { SelectOption } from '../../../models/SelectOption';

import {
  EditChoiceMessage,
  IntlEditChoiceMessages,
} from './EditChoiceMessages.intl';
import { EditOtherOption } from './EditOtherOption';

type EditDropdownProps = {
  id: string;
  options?: SelectOption[];
  value?: ValueType<SelectOption>;
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsType<SelectOption>) => void,
  ) => void;
  onChange?: (value: ValueType<SelectOption>, action: ActionMeta) => void;
  hasOtherOption: boolean;
  otherOptionSelected: boolean;
  otherOptionText?: string;
  onOtherOptionTextChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

export const EditDropdown: FC<EditDropdownProps> = ({
  id,
  options,
  value,
  loadOptions,
  onChange,
  hasOtherOption,
  otherOptionSelected,
  otherOptionText,
  onOtherOptionTextChange,
}) => {
  return (
    <div>
      {loadOptions ? (
        <AsyncSelect<SelectOption>
          id={id}
          defaultOptions
          options={options}
          loadOptions={loadOptions}
          value={value}
          onChange={onChange}
          menuPosition="fixed"
          isSearchable
          placeholder={
            <FormattedMessage
              {...IntlEditChoiceMessages[EditChoiceMessage.SelectPlaceholder]}
            />
          }
        />
      ) : (
        <Select<SelectOption>
          id={id}
          options={options}
          value={value}
          onChange={onChange}
          menuPosition="fixed"
          isSearchable
          placeholder={
            <FormattedMessage
              {...IntlEditChoiceMessages[EditChoiceMessage.SelectPlaceholder]}
            />
          }
        />
      )}
      {hasOtherOption && (
        <EditOtherOption
          dropdown
          value={otherOptionText}
          isDisabled={!otherOptionSelected}
          onChange={onOtherOptionTextChange}
        />
      )}
    </div>
  );
};
