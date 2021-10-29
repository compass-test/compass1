import React, { ReactElement } from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  COMPONENT_LABELS_MUTATION_SUCCESS_RESOLVER,
  MOCKED_SEARCH_LABELS_QUERY,
  useLabelsState,
} from '../../../../common/mocks';
import { CompassComponentLabelForUI } from '../../../../common/types';
import { createLabels } from '../../../../common/utils/labels';

import { LabelsSection } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <div style={{ width: '800px' }}>
        <CompassTestProvider>{storyFn()}</CompassTestProvider>
      </div>
    ),
  ],
};

const MOCK_COMPONENT_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

export const LabelsSectionEmpty = () => {
  const { labels, addLabel, removeLabel } = useLabelsState(createLabels(0));

  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_SEARCH_LABELS_QUERY}
      resolvers={() =>
        COMPONENT_LABELS_MUTATION_SUCCESS_RESOLVER(addLabel, removeLabel)
      }
    >
      <LabelsSection componentId={MOCK_COMPONENT_ID} componentLabels={labels} />
    </ApolloAutoMockProvider>
  );
};

export const LabelsSectionWithValues = () => {
  const { labels, addLabel, removeLabel } = useLabelsState(createLabels(3));

  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_SEARCH_LABELS_QUERY}
      resolvers={() =>
        COMPONENT_LABELS_MUTATION_SUCCESS_RESOLVER(addLabel, removeLabel)
      }
    >
      <LabelsSection componentId={MOCK_COMPONENT_ID} componentLabels={labels} />
    </ApolloAutoMockProvider>
  );
};

export const LabelsSectionFull = () => {
  const { labels, addLabel, removeLabel } = useLabelsState(createLabels(10));

  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_SEARCH_LABELS_QUERY}
      resolvers={() =>
        COMPONENT_LABELS_MUTATION_SUCCESS_RESOLVER(addLabel, removeLabel)
      }
    >
      <LabelsSection componentId={MOCK_COMPONENT_ID} componentLabels={labels} />
    </ApolloAutoMockProvider>
  );
};

const partialLabels: CompassComponentLabelForUI[] = [
  {
    name: 'Label1',
  },
  {
    name: '',
  },
];

export const LabelsSectionWithFilteredValues = () => {
  const { labels, addLabel, removeLabel } = useLabelsState(partialLabels);

  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_SEARCH_LABELS_QUERY}
      resolvers={() =>
        COMPONENT_LABELS_MUTATION_SUCCESS_RESOLVER(addLabel, removeLabel)
      }
    >
      <LabelsSection componentId={MOCK_COMPONENT_ID} componentLabels={labels} />
    </ApolloAutoMockProvider>
  );
};

export const LabelsSectionManagedEmpty = () => {
  return (
    <LabelsSection componentId={MOCK_COMPONENT_ID} isManagedComponent={true} />
  );
};

export const LabelsSectionManagedWithValues = () => {
  return (
    <LabelsSection
      componentId={MOCK_COMPONENT_ID}
      isManagedComponent={true}
      componentLabels={createLabels(5)}
    />
  );
};
