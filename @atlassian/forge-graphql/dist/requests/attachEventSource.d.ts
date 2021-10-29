/// <reference path="../compass-requests.d.ts" />
import { ApiPayload } from '../compound-types';
import { AttachEventSourceInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        attachEventSource(input: AttachEventSourceInput): Promise<ApiPayload>;
    }
}
