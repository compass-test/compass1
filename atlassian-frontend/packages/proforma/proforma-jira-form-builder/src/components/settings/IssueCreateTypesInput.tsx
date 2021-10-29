import React, { useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { GroupType } from '@atlaskit/select';
import {
  AvatarOption,
  OptionGroup,
  SelectValues,
} from '@atlassian/paginated-picker';
import {
  defaultFormPublishing,
  FormPublishing,
} from '@atlassian/proforma-common-core/form-system-models';
import { usePfAnalyticsUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { ReferenceData } from '@atlassian/proforma-common-core/jira-common-models';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';

import { AddShortcutModalProps } from '../../model/AddShortcutModalProps';

import {
  FormSettingsMessage,
  IntlFormSettingsMessages,
} from './FormBuilderSettingsMessages.intl';
import { IssueCreateTypesTable } from './IssueCreateTypesTable';
import { IssueRequestTypesPicker } from './IssueRequestTypesPicker';
import { messages } from './messages';
import { SettingToggle } from './SettingToggle';

interface AvatarOptionWithType extends AvatarOption {
  type: 'issueType' | 'requestType';
}

interface AvatarGroupWithType
  extends OptionGroup,
    GroupType<AvatarOptionWithType> {
  label: string;
  options: AvatarOptionWithType[];
}

interface IssueTypesInputProps {
  isServiceProject: boolean;
  formPublishSettings: FormPublishing;
  settingsRefData: ReferenceData;
  updateFormPublishSettings: (newFormPublishSettings: FormPublishing) => void;
  createIssueFormUrl: (issueTypeId: string, requestTypeId?: string) => string;
  projectKey: string;
  AddShortcutModal?: (props: AddShortcutModalProps) => JSX.Element;
}

export const IssueCreateTypesInput = injectIntl(
  ({
    isServiceProject,
    formPublishSettings,
    settingsRefData,
    updateFormPublishSettings,
    createIssueFormUrl,
    projectKey,
    AddShortcutModal,
    intl,
  }: IssueTypesInputProps & InjectedIntlProps) => {
    const analytics = usePfAnalyticsUtils();

    const [issueCreateEnabled, setIssueCreateEnabled] = useState(
      !!formPublishSettings.jira?.newIssueIssueTypeIds?.length ||
        !!formPublishSettings.jira?.newIssueRequestTypeIds?.length,
    );
    const [previousIssueTypeIds, setPreviousIssueTypeIds] = useState<
      number[] | undefined
    >(formPublishSettings.jira?.newIssueIssueTypeIds);
    const [previousRequestTypeIds, setPreviousRequestTypeIds] = useState<
      number[] | undefined
    >(formPublishSettings.jira?.newIssueRequestTypeIds);

    const issueRequestTypeOptionGroups: AvatarGroupWithType[] = [];
    if (issueCreateEnabled) {
      if (settingsRefData.requestTypes.length > 0) {
        issueRequestTypeOptionGroups.push({
          optionType: 'group',
          label: intl.formatMessage(
            IntlFormSettingsMessages[
              FormSettingsMessage.IssueFormSelectLabelRequestType
            ],
          ),
          options: settingsRefData.requestTypes.map(
            requestTypeItem =>
              ({
                optionType: 'avatar',
                label: requestTypeItem.name,
                value: requestTypeItem.id,
                avatar: requestTypeItem.iconUrl,
                type: 'requestType',
              } as AvatarOptionWithType),
          ),
        });
      }
      if (settingsRefData.issueTypes.length > 0) {
        issueRequestTypeOptionGroups.push({
          optionType: 'group',
          label: intl.formatMessage(
            IntlFormSettingsMessages[
              FormSettingsMessage.IssueFormSelectLabelIssueType
            ],
          ),
          options: settingsRefData.issueTypes
            .filter(
              issueTypeItem =>
                issueTypeItem.subtask === undefined || !issueTypeItem.subtask,
            )
            .map(issueTypeItem => ({
              optionType: 'avatar',
              label: issueTypeItem.name,
              value: issueTypeItem.id,
              avatar: issueTypeItem.iconUrl,
              type: 'issueType',
            })),
        });
      }
    }
    const selectedIssueTypeIds =
      formPublishSettings.jira?.newIssueIssueTypeIds?.map(issueTypeId =>
        issueTypeId.toString(),
      ) ?? [];
    const selectedRequestTypeIds =
      formPublishSettings.jira?.newIssueRequestTypeIds?.map(requestTypeId =>
        requestTypeId.toString(),
      ) ?? [];
    const selectedIssueRequestTypeOptions: AvatarOptionWithType[] = [];
    if (issueCreateEnabled) {
      issueRequestTypeOptionGroups.forEach(issueRequestTypeOptionGroup => {
        selectedIssueRequestTypeOptions.push(
          ...issueRequestTypeOptionGroup.options.filter(
            issueRequestTypeOption =>
              (issueRequestTypeOption.type === 'issueType' &&
                selectedIssueTypeIds.includes(issueRequestTypeOption.value)) ||
              (issueRequestTypeOption.type === 'requestType' &&
                selectedRequestTypeIds.includes(issueRequestTypeOption.value)),
          ),
        );
      });
    }

    const toggleIssueCreateEnabled = () => {
      if (issueCreateEnabled) {
        // Store the currently selected issue and request type ids:
        setPreviousIssueTypeIds(formPublishSettings.jira?.newIssueIssueTypeIds);
        setPreviousRequestTypeIds(
          formPublishSettings.jira?.newIssueRequestTypeIds,
        );
      }
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
          newIssueIssueTypeIds: issueCreateEnabled ? [] : previousIssueTypeIds,
          newIssueRequestTypeIds: issueCreateEnabled
            ? []
            : previousRequestTypeIds,
        },
      });
      setIssueCreateEnabled(!issueCreateEnabled);
    };

    const onIssueCreateTypesChange = (
      newIssueCreateTypeOptions: SelectValues,
    ): void => {
      const newIssueIssueTypeIds: number[] = [];
      const newIssueRequestTypeIds: number[] = [];
      newIssueCreateTypeOptions.forEach(newIssueCreateTypeOption => {
        const newIssueCreateTypeOptionWithType = newIssueCreateTypeOption as AvatarOptionWithType;
        if (newIssueCreateTypeOptionWithType.type === 'issueType') {
          newIssueIssueTypeIds.push(
            parseInt(newIssueCreateTypeOption.value, 10),
          );
        } else if (newIssueCreateTypeOptionWithType.type === 'requestType') {
          newIssueRequestTypeIds.push(
            parseInt(newIssueCreateTypeOption.value, 10),
          );
        } else {
          // eslint-disable-next-line no-console
          console.error(
            'Invalid selected issue/request type id:',
            newIssueCreateTypeOption,
          );
        }
      });
      updateFormPublishSettings({
        ...formPublishSettings,
        jira: {
          ...(formPublishSettings.jira ?? defaultFormPublishing),
          newIssueIssueTypeIds,
          newIssueRequestTypeIds,
        },
      });
      analytics.track(AnalyticsEventName.FormSettingsSetIssueForm, {});
    };

    return (
      <>
        <SettingToggle
          id="toggle-issueCreateEnabled"
          message={messages.issueCreateToggleLabel}
          isChecked={issueCreateEnabled}
          onChange={toggleIssueCreateEnabled}
        />
        {issueCreateEnabled && (
          <>
            <IssueRequestTypesPicker
              id={'picker-issueCreateTypes'}
              issueRequestTypeOptions={issueRequestTypeOptionGroups}
              selectedIssueRequestTypeOptions={selectedIssueRequestTypeOptions}
              onChange={onIssueCreateTypesChange}
            >
              <FormattedMessage
                {...(isServiceProject
                  ? messages.issueCreatePickerLabelJsm
                  : messages.issueCreatePickerLabelNonJsm)}
              />
            </IssueRequestTypesPicker>
            {selectedIssueRequestTypeOptions.length > 0 && (
              <IssueCreateTypesTable
                isServiceProject={isServiceProject}
                selectedIssueRequestTypeOptions={
                  selectedIssueRequestTypeOptions
                }
                createIssueFormUrl={createIssueFormUrl}
                projectKey={projectKey}
                AddShortcutModal={AddShortcutModal}
              />
            )}
          </>
        )}
      </>
    );
  },
);
