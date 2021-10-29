import React from 'react';

import { MockData, MockProjectApi } from '@af/proforma-mocks';
import { AsyncIntlProvider, Locale } from '@atlassian/proforma-translations';

import { CopyProjectFormModal } from '../src/jira-common/components/ListProjectForms/CopyProjectFormModal';
import { ProjectApiProvider } from '../src/jira-common/context';

export default function CopyProjectFormModalExample() {
  const locale = Locale.en_AU;
  const mockData = new MockData();
  const mockProjectApi = new MockProjectApi(mockData);
  return (
    <div data-testid="proforma-copy-project-form-modal">
      <AsyncIntlProvider locale={locale}>
        <ProjectApiProvider projectApi={mockProjectApi}>
          <CopyProjectFormModal
            formToCopy={mockData.templateFormIndexes[0]}
            onClose={() => console.log('on close')}
            onConfirm={projects => console.log('on confirm', projects)}
          />
        </ProjectApiProvider>
      </AsyncIntlProvider>
    </div>
  );
}
