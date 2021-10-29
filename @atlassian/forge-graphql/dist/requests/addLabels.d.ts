/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, LabelsPayload } from '../compound-types';
import { AddCompassComponentLabelsInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        addLabels(input: AddCompassComponentLabelsInput): Promise<ApiPayload<LabelsPayload>>;
    }
}
