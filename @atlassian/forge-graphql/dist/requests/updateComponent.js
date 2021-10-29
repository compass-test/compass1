"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const gql_segments_1 = require("../helpers/gql-segments");
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const graphql_types_1 = require("../graphql-types");
compass_requests_1.CompassRequests.prototype.updateComponent = async function (input) {
    let errorsAcc = [];
    let { currentComponent } = input;
    const { id, dataManager, links, relationships, labels, eventSources } = input;
    if (!currentComponent) {
        const { errors: updatedComponentErrors, success, data } = await this.getComponent({
            componentId: id,
        });
        errorsAcc = errorsAcc.concat(updatedComponentErrors);
        if (errorsAcc.length > 0) {
            return {
                errors: errorsAcc,
                success,
                data: { component: {} },
            };
        }
        currentComponent = data.component;
    }
    // Generate update component round trip request
    const gqlSegments = [];
    gqlSegments.push((0, gql_segments_1.updateDataManagerSegment)(id, currentComponent.dataManager, dataManager));
    gqlSegments.push((0, gql_segments_1.updateBaseComponentSegment)(input));
    gqlSegments.push((0, gql_segments_1.updateLinksSegment)(id, currentComponent.links, links));
    gqlSegments.push((0, gql_segments_1.updateRelationshipsSegment)(id, currentComponent.relationships, relationships));
    gqlSegments.push((0, gql_segments_1.updateLabelsSegment)(id, currentComponent.labels, labels));
    const { mutation, variables, parameters } = (0, helpers_1.concatGqlSegments)(gqlSegments);
    const resp = await this.api.requestGraph((0, helpers_1.prefixMutation)(mutation, helpers_1.COMPOUND_MUTATION_NAME, parameters), variables);
    const { errors, data } = await resp.json();
    errorsAcc = errorsAcc.concat((0, helpers_1.parseCompoundMutationErrors)(data, variables));
    errorsAcc = errorsAcc.concat((0, helpers_1.mapGqlErrors)(errors));
    if (eventSources) {
        errorsAcc.push({
            message: helpers_1.EVENTS_UNIMPLEMENTED,
            errorSource: helpers_1.FORGE_GRAPHQL_SDK_ERROR_SOURCE,
            errorType: helpers_1.NOT_IMPLEMENTED_ERROR_TYPE,
            statusCode: 405
        });
    }
    if (dataManager !== undefined || (currentComponent.dataManager && !(0, helpers_1.isEmpty)(dataManager))) {
        // TODO: Make ServerError distinct from UserError
        const { errors } = await this.updateDataManager({
            componentId: id,
            externalSourceURL: (dataManager && dataManager.externalSourceURL)
                || (currentComponent.dataManager && currentComponent.dataManager.externalSourceURL),
            lastSyncEvent: {
                status: errorsAcc.length > 0 ? graphql_types_1.ComponentSyncEventStatus.UserError : graphql_types_1.ComponentSyncEventStatus.Success,
                lastSyncErrors: errorsAcc,
            },
        });
        errorsAcc = errorsAcc.concat(errors);
    }
    const { errors: updatedComponentErrors, data: { component: updatedComponent } } = await this.getComponent({
        componentId: id,
    });
    errorsAcc = errorsAcc.concat(updatedComponentErrors);
    return {
        errors: errorsAcc,
        success: errorsAcc.length === 0,
        data: { component: updatedComponent || {} },
    };
};
//# sourceMappingURL=updateComponent.js.map