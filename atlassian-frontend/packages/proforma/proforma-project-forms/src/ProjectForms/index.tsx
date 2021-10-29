import React from 'react';

import { injectIntl } from 'react-intl';

import { FlagsProvider } from '@atlaskit/flag';
import { ModalTransition } from '@atlaskit/modal-dialog';
import { ErrorBoundary } from '@atlassian/proforma-common-core/jira-common';
import {
  LiveProjectApi,
  LiveProjectFormApi,
  LiveTemplateFormApi,
} from '@atlassian/proforma-common-core/jira-common-apis';
import {
  ApisProvider,
  PfFlagsProvider,
  UtilsProvider,
} from '@atlassian/proforma-common-core/jira-common-context';
import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';
import { createUtils } from '@atlassian/proforma-common-core/jira-common-utils';
import {
  AsyncIntlProvider,
  Locale,
  parseLanguageTag,
  ProFormaIntlProvider,
} from '@atlassian/proforma-translations';

import * as i18n from '../i18n';

import {
  ProjectForms,
  ProjectFormsModuleContext,
  ProjectFormsSettings,
} from './ProjectForms';
import { ProjectFormsContextProvider } from './ProjectFormsContextProvider';

interface ProjectFormsBaseAppProps {
  settings: BackendSettings<ProjectFormsSettings>;
  moduleContext: ProjectFormsModuleContext;
  customLocale?: Locale;
}

export const ProjectFormsBaseApp = injectIntl<ProjectFormsBaseAppProps>(
  ({ settings, moduleContext, customLocale, intl }) => {
    const { apis, utils } = moduleContext;
    const { projectId, projectDisabled } = settings.context;

    const locale = customLocale ? customLocale : intl.locale;

    return (
      <ErrorBoundary errorUtils={utils.errorUtils}>
        <AsyncIntlProvider locale={parseLanguageTag(locale)}>
          <ProFormaIntlProvider i18nMessages={i18n}>
            <FlagsProvider>
              <PfFlagsProvider flags={settings.flags}>
                <UtilsProvider utils={utils}>
                  <ApisProvider
                    apis={[
                      apis.projectApi,
                      apis.projectFormApi,
                      apis.templateFormApi,
                    ]}
                  >
                    <ProjectFormsContextProvider
                      context={{
                        projectId,
                        projectDisabled: projectDisabled || false,
                      }}
                    >
                      {
                        // @ts-ignore
                        <ProjectForms
                          requestTypes={settings.context.requestTypes}
                        />
                      }
                    </ProjectFormsContextProvider>
                    <ModalTransition>
                      <div id="pf-dialog-container" />
                    </ModalTransition>
                  </ApisProvider>
                </UtilsProvider>
              </PfFlagsProvider>
            </FlagsProvider>
          </ProFormaIntlProvider>
        </AsyncIntlProvider>
      </ErrorBoundary>
    );
  },
);

interface ProjectFormsAppProps {
  settings: BackendSettings<ProjectFormsSettings>;
}

export const ProjectFormsApp = injectIntl<ProjectFormsAppProps>(
  ({ settings, intl }) => {
    const createdUtils = createUtils(
      settings,
      'ProjectForms',
      'ProjectForms',
      parseLanguageTag(intl.locale),
    );

    const moduleContext: ProjectFormsModuleContext = {
      apis: {
        projectFormApi: new LiveProjectFormApi(createdUtils.apiUtil),
        templateFormApi: new LiveTemplateFormApi(createdUtils.apiUtil),
        projectApi: new LiveProjectApi(createdUtils.apiUtil),
      },
      utils: {
        analyticsUtils: createdUtils.analyticsUtils,
        browserUtils: createdUtils.browserUtils,
        errorUtils: createdUtils.errorUtils,
      },
    };

    return (
      <ProjectFormsBaseApp settings={settings} moduleContext={moduleContext} />
    );
  },
);

export default ProjectFormsApp;
