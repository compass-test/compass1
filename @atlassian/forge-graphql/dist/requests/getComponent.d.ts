/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, ComponentPayload } from '../compound-types';
declare module "../compass-requests" {
    interface CompassRequests {
        getComponent(variables: GetComponentQueryVariables): Promise<ApiPayload<ComponentPayload>>;
    }
}
import { GetComponentQueryVariables } from "../graphQL/GetComponentQuery";
