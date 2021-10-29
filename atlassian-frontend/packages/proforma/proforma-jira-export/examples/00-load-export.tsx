import React from 'react';

import { IntlProvider } from 'react-intl';

import {
  createBackendSettings,
  loadTypicalMockData,
  MockAnalyticsUtils,
  MockBrowserUtils,
  MockData,
  MockErrorUtils,
  MockProjectApi,
  MockProjectFormApi,
} from '@af/proforma-mocks';
import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';
import { Locale, toLanguageTag } from '@atlassian/proforma-translations';

import {
  ExportBaseApp,
  ExportModuleContext,
  ExportSettings,
} from '../src/components';

import { MockExportApi } from './mocks/MockExportApi';

export default function LoadExportExample() {
  const locale = Locale.en_AU;

  const mockData = new MockData();
  loadTypicalMockData(mockData);

  const mockProjectApi = new MockProjectApi(mockData);
  const mockProjectFormApi = new MockProjectFormApi(mockData);
  const mockExportApi = new MockExportApi();
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const mockAnalyticsUtils = new MockAnalyticsUtils();

  const settings: BackendSettings<ExportSettings> = createBackendSettings({
    issueKeys: ['PROJ0-1'],
  });

  const moduleContext: ExportModuleContext = {
    apis: {
      projectApi: mockProjectApi,
      projectFormApi: mockProjectFormApi,
      exportApi: mockExportApi,
    },
    utils: {
      errorUtils: mockErrorUtils,
      analyticsUtils: mockAnalyticsUtils,
      browserUtils: mockBrowserUtils,
    },
  };

  return (
    <div data-testid="proforma-jira-export">
      <IntlProvider locale={toLanguageTag(locale)}>
        <ExportBaseApp settings={settings} moduleContext={moduleContext} />
      </IntlProvider>
    </div>
  );
}
