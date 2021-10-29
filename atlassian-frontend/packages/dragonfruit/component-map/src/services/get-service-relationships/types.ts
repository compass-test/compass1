import {
  CompassComponent,
  CompassRelationshipType,
} from '@atlassian/dragonfruit-graphql';

export type Variables = {
  id: string;
};

export type CompassRelationship = {
  id: string;
  type: CompassRelationshipType.DEPENDS_ON;
  startNode: CompassRelationshipComponent;
  endNode: CompassRelationshipComponent;
};

type CompassRelationshipConnection = {
  nodes?: CompassRelationship[];
};

export type CompassRelationshipComponent = Pick<
  CompassComponent,
  'id' | 'name' | 'type'
> & {
  relationships?: CompassRelationshipConnection;
};

export type Response = {
  compass: {
    component: CompassRelationshipComponent;
  };
};
