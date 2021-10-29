import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import Select, { ActionMeta, AsyncSelect, OptionsType } from '@atlaskit/select';

import { SelectOption } from '../../../models/SelectOption';

import {
  EditChoiceMessage,
  IntlEditChoiceMessages,
} from './EditChoiceMessages.intl';
import { EditOtherOption } from './EditOtherOption';

type EditDropdownMultiselectProps = {
  id: string;
  options?: SelectOption[];
  value?: OptionsType<SelectOption>;
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsType<SelectOption>) => void,
  ) => void;
  onChange?: (value: OptionsType<SelectOption>, action: ActionMeta) => void;
  hasOtherOption: boolean;
  otherOptionSelected: boolean;
  otherOptionText?: string;
  onOtherOptionTextChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

export const EditDropdownMultiselect: FC<EditDropdownMultiselectProps> = ({
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
        <AsyncSelect<SelectOption, true>
          id={id}
          defaultOptions
          options={options}
          value={value}
          loadOptions={loadOptions}
          onChange={onChange}
          isMulti
          menuPosition="fixed"
          isSearchable
          placeholder={
            <FormattedMessage
              {...IntlEditChoiceMessages[EditChoiceMessage.SelectPlaceholder]}
            />
          }
        />
      ) : (
        <Select<SelectOption, true>
          id={id}
          options={options}
          value={value}
          onChange={onChange}
          isMulti
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
