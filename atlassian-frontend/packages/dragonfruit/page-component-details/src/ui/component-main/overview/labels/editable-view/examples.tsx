import React, { ReactElement } from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  COMPONENT_LABELS_MUTATION_SUCCESS_RESOLVER,
  MOCKED_SEARCH_LABELS_QUERY,
  useLabelsState,
} from '../../../../../common/mocks';
import { createLabels } from '../../../../../common/utils/labels';

import { LabelsEditableView } from './index';

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
  const { labels, addLabel, removeLabel } = useLabelsState(createLabels(5));

  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_SEARCH_LABELS_QUERY}
      resolvers={() =>
        COMPONENT_LABELS_MUTATION_SUCCESS_RESOLVER(addLabel, removeLabel)
      }
    >
      <LabelsEditableView labels={labels} componentId={'fakeId'} />
    </ApolloAutoMockProvider>
  );
};

export const EditorViewFullExample = () => {
  const { labels, addLabel, removeLabel } = useLabelsState(createLabels(10));

  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_SEARCH_LABELS_QUERY}
      resolvers={() =>
        COMPONENT_LABELS_MUTATION_SUCCESS_RESOLVER(addLabel, removeLabel)
      }
    >
      <LabelsEditableView labels={labels} componentId={'fakeId'} />
    </ApolloAutoMockProvider>
  );
};
