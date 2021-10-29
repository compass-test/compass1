import React from 'react';

import {
  MockAnalyticsUtils,
  MockBrowserUtils,
  MockErrorUtils,
  MockTemplateApi,
} from '@af/proforma-mocks';
import { EditorContext, WithEditorActions } from '@atlaskit/editor-core';
import { ModalTransition } from '@atlaskit/modal-dialog';
import { ErrorBoundary } from '@atlassian/proforma-common-core/jira-common';
import {
  PfAnalyticsUtilsProvider,
  PfBrowserUtilsProvider,
  PfErrorUtilsProvider,
  PfFlagsProvider,
} from '@atlassian/proforma-common-core/jira-common-context';
import {
  AsyncIntlProvider,
  DEFAULT_LOCALE,
} from '@atlassian/proforma-translations';

import {
  FormBuilder,
  FormBuilderReferenceData,
  TemplateApiProvider,
} from '../src';

export default function LoadFormBuilderEmptyExample() {
  const devTemplatesServiceUrl = 'https://dev-templateservice.thinktilt.net';
  const locale = DEFAULT_LOCALE;
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const mockAnalyticsUtils = new MockAnalyticsUtils();
  const mockTemplateApi = new MockTemplateApi(devTemplatesServiceUrl);
  const formBuilderReferenceData: FormBuilderReferenceData = {};

  return (
    <div
      data-testid="proforma-load-form-builder"
      style={{ display: 'flex', height: '100vh' }}
    >
      <AsyncIntlProvider locale={locale}>
        <ErrorBoundary errorUtils={mockErrorUtils}>
          <PfErrorUtilsProvider errorUtils={mockErrorUtils}>
            <PfAnalyticsUtilsProvider analyticsUtils={mockAnalyticsUtils}>
              <PfBrowserUtilsProvider browserUtils={mockBrowserUtils}>
                <PfFlagsProvider flags={{}}>
                  <TemplateApiProvider templateApi={mockTemplateApi}>
                    <EditorContext>
                      <WithEditorActions
                        render={actions => (
                          <FormBuilder
                            refData={formBuilderReferenceData}
                            editorActions={actions}
                            loadLinkedJiraFieldInsightChoices={() =>
                              Promise.resolve([])
                            }
                            footer={<div>Footer placeholder</div>}
                            updateFormName={() => {}}
                          />
                        )}
                      />
                    </EditorContext>
                    <ModalTransition>
                      <div id="pf-dialog-container" />
                    </ModalTransition>
                  </TemplateApiProvider>
                </PfFlagsProvider>
              </PfBrowserUtilsProvider>
            </PfAnalyticsUtilsProvider>
          </PfErrorUtilsProvider>
        </ErrorBoundary>
      </AsyncIntlProvider>
    </div>
  );
}
