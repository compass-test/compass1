"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const DeleteComponentLinkMutation_1 = require("../graphQL/DeleteComponentLinkMutation");
compass_requests_1.CompassRequests.prototype.deleteLink = async function (input) {
    let id = null;
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(DeleteComponentLinkMutation_1.DeleteCompassComponentLink, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            deleteComponentLink: {
                errors: mutationErrors,
                deletedCompassLinkId: id
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
        data: { id }
    };
};
//# sourceMappingURL=deleteLink.js.map