/// <reference path="../compass-requests.d.ts" />
import { ApiPayload } from '../compound-types';
import { CreateDeploymentEventInput } from '../graphql-types';
declare module "../compass-requests" {
    interface CompassRequests {
        createDeploymentEvent(input: CreateDeploymentEventInput): Promise<ApiPayload>;
    }
}
