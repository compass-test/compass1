/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, ComponentPayload } from '../compound-types';
declare module "../compass-requests" {
    interface CompassRequests {
        getComponentByExternalAlias(variables: ComponentByExternalAliasQueryVariables): Promise<ApiPayload<ComponentPayload>>;
    }
}
import { ComponentByExternalAliasQueryVariables } from "../graphQL/GetComponentByExternalAliasQuery";
