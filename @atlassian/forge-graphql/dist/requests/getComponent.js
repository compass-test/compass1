"use strict";
/// <reference path="../compass-requests.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const GetComponentQuery_1 = require("../graphQL/GetComponentQuery");
compass_requests_1.CompassRequests.prototype.getComponent = async function (variables) {
    let component = null;
    let errorsResp = [];
    try {
        const resp = await this.api.requestGraph(GetComponentQuery_1.GetComponent, variables);
        const { data, errors: gqlErrors } = await resp.json();
        errorsResp = (0, helpers_1.mapGqlErrors)(gqlErrors);
        errorsResp = errorsResp.concat((0, helpers_1.mapQueryErrors)(data.compass, ['component', 'component.relationships']));
        if (errorsResp.length === 0) {
            component = (0, helpers_1.transformGqlComponent)(data.compass.component);
        }
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
//# sourceMappingURL=getComponent.js.map