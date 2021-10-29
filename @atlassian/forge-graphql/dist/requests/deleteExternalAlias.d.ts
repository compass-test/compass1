/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, ExternalAliasPayload } from '../compound-types';
import { DeleteCompassComponentExternalAliasInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        deleteExternalAlias(input: DeleteCompassComponentExternalAliasInput): Promise<ApiPayload<ExternalAliasPayload>>;
    }
}
