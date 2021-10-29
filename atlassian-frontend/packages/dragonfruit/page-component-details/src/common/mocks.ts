import { useState } from 'react';

import {
  CompassAnnouncement,
  CompassComponentDataManager,
  CompassComponentType,
  CompassRelationshipDirection,
  CompassRelationshipType,
  ComponentSyncEventStatus,
} from '@atlassian/dragonfruit-graphql';

import { CompassComponentLabelForUI } from './types';

export const MOCKED_COMPONENT = {
  id: 'f08b9e52-117a-464d-8a2f-9d0dba6d6098',
  name: 'mocked_component',
  type: CompassComponentType.SERVICE,
  dataManager: null,
};

export const MOCKED_COMPONENT_2 = {
  id: 'f08b9e52-117a-464d-8a2f-9d0dba6d6012',
  name: 'Mocked Component 2',
  type: CompassComponentType.SERVICE,
};

export const MOCKED_CONNECTED_COMPONENT = {
  id: 'f08b9e52-117a-464d-8a2f-9d0dba6d6098',
  name: 'mockComponent',
  type: CompassComponentType.SERVICE,
  dataManager: {
    ecosystemAppId: '89ae44dd-e7e3-4e4e-b63e-4f83f1b317ed',
    externalSourceURL:
      'https://bitbucket.org/atlassian/atlassian-frontend/src/master/',
    lastSyncEvent: {
      status: ComponentSyncEventStatus.SUCCESS,
      time: '2021-09-22T15:29:19.916973Z',
    },
  },
};

export const MOCKED_NODES = [
  {
    component: {
      id: '48098507-7cc0-43d4-9931-fbaa100a9687',
      name: 'searchApi',
      type: CompassComponentType.SERVICE,
    },
  },
  {
    component: {
      id: '1a1f593e-32d4-4293-be44-cd32ad69b3c1',
      name: 'react',
      type: CompassComponentType.LIBRARY,
    },
  },
  {
    component: {
      id: '965286c2-be12-4131-9a8f-793be429eba6',
      name: 'compass',
      type: CompassComponentType.APPLICATION,
    },
  },
];

export const MOCKED_SEARCH_RESULTS = {
  CompassComponentQueryResult: () => ({
    __typename: 'CompassSearchComponentConnection',
    nodes: [...MOCKED_NODES],
  }),
};

// Relationships
export const MOCKED_DEPENDS_ON_RELATIONSHIP_NODES = [
  {
    type: CompassRelationshipType.DEPENDS_ON,
    startNode: MOCKED_COMPONENT,
    endNode: {
      id: 'fd2b1808-3532-4862-882b-05c21cc08f3a',
      type: CompassComponentType.SERVICE,
      name: 'mocked_service',
    },
  },
  {
    type: CompassRelationshipType.DEPENDS_ON,
    startNode: MOCKED_COMPONENT,
    endNode: {
      id: '38a5af4f-d7b8-4218-a5fe-ce5b89ec09c2',
      type: CompassComponentType.APPLICATION,
      name: 'mocked_application',
    },
  },
  {
    type: CompassRelationshipType.DEPENDS_ON,
    startNode: MOCKED_COMPONENT,
    endNode: {
      id: '0d3e5825-b9e6-4d17-ad44-c8963b608a75',
      type: CompassComponentType.LIBRARY,
      name: 'mocked_library',
    },
  },
];

export const MOCKED_DEPENDS_ON_RELATIONSHIP_QUERY = {
  CompassRelationshipConnectionResult: () => ({
    __typename: 'CompassRelationshipConnection',
    nodes: [...MOCKED_DEPENDS_ON_RELATIONSHIP_NODES],
  }),
};

export const MOCKED_EMPTY_RELATIONSHIP_QUERY = {
  CompassRelationshipConnectionResult: () => ({
    __typename: 'CompassRelationshipConnection',
    nodes: [],
  }),
};

export type RelationshipsQuerySuccessResolverArgs = {
  hasInwardRelationships: boolean;
  hasOutwardRelationships: boolean;
};

export const RELATIONSHIPS_QUERY_SUCCESS_RESOLVER = ({
  hasInwardRelationships = true,
  hasOutwardRelationships = true,
}: RelationshipsQuerySuccessResolverArgs) => () => ({
  CompassRelationshipConnectionResult: {
    __resolveType: () => {
      return 'CompassRelationshipConnection';
    },
  },
  CompassComponent: {
    relationships: (_: any, args: Record<string, any>) => {
      const isInwardQuery =
        args.query.direction === CompassRelationshipDirection.INWARD;
      const isOutwardQuery =
        args.query.direction === CompassRelationshipDirection.OUTWARD;
      const hasRelationships =
        (isInwardQuery && hasInwardRelationships) ||
        (isOutwardQuery && hasOutwardRelationships);

      return {
        nodes: hasRelationships ? MOCKED_DEPENDS_ON_RELATIONSHIP_NODES : [],
      };
    },
  },
});

// A resolver that returns successful responses to createRelationship and deleteRelationship
// mutations.
export const RELATIONSHIP_VIEW_ACTION_SUCCESS_RESOLVER = () => ({
  Mutation: {
    compass: () => ({
      createRelationship: ({ input }: any) => {
        // Have to pull the endNode data from the mocks as the createdCompassRelationship
        // contains data that is not included in the mutation input
        const endNode = MOCKED_NODES.find(
          (node) => node.component.id === input.endNodeId,
        );
        if (endNode) {
          return {
            success: true,
            createdCompassRelationship: {
              type: input.type,
              startNode: {
                id: input.startNodeId,
                name: MOCKED_COMPONENT['name'],
                type: MOCKED_COMPONENT['type'],
              },
              endNode: {
                id: input.endNodeId,
                name: endNode.component.name,
                type: endNode.component.type,
              },
            },
          };
        } else {
          return { success: false };
        }
      },
      deleteRelationship: {
        success: true,
      },
    }),
  },
});

export const FAKE_DATA_MANAGER: CompassComponentDataManager = {
  ecosystemAppId: 'id',
  externalSourceURL: 'http://www.google.com',
};

// ========================== Announcement Mocks ==========================

export const MOCKED_ANNOUNCEMENTS: CompassAnnouncement[] = [
  {
    __typename: 'CompassAnnouncement',
    id: 'mock-announcement-id-1',
    title: '"/v1/data" API endpoint being deprecated',
    description:
      'The "/v1/data" API endpoint will be deprecated on September 6, 2021.',
    targetDate: '2021-09-06T01:41:13.998Z',
  },
  {
    __typename: 'CompassAnnouncement',
    id: 'mock-announcement-id-2',
    title: 'Elon Musk will be taking over the world with his Tesla bots',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id consectetur nisl, non facilisis ligula. Donec sit amet semper est. ' +
      'Phasellus placerat nec nulla eu sagittis. Nulla dapibus nisl quis metus placerat, ac ultrices erat accumsan. Aliquam tincidunt sapien pretium risus pharetra, ' +
      'quis mattis velit sagittis. Nullam at congue enim, in ultrices leo. Vestibulum eu dignissim eros. Aliquam tellus sapien, ultrices non sapien id, pellentesque ultrices nisi.' +
      'Mauris pharetra pharetra mollis. Vivamus at neque elementum, mollis sem quis, bibendum lectus. Pellentesque et eros molestie, tempor ex sit amet, scelerisque neque. ' +
      'Nulla aliquet sit amet enim id faucibus.',
    targetDate: '2050-01-01T00:00:00.998Z',
  },
  {
    __typename: 'CompassAnnouncement',
    id: 'mock-announcement-id-3',
    title: 'Beta release',
    description:
      'We will be releasing a beta for this component today! Please give us your feedback!',
    targetDate: new Date(),
  },
];

const MOCKED_ACKNOWLEDGEMENT_HAS_ACKNOWLEDGED = {
  component: {
    id: MOCKED_COMPONENT.id,
  },
  hasAcknowledged: true,
};

const MOCKED_ACKNOWLEDGEMENT_HAS_NOT_ACKNOWLEDGED = {
  component: {
    id: MOCKED_COMPONENT.id,
  },
  hasAcknowledged: false,
};

export const MOCKED_DEPENDENCY_ANNOUNCEMENTS = [
  {
    __typename: 'CompassAnnouncement',
    id: 'mock-dependency-announcement-id-1',
    title: 'Mock dependency announcement 1',
    description: 'This is an upcoming dependency announcement.',
    targetDate: '2050-01-01T00:00:00.998Z',
    component: MOCKED_COMPONENT_2,
    acknowledgements: [MOCKED_ACKNOWLEDGEMENT_HAS_NOT_ACKNOWLEDGED],
  },
  {
    __typename: 'CompassAnnouncement',
    id: 'mock-dependency-announcement-id-2',
    title: 'Mock dependency announcement 2',
    description: 'This is a mock dependency announcement.',
    targetDate: '2021-09-06T01:41:13.998Z',
    component: MOCKED_COMPONENT_2,
    acknowledgements: [MOCKED_ACKNOWLEDGEMENT_HAS_ACKNOWLEDGED],
  },
  {
    __typename: 'CompassAnnouncement',
    id: 'mock-dependency-announcement-id-3',
    title: 'Mock dependency announcement 3',
    description: 'This is yet another mock dependency announcement.',
    targetDate: '2021-03-12T00:00:00.998Z',
    component: MOCKED_COMPONENT_2,
    acknowledgements: [MOCKED_ACKNOWLEDGEMENT_HAS_ACKNOWLEDGED],
  },
];

const MOCKED_DEPENDENCIES_WITH_ANNOUNCEMENTS = MOCKED_DEPENDS_ON_RELATIONSHIP_NODES.map(
  (dependency, index) => ({
    ...dependency,
    endNode: {
      ...dependency.endNode,
      announcements: [MOCKED_DEPENDENCY_ANNOUNCEMENTS[index]],
    },
  }),
);

export const MOCKED_DEPENDENCY_QUERY_DATA_WITH_ANNOUNCEMENTS = {
  compass: {
    __typename: 'CompassCatalogQueryApi',
    component: {
      __typename: 'CompassComponent',
      id: 'f08b9e52-117a-464d-8a2f-9d0dba6d6098',
      relationships: {
        __typename: 'CompassRelationshipConnection',
        nodes: [...MOCKED_DEPENDENCIES_WITH_ANNOUNCEMENTS],
      },
    },
  },
};

const MOCKED_DEPENDENCIES_WITH_NO_ANNOUNCEMENTS = MOCKED_DEPENDS_ON_RELATIONSHIP_NODES.map(
  (dependency) => ({
    ...dependency,
    endNode: {
      ...dependency.endNode,
      announcements: [],
    },
  }),
);

export const MOCKED_DEPENDENCY_QUERY_DATA_WITH_NO_ANNOUNCEMENTS = {
  compass: {
    __typename: 'CompassCatalogQueryApi',
    component: {
      __typename: 'CompassComponent',
      id: 'f08b9e52-117a-464d-8a2f-9d0dba6d6098',
      relationships: {
        __typename: 'CompassRelationshipConnection',
        nodes: [...MOCKED_DEPENDENCIES_WITH_NO_ANNOUNCEMENTS],
      },
    },
  },
};

export const MOCKED_DEPENDENCY_QUERY_DATA_WITH_NO_DEPENDENCIES = {
  compass: {
    __typename: 'CompassCatalogQueryApi',
    component: {
      __typename: 'CompassComponent',
      id: 'f08b9e52-117a-464d-8a2f-9d0dba6d6098',
      relationships: {
        __typename: 'CompassRelationshipConnection',
        nodes: [],
      },
    },
  },
};

export const ANNOUNCEMENT_CREATE_MUTATION_SUCCESS_RESOLVER = () => ({
  Mutation: {
    compass: () => ({
      createAnnouncement: () => {
        return {
          success: true,
        };
      },
    }),
  },
});

export const ANNOUNCEMENT_DELETE_MUTATION_SUCCESS_RESOLVER = () => ({
  Mutation: {
    compass: () => ({
      deleteAnnouncement: () => {
        return {
          success: true,
        };
      },
    }),
  },
});

// ========================== Label Mocks ==========================

export const MOCKED_SEARCH_LABELS = [
  { __typename: 'CompassComponentLabel', name: 'test-label-1' },
  { __typename: 'CompassComponentLabel', name: 'test-label-2' },
  { __typename: 'CompassComponentLabel', name: 'test-label-3' },
  { __typename: 'CompassComponentLabel', name: 'test-label-4' },
  { __typename: 'CompassComponentLabel', name: 'test-label-5' },
];

export const MOCKED_SEARCH_LABELS_QUERY = {
  CompassComponentLabelsQueryResult: () => ({
    __typename: 'CompassSearchComponentLabelsConnection',
    nodes: MOCKED_SEARCH_LABELS,
  }),
};

export const COMPONENT_LABELS_MUTATION_SUCCESS_RESOLVER = (
  addLabel: (label: string) => void,
  removeLabel: (label: string) => void,
) => ({
  Mutation: {
    compass: () => ({
      addComponentLabels: ({ input }: any) => {
        input.labelNames.forEach((label: string) => addLabel(label));
        return {
          success: true,
          addedLabels: input.labelNames.map((label: any) => {
            return { name: label.name };
          }),
          errors: null,
        };
      },
      removeComponentLabels: ({ input }: any) => {
        input.labelNames.forEach((label: string) => removeLabel(label));
        return {
          success: true,
          removedLabelNames: input.labelNames,
          errors: null,
        };
      },
    }),
  },
});

// Have to simulate the labels using state because the LabelsSection does not call the getComponentDetails query which sets labels in the graphql store
export const useLabelsState = (
  startingLabels: CompassComponentLabelForUI[],
) => {
  const [labels, setLabels] = useState<CompassComponentLabelForUI[]>(
    startingLabels,
  );

  const addLabel = (name: string) => {
    const newLabels = [...labels, { name }];
    setLabels(newLabels);
  };

  const removeLabel = (name: string) => {
    const newLabels = labels.filter((label) => label.name !== name);
    setLabels(newLabels);
  };

  return { labels, addLabel, removeLabel };
};
