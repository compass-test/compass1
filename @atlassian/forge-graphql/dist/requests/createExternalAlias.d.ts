/// <reference path="../compass-requests.d.ts" />
import { ApiPayload, ExternalAliasPayload } from '../compound-types';
import { CreateCompassComponentExternalAliasInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        createExternalAlias(input: CreateCompassComponentExternalAliasInput): Promise<ApiPayload<ExternalAliasPayload>>;
    }
}
