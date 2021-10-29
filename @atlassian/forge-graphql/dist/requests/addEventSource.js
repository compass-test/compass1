"use strict";
/// <reference path="../compass-requests.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const compass_requests_1 = require("../compass-requests");
compass_requests_1.CompassRequests.prototype.addEventSource = async function ({ componentId, eventSource, }) {
    let errorsAcc = [];
    let eventSourceId;
    const { errors: createErrors, data } = await this.createEventSource(eventSource);
    if (createErrors.length === 0) {
        try {
            const { eventSource: { id } } = data;
            const { errors: attachErrors } = await this.attachEventSource({
                eventSourceId: id,
                componentId
            });
            eventSourceId = id;
            errorsAcc = errorsAcc.concat(attachErrors);
        }
        catch {
            console.error('Error: Could not find id in createEventSource response');
        }
    }
    else {
        errorsAcc = errorsAcc.concat(createErrors);
    }
    return {
        errors: errorsAcc,
        success: errorsAcc.length === 0,
        data: {
            eventSource: errorsAcc.length > 0 ? {} : {
                ...eventSource,
                id: eventSourceId
            },
        }
    };
};
//# sourceMappingURL=addEventSource.js.map