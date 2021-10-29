import React, { ReactElement } from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ContentSection } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const MainSection = () => {
  return (
    <div style={{ width: '600px' }}>
      <ContentSection title="Section title" name="section">
        <div>Content</div>
      </ContentSection>
    </div>
  );
};

export const SidebarSection = () => {
  return (
    <div style={{ width: '600px' }}>
      <ContentSection title="Section title" name="section" position="sidebar">
        <div>Content</div>
      </ContentSection>
    </div>
  );
};

export const SidebarSectionWithDescription = () => {
  return (
    <div style={{ width: '270px' }}>
      <ContentSection
        title="Section title"
        name="section"
        position="sidebar"
        description="This is the description for the section that may be on the sidebar"
      >
        <div>Content</div>
      </ContentSection>
    </div>
  );
};
