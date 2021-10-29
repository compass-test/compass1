"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../helpers/constants");
const compass_requests_1 = require("../compass-requests");
const graphql_types_1 = require("../graphql-types");
const helpers_1 = require("../helpers");
const gql_segments_1 = require("../helpers/gql-segments");
async function createBaseComponent(api, input) {
    const { cloudId, name, description, type, fields, ownerId } = input;
    let baseComponentInput;
    try {
        baseComponentInput = {
            name,
            description,
            type,
            ownerId,
        };
        const transformedFields = (0, helpers_1.transformFieldsToGql)(fields);
        if (transformedFields.length > 0) {
            baseComponentInput.fields = transformedFields;
        }
    }
    catch (e) {
        if (e.message == constants_1.TIER_MISSING_VALUE) {
            return { errors: e.message, componentId: null };
        }
        else {
            throw e;
        }
    }
    const { data, errors } = await api.createBaseComponent(cloudId, baseComponentInput);
    let id;
    try {
        ({ component: { id } } = data);
    }
    catch {
        console.error(`Error: Could not get component id in createComponent response`);
    }
    return {
        errors,
        componentId: errors.length === 0 ? id : null,
    };
}
async function createComponentWithExternalAlias(api, input) {
    const { externalAlias } = input;
    let errorsAcc = [];
    let componentId;
    let errors = [];
    ({ errors, componentId } = await createBaseComponent(api, input));
    if (errors.length === 0) {
        try {
            const { errors: createExternalAliasErrors } = await api.createExternalAlias({
                componentId,
                externalAlias,
            });
            errorsAcc = errorsAcc.concat(createExternalAliasErrors);
            if (createExternalAliasErrors && createExternalAliasErrors.length > 0) {
                const { errors: deleteComponentErrors } = await api.deleteComponent({ id: componentId });
                errorsAcc = errorsAcc.concat(deleteComponentErrors);
            }
        }
        catch (e) {
            errorsAcc.push({ message: e.message, errorSource: helpers_1.FORGE_GRAPHQL_SDK_ERROR_SOURCE, errorType: e.constructor.name });
            const { errors: deleteComponentErrors } = await api.deleteComponent({ id: componentId });
            errorsAcc = errorsAcc.concat(deleteComponentErrors);
        }
    }
    else {
        errorsAcc = errorsAcc.concat(errors);
    }
    return {
        errors: errorsAcc,
        componentId
    };
}
compass_requests_1.CompassRequests.prototype.createComponent = async function (input) {
    const { links, relationships, labels, dataManager, eventSources, externalAlias, } = input;
    let errorsAcc = [];
    let errors = [];
    let componentId;
    let createdComponent = {};
    if (externalAlias) {
        ({ componentId, errors } = await createComponentWithExternalAlias(this, input));
        errorsAcc = errorsAcc.concat(errors);
    }
    else {
        ({ componentId, errors } = await createBaseComponent(this, input));
        errorsAcc = errorsAcc.concat(errors);
    }
    if (componentId) {
        // Generate update component round trip request
        const gqlSegments = [];
        if (dataManager) {
            gqlSegments.push((0, gql_segments_1.updateDataManagerSegment)(componentId, null, dataManager));
        }
        gqlSegments.push((0, gql_segments_1.updateLinksSegment)(componentId, [], links || []));
        gqlSegments.push((0, gql_segments_1.updateRelationshipsSegment)(componentId, [], relationships));
        gqlSegments.push((0, gql_segments_1.updateLabelsSegment)(componentId, [], labels || []));
        const { mutation, variables, parameters } = (0, helpers_1.concatGqlSegments)(gqlSegments);
        if (mutation.trim() !== '') {
            const resp = await this.api.requestGraph((0, helpers_1.prefixMutation)(mutation, helpers_1.COMPOUND_MUTATION_NAME, parameters), variables);
            const { errors: createComponentErrors, data } = await resp.json();
            errorsAcc = errorsAcc.concat((0, helpers_1.parseCompoundMutationErrors)(data, variables));
            errorsAcc = errorsAcc.concat((0, helpers_1.mapGqlErrors)(createComponentErrors));
        }
        if (eventSources) {
            errorsAcc.push({
                message: helpers_1.EVENTS_UNIMPLEMENTED,
                errorSource: helpers_1.FORGE_GRAPHQL_SDK_ERROR_SOURCE,
                errorType: helpers_1.NOT_IMPLEMENTED_ERROR_TYPE,
                statusCode: 405
            });
        }
        if (dataManager) {
            // TODO: Make ServerError distinct from UserError
            const { errors } = await this.updateDataManager({
                componentId,
                externalSourceURL: dataManager.externalSourceURL,
                lastSyncEvent: {
                    status: errorsAcc.length > 0 ? graphql_types_1.ComponentSyncEventStatus.UserError : graphql_types_1.ComponentSyncEventStatus.Success,
                    lastSyncErrors: errorsAcc.map((error) => error.message),
                },
            });
            errorsAcc = errorsAcc.concat(errors);
        }
        let getComponentErrors;
        ({ errors: getComponentErrors, data: { component: createdComponent } } = await this.getComponent({
            componentId,
        }));
        errorsAcc = errorsAcc.concat(getComponentErrors);
    }
    return {
        errors: errorsAcc,
        data: { component: createdComponent || {} },
        success: errorsAcc.length === 0
    };
};
//# sourceMappingURL=createComponent.js.map