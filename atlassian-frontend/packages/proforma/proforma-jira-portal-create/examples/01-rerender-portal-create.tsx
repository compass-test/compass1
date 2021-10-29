import React, { useState } from 'react';

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

interface RerenderWrapperProps {
  children: ({
    settings,
    moduleContext,
  }: {
    settings: BackendSettings<PortalCreateSettings>;
    moduleContext: PortalCreateModuleContext;
  }) => JSX.Element;
}

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

  const RerenderWrapper = ({ children }: RerenderWrapperProps) => {
    const [count, setCount] = useState<number>(0);
    const settings: BackendSettings<PortalCreateSettings> = createBackendSettings(
      {
        serviceDeskId: count,
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
      <div>
        <button onClick={() => setCount(count + 1)}>Re-render: {count}</button>
        {children({ settings, moduleContext })}
      </div>
    );
  };

  return (
    <div data-testid="proforma-jira-portal-create">
      <IntlProvider locale={toLanguageTag(locale)}>
        <RerenderWrapper>
          {({ settings, moduleContext }) => {
            return (
              <PortalCreateBaseApp
                settings={settings}
                moduleContext={moduleContext}
                registerPortalForm={() => {}}
              />
            );
          }}
        </RerenderWrapper>
      </IntlProvider>
    </div>
  );
}
