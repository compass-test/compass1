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

interface RecommendedFormInputProps {
  isServiceProject: boolean;
  formPublishSettings: FormPublishing;
  settingsRefData: ReferenceData;
  updateFormPublishSettings: (newFormPublishSettings: FormPublishing) => void;
}

export const RecommendedFormInput = injectIntl(
  ({
    isServiceProject,
    formPublishSettings,
    settingsRefData,
    updateFormPublishSettings,
    intl,
  }: RecommendedFormInputProps & InjectedIntlProps) => {
    const analytics = usePfAnalyticsUtils();

    const [recommendedFormEnabled, setRecommendedFormsEnabled] = useState(
      !!formPublishSettings.jira?.issueRequestTypeIds?.length,
    );
    const [
      previousIssueRequestTypeIds,
      setPreviousIssueRequestTypeIds,
    ] = useState<number[]>();

    const issueRequestTypeOptions = recommendedFormEnabled
      ? ((settingsRefData.requestTypes.length > 0
          ? settingsRefData.requestTypes
          : settingsRefData.issueTypes) as ReferenceDataTypeItem[]).map(
          issueRequestTypeItem =>
            ({
              optionType: 'avatar',
              label: issueRequestTypeItem.name,
              value: issueRequestTypeItem.id,
              avatar: issueRequestTypeItem.iconUrl,
            } as AvatarOption),
        )
      : [];
    const selectedIssueRequestTypeIds =
      formPublishSettings.jira?.issueRequestTypeIds?.map(issueRequestTypeId =>
        issueRequestTypeId.toString(),
      ) ?? [];
    const selectedIssueRequestTypeOptions = recommendedFormEnabled
      ? issueRequestTypeOptions.filter(issueRequestTypeOption =>
          selectedIssueRequestTypeIds.includes(issueRequestTypeOption.value),
        )
      : [];

    const toggleRecommendedFormEnabled = () => {
      if (recommendedFormEnabled) {
        // Store the currently selected issue and request type ids:
        setPreviousIssueRequestTypeIds(
          formPublishSettings.jira?.issueRequestTypeIds,
        );
      }
      updateFormPublishSettings({
        ...formPublishSettings,
        jira: {
          ...(formPublishSettings.jira ?? defaultFormPublishing),
          issueRequestTypeIds: recommendedFormEnabled
            ? undefined
            : previousIssueRequestTypeIds,
        },
      });
      setRecommendedFormsEnabled(!recommendedFormEnabled);
    };

    const onRecommendedFormTypesChange = (
      newRecommendedFormTypeOptions: SelectValues,
    ): void => {
      updateFormPublishSettings({
        ...formPublishSettings,
        jira: {
          ...(formPublishSettings.jira ?? {
            submitOnCreate:
              formPublishSettings.portal?.submitOnCreate ??
              defaultFormPublishing.submitOnCreate,
            validateOnCreate:
              formPublishSettings.portal?.validateOnCreate ??
              defaultFormPublishing.validateOnCreate,
          }),
          issueRequestTypeIds: newRecommendedFormTypeOptions.map(
            newRequestTypeOption => parseInt(newRequestTypeOption.value, 10),
          ),
        },
      });
      analytics.track(AnalyticsEventName.FormSettingsSetRecommendedForm, {});
    };

    return (
      <>
        <SettingToggle
          id="toggle-recommendedFormEnabled"
          message={messages.recommendedFormToggleLabel}
          isChecked={recommendedFormEnabled}
          onChange={toggleRecommendedFormEnabled}
        />
        {recommendedFormEnabled && (
          <IssueRequestTypesPicker
            id={'picker-recommendedForm'}
            issueRequestTypeOptions={issueRequestTypeOptions}
            selectedIssueRequestTypeOptions={selectedIssueRequestTypeOptions}
            onChange={onRecommendedFormTypesChange}
          >
            {formatLabel(
              intl.formatMessage(
                isServiceProject
                  ? messages.recommendedFormPickerLabelJsm
                  : messages.recommendedFormPickerLabelNonJsm,
              ),
              selectedIssueRequestTypeOptions,
            )}
          </IssueRequestTypesPicker>
        )}
      </>
    );
  },
);
