/// <reference path="../compass-requests.d.ts" />
import { ApiPayload } from '../compound-types';
import { UpdateCompassComponentDataManagerMetadataInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        updateDataManager(input: UpdateCompassComponentDataManagerMetadataInput): Promise<ApiPayload>;
    }
}
