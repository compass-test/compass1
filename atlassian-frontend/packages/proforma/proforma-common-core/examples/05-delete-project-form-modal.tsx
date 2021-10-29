import React from 'react';

import { MockData } from '@af/proforma-mocks';
import { AsyncIntlProvider, Locale } from '@atlassian/proforma-translations';

import { DeleteProjectFormModal } from '../src/jira-common/components/ListProjectForms/DeleteProjectFormModal';
import { IssueTypeRenderer } from '../src/jira-common/components/ListProjectForms/TypeRenderer';

export default function DeleteProjectFormModalExample() {
  const locale = Locale.en_AU;
  const mockData = new MockData();
  const mockForm = mockData.templateFormIndexes[2];
  return (
    <div data-testid="proforma-delete-project-form-modal">
      <AsyncIntlProvider locale={locale}>
        <DeleteProjectFormModal
          form={mockForm}
          onClose={() => console.log('on close')}
          onConfirm={() => console.log('on confirm')}
          requestTypes={false}
          typeRenderer={new IssueTypeRenderer()}
        />
      </AsyncIntlProvider>
    </div>
  );
}
