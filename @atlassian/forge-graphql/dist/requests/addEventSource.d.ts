/// <reference path="../compass-requests.d.ts" />
import { AddEventSourceInput, ApiPayload, EventSourcePayload } from "../compound-types";
declare module "../compass-requests" {
    interface CompassRequests {
        addEventSource(variables: AddEventSourceInput): Promise<ApiPayload<EventSourcePayload>>;
    }
}
