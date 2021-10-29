import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ContentSection, ContentSectionEmptyState } from '../src/ui';

export default function SidebarSection() {
  return (
    <CompassTestProvider>
      <div style={{ width: '250px' }}>
        <ContentSection
          title="On-call schedules"
          name="on-call"
          position="sidebar"
          description="On-call schedules show who's handling incidents for this team."
        >
          <ContentSectionEmptyState actionLabel="Add a link" onClick={() => {}}>
            Add a new on-call schedule
          </ContentSectionEmptyState>
        </ContentSection>
      </div>
    </CompassTestProvider>
  );
}
