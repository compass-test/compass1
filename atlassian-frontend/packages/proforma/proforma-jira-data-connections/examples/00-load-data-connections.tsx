import React from 'react';

import { IntlProvider } from 'react-intl';

import {
  createBackendSettings,
  MockAnalyticsUtils,
  MockBrowserUtils,
  MockData,
  MockErrorUtils,
  mockTemplateForm,
} from '@af/proforma-mocks';
import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';
import { Locale, toLanguageTag } from '@atlassian/proforma-translations';

import {
  DataConnectionModuleContext,
  DataConnectionsBaseApp,
  DataConnectionsSettings,
} from '../src/components';

import { MockDataConnectionsApi } from './mocks/MockDataConnectionsApi';

export default function LoadPortalCreateExample() {
  const locale = Locale.en_AU;

  const mockData = new MockData();
  mockData.addTemplateForm(mockTemplateForm);

  const mockDataConnectionsApi = new MockDataConnectionsApi(mockData);
  const mockAnalyticsUtils = new MockAnalyticsUtils();
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);

  const settings: BackendSettings<DataConnectionsSettings> = createBackendSettings(
    {},
  );

  const moduleContext: DataConnectionModuleContext = {
    apis: {
      dataConnectionsApi: mockDataConnectionsApi,
    },
    utils: {
      analyticsUtils: mockAnalyticsUtils,
      browserUtils: mockBrowserUtils,
      errorUtils: mockErrorUtils,
    },
  };

  return (
    <div data-testid="proforma-jira-data-connections">
      <IntlProvider locale={toLanguageTag(locale)}>
        <DataConnectionsBaseApp
          settings={settings}
          moduleContext={moduleContext}
        />
      </IntlProvider>
    </div>
  );
}
