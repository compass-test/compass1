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
  IssueCreateDirectBaseApp,
  IssueCreateDirectContext,
  IssueCreateDirectSettings,
} from '../src/components';

import { MockIssueCreateFormApiV3 } from './mocks/MockIssueCreateFormApiV3';

export default function LoadIssueCreateDirectExample() {
  const locale = Locale.en_AU;

  const mockData = new MockData();
  loadTypicalMockData(mockData);

  const mockFormApi = new MockFormApi(mockData);
  const mockIssueCreateFormApiV3 = new MockIssueCreateFormApiV3(mockData);
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const mockAnalyticsUtils = new MockAnalyticsUtils();

  const settings: BackendSettings<IssueCreateDirectSettings> = createBackendSettings(
    {
      projectId: 1,
      templateFormId: 1,
      issueTypeId: 'mockIssueTypeId',
    },
  );

  const moduleContext: IssueCreateDirectContext = {
    apis: {
      formApi: mockFormApi,
      issueCreateFormApiV3: mockIssueCreateFormApiV3,
    },
    utils: {
      errorUtils: mockErrorUtils,
      analyticsUtils: mockAnalyticsUtils,
      browserUtils: mockBrowserUtils,
    },
  };

  return (
    <div data-testid="proforma-jira-issue-create-direct">
      <IntlProvider locale={toLanguageTag(locale)}>
        <IssueCreateDirectBaseApp
          settings={settings}
          moduleContext={moduleContext}
        />
      </IntlProvider>
    </div>
  );
}
