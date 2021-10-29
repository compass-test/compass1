"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const RemoveComponentLabelsMutation_1 = require("../graphQL/RemoveComponentLabelsMutation");
compass_requests_1.CompassRequests.prototype.removeLabels = async function (input) {
    let labelNames = null;
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(RemoveComponentLabelsMutation_1.RemoveComponentLabels, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            removeComponentLabels: {
                removedLabelNames: labelNames,
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
        errors: (0, helpers_1.mapGqlErrors)(errorsResp),
        success: errorsResp.length === 0,
        data: { labelNames }
    };
};
//# sourceMappingURL=removeLabels.js.map