import {
  CompassSearchComponentConnection,
  CompassSearchComponentNodeFragment,
  QueryError,
} from '@atlassian/dragonfruit-graphql';

export type SearchResponse = {
  endCursor?: string;
  queryError?: QueryError;
  connection?: CompassSearchComponentConnection;
};

export type ComponentRow = CompassSearchComponentNodeFragment & {
  component?:
    | (CompassSearchComponentNodeFragment['component'] & { ownerName?: string })
    | null;
};
