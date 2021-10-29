/// <reference path="../compass-requests.d.ts" />
import { UpdateEventSourcesInput, ApiPayload, EventSourcesPayload } from "../compound-types";
declare module "../compass-requests" {
    interface CompassRequests {
        updateEventSources(variables: UpdateEventSourcesInput): Promise<ApiPayload<EventSourcesPayload>>;
    }
}
