"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const UpdateComponentDataManagerMetadataMutation_1 = require("../graphQL/UpdateComponentDataManagerMetadataMutation");
compass_requests_1.CompassRequests.prototype.updateDataManager = async function (input) {
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(UpdateComponentDataManagerMetadataMutation_1.UpdateComponentDataManagerMetadata, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            updateComponentDataManagerMetadata: {
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
    };
};
//# sourceMappingURL=updateDataManager.js.map