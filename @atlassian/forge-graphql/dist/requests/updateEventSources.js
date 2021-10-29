"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
const helpers_1 = require("../helpers");
const DetachEventSourceMutation_1 = require("../graphQL/DetachEventSourceMutation");
function isEventSourceEqual(a, b) {
    return (a.externalEventSourceId === b.externalEventSourceId &&
        a.eventType === b.eventType);
}
function transformIntoDeleteEventSourceInput(item, componentId) {
    return {
        eventSourceId: item.id,
        componentId,
    };
}
compass_requests_1.CompassRequests.prototype.updateEventSources = async function ({ componentId, oldEventSources, newEventSources, }) {
    let errorsAcc = [];
    const eventSourcesInBoth = oldEventSources.filter((existingEventSource) => {
        newEventSources.some((newEventSource) => isEventSourceEqual(existingEventSource, newEventSource));
    });
    const toBeAdded = newEventSources.filter((newEventSource) => !eventSourcesInBoth.some((overlapEventSource) => isEventSourceEqual(newEventSource, overlapEventSource)));
    const toBeDetached = oldEventSources.filter((oldEventSource) => !eventSourcesInBoth.some((overlapEventSource) => isEventSourceEqual(overlapEventSource, oldEventSource)));
    // TODO: Make these into bulk requests
    for (let newEventSource of toBeAdded) {
        const { errors } = await this.addEventSource({ componentId, eventSource: newEventSource });
        errorsAcc = errorsAcc.concat(errors);
    }
    if (toBeDetached.length > 0) {
        let segmentAcc = {
            mutation: "",
            parameters: [],
            variables: {},
        };
        const deleteEventSourceGqlSegment = () => (0, helpers_1.generateMutationGql)(DetachEventSourceMutation_1.DetachEventSource, "detachEventSource");
        const { mutation, parameters, variables } = (0, helpers_1.constructGqlSegmentFromArray)(toBeDetached, deleteEventSourceGqlSegment, transformIntoDeleteEventSourceInput, segmentAcc, componentId);
        const detachEventSourcesResp = await this.api.requestGraph((0, helpers_1.prefixMutation)(mutation, helpers_1.DETACH_EVENT_SOURCES_MUTATION_NAME, parameters), variables);
        const { errors, data } = await detachEventSourcesResp.json();
        errorsAcc = errorsAcc.concat((0, helpers_1.parseCompoundMutationErrors)(data, variables));
        errorsAcc = errorsAcc.concat((0, helpers_1.mapGqlErrors)(errors));
    }
    let eventSources;
    try {
        ({ data: { component: { eventSources } } } = await this.getComponent({
            componentId,
        }));
    }
    catch {
        console.error('Error: Could not parse getComponent response');
    }
    return {
        errors: errorsAcc,
        success: errorsAcc.length === 0,
        data: { eventSources: eventSources || [] },
    };
};
//# sourceMappingURL=updateEventSources.js.map