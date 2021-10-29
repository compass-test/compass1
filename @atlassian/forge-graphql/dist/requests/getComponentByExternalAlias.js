"use strict";
/// <reference path="../compass-requests.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const GetComponentByExternalAliasQuery_1 = require("../graphQL/GetComponentByExternalAliasQuery");
compass_requests_1.CompassRequests.prototype.getComponentByExternalAlias =
    async function getComponentByExternalAlias(variables) {
        let component = null;
        let errorsResp = [];
        try {
            const resp = await this.api.requestGraph(GetComponentByExternalAliasQuery_1.ComponentByExternalAlias, variables);
            const { data, errors: gqlErrors } = await resp.json();
            errorsResp = (0, helpers_1.mapGqlErrors)(gqlErrors);
            errorsResp = errorsResp.concat((0, helpers_1.mapQueryErrors)(data.compass, ['component', 'component.relationships']));
            if (errorsResp.length === 0) {
                component = (0, helpers_1.transformGqlComponent)(data.compass.componentByExternalAlias);
            }
        }
        catch (e) {
            if (errorsResp.length === 0) {
                console.log(errorsResp.length);
                errorsResp.push((0, helpers_1.parsingResponseError)(e));
            }
        }
        return {
            errors: errorsResp,
            success: errorsResp.length === 0,
            data: { component }
        };
    };
//# sourceMappingURL=getComponentByExternalAlias.js.map