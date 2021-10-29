import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Select, { ValueType } from '@atlaskit/select';
import { N100 } from '@atlaskit/theme/colors';
import { usePfFlags } from '@atlassian/proforma-common-core/jira-common-context';
import {
  JiraField,
  JiraFieldType,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  FormBuilderReferenceData,
  RefDataJiraFieldGroup,
} from '../../../models/FormBuilderReferenceData';
import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from '../QuestionSidebarMessages.intl';
import { SideBarSelectStyles } from '../styles';

import {
  IntlQuestionJiraFieldDropdownMessages,
  QuestionJiraFieldDropdownMessage,
} from './QuestionJiraFieldDropdownMessages.intl';

interface QuestionJiraFieldDropdownProps {
  value?: string;
  onChange: (key?: string) => void;
  placeholder: string;
  refData: FormBuilderReferenceData;
  linkedJiraFields: string[];
  isDisabled?: boolean;
}

const QuestionJiraFieldDropdownStyles = {
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

export const QuestionJiraFieldDropdown = injectIntl(
  ({
    value,
    onChange,
    refData,
    placeholder,
    linkedJiraFields,
    isDisabled,
    intl,
  }: QuestionJiraFieldDropdownProps & InjectedIntlProps) => {
    const { jiraFieldMap } = refData;

    const flags = usePfFlags();

    const doNotLinkJiraField: JiraField = {
      key: '',
      fieldType: JiraFieldType.None,
      name: intl.formatMessage(
        IntlQuestionSidebarMessages[QuestionSidebarMessage.DoNotLink],
      ),
    };

    const doNotLinkJiraFieldGroup: RefDataJiraFieldGroup = {
      label: '',
      options: [doNotLinkJiraField],
    };
    const jiraFields: RefDataJiraFieldGroup[] = [
      doNotLinkJiraFieldGroup,
      ...(refData.jiraFieldGroups || []),
    ];

    const loadingJiraField: JiraField = {
      key: '',
      fieldType: JiraFieldType.None,
      name: intl.formatMessage(
        IntlQuestionSidebarMessages[QuestionSidebarMessage.LoadingFields],
      ),
    };

    function findSelectedOption(
      key?: string,
      jiraFieldMap?: Map<string, JiraField>,
    ): JiraField {
      if (!jiraFieldMap) {
        return loadingJiraField;
      }
      if (!key) {
        return doNotLinkJiraField;
      }
      const selectedOption = jiraFieldMap.get(key);
      if (!selectedOption) {
        return {
          key,
          fieldType: JiraFieldType.None,
          name: intl.formatMessage(
            IntlQuestionSidebarMessages[
              QuestionSidebarMessage.UnknownJiraField
            ],
            { jiraFieldKey: key },
          ),
        };
      }
      return selectedOption;
    }

    const selectedOption = findSelectedOption(value, jiraFieldMap);

    const loading = !jiraFieldMap;

    const isJiraFieldDisabled = (option: JiraField) => {
      return linkedJiraFields.includes(option.key);
    };

    const getJiraFieldOptionLabel = (option: JiraField) => {
      if (linkedJiraFields.includes(option.key)) {
        return `${option.name} (${intl.formatMessage(
          IntlQuestionJiraFieldDropdownMessages[
            QuestionJiraFieldDropdownMessage.InUse
          ],
        )})`;
      }
      if (flags.ReadOnlyQuestions && option.readOnly) {
        return `${option.name} (${intl.formatMessage(
          IntlQuestionJiraFieldDropdownMessages[
            QuestionJiraFieldDropdownMessage.ReadOnly
          ],
        )})`;
      }
      return option.name;
    };

    return (
      <Select
        isLoading={loading}
        isDisabled={loading || isDisabled}
        placeholder={placeholder}
        options={jiraFields}
        value={selectedOption}
        getOptionValue={(option: JiraField) => option.key}
        getOptionLabel={(option: JiraField) => getJiraFieldOptionLabel(option)}
        onChange={(e: ValueType<JiraField>) => {
          onChange(e ? (e as JiraField).key : undefined);
        }}
        styles={QuestionJiraFieldDropdownStyles}
        isOptionDisabled={option => isJiraFieldDisabled(option)}
      />
    );
  },
);
