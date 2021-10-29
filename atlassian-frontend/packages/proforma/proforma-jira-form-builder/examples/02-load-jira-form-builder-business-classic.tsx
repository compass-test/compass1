import React from 'react';

import { IntlProvider } from 'react-intl';

import {
  createBackendSettings,
  loadTypicalMockData,
  MockAnalyticsUtils,
  MockApiUtil,
  MockAuthUtil,
  MockBrowserUtils,
  MockData,
  MockErrorUtils,
  MockTemplateApi,
} from '@af/proforma-mocks';
import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';
import {
  DEFAULT_LOCALE,
  toLanguageTag,
} from '@atlassian/proforma-translations';

import { JiraFormBuilderSettings } from '../src';
import { JiraFormBuilderBaseApp } from '../src/components';

import { AddShortcutModal } from './mocks/AddShortcutModal';
import { MockSettingsApi } from './mocks/MockSettingsApi';
import { MockTemplateFormApi } from './mocks/MockTemplateFormApi';

export default function LoadJiraFormBuilderEmptyExample() {
  const locale = DEFAULT_LOCALE;

  const settings: BackendSettings<JiraFormBuilderSettings> = createBackendSettings(
    {
      projectKey: 'PROJ',
      projectId: 1,
      projectType: 'business',
      isSimplifiedProject: false,
      templateFormId: 1,
      AddShortcutModal,
    },
  );
  settings.urls.templatesService = 'https://dev-templateservice.thinktilt.net';

  const mockData = new MockData();
  loadTypicalMockData(mockData);

  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const moduleContext = {
    apis: {
      apiUtil: new MockApiUtil(
        settings.urls,
        new MockAuthUtil(settings.urls.api),
        mockErrorUtils,
      ),
      settingsApi: new MockSettingsApi(mockData),
      templateApi: new MockTemplateApi(settings.urls.templatesService),
      templateFormApi: new MockTemplateFormApi(mockData),
    },
    utils: {
      analyticsUtils: new MockAnalyticsUtils(),
      browserUtils: mockBrowserUtils,
      errorUtils: mockErrorUtils,
    },
  };

  return (
    <div data-testid="proforma-load-form-builder" style={{ height: '100vh' }}>
      <IntlProvider locale={toLanguageTag(locale)}>
        <JiraFormBuilderBaseApp
          settings={settings}
          moduleContext={moduleContext}
        />
      </IntlProvider>
    </div>
  );
}
