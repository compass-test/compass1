/// <reference path="../compass-requests.d.ts" />
import { ApiPayload } from '../compound-types';
import { DetachCompassComponentDataManagerInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        detachDataManager(input: DetachCompassComponentDataManagerInput): Promise<ApiPayload>;
    }
}
