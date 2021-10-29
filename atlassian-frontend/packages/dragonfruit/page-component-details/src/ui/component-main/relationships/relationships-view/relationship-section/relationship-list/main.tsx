import React from 'react';

import { uid } from 'react-uid';

import { List } from '@atlassian/dragonfruit-common-ui';
import {
  CompassRelationshipDirection,
  CompassRelationshipInRelationshipViewFragment,
} from '@atlassian/dragonfruit-graphql';

import {
  getRelationshipEndNode,
  getRelationshipStartNode,
  getSortByTypeThenNameFn,
} from '../../../../../../common/utils/relationships';

import { RelationshipListItem } from './relationship-list-item';

type RelationshipListProps = {
  // We require an array of whatever the child item requires
  relationships: Array<CompassRelationshipInRelationshipViewFragment>;
  direction: CompassRelationshipDirection;
  isDisabled?: boolean;
  testId?: string;
};

export const RelationshipList = (props: RelationshipListProps) => {
  const { relationships, direction, isDisabled, testId } = props;

  const getRelationshipNode =
    direction === CompassRelationshipDirection.INWARD
      ? getRelationshipStartNode
      : getRelationshipEndNode;
  relationships.sort(getSortByTypeThenNameFn(getRelationshipNode));

  return (
    <List testId={testId}>
      {relationships.map((relationship) => (
        // A unique key is generated from the data in the relationship
        <List.Item key={uid(relationship)}>
          <RelationshipListItem
            relationship={relationship}
            getRelationshipNode={getRelationshipNode}
            isDisabled={isDisabled}
          />
        </List.Item>
      ))}
    </List>
  );
};
