import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Select from '@atlaskit/select';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import { ReferenceDataStatusItem } from '@atlassian/proforma-common-core/jira-common-models';

import {
  EditAutomationRuleMessage,
  IntlEditAutomationRuleMessages,
} from './EditAutomationRuleMessages.intl';

interface StatusSelectProps {
  availableStatuses: ReferenceDataStatusItem[];
  currentStatusId?: ReferenceDataStatusItem['id'] | null;
  isError?: boolean;
}

export const StatusSelect = injectIntl(
  ({
    availableStatuses,
    currentStatusId,
    isError,
    intl,
  }: StatusSelectProps & InjectedIntlProps) => {
    const statusOptions = availableStatuses.map(s => ({
      label: s.name || s.id,
      value: s.id,
    }));

    const selectedStatusOption =
      statusOptions.find(option => option.value === currentStatusId) || null;

    const placeholder = intl.formatMessage(
      IntlEditAutomationRuleMessages[
        EditAutomationRuleMessage.StatusSelectPlaceholder
      ],
    );

    return (
      <Select<SelectOption>
        placeholder={placeholder}
        value={selectedStatusOption}
        options={statusOptions}
        isDisabled
        validationState={isError ? 'error' : 'default'}
      />
    );
  },
);
