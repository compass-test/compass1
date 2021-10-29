/// <reference path="../compass-requests.d.ts" />
import { UpdateComponentInput, ApiPayload, ComponentPayload } from "../compound-types";
declare module "../compass-requests" {
    interface CompassRequests {
        updateComponent(variables: UpdateComponentInput): Promise<ApiPayload<ComponentPayload>>;
    }
}
