import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ContentSection, ContentSectionEmptyState } from '../src/ui';

export default function MainSection() {
  return (
    <CompassTestProvider>
      <div style={{ width: '600px' }}>
        <ContentSection title="Repositories" name="repository">
          <ContentSectionEmptyState actionLabel="Add a link" onClick={() => {}}>
            Add a new repository link
          </ContentSectionEmptyState>
        </ContentSection>
      </div>
    </CompassTestProvider>
  );
}
