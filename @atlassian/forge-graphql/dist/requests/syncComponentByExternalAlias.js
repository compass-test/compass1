"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
compass_requests_1.CompassRequests.prototype.syncComponentByExternalAlias = async function (input) {
    const { cloudId, externalAlias, options, ...component } = input;
    let accErrors = [];
    let newComponent = {};
    const { data, errors } = await this.getComponentByExternalAlias({
        cloudId,
        ...externalAlias,
    });
    try {
        if (errors.includes(helpers_1.COMPONENT_NOT_FOUND)) {
            if (options && options.createComponentIfNotFound) {
                const createComponentResp = await this.createComponent({ cloudId, externalAlias, ...component });
                newComponent = (createComponentResp && createComponentResp.data && createComponentResp.data.component) || {};
                accErrors = accErrors.concat(createComponentResp.errors);
            }
            else {
                accErrors.push({
                    message: `Component with external alias id ${externalAlias.externalId} could not be found`,
                    errorSource: helpers_1.FORGE_GRAPHQL_SDK_ERROR_SOURCE,
                    errorType: helpers_1.NOT_FOUND_ERROR_TYPE,
                    statusCode: 404
                });
            }
        }
        else if (errors.length === 0) {
            const currentComponent = data.component;
            const updateComponentResp = await this.updateComponent({
                id: currentComponent.id,
                currentComponent: currentComponent,
                ...component
            });
            newComponent = updateComponentResp.data.component;
            accErrors = accErrors.concat(updateComponentResp.errors);
        }
        else {
            accErrors = accErrors.concat(errors);
        }
    }
    catch {
        accErrors = accErrors.concat(errors);
    }
    return {
        errors: accErrors,
        success: accErrors.length === 0,
        data: { component: newComponent },
    };
};
//# sourceMappingURL=syncComponentByExternalAlias.js.map