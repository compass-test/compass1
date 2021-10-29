import React, { ReactElement } from 'react';

import { boolean } from '@storybook/addon-knobs';

import {
  CompassRelationshipDirection,
  CompassRelationshipType,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  FAKE_DATA_MANAGER,
  MOCKED_COMPONENT,
  MOCKED_DEPENDS_ON_RELATIONSHIP_NODES,
} from '../../../../../common/mocks';
import { getRelationshipDirectionStorybookKnob } from '../../../../../common/utils/relationships/test-utils';

import { RelationshipSectionProps } from './main';

import { RelationshipSection } from './index';

// Don't move the providers into the decorator, they are used on the tests, and they don't read the decorators
export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <div style={{ maxWidth: 700 }}>{storyFn()}</div>
    ),
  ],
  excludeStories: 'RelationshipSectionTemplate',
};

// This template creates an scenario with default values but all of them can be overridden
// It's used on the test, and it's excluded from the storybooks
export const RelationshipSectionTemplate = ({
  currentComponent = MOCKED_COMPONENT,
  relationshipType = CompassRelationshipType.DEPENDS_ON,
  direction = CompassRelationshipDirection.OUTWARD,
  relationships = MOCKED_DEPENDS_ON_RELATIONSHIP_NODES,
  dataManager = null,
  testId = 'test-prefix',
}: Partial<RelationshipSectionProps>) => {
  return (
    <ApolloAutoMockProvider>
      <CompassTestProvider>
        <RelationshipSection
          testId={testId}
          currentComponent={currentComponent}
          relationships={relationships}
          relationshipType={relationshipType}
          direction={direction}
          dataManager={dataManager}
        />
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};

export const RelationshipSectionExample = () => {
  const direction = getRelationshipDirectionStorybookKnob();

  const isEmpty = boolean('Empty?', false, 'Props'); //Label, defaultValue, groupId
  const relationships = isEmpty ? [] : MOCKED_DEPENDS_ON_RELATIONSHIP_NODES;

  const isManaged = boolean('Managed?', false, 'Props'); //Label, defaultValue, groupId
  const dataManager = isManaged ? FAKE_DATA_MANAGER : undefined;

  return (
    <RelationshipSectionTemplate
      relationshipType={CompassRelationshipType.DEPENDS_ON}
      direction={direction}
      relationships={relationships}
      dataManager={dataManager}
    />
  );
};
