/// <reference path="../compass-requests.d.ts" />
import { CreateComponentInput, ApiPayload, ComponentPayload } from "../compound-types";
declare module "../compass-requests" {
    interface CompassRequests {
        createComponent(variables: CreateComponentInput): Promise<ApiPayload<ComponentPayload>>;
    }
}
