/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, LinkPayload } from '../compound-types';
import { CreateCompassComponentLinkInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        createLink(input: CreateCompassComponentLinkInput): Promise<ApiPayload<LinkPayload>>;
    }
}
