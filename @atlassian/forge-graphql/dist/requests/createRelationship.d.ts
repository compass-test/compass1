/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, RelationshipPayload } from '../compound-types';
import { CreateCompassRelationshipInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        createRelationship(input: CreateCompassRelationshipInput): Promise<ApiPayload<RelationshipPayload>>;
    }
}
