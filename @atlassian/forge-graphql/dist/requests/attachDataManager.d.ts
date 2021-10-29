/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, ComponentPayload } from '../compound-types';
import { AttachCompassComponentDataManagerInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        attachDataManager(input: AttachCompassComponentDataManagerInput): Promise<ApiPayload<ComponentPayload>>;
    }
}
