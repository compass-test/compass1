/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, EventSourcePayload } from '../compound-types';
import { CreateEventSourceInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        createEventSource(input: CreateEventSourceInput): Promise<ApiPayload<EventSourcePayload>>;
    }
}
