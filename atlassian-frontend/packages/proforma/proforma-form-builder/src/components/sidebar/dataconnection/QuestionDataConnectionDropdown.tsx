import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Select, { ValueType } from '@atlaskit/select';
import {
  DataConnectionResponse,
  DataConnectionStatus,
} from '@atlassian/proforma-common-core/jira-common-models';

import { FormBuilderReferenceData } from '../../../models/FormBuilderReferenceData';
import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from '../QuestionSidebarMessages.intl';
import { SideBarSelectStyles } from '../styles';

interface QuestionDataConnectionDropdownProps {
  value?: string;
  onChange: (id?: string) => void;
  placeholder: string;
  refData: FormBuilderReferenceData;
}

export const QuestionDataConnectionDropdown = injectIntl(
  ({
    value,
    onChange,
    refData,
    placeholder,
    intl,
  }: QuestionDataConnectionDropdownProps & InjectedIntlProps) => {
    const { dataConnections, dataConnectionMap } = refData;

    const loadingDataConnection: DataConnectionResponse = {
      id: '',
      name: intl.formatMessage(
        IntlQuestionSidebarMessages[QuestionSidebarMessage.LoadingFields],
      ),
      status: DataConnectionStatus.Unknown,
      choices: [],
    };

    const doNotLinkDataConnection: DataConnectionResponse = {
      id: '',
      name: intl.formatMessage(
        IntlQuestionSidebarMessages[QuestionSidebarMessage.DoNotLink],
      ),
      status: DataConnectionStatus.Unknown,
      choices: [],
    };

    let selectedOption: DataConnectionResponse | undefined;
    if (!dataConnectionMap) {
      selectedOption = loadingDataConnection;
    } else if (!value) {
      selectedOption = doNotLinkDataConnection;
    } else {
      selectedOption = dataConnectionMap.get(value);
      if (!selectedOption) {
        selectedOption = {
          id: value,
          name: intl.formatMessage(
            IntlQuestionSidebarMessages[
              QuestionSidebarMessage.UnknownDataConnection
            ],
            { dataConnectionId: value },
          ),
          status: DataConnectionStatus.Unknown,
          choices: [],
        };
      }
    }

    const loading = !dataConnectionMap;
    const options: DataConnectionResponse[] = loading
      ? [loadingDataConnection]
      : [doNotLinkDataConnection, ...(dataConnections || [])];

    return (
      <Select
        isLoading={loading}
        isDisabled={loading}
        options={options}
        placeholder={placeholder}
        value={selectedOption}
        getOptionValue={(option: DataConnectionResponse) => option.id}
        getOptionLabel={(option: DataConnectionResponse) => option.name}
        onChange={(e: ValueType<DataConnectionResponse>) => {
          onChange((e as DataConnectionResponse).id);
        }}
        styles={SideBarSelectStyles}
      />
    );
  },
);
