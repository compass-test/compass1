"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const AttachComponentDataManagerMutation_1 = require("../graphQL/AttachComponentDataManagerMutation");
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
compass_requests_1.CompassRequests.prototype.attachDataManager = async function (input) {
    let component = null;
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(AttachComponentDataManagerMutation_1.AttachComponentDataManager, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            attachComponentDataManager: {
                componentDetails: component,
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
        data: { component }
    };
};
//# sourceMappingURL=attachDataManager.js.map