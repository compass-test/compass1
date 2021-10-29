/// <reference path="../compass-requests.d.ts" />
import { ApiPayload } from '../compound-types';
import { DetachEventSourceInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        deleteExternalSource(input: DetachEventSourceInput): Promise<ApiPayload>;
    }
}
