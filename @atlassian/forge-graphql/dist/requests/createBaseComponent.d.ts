/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, ComponentPayload } from '../compound-types';
import { CreateCompassComponentInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        createBaseComponent(cloudId: string, input: CreateCompassComponentInput): Promise<ApiPayload<ComponentPayload>>;
    }
}
