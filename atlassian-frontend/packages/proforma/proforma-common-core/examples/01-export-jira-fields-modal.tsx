import React from 'react';

import { MockBrowserUtils } from '@af/proforma-mocks';
import { AsyncIntlProvider, Locale } from '@atlassian/proforma-translations';

import { ExportJiraFieldsModal } from '../src/jira-common/components/Export/ExportJiraFieldsModal';
import { PfBrowserUtilsProvider } from '../src/jira-common/context/BrowserUtilsContext';

export default function ExportJiraFieldsModalExample() {
  const locale = Locale.en_AU;
  const mockBrowserUtils = new MockBrowserUtils(locale);
  return (
    <div data-testid="proforma-export-jira-fields-modal">
      <AsyncIntlProvider locale={locale}>
        <PfBrowserUtilsProvider browserUtils={mockBrowserUtils}>
          <ExportJiraFieldsModal closeModal={() => {}} />
        </PfBrowserUtilsProvider>
      </AsyncIntlProvider>
    </div>
  );
}
