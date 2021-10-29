/// <reference path="../compass-requests.d.ts" />
import { ApiPayload } from '../compound-types';
import { UnlinkExternalSourceInput } from "../graphql-types";
declare module "../compass-requests" {
    interface CompassRequests {
        unlinkExternalSource(input: UnlinkExternalSourceInput): Promise<ApiPayload>;
    }
}
