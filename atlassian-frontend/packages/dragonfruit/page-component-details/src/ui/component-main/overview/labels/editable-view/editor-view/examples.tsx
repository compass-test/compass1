import React, { ReactElement } from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MOCKED_SEARCH_LABELS_QUERY } from '../../../../../../common/mocks';

import { ComponentLabelsEditor } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <div style={{ width: '800px' }}>
        <CompassTestProvider>{storyFn()}</CompassTestProvider>
      </div>
    ),
  ],
};

export const EditorViewExample = () => {
  return (
    <ApolloAutoMockProvider mocks={MOCKED_SEARCH_LABELS_QUERY}>
      <CompassTestProvider>
        <ComponentLabelsEditor labels={[]} componentId={'abc'} />
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};
