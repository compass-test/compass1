import {
  CompassComponentType,
  CompassRelationshipInRelationshipViewFragment,
  CompassRelationshipType,
  CreateRelationshipHandledErrors,
} from '@atlassian/dragonfruit-graphql';

import {
  getRelationshipEndNode,
  getRelationshipStartNode,
  getSortByTypeThenNameFn,
} from './main';

import { validateNewRelationship } from './index';

const COMPONENT_1 = {
  id: 'component_id_1',
  name: 'Component 1',
  type: CompassComponentType.SERVICE,
};
const COMPONENT_2 = {
  id: 'component_id_2',
  name: 'Component 2',
  type: CompassComponentType.SERVICE,
};

describe('validateNewRelationship', () => {
  it('Should return undefined for valid relationships', () => {
    expect(validateNewRelationship(COMPONENT_1.id, COMPONENT_2.id, [])).toEqual(
      undefined,
    );
  });

  it('Should return RELATIONSHIP_NODES_SELF_REFERENCING_ERROR error if both component IDs are the same', () => {
    expect(validateNewRelationship(COMPONENT_1.id, COMPONENT_1.id, [])).toEqual(
      CreateRelationshipHandledErrors.RELATIONSHIP_NODES_SELF_REFERENCING_ERROR,
    );
  });

  it('Should return RELATIONSHIP_ALREADY_EXISTS error if relationship already exists', () => {
    const existingRelationship = {
      startNode: COMPONENT_1,
      endNode: COMPONENT_2,
      type: CompassRelationshipType.DEPENDS_ON,
    };

    expect(
      validateNewRelationship(COMPONENT_1.id, COMPONENT_2.id, [
        existingRelationship,
      ]),
    ).toEqual(CreateRelationshipHandledErrors.RELATIONSHIP_ALREADY_EXISTS);
  });
});

describe('sortByTypeThenName', () => {
  it.each`
    nodeToSortBy
    ${'startNode'}
    ${'endNode'}
  `(
    'should return an empty list if sorting an empty relationships list by $nodeToSortBy',
    ({ nodeToSortBy }) => {
      const relationships: Array<CompassRelationshipInRelationshipViewFragment> = [];
      const getRelationshipNode =
        nodeToSortBy === 'startNode'
          ? getRelationshipStartNode
          : getRelationshipEndNode;

      relationships.sort(getSortByTypeThenNameFn(getRelationshipNode));

      expect(relationships).toEqual([]);
    },
  );

  it.each`
    nodeToSortBy
    ${'startNode'}
    ${'endNode'}
  `(
    'should return an unchanged list if sorting a list of 1 element by $nodeToSortBy',
    ({ nodeToSortBy }) => {
      const relationships: Array<CompassRelationshipInRelationshipViewFragment> = [
        {
          [nodeToSortBy]: {
            id: '0',
            type: CompassComponentType.SERVICE,
            name: 'node',
          },
          type: CompassRelationshipType.DEPENDS_ON,
        },
      ];
      const expectedResult = relationships.slice();

      const getRelationshipNode =
        nodeToSortBy === 'startNode'
          ? getRelationshipStartNode
          : getRelationshipEndNode;
      relationships.sort(getSortByTypeThenNameFn(getRelationshipNode));

      expect(relationships).toEqual(expectedResult);
    },
  );

  it.each`
    nodeToSortBy
    ${'startNode'}
    ${'endNode'}
  `(
    'should sort relationships by type then name if sorting by $nodeToSortBy',
    ({ nodeToSortBy }) => {
      const relationships: Array<CompassRelationshipInRelationshipViewFragment> = [
        {
          [nodeToSortBy]: {
            id: '0',
            type: CompassComponentType.SERVICE,
            name: 'duplicated name',
          },
          type: CompassRelationshipType.DEPENDS_ON,
        },
        {
          [nodeToSortBy]: {
            id: '0',
            type: CompassComponentType.OTHER,
            name: 'duplicated name',
          },
          type: CompassRelationshipType.DEPENDS_ON,
        },
        {
          [nodeToSortBy]: {
            id: '0',
            type: CompassComponentType.SERVICE,
            name: 'unique service name',
          },
          type: CompassRelationshipType.DEPENDS_ON,
        },
      ];
      const expectedResult = [
        relationships[0],
        relationships[2],
        relationships[1],
      ];

      const getRelationshipNode =
        nodeToSortBy === 'startNode'
          ? getRelationshipStartNode
          : getRelationshipEndNode;
      relationships.sort(getSortByTypeThenNameFn(getRelationshipNode));

      expect(relationships).toEqual(expectedResult);
    },
  );

  it.each`
    nodeToSortBy
    ${'startNode'}
    ${'endNode'}
  `(
    'should sort null nodes towards the end of the list if sorting by $nodeToSortBy',
    ({ nodeToSortBy }) => {
      const relationships: Array<CompassRelationshipInRelationshipViewFragment> = [
        {
          [nodeToSortBy]: null,
          type: CompassRelationshipType.DEPENDS_ON,
        },
        {
          [nodeToSortBy]: {
            id: '0',
            type: CompassComponentType.SERVICE,
            name: 'b',
          },
          type: CompassRelationshipType.DEPENDS_ON,
        },
        {
          [nodeToSortBy]: null,
          type: CompassRelationshipType.DEPENDS_ON,
        },
        {
          [nodeToSortBy]: {
            id: '0',
            type: CompassComponentType.SERVICE,
            name: 'a',
          },
          type: CompassRelationshipType.DEPENDS_ON,
        },
      ];
      const expectedResult = [
        relationships[3],
        relationships[1],
        relationships[2],
        relationships[0],
      ];

      const getRelationshipNode =
        nodeToSortBy === 'startNode'
          ? getRelationshipStartNode
          : getRelationshipEndNode;
      relationships.sort(getSortByTypeThenNameFn(getRelationshipNode));

      expect(relationships).toEqual(expectedResult);
    },
  );
});
