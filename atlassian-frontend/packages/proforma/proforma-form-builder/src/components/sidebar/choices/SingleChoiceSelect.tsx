import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Select, { ValueType } from '@atlaskit/select';
import { FormChoice } from '@atlassian/proforma-common-core/form-system-models';
import {
  DataConnectionResponse,
  JiraField,
} from '@atlassian/proforma-common-core/jira-common-models';

import { FormBuilderReferenceData } from '../../../models/FormBuilderReferenceData';
import { SideBarSelectStyles } from '../styles';

import { ChoiceMessage, IntlChoiceMessages } from './ChoiceMessages.intl';
import { getQuestionChoices, isLoadingChoices } from './getQuestionChoices';

interface SingleChoiceSelectProps {
  placeholder: string;
  value?: string;
  onChange: (v: ValueType<FormChoice>) => void;
  jiraField?: JiraField;
  dataConnection?: DataConnectionResponse;
  choices: FormChoice[];
  refData: FormBuilderReferenceData;
  isDisabled: boolean;
  noResponse?: boolean;
}

function findSelectedOption(
  choices: FormChoice[],
  defaultChoice: FormChoice,
  value?: string,
) {
  return (
    choices.find(
      (choice: FormChoice) => value !== undefined && choice.id === value,
    ) || defaultChoice
  );
}

export const SingleChoiceSelect = injectIntl(
  ({
    placeholder,
    value,
    onChange,
    dataConnection,
    jiraField,
    choices,
    refData,
    isDisabled,
    noResponse,
    intl,
  }: SingleChoiceSelectProps & InjectedIntlProps) => {
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

    const noResponseChoice: FormChoice = {
      id: '',
      label: intl.formatMessage(IntlChoiceMessages[ChoiceMessage.NoneLabel]),
    };

    const optionsGroup = {
      label: '',
      options: [...(noResponse ? [noResponseChoice] : []), ...options],
    };

    const selectedOption = findSelectedOption(options, noResponseChoice, value);

    return (
      <Select
        isLoading={loading}
        isDisabled={isDisabled || loading}
        placeholder={placeholder}
        options={[optionsGroup]}
        value={selectedOption}
        getOptionValue={(option: FormChoice) => option.id}
        getOptionLabel={(option: FormChoice) => option.label}
        onChange={onChange}
        styles={SideBarSelectStyles}
        noOptionsMessage={() =>
          intl.formatMessage(IntlChoiceMessages[ChoiceMessage.NoOptionsMsg])
        }
      />
    );
  },
);
