"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./helpers/mockRequestAtlassian");
const graphql_types_1 = require("../graphql-types");
const index_1 = __importDefault(require("../index"));
const constants_1 = require("./helpers/constants");
const requestMocks_1 = require("./helpers/requestMocks");
const compassApp = index_1.default.compass.asApp();
const createEventSourceSpy = jest.spyOn(compassApp, 'createEventSource');
const attachEventSourceSpy = jest.spyOn(compassApp, 'attachEventSource');
describe('addEventSource', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('successfully added source', async () => {
        (0, requestMocks_1.mockCreateEventSource)(createEventSourceSpy);
        (0, requestMocks_1.mockAttachEventSource)(attachEventSourceSpy);
        const eventSourceResp = await compassApp.addEventSource({
            componentId: constants_1.MOCK_COMPONENT_ID,
            eventSource: (0, constants_1.MOCK_EVENT_SOURCE)()
        });
        expect(attachEventSourceSpy).toMatchSnapshot();
        expect(eventSourceResp).toEqual({
            errors: [],
            success: true,
            data: {
                eventSource: {
                    eventType: graphql_types_1.CompassEventType.Deployment,
                    id: constants_1.MOCK_EVENT_SOURCE_ID,
                    externalEventSourceId: constants_1.MOCK_EXTERNAL_EVENT_SOURCE_ID,
                }
            }
        });
    });
    test('create event source fails', async () => {
        const createEventSourceErrorMsg = 'Create event source failed';
        (0, requestMocks_1.mockCreateEventSource)(createEventSourceSpy, constants_1.MOCK_EVENT_SOURCE_ID, [{ message: createEventSourceErrorMsg }]);
        const eventSourceResp = await compassApp.addEventSource({
            componentId: constants_1.MOCK_COMPONENT_ID,
            eventSource: (0, constants_1.MOCK_EVENT_SOURCE)()
        });
        expect(attachEventSourceSpy).not.toBeCalled();
        expect(eventSourceResp).toEqual({
            errors: [{ message: createEventSourceErrorMsg }],
            success: false,
            data: { eventSource: {} },
        });
    });
    test('attach event source fails', async () => {
        const attachEventSourceErrorMsg = 'Attach event source failed';
        (0, requestMocks_1.mockCreateEventSource)(createEventSourceSpy);
        (0, requestMocks_1.mockAttachEventSource)(attachEventSourceSpy, [{ message: attachEventSourceErrorMsg }]);
        const eventSourceResp = await compassApp.addEventSource({
            componentId: constants_1.MOCK_COMPONENT_ID,
            eventSource: (0, constants_1.MOCK_EVENT_SOURCE)()
        });
        expect(attachEventSourceSpy).toMatchSnapshot();
        expect(eventSourceResp).toEqual({
            errors: [{ message: attachEventSourceErrorMsg }],
            success: false,
            data: { eventSource: {} }
        });
    });
});
//# sourceMappingURL=addEventSource.js.map