import React, { useRef, useState } from 'react';

import isEqual from 'lodash/isEqual';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { EditorContext, WithEditorActions } from '@atlaskit/editor-core';
import { FlagsProvider } from '@atlaskit/flag';
import { ModalTransition } from '@atlaskit/modal-dialog';
import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';
import {
  ErrorBoundary,
  NoticeType,
} from '@atlassian/proforma-common-core/jira-common';
import {
  ApiUtil,
  insightPathSegment,
} from '@atlassian/proforma-common-core/jira-common-apis';
import {
  PfFlagsProvider,
  UtilsProvider,
} from '@atlassian/proforma-common-core/jira-common-context';
import {
  ApiError,
  ApiErrorType,
  AutomationRuleData,
  AutomationRuleDataNoId,
  BackendSettings,
  FormBuilderDataConnections,
  FormBuilderJiraFields,
  INSIGHT_OBJECT_LIMIT,
  InsightApiResponse,
  InsightObjectQuery,
  isInsightChoiceApi,
  JiraField,
  ReferenceData,
  UnknownApiError,
} from '@atlassian/proforma-common-core/jira-common-models';
import { ModuleContextV3 } from '@atlassian/proforma-common-core/jira-common-stores';
import { createUtils } from '@atlassian/proforma-common-core/jira-common-utils';
import {
  TemplateApi,
  TemplateApiProvider,
} from '@atlassian/proforma-form-builder';
import {
  AsyncIntlProvider,
  Locale,
  parseLanguageTag,
  ProFormaIntlProvider,
} from '@atlassian/proforma-translations';

import { LiveSettingsApi } from '../apis/LiveSettingsApi';
import { LiveTemplateApi } from '../apis/LiveTemplateApi';
import { LiveTemplateFormApi } from '../apis/LiveTemplateFormApi';
import { SettingsApi } from '../apis/SettingsApi';
import { TemplateFormApi } from '../apis/TemplateFormApi';
import * as i18n from '../i18n';
import { AddShortcutModalProps } from '../model/AddShortcutModalProps';

import { JiraFormBuilder } from './JiraFormBuilder';

interface JiraFormBuilderApis {
  apiUtil: ApiUtil;
  settingsApi: SettingsApi;
  templateFormApi: TemplateFormApi;
  templateApi: TemplateApi;
}

interface JiraFormBuilderModuleContext
  extends ModuleContextV3<JiraFormBuilderApis> {}

export interface JiraFormBuilderSettings {
  projectKey: string;
  projectId: number;
  projectType: 'business' | 'service_desk' | 'software';
  isSimplifiedProject: boolean; // true = Next-gen project; false = Classic project.
  templateFormId: number;
  AddShortcutModal?: (props: AddShortcutModalProps) => JSX.Element;
}

interface JiraFormBuilderBaseAppProps {
  settings: BackendSettings<JiraFormBuilderSettings>;
  moduleContext: JiraFormBuilderModuleContext;
  customLocale?: Locale;
}

export const JiraFormBuilderBaseApp = injectIntl(
  ({
    settings,
    moduleContext,
    customLocale,
    intl,
  }: JiraFormBuilderBaseAppProps & InjectedIntlProps) => {
    const { projectId, templateFormId } = settings.context;
    const { templateFormApi, settingsApi, templateApi } = moduleContext.apis;
    const { utils } = moduleContext;

    const locale = customLocale ? customLocale : parseLanguageTag(intl.locale);

    const isUnknownApiError = (error: ApiError): error is UnknownApiError => {
      return error.error === ApiErrorType.unknown;
    };

    const isTimeoutApiError = (error: ApiError) => {
      return error.error === ApiErrorType.timeout;
    };

    const handleError = (
      error: ApiError,
      noticeType: NoticeType,
    ): Promise<any> => {
      if (isTimeoutApiError(error)) {
        return utils.errorUtils
          .notifyUser(noticeType, 'API call timed out')
          .then(() => Promise.reject(error));
      }
      if (isUnknownApiError(error)) {
        switch (error.status) {
          // HTTP 401 and 403 errors are handled in the ApiUtil.fetchApi() call. they probably shouldn't be.
          case 401:
          case 403:
            return Promise.reject(error);
          default:
            return utils.errorUtils
              .notifyUser(noticeType, error.message)
              .then(() => Promise.reject(error));
        }
      }
      return utils.errorUtils
        .notifyUser(noticeType, error.error)
        .then(() => Promise.reject(error));
    };

    // most backend API calls timeout after 30 seconds. However the data connection route will take > 30 seconds if ANY
    // of the data connections are not working. Set a higher timeout to avoid always popping a dialog box when ANY data
    // connection is slow/not responding.
    const DEFAULT_TIMEOUT_MS = 35000; // 35 seconds
    const timeout = (
      promise: Promise<any>,
      timeoutMs: number = DEFAULT_TIMEOUT_MS,
    ): Promise<any> => {
      return Promise.race([
        new Promise((_, reject) =>
          setTimeout(
            () => reject({ error: ApiErrorType.timeout } as ApiError),
            timeoutMs,
          ),
        ),
        promise,
      ]);
    };

    const saveForm = (form: TemplateForm): Promise<any> => {
      return timeout(
        templateFormApi
          .putTemplateForm(projectId, templateFormId, form)
          .catch((error: ApiError) =>
            handleError(error, NoticeType.ErrorApiSaveTemplateFormFailed),
          ),
      );
    };

    const addAutomationRule = (
      automationRule: AutomationRuleDataNoId,
    ): Promise<AutomationRuleData> => {
      return timeout(
        settingsApi
          .postAutomationRule(automationRule)
          .catch((error: ApiError) =>
            handleError(error, NoticeType.ErrorApiAddAutomationRuleFailed),
          ),
      );
    };

    const updateAutomationRule = (
      automationRule: AutomationRuleData,
    ): Promise<any> => {
      return timeout(
        settingsApi
          .putAutomationRule(automationRule)
          .catch((error: ApiError) =>
            handleError(error, NoticeType.ErrorApiUpdateAutomationRuleFailed),
          ),
      );
    };

    const deleteAutomationRule = (ruleId: string): Promise<void> => {
      return timeout(
        settingsApi
          .deleteAutomationRule(ruleId)
          .catch((error: ApiError) =>
            handleError(error, NoticeType.ErrorApiDeleteAutomationRuleFailed),
          ),
      );
    };

    const loadTemplateForm = (): Promise<TemplateForm> => {
      return timeout(
        templateFormApi
          .getTemplateForm(projectId, templateFormId)
          .catch((error: ApiError) =>
            handleError(error, NoticeType.ErrorApiLoadTemplateFormFailed),
          ),
      );
    };

    const loadJiraFields = (): Promise<FormBuilderJiraFields> => {
      return timeout(
        templateFormApi.getJiraFields(projectId),
      ).catch((error: ApiError) =>
        handleError(error, NoticeType.ErrorApiLoadJiraFieldsFailed),
      );
    };

    const loadDataConnections = (): Promise<FormBuilderDataConnections> => {
      return timeout(
        templateFormApi.getDataConnections(projectId),
      ).catch((error: ApiError) =>
        handleError(error, NoticeType.ErrorApiLoadDataConnectionsFailed),
      );
    };

    const loadSettingsRefData = (): Promise<ReferenceData> => {
      return timeout(
        templateFormApi.getReferenceData(),
      ).catch((error: ApiError) =>
        handleError(error, NoticeType.ErrorApiLoadSettingsRefDataFailed),
      );
    };

    const loadAutomationRules = (): Promise<AutomationRuleData[]> => {
      return timeout(
        settingsApi.getAutomationRules(),
      ).catch((error: ApiError) =>
        handleError(error, NoticeType.ErrorApiLoadAutomationRulesFailed),
      );
    };

    const loadLinkedJiraFieldInsightChoices = (
      jiraField: JiraField,
    ): Promise<any[]> => {
      if (!jiraField.choiceApi || !isInsightChoiceApi(jiraField.choiceApi)) {
        // eslint-disable-next-line no-console
        console.error(
          `Error looking up Insight field choices [${jiraField.key}]: Not an Insight Choice API.`,
        );
        return Promise.resolve([]);
      }
      // eslint-disable-next-line no-console
      console.info(
        `Looking up Insight field choices [${jiraField.key}] (field config id ${jiraField.choiceApi.fieldConfigId})`,
      );
      const insightObjectQuery: InsightObjectQuery = {
        currentProject: settings.context.projectKey,
        currentReporter: '',
        customFieldRequestFields: [],
        excludeIssueScope: false,
        limit: INSIGHT_OBJECT_LIMIT + 1,
      };
      const pathSegment = insightPathSegment(jiraField.choiceApi);
      if (!pathSegment) {
        return Promise.resolve([]);
      }
      return moduleContext.apis.apiUtil
        .jiraPost(
          `/rest/insight/1.0/customfield/${pathSegment}/${jiraField.choiceApi.fieldConfigId}/objects`,
          insightObjectQuery,
        )
        .then((response: InsightApiResponse) => {
          jiraField.hasMoreChoices = response.size > INSIGHT_OBJECT_LIMIT;
          if (jiraField.hasMoreChoices) {
            response.objects.pop();
          }
          jiraField.choices = response.objects.map(obj => ({
            id: obj.id.toString(),
            label: obj.label,
          }));
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(
            `Error looking up Insight field choices [${jiraField.key}]:`,
            e,
          );
        })
        .then(() => []);
    };

    return (
      <ErrorBoundary errorUtils={utils.errorUtils}>
        <AsyncIntlProvider locale={locale}>
          <ProFormaIntlProvider i18nMessages={i18n}>
            <PfFlagsProvider flags={settings.flags}>
              <UtilsProvider utils={utils}>
                <TemplateApiProvider templateApi={templateApi}>
                  <FlagsProvider>
                    <EditorContext>
                      <WithEditorActions
                        render={actions => (
                          <JiraFormBuilder
                            projectKey={settings.context.projectKey}
                            projectId={settings.context.projectId}
                            projectType={settings.context.projectType}
                            isSimplifiedProject={
                              settings.context.isSimplifiedProject
                            }
                            loadTemplateForm={loadTemplateForm}
                            loadJiraFields={loadJiraFields}
                            loadDataConnections={loadDataConnections}
                            loadSettingsRefData={loadSettingsRefData}
                            loadAutomationRules={loadAutomationRules}
                            onClose={() =>
                              utils.browserUtils.goToUrl(
                                getFormsListUrl(settings),
                              )
                            }
                            saveForm={saveForm}
                            addAutomationRule={addAutomationRule}
                            updateAutomationRule={updateAutomationRule}
                            deleteAutomationRule={deleteAutomationRule}
                            editorActions={actions}
                            loadLinkedJiraFieldInsightChoices={
                              loadLinkedJiraFieldInsightChoices
                            }
                            AddShortcutModal={settings.context.AddShortcutModal}
                          />
                        )}
                      />
                    </EditorContext>
                    <ModalTransition>
                      <div id="pf-dialog-container" />
                    </ModalTransition>
                  </FlagsProvider>
                </TemplateApiProvider>
              </UtilsProvider>
            </PfFlagsProvider>
          </ProFormaIntlProvider>
        </AsyncIntlProvider>
      </ErrorBoundary>
    );
  },
);

function getFormsListUrl(
  settings: BackendSettings<JiraFormBuilderSettings>,
): string {
  const { projectKey, projectType, isSimplifiedProject } = settings.context;
  const product =
    projectType === 'business'
      ? 'core'
      : projectType === 'service_desk'
      ? 'servicedesk'
      : /* projectType === 'software' && */ isSimplifiedProject
      ? 'software'
      : 'software/c';
  return `/jira/${product}/projects/${projectKey}/settings/forms`;
}

interface JiraFormBuilderAppProps {
  settings: BackendSettings<JiraFormBuilderSettings>;
}

export const JiraFormBuilderApp = injectIntl(
  ({ settings, intl }: JiraFormBuilderAppProps & InjectedIntlProps) => {
    const createModuleContext = (): JiraFormBuilderModuleContext => {
      const utils = createUtils(
        settings,
        'AdfFormBuilder',
        'JiraAdfFormBuilder',
        parseLanguageTag(intl.locale),
      );
      return {
        apis: {
          apiUtil: utils.apiUtil,
          settingsApi: new LiveSettingsApi(utils.apiUtil, settings),
          templateApi: new LiveTemplateApi(settings.urls.templatesService),
          templateFormApi: new LiveTemplateFormApi(
            settings.context.projectId,
            utils.apiUtil,
          ),
        },
        utils: {
          analyticsUtils: utils.analyticsUtils,
          browserUtils: utils.browserUtils,
          errorUtils: utils.errorUtils,
        },
      };
    };

    const settingsRef = useRef(settings);
    const [moduleContext, setModuleContext] = useState(createModuleContext);
    if (!isEqual(settingsRef.current, settings)) {
      settingsRef.current = settings;
      setModuleContext(createModuleContext());
    }

    return (
      <JiraFormBuilderBaseApp
        settings={settingsRef.current}
        moduleContext={moduleContext}
      />
    );
  },
);
