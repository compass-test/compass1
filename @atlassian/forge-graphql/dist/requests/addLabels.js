"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const AddComponentLabelsMutation_1 = require("../graphQL/AddComponentLabelsMutation");
const helpers_1 = require("../helpers");
compass_requests_1.CompassRequests.prototype.addLabels = async function (input) {
    let labelNames = [];
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(AddComponentLabelsMutation_1.AddComponentLabels, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            addComponentLabels: {
                addedLabels: labelNames,
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
        data: { labelNames }
    };
};
//# sourceMappingURL=addLabels.js.map