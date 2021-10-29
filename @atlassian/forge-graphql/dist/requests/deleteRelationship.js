"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const DeleteComponentRelationshipMutation_1 = require("../graphQL/DeleteComponentRelationshipMutation");
compass_requests_1.CompassRequests.prototype.deleteRelationship = async function (input) {
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(DeleteComponentRelationshipMutation_1.DeleteCompassComponentRelationship, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            deleteRelationship: {
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
//# sourceMappingURL=deleteRelationship.js.map