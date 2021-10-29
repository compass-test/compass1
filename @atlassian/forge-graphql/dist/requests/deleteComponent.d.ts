/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, IdPayload } from '../compound-types';
import { DeleteCompassComponentInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        deleteComponent(input: DeleteCompassComponentInput): Promise<ApiPayload<IdPayload>>;
    }
}
