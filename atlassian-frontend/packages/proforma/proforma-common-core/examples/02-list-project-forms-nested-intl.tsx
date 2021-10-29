import React from 'react';

import {
  MockAnalyticsUtils,
  MockBrowserUtils,
  MockData,
  MockErrorUtils,
  MockProjectApi,
  MockProjectFormApi,
  MockTemplateFormApi,
} from '@af/proforma-mocks';
import { FlagsProvider } from '@atlaskit/flag';
import { ModalTransition } from '@atlaskit/modal-dialog';
import { AsyncIntlProvider, Locale } from '@atlassian/proforma-translations';

import { ListProjectForms } from '../src/jira-common/components/ListProjectForms/ListProjectForms';
import { PfAnalyticsUtilsProvider } from '../src/jira-common/context/AnalyticsUtilsContext';
import { PfBrowserUtilsProvider } from '../src/jira-common/context/BrowserUtilsContext';
import { PfErrorUtilsProvider } from '../src/jira-common/context/ErrorUtilsContext';
import { ProjectApiProvider } from '../src/jira-common/context/ProjectApiContext';
import { ProjectDisabledProvider } from '../src/jira-common/context/ProjectDisabledContext';
import { ProjectFormApiProvider } from '../src/jira-common/context/ProjectFormApiContext';
import { ProjectIdProvider } from '../src/jira-common/context/ProjectIdContext';
import { TemplateFormApiProvider } from '../src/jira-common/context/TemplateFormApiContext';

export default function ListProjectFormsWithNestedIntlExample() {
  const locale = Locale.fr_FR;
  const mockData = new MockData();
  const mockProjectFormApi = new MockProjectFormApi(mockData);
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const mockAnalyticsUtils = new MockAnalyticsUtils();
  const mockTemplateFormApi = new MockTemplateFormApi(mockData);
  const mockProjectApi = new MockProjectApi(mockData);

  return (
    <div data-testid="proforma-list-project-forms">
      <AsyncIntlProvider locale={locale}>
        <PfAnalyticsUtilsProvider analyticsUtils={mockAnalyticsUtils}>
          <PfErrorUtilsProvider errorUtils={mockErrorUtils}>
            <PfBrowserUtilsProvider browserUtils={mockBrowserUtils}>
              <ProjectDisabledProvider projectDisabled={false}>
                <TemplateFormApiProvider templateFormApi={mockTemplateFormApi}>
                  <ProjectFormApiProvider projectFormApi={mockProjectFormApi}>
                    <ProjectApiProvider projectApi={mockProjectApi}>
                      <ProjectIdProvider projectId={0}>
                        <FlagsProvider>
                          <ListProjectForms requestTypes={true} />
                          <ModalTransition>
                            <div id="pf-dialog-container" />
                          </ModalTransition>
                        </FlagsProvider>
                      </ProjectIdProvider>
                    </ProjectApiProvider>
                  </ProjectFormApiProvider>
                </TemplateFormApiProvider>
              </ProjectDisabledProvider>
            </PfBrowserUtilsProvider>
          </PfErrorUtilsProvider>
        </PfAnalyticsUtilsProvider>
      </AsyncIntlProvider>
    </div>
  );
}
