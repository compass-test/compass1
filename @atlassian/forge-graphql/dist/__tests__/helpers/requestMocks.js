"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUpdateDataManager = exports.mockGetComponentByExternalAlias = exports.mockRequestGraph = exports.mockDeleteComponent = exports.mockCreateExternalAlias = exports.mockAttachEventSource = exports.mockCreateEventSource = exports.mockCreateBaseComponent = exports.mockGetComponent = void 0;
const constants_1 = require("./constants");
const helpers_1 = require("../../helpers");
// TODO: Replace mockImplementationOnce with mockResolvedValueOnce
function mockCreateEventSource(spy, eventSourceId = constants_1.MOCK_EVENT_SOURCE_ID, errors) {
    let data = null;
    if (!errors) {
        data = {
            eventSource: {
                id: eventSourceId,
            }
        };
    }
    spy.mockImplementationOnce(async () => ({
        errors: errors || [],
        data,
    }));
}
exports.mockCreateEventSource = mockCreateEventSource;
function mockAttachEventSource(spy, errors) {
    spy.mockImplementationOnce(async () => ({
        errors: errors || [],
        data: null,
    }));
}
exports.mockAttachEventSource = mockAttachEventSource;
function mockCreateBaseComponent(spy, errors) {
    let data = null;
    if (!errors) {
        data = {
            component: {
                id: constants_1.MOCK_COMPONENT_ID
            }
        };
    }
    spy.mockImplementationOnce(async () => ({
        errors: errors || [],
        data,
    }));
}
exports.mockCreateBaseComponent = mockCreateBaseComponent;
function mockUpdateDataManager(spy, errors) {
    spy.mockImplementationOnce(async () => ({
        errors: errors || [],
        data: null,
    }));
}
exports.mockUpdateDataManager = mockUpdateDataManager;
function mockGetComponent(spy, component = constants_1.MOCK_BASE_COMPONENT_WITH_ID, success = true, errors) {
    spy.mockImplementationOnce(async () => ({
        errors: errors || [],
        success,
        data: !errors ? { component } : null,
    }));
}
exports.mockGetComponent = mockGetComponent;
function mockCreateExternalAlias(spy, errors) {
    spy.mockImplementationOnce(async () => ({
        errors: errors || [],
    }));
}
exports.mockCreateExternalAlias = mockCreateExternalAlias;
function mockDeleteComponent(spy, errors) {
    spy.mockImplementationOnce(async () => ({
        errors: errors || [],
        data: null,
    }));
}
exports.mockDeleteComponent = mockDeleteComponent;
function mockGetComponentByExternalAlias(spy, found = true, component = constants_1.MOCK_BASE_COMPONENT_WITH_ID, errors = []) {
    let data = null;
    if (!found) {
        errors.push(helpers_1.COMPONENT_NOT_FOUND);
    }
    if (errors !== []) {
        data = {
            component: found ? component : null
        };
    }
    spy.mockImplementationOnce(async () => ({
        errors,
        data,
    }));
}
exports.mockGetComponentByExternalAlias = mockGetComponentByExternalAlias;
function mockRequestGraph(spy, errors, data) {
    spy.mockImplementationOnce(async () => ({
        json: () => ({
            errors,
            data
        })
    }));
}
exports.mockRequestGraph = mockRequestGraph;
//# sourceMappingURL=requestMocks.js.map