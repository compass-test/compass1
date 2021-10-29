"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const DeleteExternalAliasMutation_1 = require("../graphQL/DeleteExternalAliasMutation");
compass_requests_1.CompassRequests.prototype.deleteExternalAlias = async function (input) {
    let externalAlias = null;
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(DeleteExternalAliasMutation_1.DeleteCompassComponentExternalAlias, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            deleteComponentExternalAlias: {
                errors: mutationErrors,
                deletedCompassExternalAlias: externalAlias
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
        data: { externalAlias }
    };
};
//# sourceMappingURL=deleteExternalAlias.js.map