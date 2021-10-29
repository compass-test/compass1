/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, LabelsPayload } from '../compound-types';
import { RemoveCompassComponentLabelsInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        removeLabels(input: RemoveCompassComponentLabelsInput): Promise<ApiPayload<LabelsPayload>>;
    }
}
