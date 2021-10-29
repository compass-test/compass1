import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { EditorActions } from '@atlaskit/editor-core';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import {
  FormPublishing,
  FormSettings,
  QuestionParametersChoice,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { FormStore } from '@atlassian/proforma-common-core/form-system-stores';
import {
  cleanupTemplateForm,
  convertTemplateFormToUnsavedForm,
} from '@atlassian/proforma-common-core/form-system-utils';
import { usePfAnalyticsUtils } from '@atlassian/proforma-common-core/jira-common-context';
import {
  AutomationRuleData,
  AutomationRuleDataNoId,
  FormBuilderDataConnections,
  FormBuilderJiraFields,
  InsightChoiceApi,
  InsightObjectQuery,
  isInsightChoiceApi,
  JiraField,
  LocalAutomationRuleData,
  ReferenceData,
  UserSearchType,
} from '@atlassian/proforma-common-core/jira-common-models';
import { loadChoicesFn } from '@atlassian/proforma-common-core/jira-common-stores';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';
import { AdfForm, adfToTemplateForm } from '@atlassian/proforma-form-builder';

import { AddShortcutModalProps } from '../model/AddShortcutModalProps';

import { Footer } from './Footer';
import { addFormIdToRule } from './FormAutomation/EditAutomationRule/helpers/helpers';
import {
  formHasChanged,
  getCurrentForm,
  updateRefDataChoicesInEditor,
} from './helpers';
import {
  useAsyncLoadRefData,
  useAsyncLoadSettingsRefData,
  useAsyncLoadTemplateForm,
  useBeforeUnloadHandler,
} from './hooks';
import {
  AutomationRuleStateAction,
  useAutomationRulesState,
} from './hooks/automationRules-hook';
import {
  FormBuilderMessage,
  IntlFormBuilderMessages,
} from './JiraFormBuilderMessages.intl';
import { messages } from './messages';
import {
  FirstTabWrapper,
  JiraFormBuilderWrapper,
  TabMessageWrapper,
} from './styled';
import { TabBuild } from './TabBuild';
import { TabLoading } from './TabLoading';
import { TabPreview } from './TabPreview';
import { TabSettings } from './TabSettings';

export enum FormBuilderTab {
  Build,
  Preview,
  Settings,
}

interface JiraFormBuilderProps {
  projectKey: string;
  projectId: number;
  projectType: 'business' | 'service_desk' | 'software';
  isSimplifiedProject: boolean;
  loadTemplateForm: () => Promise<TemplateForm>;
  loadJiraFields: () => Promise<FormBuilderJiraFields>;
  loadDataConnections: () => Promise<FormBuilderDataConnections>;
  loadSettingsRefData: () => Promise<ReferenceData>;
  loadAutomationRules: () => Promise<AutomationRuleData[]>;
  onClose: () => void;
  saveForm: (form: TemplateForm) => Promise<any>;
  addAutomationRule: (
    automationRule: AutomationRuleDataNoId,
  ) => Promise<AutomationRuleData>;
  updateAutomationRule: (automationRule: AutomationRuleData) => Promise<any>;
  deleteAutomationRule: (ruleId: string) => Promise<any>;
  editorActions: EditorActions;
  showTemplatesByDefault?: boolean;
  loadLinkedJiraFieldInsightChoices: (
    jiraField: JiraField,
  ) => Promise<QuestionParametersChoice[]>;
  AddShortcutModal?: (props: AddShortcutModalProps) => JSX.Element;
}

export const JiraFormBuilder = injectIntl(
  ({
    projectKey,
    projectId,
    projectType,
    isSimplifiedProject,
    loadTemplateForm,
    loadJiraFields,
    loadDataConnections,
    loadSettingsRefData,
    loadAutomationRules,
    onClose,
    saveForm,
    addAutomationRule,
    updateAutomationRule,
    deleteAutomationRule,
    editorActions,
    showTemplatesByDefault,
    loadLinkedJiraFieldInsightChoices,
    AddShortcutModal,
    intl,
  }: JiraFormBuilderProps & InjectedIntlProps) => {
    // Custom hooks
    const {
      loadingForm,
      templateForm,
      formSettings,
      formSettingsRef,
      formPublishSettings,
      setRawAdf,
      setTemplateForm,
      setFormSettings,
      setFormPublishSettings,
      savedForm,
    } = useAsyncLoadTemplateForm(loadTemplateForm);
    const { refData } = useAsyncLoadRefData(
      loadJiraFields,
      loadDataConnections,
      intl.formatMessage(
        IntlFormBuilderMessages[FormBuilderMessage.CommonJiraFieldsLabel],
      ),
      intl.formatMessage(
        IntlFormBuilderMessages[FormBuilderMessage.OtherJiraFieldsLabel],
      ),
    );
    const {
      settingsRefData,
      loadingSettingsRefData,
    } = useAsyncLoadSettingsRefData(loadSettingsRefData);
    const {
      automationRulesState,
      updateAutomationRulesState,
    } = useAutomationRulesState(loadAutomationRules, intl);

    const analytics = usePfAnalyticsUtils();

    const [selectedTab, setSelectedTab] = useState<FormBuilderTab>(
      FormBuilderTab.Build,
    );
    const [formStore, setFormStore] = useState<FormStore>();

    useEffect(() => {
      if (settingsRefData) {
        analytics.track(AnalyticsEventName.BuilderEditTemplate, {});
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settingsRefData]);

    useEffect(() => {
      if (templateForm && refData.jiraFieldMap) {
        const usedJiraFieldKeys = Object.values(
          templateForm.design.questions,
        ).map(question => question.jiraField);
        for (const jiraField of refData.jiraFieldMap.values()) {
          if (
            jiraField.choiceApi &&
            isInsightChoiceApi(jiraField.choiceApi) &&
            usedJiraFieldKeys.includes(jiraField.key)
          ) {
            loadLinkedJiraFieldInsightChoices(jiraField).then(_ =>
              updateRefDataChoicesInEditor(
                editorActions,
                refData,
                templateForm,
              ),
            );
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templateForm, refData.jiraFieldMap]);

    useEffect(() => {
      if (refData.dataConnectionMap || refData.jiraFieldMap) {
        if (templateForm && selectedTab === FormBuilderTab.Build) {
          updateRefDataChoicesInEditor(
            editorActions,
            refData,
            templateForm,
          ).then(() => {});
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refData]);

    // warn the user if they are about to exist with unsaved changes in the form
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const lastSavedForm = savedForm.current;
      const currentForm = getCurrentForm(editorActions, savedForm);

      if (!lastSavedForm || !currentForm) {
        return;
      }

      if (formHasChanged(lastSavedForm, currentForm)) {
        event.preventDefault();
        event.returnValue = true;
      }
    };
    useBeforeUnloadHandler(handleBeforeUnload);

    const handleSave = async (adf: AdfForm): Promise<void> => {
      if (!templateForm) {
        return;
      }

      analytics.track(AnalyticsEventName.BuilderSaveForm, {
        projectId,
        portalForm: !!templateForm.publish?.portal,
        issueForm: !!templateForm.publish?.jira,
      });

      // adf exists in the Builder tab. In all other tabs, the templateForm is used.
      // adfToTemplateForm() strips choices from questions linked to a jira field or data connection.
      const updatedForm = adf
        ? adfToTemplateForm(templateForm, adf)
        : templateForm;

      // save settings from settings tab
      if (formSettings) {
        updatedForm.design.settings.language = formSettings.language;
        updatedForm.design.settings.name = formSettings.name;
        updatedForm.design.settings.submit = formSettings.submit;
        updatedForm.design.settings.portal = formSettings.portal;
      }
      // save publish settings
      if (formPublishSettings) {
        updatedForm.publish = formPublishSettings;
      }

      // Save new automation settings
      for (const rule of automationRulesState.rules) {
        if (rule.new && !rule.delete) {
          const ruleForAdd: any = addFormIdToRule(rule, templateForm.id);
          delete ruleForAdd.new;
          delete ruleForAdd.updated;
          delete ruleForAdd.id;

          const oldId = rule.id;

          await addAutomationRule(ruleForAdd).then(savedAutomationRule => {
            // Update rule ID locally
            updateAutomationRulesState({
              type: AutomationRuleStateAction.NewRuleSaved,
              oldId: oldId,
              newId: savedAutomationRule.id,
            });
          });
        }

        if (!rule.new && !rule.delete && rule.updated) {
          const ruleForUpdate: LocalAutomationRuleData = addFormIdToRule(
            rule,
            templateForm.id,
          );
          delete ruleForUpdate.updated;

          await updateAutomationRule(ruleForUpdate);
        }

        if (!rule.new && rule.delete) {
          await deleteAutomationRule(rule.id).then(() => {
            updateAutomationRulesState({
              type: AutomationRuleStateAction.DeleteRule,
              rule,
            });
          });
        }
      }

      setTemplateForm(updatedForm);
      savedForm.current = updatedForm;
      setRawAdf(adf);

      const finalForm = cleanupTemplateForm(updatedForm);
      await saveForm(finalForm);
    };

    const handleUpdateFormSettings = (newFormSettings: FormSettings) => {
      setFormSettings(newFormSettings);
      formSettingsRef.current = newFormSettings;
    };

    const handleFormNameChange = (updatedFormName: string): void => {
      const newFormSettings: FormSettings = {
        ...formSettings!,
        name: updatedFormName,
      };
      handleUpdateFormSettings(newFormSettings);
    };

    const handleUpdateFormPublishSettings = (
      newFormPublishSettings: FormPublishing,
    ) => {
      setFormPublishSettings(newFormPublishSettings);
    };

    const loading =
      loadingSettingsRefData ||
      loadingForm ||
      automationRulesState.loadingRules;

    const updateFormStore = (updatedForm: TemplateForm): void => {
      setFormStore(
        new FormStore(
          (formStore: FormStore) => () => {
            return Promise.resolve();
          },
          loadChoicesFn(
            (templateFormId: number, formId?: number) => {
              return Promise.reject();
            },
            (
              customFieldId: number,
              choiceApi: InsightChoiceApi,
              query: InsightObjectQuery,
            ) => {
              return Promise.reject();
            },
          ),
          (
            searchType: UserSearchType | undefined,
            questionId: number,
            query: string,
          ) => {
            return Promise.resolve([]);
          },
          convertTemplateFormToUnsavedForm(updatedForm),
          undefined,
          refData.jiraFieldMap,
        ),
      );
    };

    const handleTabOnChange = (newTab: number): void => {
      if (selectedTab === FormBuilderTab.Build) {
        if (templateForm) {
          editorActions.getValue().then(document => {
            const updatedForm = adfToTemplateForm(templateForm, document, true);
            setTemplateForm(updatedForm);
            updateFormStore(updatedForm);
            setSelectedTab(newTab);
          });
        }
      } else {
        setSelectedTab(newTab);
      }
    };

    const footer = <Footer onCancel={onClose} onSave={handleSave} />;

    return (
      <>
        <Helmet>
          <title>
            {intl.formatMessage(messages.pageTitle, {
              formName: formSettings?.name ?? '',
            })}
          </title>
        </Helmet>
        <JiraFormBuilderWrapper>
          <Tabs
            id="proforma-adf-form-builder"
            selected={selectedTab}
            onChange={handleTabOnChange}
          >
            <TabList>
              <FirstTabWrapper>
                <Tab>
                  <TabMessageWrapper>
                    <FormattedMessage {...messages.buildTabLabel} />
                  </TabMessageWrapper>
                </Tab>
              </FirstTabWrapper>
              <Tab>
                <TabMessageWrapper>
                  <FormattedMessage
                    {...IntlFormBuilderMessages[
                      FormBuilderMessage.PreviewTabHeading
                    ]}
                  />
                </TabMessageWrapper>
              </Tab>
              <Tab>
                <TabMessageWrapper>
                  <FormattedMessage
                    {...IntlFormBuilderMessages[
                      FormBuilderMessage.SettingsTabHeading
                    ]}
                  />
                </TabMessageWrapper>
              </Tab>
            </TabList>
            <TabPanel>
              {loading ? (
                <TabLoading />
              ) : (
                <TabBuild
                  form={templateForm}
                  refData={refData}
                  showTemplatesByDefault={showTemplatesByDefault}
                  loadLinkedJiraFieldInsightChoices={
                    loadLinkedJiraFieldInsightChoices
                  }
                  footer={footer}
                  formName={formSettings!.name}
                  updateFormName={handleFormNameChange}
                />
              )}
            </TabPanel>
            <TabPanel>
              {loading ? (
                <TabLoading />
              ) : (
                <TabPreview formStore={formStore} footer={footer} />
              )}
            </TabPanel>
            <TabPanel>
              {loading ? (
                <TabLoading />
              ) : (
                <TabSettings
                  projectKey={projectKey}
                  projectId={projectId}
                  isServiceProject={projectType === 'service_desk'}
                  isSimplifiedProject={isSimplifiedProject}
                  formSettings={formSettings!}
                  formPublishSettings={formPublishSettings}
                  settingsRefData={settingsRefData!}
                  updateFormSettings={handleUpdateFormSettings}
                  updateFormPublishSettings={handleUpdateFormPublishSettings}
                  automationRulesState={automationRulesState}
                  updateAutomationRulesState={updateAutomationRulesState}
                  AddShortcutModal={AddShortcutModal}
                  footer={footer}
                />
              )}
            </TabPanel>
          </Tabs>
        </JiraFormBuilderWrapper>
      </>
    );
  },
);
