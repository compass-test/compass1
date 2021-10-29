import React, { ReactElement } from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ContentSectionEmptyState } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const EmptyState = () => {
  return (
    <div style={{ width: '600px' }}>
      <ContentSectionEmptyState actionLabel="Add a link" onClick={() => {}}>
        Add a new link
      </ContentSectionEmptyState>
    </div>
  );
};
