import React from 'react';

import { IntlProvider } from 'react-intl';

import {
  createBackendSettings,
  MockAnalyticsUtils,
  MockBrowserUtils,
  MockData,
  MockErrorUtils,
  MockFormApi,
  mockTemplateForm,
} from '@af/proforma-mocks';
import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';
import { Locale, toLanguageTag } from '@atlassian/proforma-translations';

import {
  PortalCreateBaseApp,
  PortalCreateModuleContext,
  PortalCreateSettings,
} from '../src/components';

import { MockPortalCreateFormApiV3 } from './mocks/MockPortalCreateFormApiV3';

export default function LoadPortalCreateExample() {
  const locale = Locale.fr_FR;

  const mockData = new MockData();
  mockData.addTemplateForm(mockTemplateForm);

  const mockFormApi = new MockFormApi(mockData);
  const mockPortalCreateFormApiV3 = new MockPortalCreateFormApiV3(
    mockData,
    mockTemplateForm.id,
  );
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const mockAnalyticsUtils = new MockAnalyticsUtils();

  const settings: BackendSettings<PortalCreateSettings> = createBackendSettings(
    {
      serviceDeskId: 1,
      requestTypeId: 1,
    },
  );

  const moduleContext: PortalCreateModuleContext = {
    apis: {
      formApi: mockFormApi,
      formApiV3: mockPortalCreateFormApiV3,
    },
    utils: {
      errorUtils: mockErrorUtils,
      analyticsUtils: mockAnalyticsUtils,
      browserUtils: mockBrowserUtils,
    },
  };

  return (
    <div data-testid="proforma-jira-portal-create">
      <IntlProvider locale={toLanguageTag(locale)}>
        <PortalCreateBaseApp
          settings={settings}
          moduleContext={moduleContext}
          registerPortalForm={() => {}}
        />
      </IntlProvider>
    </div>
  );
}
