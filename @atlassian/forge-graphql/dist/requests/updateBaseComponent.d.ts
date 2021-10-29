/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, ComponentPayload } from '../compound-types';
import { UpdateCompassComponentInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        updateBaseComponent(input: UpdateCompassComponentInput): Promise<ApiPayload<ComponentPayload>>;
    }
}
