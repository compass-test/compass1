import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Select from '@atlaskit/select';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import {
  ReferenceDataIssueTypeItem,
  ReferenceDataRequestTypeItem,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  SelectGroupedOptionWithType,
  SelectOptionWithType,
} from '../../../../../model/SelectOptionWithType';
import {
  FormSettingsMessage,
  IntlFormSettingsMessages,
} from '../../../../settings/FormBuilderSettingsMessages.intl';

interface IssueTypeSectionProps {
  availableIssueTypes: ReferenceDataIssueTypeItem[];
  availableRequestTypes: ReferenceDataRequestTypeItem[];
  issueTypeId?: string;
  requestTypeId?: string;
}

export const IssueTypeSection = injectIntl(
  ({
    availableIssueTypes,
    availableRequestTypes,
    issueTypeId,
    requestTypeId,
    intl,
  }: IssueTypeSectionProps & InjectedIntlProps) => {
    const issueTypeOptions: SelectOptionWithType[] = availableIssueTypes.map(
      issueType => ({
        label: issueType.name,
        value: issueType.id,
        type: 'issueType',
      }),
    );
    const requestTypeOptions: SelectOptionWithType[] = availableRequestTypes.map(
      requestType => ({
        label: requestType.name,
        value: requestType.id,
        type: 'requestType',
      }),
    );

    const allTypesOption: SelectOption = {
      label: intl.formatMessage(
        IntlFormSettingsMessages[
          FormSettingsMessage.IssueRequestTypePlaceholder
        ],
      ),
      value: 'all',
    };

    const availableOptions: (SelectOption | SelectGroupedOptionWithType)[] = [
      allTypesOption,
    ];
    if (requestTypeOptions.length > 0) {
      availableOptions.push({
        label: intl.formatMessage(
          IntlFormSettingsMessages[
            FormSettingsMessage.IssueFormSelectLabelRequestType
          ],
        ),
        options: requestTypeOptions,
      });
    }
    if (issueTypeOptions.length > 0) {
      availableOptions.push({
        label: intl.formatMessage(
          IntlFormSettingsMessages[
            FormSettingsMessage.IssueFormSelectLabelIssueType
          ],
        ),
        options: issueTypeOptions,
      });
    }

    const selectedOption: SelectOption =
      (issueTypeId
        ? issueTypeOptions.find(type => type.value === issueTypeId)
        : requestTypeId
        ? requestTypeOptions.find(type => type.value === requestTypeId)
        : undefined) || allTypesOption;

    return (
      <Select<SelectOption | SelectOptionWithType>
        value={selectedOption}
        options={availableOptions}
        isDisabled
      />
    );
  },
);
