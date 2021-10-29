/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, IdPayload } from '../compound-types';
import { DeleteCompassComponentLinkInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        deleteLink(input: DeleteCompassComponentLinkInput): Promise<ApiPayload<IdPayload>>;
    }
}
