import React, { useState } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import {
  AvatarOption,
  formatLabel,
  SelectValues,
} from '@atlassian/paginated-picker';
import {
  defaultFormPublishing,
  FormPublishing,
  FormSettings,
} from '@atlassian/proforma-common-core/form-system-models';
import { usePfAnalyticsUtils } from '@atlassian/proforma-common-core/jira-common-context';
import {
  ReferenceData,
  ReferenceDataTypeItem,
} from '@atlassian/proforma-common-core/jira-common-models';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';

import { IssueRequestTypesPicker } from './IssueRequestTypesPicker';
import { messages } from './messages';
import { SettingToggle } from './SettingToggle';

interface RequestCreateTypesInputProps {
  isSimplifiedProject: boolean;
  formSettings: FormSettings;
  formPublishSettings: FormPublishing;
  settingsRefData: ReferenceData;
  updateFormPublishSettings: (newFormPublishSettings: FormPublishing) => void;
}

export const RequestCreateTypesInput = injectIntl(
  ({
    isSimplifiedProject,
    formSettings,
    formPublishSettings,
    settingsRefData,
    updateFormPublishSettings,
    intl,
  }: RequestCreateTypesInputProps & InjectedIntlProps) => {
    const analytics = usePfAnalyticsUtils();

    const [requestCreateEnabled, setRequestCreateEnabled] = useState(
      !!formPublishSettings.portal?.portalRequestTypeIds?.length,
    );
    const [previousRequestTypeIds, setPreviousRequestTypeIds] = useState<
      number[]
    >();

    const requestTypeOptions = requestCreateEnabled
      ? ((isSimplifiedProject
          ? settingsRefData.issueTypes
          : settingsRefData.requestTypes) as ReferenceDataTypeItem[]).map(
          issueRequestTypeItem =>
            ({
              optionType: 'avatar',
              label: issueRequestTypeItem.name,
              value: issueRequestTypeItem.id,
              avatar: issueRequestTypeItem.iconUrl,
            } as AvatarOption),
        )
      : [];
    const selectedRequestTypeIds =
      formPublishSettings.portal?.portalRequestTypeIds?.map(
        portalRequestTypeId => portalRequestTypeId.toString(),
      ) ?? [];
    const selectedRequestTypeOptions = requestCreateEnabled
      ? requestTypeOptions.filter(requestTypeOption =>
          selectedRequestTypeIds.includes(requestTypeOption.value),
        )
      : [];

    const toggleRequestCreateEnabled = () => {
      if (requestCreateEnabled) {
        // Store the currently selected request type ids:
        setPreviousRequestTypeIds(
          formPublishSettings.portal?.portalRequestTypeIds,
        );
      }
      updateFormPublishSettings({
        ...formPublishSettings,
        portal: {
          ...(formPublishSettings.portal ?? {
            submitOnCreate:
              formPublishSettings.jira?.submitOnCreate ??
              defaultFormPublishing.submitOnCreate,
            validateOnCreate:
              formPublishSettings.jira?.validateOnCreate ??
              defaultFormPublishing.validateOnCreate,
          }),
          portalRequestTypeIds: requestCreateEnabled
            ? undefined
            : previousRequestTypeIds,
        },
      });
      setRequestCreateEnabled(!requestCreateEnabled);
    };

    const onRequestCreateTypesChange = (
      newRequestCreateTypeOptions: SelectValues,
    ): void => {
      updateFormPublishSettings({
        ...formPublishSettings,
        portal: {
          ...(formPublishSettings.portal ?? defaultFormPublishing),
          portalRequestTypeIds: newRequestCreateTypeOptions.map(
            newRequestTypeOption => parseInt(newRequestTypeOption.value, 10),
          ),
        },
      });
      analytics.track(AnalyticsEventName.FormSettingsSetPortalForm, {
        templateId: formSettings.templateId.toString(),
        requestTypes: newRequestCreateTypeOptions
          .map(newRequestTypeOption => newRequestTypeOption.value)
          .join(';'),
      });
    };

    return (
      <>
        <SettingToggle
          id="toggle-requestCreateEnabled"
          message={messages.requestCreateToggleLabel}
          isChecked={requestCreateEnabled}
          onChange={toggleRequestCreateEnabled}
        />
        {requestCreateEnabled && (
          <IssueRequestTypesPicker
            id={'picker-requestCreateTypes'}
            issueRequestTypeOptions={requestTypeOptions}
            selectedIssueRequestTypeOptions={selectedRequestTypeOptions}
            onChange={onRequestCreateTypesChange}
          >
            {formatLabel(
              intl.formatMessage(messages.requestCreatePickerLabel),
              selectedRequestTypeOptions,
            )}
          </IssueRequestTypesPicker>
        )}
      </>
    );
  },
);
