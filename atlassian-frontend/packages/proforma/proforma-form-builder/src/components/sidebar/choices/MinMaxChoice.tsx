import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Select, { ValueType } from '@atlaskit/select';
import { FormChoice } from '@atlassian/proforma-common-core/form-system-models';
import {
  DataConnectionResponse,
  JiraField,
} from '@atlassian/proforma-common-core/jira-common-models';

import { FormBuilderReferenceData } from '../../../models/FormBuilderReferenceData';
import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from '../QuestionSidebarMessages.intl';
import { SideBarSelectStyles } from '../styles';
import { FieldLabel } from '../validation/styles';

import { getQuestionChoices, isLoadingChoices } from './getQuestionChoices';

interface MinMaxChoiceProps {
  label: string;
  value?: string;
  onChange: (id: string) => void;
  jiraField?: JiraField;
  dataConnection?: DataConnectionResponse;
  choices: FormChoice[];
  refData: FormBuilderReferenceData;
}

export const MinMaxChoice = injectIntl(
  ({
    label,
    value,
    onChange,
    jiraField,
    dataConnection,
    refData,
    choices,
    intl,
  }: MinMaxChoiceProps & InjectedIntlProps) => {
    const noResponseChoice: FormChoice = {
      id: '',
      label: intl.formatMessage(
        IntlQuestionSidebarMessages[
          QuestionSidebarMessage.ValidationNumChoicesNone
        ],
      ),
      other: false,
    };

    const zeroChoice: FormChoice = {
      id: '0',
      label: '0',
      other: false,
    };

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
    const optionsWithZero = options.length > 0 ? [zeroChoice, ...options] : [];
    const indexedOptions = optionsWithZero.map((v, index) => {
      return {
        id: String(index),
        label: String(index),
        other: false,
      };
    });

    let selectedOption = noResponseChoice;
    if (value) {
      const valueNum: number = parseInt(value, 10);
      if (!isNaN(valueNum) && options.length > 0) {
        if (valueNum <= options.length) {
          selectedOption = indexedOptions[valueNum];
        } else {
          selectedOption = indexedOptions[options.length];
        }
      }
    }

    const optionsGroup = {
      label: intl.formatMessage(
        IntlQuestionSidebarMessages[
          QuestionSidebarMessage.ValidationNumChoicesOptions
        ],
      ),
      options: [noResponseChoice, ...indexedOptions],
    };

    return (
      <>
        <FieldLabel>{label}</FieldLabel>
        <Select
          isLoading={loading}
          isDisabled={loading}
          options={[optionsGroup]}
          value={selectedOption}
          getOptionValue={(option: FormChoice) => option.id}
          getOptionLabel={(option: FormChoice) => option.label}
          onChange={(e: ValueType<FormChoice>) => {
            onChange((e as FormChoice).id);
          }}
          styles={SideBarSelectStyles}
        />
      </>
    );
  },
);
