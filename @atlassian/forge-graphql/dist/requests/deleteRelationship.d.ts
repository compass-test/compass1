/// <reference path="../compass-requests.d.ts" />
import { ApiPayload } from '../compound-types';
import { DeleteCompassRelationshipInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        deleteRelationship(input: DeleteCompassRelationshipInput): Promise<ApiPayload>;
    }
}
