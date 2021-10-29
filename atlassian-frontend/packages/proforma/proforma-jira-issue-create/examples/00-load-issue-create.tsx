import React from 'react';

import { IntlProvider } from 'react-intl';

import {
  createBackendSettings,
  loadTypicalMockData,
  MockAnalyticsUtils,
  MockBrowserUtils,
  MockData,
  MockErrorUtils,
  MockFormApi,
} from '@af/proforma-mocks';
import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';
import { Locale, toLanguageTag } from '@atlassian/proforma-translations';

import {
  IssueCreateBaseApp,
  IssueCreateModuleContext,
  IssueCreateSettings,
} from '../src/components';

import { MockIssueCreateFormApiV3 } from './mocks/MockIssueCreateFormApiV3';
import { MockUserApi } from './mocks/MockUserApi';

export default function LoadIssueCreateExample() {
  const locale = Locale.en_AU;

  const mockData = new MockData();
  loadTypicalMockData(mockData);

  const mockFormApi = new MockFormApi(mockData);
  const mockIssueCreateFormApiV3 = new MockIssueCreateFormApiV3(mockData);
  const mockUserApi = new MockUserApi(mockIssueCreateFormApiV3);
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const mockAnalyticsUtils = new MockAnalyticsUtils();

  const settings: BackendSettings<IssueCreateSettings> = createBackendSettings({
    projectId: 1,
  });

  const moduleContext: IssueCreateModuleContext = {
    apis: {
      formApi: mockFormApi,
      issueCreateFormApiV3: mockIssueCreateFormApiV3,
      userApi: mockUserApi,
    },
    utils: {
      errorUtils: mockErrorUtils,
      analyticsUtils: mockAnalyticsUtils,
      browserUtils: mockBrowserUtils,
    },
  };

  return (
    <div data-testid="proforma-jira-issue-create">
      <IntlProvider locale={toLanguageTag(locale)}>
        <IssueCreateBaseApp settings={settings} moduleContext={moduleContext} />
      </IntlProvider>
    </div>
  );
}
