"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../compass-requests.ts"/>
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const CreateDeploymentEventMutation_1 = require("../graphQL/CreateDeploymentEventMutation");
compass_requests_1.CompassRequests.prototype.createDeploymentEvent = async function (input) {
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(CreateDeploymentEventMutation_1.CreateDeploymentEvent, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            createDeploymentEvent: {
                errors: mutationErrors
            }
        } = data.compass);
        errorsResp = errorsResp.concat((0, helpers_1.mapMutationErrors)(mutationErrors));
    }
    catch (e) {
        if (errorsResp.length === 0) {
            errorsResp.push((0, helpers_1.parsingResponseError)(e));
        }
    }
    return {
        errors: errorsResp,
        success: errorsResp.length === 0,
    };
};
//# sourceMappingURL=createDeploymentEvent.js.map