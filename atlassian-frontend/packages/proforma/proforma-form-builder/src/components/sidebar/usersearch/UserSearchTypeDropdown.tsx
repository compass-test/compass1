import React from 'react';

import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';

import Select, { ValueType } from '@atlaskit/select';
import { N100 } from '@atlaskit/theme/colors';
import { UserSearchType } from '@atlassian/proforma-common-core/jira-common-models';

import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from '../QuestionSidebarMessages.intl';
import { SideBarSelectStyles } from '../styles';
import { UserSearchOption } from '../UserSearchTypeMessages.intl';

interface UserSearchTypeDropdownProps {
  value: string | undefined;
  onChange: (key?: string) => void;
  options: UserSearchOption[];
  isDisabled?: boolean;
}

const UserSearchTypeDropdownStyles = {
  ...SideBarSelectStyles,
  option: (styles: any, { isDisabled }: any) => {
    if (isDisabled) {
      return {
        ...styles,
        color: N100,
        cursor: 'not-allowed',
      };
    }
    return {
      ...styles,
    };
  },
};

const getValue = (
  vt?: ValueType<UserSearchOption>,
): UserSearchType | undefined => {
  if (vt) {
    const value = (vt as UserSearchOption).value;
    return value ? (value as UserSearchType) : undefined;
  } else {
    return undefined;
  }
};

const findSelectedOption = (
  options: UserSearchOption[],
  value: string,
): UserSearchOption | undefined => {
  return options.find(i => {
    return i.value === value;
  });
};

const getOptions = (
  options: UserSearchOption[],
  value: string,
  intl: InjectedIntl,
): [UserSearchOption[], UserSearchOption] => {
  const unknownOption: UserSearchOption = {
    name: intl.formatMessage(
      IntlQuestionSidebarMessages[QuestionSidebarMessage.UnknownSearchType],
      { searchTypeKey: value },
    ),
    value: value,
  };
  const selectedOption = findSelectedOption(options, value);
  if (selectedOption) {
    return [options, selectedOption];
  } else {
    const updatedOptions: UserSearchOption[] = [...options, unknownOption];
    return [updatedOptions, unknownOption];
  }
};

export const UserSearchTypeDropdown = injectIntl(
  ({
    value,
    onChange,
    options,
    intl,
    isDisabled,
  }: UserSearchTypeDropdownProps & InjectedIntlProps) => {
    const [updatedOptions, selectedOption] = getOptions(
      options,
      value || '',
      intl,
    );

    return (
      <Select
        options={updatedOptions}
        value={selectedOption}
        getOptionValue={(option: UserSearchOption) => option.value}
        getOptionLabel={(option: UserSearchOption) => option.name}
        onChange={(vt: ValueType<UserSearchOption>) => onChange(getValue(vt))}
        styles={UserSearchTypeDropdownStyles}
        isDisabled={isDisabled}
      />
    );
  },
);
