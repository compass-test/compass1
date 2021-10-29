import React from 'react';

import { IntlProvider } from 'react-intl';

import {
  createBackendSettings,
  MockAnalyticsUtils,
  MockBrowserUtils,
  MockData,
  MockErrorUtils,
  MockProjectApi,
  MockProjectFormApi,
  MockTemplateFormApi,
} from '@af/proforma-mocks';
import { PfUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';
import {
  DEFAULT_LOCALE,
  toLanguageTag,
} from '@atlassian/proforma-translations';

import { ProjectFormsBaseApp } from '../src/ProjectForms';
import {
  ProjectFormsApis,
  ProjectFormsModuleContext,
  ProjectFormsSettings,
} from '../src/ProjectForms/ProjectForms';

export default function ListProjectFormsExample() {
  const locale = DEFAULT_LOCALE;
  const projectId = 0;
  const mockData = new MockData();
  const mockProjectFormApi = new MockProjectFormApi(mockData);
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const mockAnalyticsUtils = new MockAnalyticsUtils();
  const mockTemplateFormApi = new MockTemplateFormApi(mockData);
  const mockProjectApi = new MockProjectApi(mockData);

  const settings: BackendSettings<ProjectFormsSettings> = createBackendSettings(
    {
      projectId: projectId,
      projectDisabled: false,
      requestTypes: true,
    },
  );
  const apis: ProjectFormsApis = {
    templateFormApi: mockTemplateFormApi,
    projectFormApi: mockProjectFormApi,
    projectApi: mockProjectApi,
  };
  const utils: PfUtils = {
    errorUtils: mockErrorUtils,
    analyticsUtils: mockAnalyticsUtils,
    browserUtils: mockBrowserUtils,
  };
  const moduleContext: ProjectFormsModuleContext = {
    apis: apis,
    utils: utils,
  };

  return (
    <div data-testid="proforma-project-forms">
      <IntlProvider locale={toLanguageTag(locale)}>
        <ProjectFormsBaseApp
          settings={settings}
          moduleContext={moduleContext}
        />
      </IntlProvider>
    </div>
  );
}
