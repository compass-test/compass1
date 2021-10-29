"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../compass-requests.ts"/>
const compass_requests_1 = require("../compass-requests");
const CreateComponentLinkMutation_1 = require("../graphQL/CreateComponentLinkMutation");
const helpers_1 = require("../helpers");
compass_requests_1.CompassRequests.prototype.createLink = async function (input) {
    let link = null;
    let gqlErrors, mutationErrors, errorsResp = [];
    let data;
    try {
        const resp = await this.api.requestGraph(CreateComponentLinkMutation_1.CreateCompassComponentLink, { input });
        ({ errors: gqlErrors, data } = await resp.json());
        errorsResp = errorsResp.concat((0, helpers_1.mapGqlErrors)(gqlErrors));
        ({
            createComponentLink: {
                errors: mutationErrors,
                createdComponentLink: { link }
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
        data: { link }
    };
};
//# sourceMappingURL=createLink.js.map