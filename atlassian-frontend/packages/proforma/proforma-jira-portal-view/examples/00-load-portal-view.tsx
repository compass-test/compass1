import React from 'react';

import { IntlProvider } from 'react-intl';

import {
  createBackendSettings,
  MockAnalyticsUtils,
  MockBrowserUtils,
  MockData,
  MockErrorUtils,
  MockFormApi,
} from '@af/proforma-mocks';
import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';
import { FormViewModuleContext } from '@atlassian/proforma-common-core/jira-common-stores';
import { Locale, toLanguageTag } from '@atlassian/proforma-translations';

import {
  permissions,
  PortalViewBaseApp,
  PortalViewSettings,
} from '../src/components';

import { MockPortalFormApiV3 } from './mocks/MockPortalFormApiV3';

export default function LoadPortalViewExample() {
  const locale = Locale.en_AU;

  const mockData = new MockData();

  const mockFormApi = new MockFormApi(mockData);
  const mockPortalFormApiV3 = new MockPortalFormApiV3(mockData, 'TEST-1');
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const mockAnalyticsUtils = new MockAnalyticsUtils();

  const settings: BackendSettings<PortalViewSettings> = createBackendSettings({
    serviceDeskId: 1,
    requestTypeId: 1,
    projectId: 0,
    issueKey: 'TEST-1',
    issueId: 10001,
  });

  const moduleContext: FormViewModuleContext = {
    apis: {
      formApi: mockFormApi,
      formApiV3: mockPortalFormApiV3,
    },
    utils: {
      errorUtils: mockErrorUtils,
      analyticsUtils: mockAnalyticsUtils,
      browserUtils: mockBrowserUtils,
    },
    permissions,
  };

  return (
    <div data-testid="proforma-jira-portal-view">
      <IntlProvider locale={toLanguageTag(locale)}>
        <PortalViewBaseApp settings={settings} moduleContext={moduleContext} />
      </IntlProvider>
    </div>
  );
}
