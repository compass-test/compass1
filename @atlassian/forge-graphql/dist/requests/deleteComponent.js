"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../compass-requests.ts"/>
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const DeleteComponentMutation_1 = require("../graphQL/DeleteComponentMutation");
compass_requests_1.CompassRequests.prototype.deleteComponent = async function (input) {
    let id = null;
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(DeleteComponentMutation_1.DeleteComponent, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            deleteComponent: {
                errors: mutationErrors,
                deletedComponentId: id
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
//# sourceMappingURL=deleteComponent.js.map