import React, { Dispatch, FC } from 'react';

import { FormattedMessage } from 'react-intl';

import {
  FormPublishing,
  FormSettings,
} from '@atlassian/proforma-common-core/form-system-models';
import { usePfBrowserUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { ReferenceData } from '@atlassian/proforma-common-core/jira-common-models';

import { AddShortcutModalProps } from '../model/AddShortcutModalProps';

import { EditAutomationRule } from './FormAutomation/EditAutomationRule/EditAutomationRule';
import { FormAutomation } from './FormAutomation/FormAutomation';
import {
  AutomationRulesState,
  AutomationRulesStateActions,
} from './hooks/automationRules-hook';
import { FormCreationSettingsInput } from './settings/FormCreationSettingsInput';
import { FormLanguageInput } from './settings/FormLanguageInput';
import { FormSubmissionSettingsInput } from './settings/FormSubmissionSettingsInput';
import { IssueCreateTypesInput } from './settings/IssueCreateTypesInput';
import { messages } from './settings/messages';
import { RecommendedFormInput } from './settings/RecommendedFormInput';
import { RequestCreateTypesInput } from './settings/RequestCreateTypesInput';
import { SettingHeader, SettingMessage } from './settings/styled';
import {
  FormTitleWrapper,
  SettingsTabColumn,
  SettingsTabColumns,
  TabPanelWrapper,
} from './styled';

interface TabSettingsProps {
  formSettings: FormSettings;
  formPublishSettings: FormPublishing;
  settingsRefData: ReferenceData;
  updateFormSettings: (newFormSettings: FormSettings) => void;
  updateFormPublishSettings: (newFormPublishSettings: FormPublishing) => void;
  automationRulesState: AutomationRulesState;
  updateAutomationRulesState: Dispatch<AutomationRulesStateActions>;
  projectKey: string;
  projectId: number;
  isServiceProject: boolean;
  isSimplifiedProject: boolean;
  AddShortcutModal?: (props: AddShortcutModalProps) => JSX.Element;
  footer: JSX.Element;
}

export const TabSettings: FC<TabSettingsProps> = ({
  formSettings,
  formPublishSettings,
  settingsRefData,
  updateFormSettings,
  updateFormPublishSettings,
  automationRulesState,
  updateAutomationRulesState,
  projectKey,
  projectId,
  isServiceProject,
  isSimplifiedProject,
  AddShortcutModal,
  footer,
}) => {
  const browserUtils = usePfBrowserUtils();

  const createIssueFormUrl = browserUtils.createIssueFormUrl(
    projectId,
    formSettings.templateId,
  );

  const formConfigurationSection = (
    <>
      <FormSubmissionSettingsInput
        formSettings={formSettings}
        updateFormSettings={updateFormSettings}
      />
      <FormCreationSettingsInput
        isServiceProject={isServiceProject}
        formPublishSettings={formPublishSettings}
        updateFormPublishSettings={updateFormPublishSettings}
      />
    </>
  );

  return (
    <TabPanelWrapper>
      <FormTitleWrapper>{formSettings.name}</FormTitleWrapper>
      <SettingsTabColumns>
        <SettingsTabColumn>
          <SettingHeader>
            <FormattedMessage
              {...(isServiceProject
                ? messages.locationsAndRequestTypesHeader
                : messages.locationsAndIssueTypesHeader)}
            />
          </SettingHeader>
          <SettingMessage>
            <FormattedMessage
              {...(isServiceProject
                ? messages.locationsAndRequestTypesParagraph
                : messages.locationsAndIssueTypesParagraph)}
            />
          </SettingMessage>
          {isServiceProject && (
            <RequestCreateTypesInput
              isSimplifiedProject={isSimplifiedProject}
              formSettings={formSettings}
              formPublishSettings={formPublishSettings}
              settingsRefData={settingsRefData}
              updateFormPublishSettings={updateFormPublishSettings}
            />
          )}
          <RecommendedFormInput
            isServiceProject={isServiceProject}
            formPublishSettings={formPublishSettings}
            settingsRefData={settingsRefData}
            updateFormPublishSettings={updateFormPublishSettings}
          />
          {(!isServiceProject ||
            formPublishSettings.jira?.newIssueRequestTypeIds !== undefined ||
            formPublishSettings.jira?.newIssueIssueTypeIds !== undefined) && (
            <IssueCreateTypesInput
              isServiceProject={isServiceProject}
              formPublishSettings={formPublishSettings}
              settingsRefData={settingsRefData}
              updateFormPublishSettings={updateFormPublishSettings}
              createIssueFormUrl={createIssueFormUrl}
              projectKey={projectKey}
              AddShortcutModal={AddShortcutModal}
            />
          )}
          <FormLanguageInput
            formSettings={formSettings}
            updateFormSettings={updateFormSettings}
          />
          {automationRulesState.rules.length > 0 && formConfigurationSection}
        </SettingsTabColumn>
        <SettingsTabColumn>
          {automationRulesState.rules.length === 0 ? (
            formConfigurationSection
          ) : automationRulesState.ruleForEdit ? (
            <EditAutomationRule
              isServiceProject={isServiceProject}
              initialRule={automationRulesState.ruleForEdit}
              settingsRefData={settingsRefData}
              updateAutomationRulesState={updateAutomationRulesState}
            />
          ) : (
            <FormAutomation
              automationRulesState={automationRulesState}
              updateAutomationRulesState={updateAutomationRulesState}
              projectKey={projectKey}
              projectId={projectId}
              isSimplifiedProject={isSimplifiedProject}
            />
          )}
        </SettingsTabColumn>
      </SettingsTabColumns>
      {footer}
    </TabPanelWrapper>
  );
};
