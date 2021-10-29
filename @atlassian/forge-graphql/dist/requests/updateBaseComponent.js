"use strict";
/// <reference path="../compass-requests.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const UpdateComponentMutation_1 = require("../graphQL/UpdateComponentMutation");
compass_requests_1.CompassRequests.prototype.updateBaseComponent = async function updateBaseComponent(input) {
    let component = null;
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(UpdateComponentMutation_1.UpdateCompassComponent, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            updateComponent: {
                errors: mutationErrors,
                componentDetails: component
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
        data: { component }
    };
};
//# sourceMappingURL=updateBaseComponent.js.map