"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./helpers/mockRequestAtlassian");
const index_1 = __importDefault(require("../index"));
const constants_1 = require("./helpers/constants");
const requestMocks_1 = require("./helpers/requestMocks");
const helpers_1 = require("../helpers");
const matchGql_1 = require("./helpers/matchGql");
const compassApp = index_1.default.compass.asApp();
const createEventSourceSpy = jest.spyOn(compassApp, 'createEventSource');
const attachEventSourceSpy = jest.spyOn(compassApp, 'attachEventSource');
const getComponentSpy = jest.spyOn(compassApp, 'getComponent');
// @ts-ignore
const requestGraphSpy = jest.spyOn(compassApp.api, 'requestGraph');
describe('updateEventSources', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(global.Math, 'random').mockReturnValue(0.0000000001);
    });
    test('successfully adds one source', async () => {
        (0, requestMocks_1.mockCreateEventSource)(createEventSourceSpy);
        (0, requestMocks_1.mockAttachEventSource)(attachEventSourceSpy);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_EVENT_SOURCE);
        const eventSourceResp = await compassApp.updateEventSources({
            componentId: constants_1.MOCK_COMPONENT_ID,
            oldEventSources: [],
            newEventSources: [(0, constants_1.MOCK_EVENT_SOURCE)()],
        });
        expect(createEventSourceSpy).toMatchSnapshot();
        expect(attachEventSourceSpy).toMatchSnapshot();
        expect(eventSourceResp).toEqual({
            errors: [],
            success: true,
            data: { eventSources: [(0, constants_1.MOCK_GET_EVENT_SOURCE)()] }
        });
    });
    test('successfully adds multiple sources', async () => {
        const eventSources = [(0, constants_1.MOCK_EVENT_SOURCE)(), (0, constants_1.MOCK_EVENT_SOURCE)(constants_1.MOCK_EXTERNAL_EVENT_SOURCE_ID_2)];
        (0, requestMocks_1.mockCreateEventSource)(createEventSourceSpy);
        (0, requestMocks_1.mockAttachEventSource)(attachEventSourceSpy);
        (0, requestMocks_1.mockCreateEventSource)(createEventSourceSpy, constants_1.MOCK_EVENT_SOURCE_ID_2);
        (0, requestMocks_1.mockAttachEventSource)(attachEventSourceSpy);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, {
            ...constants_1.MOCK_BASE_COMPONENT_WITH_ID,
            eventSources,
        });
        const eventSourceResp = await compassApp.updateEventSources({
            componentId: constants_1.MOCK_COMPONENT_ID,
            oldEventSources: [],
            newEventSources: eventSources,
        });
        expect(createEventSourceSpy).toMatchSnapshot();
        expect(attachEventSourceSpy).toMatchSnapshot();
        expect(eventSourceResp).toEqual({
            errors: [],
            success: true,
            data: { eventSources }
        });
    });
    test('successfully detaches sources', async () => {
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_EVENT_SOURCE);
        const eventSourceResp = await compassApp.updateEventSources({
            componentId: constants_1.MOCK_COMPONENT_ID,
            oldEventSources: [{ ...(0, constants_1.MOCK_EVENT_SOURCE)(), id: constants_1.MOCK_EVENT_SOURCE_ID }],
            newEventSources: [],
        });
        expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.DETACH_EVENT_SOURCES_MUTATION_NAME)).toMatchSnapshot();
        expect(eventSourceResp).toEqual({
            errors: [],
            success: true,
            data: {
                eventSources: constants_1.MOCK_GET_COMPONENT_WITH_EVENT_SOURCE.eventSources
            }
        });
    });
    test('successfully detaches multiple sources', async () => {
        const eventSources = [{ ...(0, constants_1.MOCK_EVENT_SOURCE)(), id: constants_1.MOCK_EVENT_SOURCE_ID }, { ...(0, constants_1.MOCK_EVENT_SOURCE)(constants_1.MOCK_EXTERNAL_EVENT_SOURCE_ID_2), id: constants_1.MOCK_EVENT_SOURCE_ID_2 }];
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_EVENT_SOURCES);
        const eventSourceResp = await compassApp.updateEventSources({
            componentId: constants_1.MOCK_COMPONENT_ID,
            oldEventSources: eventSources,
            newEventSources: [],
        });
        expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.DETACH_EVENT_SOURCES_MUTATION_NAME)).toMatchSnapshot();
        expect(eventSourceResp).toEqual({
            errors: [],
            success: true,
            data: { eventSources }
        });
    });
    test('successfully adds a source and detaches a source', async () => {
        (0, requestMocks_1.mockCreateEventSource)(createEventSourceSpy);
        (0, requestMocks_1.mockAttachEventSource)(attachEventSourceSpy);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_EVENT_SOURCE);
        const eventSourceResp = await compassApp.updateEventSources({
            componentId: constants_1.MOCK_COMPONENT_ID,
            oldEventSources: [{ ...(0, constants_1.MOCK_GET_EVENT_SOURCE)(constants_1.MOCK_EXTERNAL_EVENT_SOURCE_ID_2), id: constants_1.MOCK_EVENT_SOURCE_ID_2 }],
            newEventSources: [(0, constants_1.MOCK_EVENT_SOURCE)()],
        });
        expect(createEventSourceSpy).toMatchSnapshot();
        expect(attachEventSourceSpy).toMatchSnapshot();
        expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.DETACH_EVENT_SOURCES_MUTATION_NAME)).toMatchSnapshot();
        expect(eventSourceResp).toEqual({
            errors: [],
            success: true,
            data: {
                eventSources: [(0, constants_1.MOCK_GET_EVENT_SOURCE)()]
            }
        });
    });
    test('handles error when adding event source', async () => {
        (0, requestMocks_1.mockCreateEventSource)(createEventSourceSpy, constants_1.MOCK_EVENT_SOURCE_ID, [constants_1.MOCK_GQL_ERROR]);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_BASE_COMPONENT_WITH_ID);
        const eventSourceResp = await compassApp.updateEventSources({
            componentId: constants_1.MOCK_COMPONENT_ID,
            oldEventSources: [],
            newEventSources: [(0, constants_1.MOCK_EVENT_SOURCE)()],
        });
        expect(attachEventSourceSpy).not.toHaveBeenCalled();
        expect(eventSourceResp).toMatchSnapshot();
    });
    test('handles gql error when detaching event source', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [constants_1.MOCK_GQL_ERROR]);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_EVENT_SOURCE);
        const eventSourceResp = await compassApp.updateEventSources({
            componentId: constants_1.MOCK_COMPONENT_ID,
            oldEventSources: [{ ...(0, constants_1.MOCK_EVENT_SOURCE)(), id: constants_1.MOCK_EVENT_SOURCE_ID }],
            newEventSources: [],
        });
        expect(eventSourceResp).toMatchSnapshot();
    });
    test('handles mutation error when detaching event source', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [], {
            compass: {
                detachEventSource_1: {
                    errors: [constants_1.MOCK_MUTATION_ERROR]
                }
            }
        });
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_EVENT_SOURCE);
        const eventSourceResp = await compassApp.updateEventSources({
            componentId: constants_1.MOCK_COMPONENT_ID,
            oldEventSources: [{ ...(0, constants_1.MOCK_EVENT_SOURCE)(), id: constants_1.MOCK_EVENT_SOURCE_ID }],
            newEventSources: [],
        });
        expect(eventSourceResp).toMatchSnapshot();
    });
    test('handles errors when adding and detaching event source', async () => {
        (0, requestMocks_1.mockCreateEventSource)(createEventSourceSpy, constants_1.MOCK_EVENT_SOURCE_ID, [constants_1.MOCK_GQL_ERROR]);
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [constants_1.MOCK_GQL_ERROR]);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_EVENT_SOURCE);
        const eventSourceResp = await compassApp.updateEventSources({
            componentId: constants_1.MOCK_COMPONENT_ID,
            oldEventSources: [{ ...(0, constants_1.MOCK_EVENT_SOURCE)(constants_1.MOCK_EXTERNAL_EVENT_SOURCE_ID_2), id: constants_1.MOCK_EVENT_SOURCE_ID_2 }],
            newEventSources: [(0, constants_1.MOCK_EVENT_SOURCE)()],
        });
        expect(eventSourceResp).toMatchSnapshot();
    });
});
//# sourceMappingURL=updateEventSources.js.map