import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Select from '@atlaskit/select';
import { OptionType } from '@atlaskit/select/types';
import { FormChoice } from '@atlassian/proforma-common-core/form-system-models';
import {
  DataConnectionResponse,
  JiraField,
} from '@atlassian/proforma-common-core/jira-common-models';

import { FormBuilderReferenceData } from '../../../models/FormBuilderReferenceData';
import { SideBarSelectStyles } from '../styles';

import { ChoiceMessage, IntlChoiceMessages } from './ChoiceMessages.intl';
import { getQuestionChoices, isLoadingChoices } from './getQuestionChoices';

interface MultipleChoiceSelectProps {
  placeholder: string;
  values: string[];
  onChange: (ids: any) => void;
  jiraField?: JiraField;
  dataConnection?: DataConnectionResponse;
  choices: FormChoice[];
  refData: FormBuilderReferenceData;
  isDisabled: boolean;
  noResponse?: boolean;
}

const findSelectedOptions = (
  optionIds: string[],
  options: OptionType[],
): OptionType[] => {
  return options.filter((option: OptionType) =>
    optionIds.find(optionId => String(option.value) === optionId),
  );
};

export const MultipleChoiceSelect = injectIntl(
  ({
    placeholder,
    values,
    onChange,
    dataConnection,
    jiraField,
    choices,
    refData,
    isDisabled,
    noResponse,
    intl,
  }: MultipleChoiceSelectProps & InjectedIntlProps) => {
    const loading = isLoadingChoices(
      dataConnection,
      jiraField,
      choices,
      refData,
    );
    const options = getQuestionChoices(
      dataConnection,
      jiraField,
      choices,
      refData,
    );
    const optionTypes: OptionType[] = !isDisabled
      ? options.map((option: FormChoice) => {
          return { label: option.label, value: option.id };
        })
      : [];

    const noResponseChoice: OptionType = {
      value: '',
      label: intl.formatMessage(IntlChoiceMessages[ChoiceMessage.NoneLabel]),
    };

    const optionsGroup = {
      label: '',
      options: [...(noResponse ? [noResponseChoice] : []), ...optionTypes],
    };

    const selectedOptions = findSelectedOptions(values, optionTypes);

    return (
      <Select
        isMulti={true}
        isLoading={loading}
        isDisabled={isDisabled || loading}
        placeholder={placeholder}
        options={[optionsGroup]}
        defaultValue={selectedOptions}
        getOptionLabel={(option: OptionType) => option.label}
        getOptionValue={(option: OptionType) => String(option.value)}
        onChange={onChange}
        styles={SideBarSelectStyles}
      />
    );
  },
);
