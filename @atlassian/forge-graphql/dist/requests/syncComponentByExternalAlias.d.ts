/// <reference path="../compass-requests.d.ts" />
import { SyncComponentByExternalAliasInput, ApiPayload, ComponentPayload } from "../compound-types";
declare module "../compass-requests" {
    interface CompassRequests {
        syncComponentByExternalAlias(variables: SyncComponentByExternalAliasInput): Promise<ApiPayload<ComponentPayload>>;
    }
}
