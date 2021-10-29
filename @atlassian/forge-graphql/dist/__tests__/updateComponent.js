"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./helpers/mockRequestAtlassian");
const index_1 = __importDefault(require("../index"));
const constants_1 = require("./helpers/constants");
const helpers_1 = require("../helpers");
const requestMocks_1 = require("./helpers/requestMocks");
const matchGql_1 = require("./helpers/matchGql");
const helpers_2 = require("../helpers");
const compassApp = index_1.default.compass.asApp();
const getComponentSpy = jest.spyOn(compassApp, 'getComponent');
const updateDataManagerSpy = jest.spyOn(compassApp, 'updateDataManager');
// @ts-ignore
const requestGraphSpy = jest.spyOn(compassApp.api, 'requestGraph');
describe('updateComponent', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(global.Math, 'random').mockReturnValue(0.0000000001);
    });
    test('successfully updates base component, links, relationships, labels', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
        // gets resp for updateComponent
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_CHANGED_COMPONENT);
        const updatedComponentResp = await compassApp.updateComponent({
            id: constants_1.MOCK_COMPONENT_ID,
            currentComponent: constants_1.MOCK_BASE_COMPONENT_WITH_ID,
            ...constants_1.MOCK_CHANGED_COMPONENT
        });
        expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
        expect(updatedComponentResp).toEqual({
            errors: [],
            success: true,
            data: { component: constants_1.MOCK_GET_CHANGED_COMPONENT } // todo check this
        });
    });
    test('returns gql error', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [constants_1.MOCK_GQL_ERROR]);
        // gets resp for updateComponent
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, {
            id: constants_1.MOCK_COMPONENT_ID,
            ...constants_1.MOCK_BASE_COMPONENT
        });
        const updatedComponentResp = await compassApp.updateComponent({
            id: constants_1.MOCK_COMPONENT_ID,
            currentComponent: constants_1.MOCK_BASE_COMPONENT_WITH_ID,
            ...constants_1.MOCK_CHANGED_COMPONENT
        });
        expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
        expect(updatedComponentResp).toMatchSnapshot();
    });
    test('returns mutation error', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [], {
            compass: {
                updateComponent_1: {
                    errors: [constants_1.MOCK_MUTATION_ERROR]
                }
            }
        });
        // gets resp for updateComponent
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, {
            id: constants_1.MOCK_COMPONENT_ID,
            ...constants_1.MOCK_BASE_COMPONENT
        });
        const updatedComponentResp = await compassApp.updateComponent({
            id: constants_1.MOCK_COMPONENT_ID,
            currentComponent: constants_1.MOCK_BASE_COMPONENT_WITH_ID,
            ...constants_1.MOCK_CHANGED_COMPONENT
        });
        expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
        expect(updatedComponentResp).toMatchSnapshot();
    });
    describe('does not update when value passed in is undefined', () => {
        test('does not update description on base component when description is undefined', async () => {
            const newComponent = { ...constants_1.MOCK_BASE_COMPONENT_WITH_ID, description: undefined };
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, newComponent);
            await compassApp.updateComponent({
                id: constants_1.MOCK_COMPONENT_ID,
                currentComponent: constants_1.MOCK_BASE_COMPONENT_WITH_ID,
                ...newComponent,
            });
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
        });
        test('does not update links, relationships, and labels when undefined', async () => {
            const newComponent = {
                ...constants_1.MOCK_BASE_COMPONENT_WITH_ID,
                links: undefined,
                relationships: undefined,
                labels: undefined
            };
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, newComponent);
            await compassApp.updateComponent({
                id: constants_1.MOCK_COMPONENT_ID,
                currentComponent: {
                    ...constants_1.MOCK_BASE_COMPONENT_WITH_ID,
                    links: [constants_1.MOCK_GET_LINK, constants_1.MOCK_GET_LINK_2],
                    relationships: [constants_1.MOCK_RELATIONSHIP, constants_1.MOCK_RELATIONSHIP_2],
                    labels: [constants_1.MOCK_LABEL, constants_1.MOCK_LABEL_2]
                },
                ...newComponent,
            });
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
        });
    });
    describe('retrieves component if it is not passed in', () => {
        test('retrieves a component if it does not exist', async () => {
            // initial retrieval
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_BASE_COMPONENT_WITH_ID);
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            // updateComponent resp
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_CHANGED_COMPONENT);
            const updatedComponentResp = await compassApp.updateComponent({
                ...constants_1.MOCK_CHANGED_COMPONENT
            });
            expect(getComponentSpy).toMatchSnapshot();
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
            expect(updatedComponentResp).toEqual({
                errors: [],
                success: true,
                data: { component: constants_1.MOCK_GET_CHANGED_COMPONENT }
            });
        });
        test('if there is an error with getting a component, it does not try to update', async () => {
            const GET_COMPONENT_ERROR = 'Could not find component';
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_BASE_COMPONENT_WITH_ID, true, [{ message: GET_COMPONENT_ERROR }]);
            const updatedComponentResp = await compassApp.updateComponent({
                ...constants_1.MOCK_CHANGED_COMPONENT
            });
            expect(requestGraphSpy).not.toBeCalled();
            expect(updatedComponentResp).toEqual({
                errors: [{ message: GET_COMPONENT_ERROR }],
                success: true,
                data: { component: {} }
            });
        });
    });
    test('returns error when trying to use events API', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
        // gets resp for updateComponent
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_CHANGED_COMPONENT);
        const updatedComponentResp = await compassApp.updateComponent({
            id: constants_1.MOCK_COMPONENT_ID,
            currentComponent: {
                ...constants_1.MOCK_BASE_COMPONENT_WITH_ID,
            },
            ...constants_1.MOCK_CHANGED_COMPONENT,
            eventSources: [(0, constants_1.MOCK_EVENT_SOURCE)()]
        });
        expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_2.DETACH_EVENT_SOURCES_MUTATION_NAME)).toMatchSnapshot();
        expect(updatedComponentResp).toEqual({
            errors: [{
                    errorSource: helpers_1.FORGE_GRAPHQL_SDK_ERROR_SOURCE,
                    errorType: helpers_1.NOT_IMPLEMENTED_ERROR_TYPE,
                    message: helpers_1.EVENTS_UNIMPLEMENTED,
                    statusCode: 405,
                }],
            success: false,
            data: { component: constants_1.MOCK_GET_CHANGED_COMPONENT }
        });
    });
    describe('attaches, detaches, and updates data manager', () => {
        test('successfully updates data manager and returns error if there is an error when updating component', async () => {
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [constants_1.MOCK_GQL_ERROR]);
            (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, null);
            const updatedComponentResp = await compassApp.updateComponent({
                id: constants_1.MOCK_COMPONENT_ID,
                currentComponent: constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER,
                ...constants_1.MOCK_COMPONENT_WITH_DATA_MANAGER
            });
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
            expect(updatedComponentResp).toMatchSnapshot();
        });
        test('successfully updates data manager if there are no errors', async () => {
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER);
            const updatedComponentResp = await compassApp.updateComponent({
                id: constants_1.MOCK_COMPONENT_ID,
                currentComponent: constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER,
                ...constants_1.MOCK_COMPONENT_WITH_DATA_MANAGER
            });
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
            expect(updatedComponentResp).toEqual({
                errors: [],
                success: true,
                data: {
                    component: constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER
                }
            });
        });
        test('adds data manager if one does not exist', async () => {
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER);
            const updatedComponentResp = await compassApp.updateComponent({
                id: constants_1.MOCK_COMPONENT_ID,
                currentComponent: constants_1.MOCK_GET_COMPLEX_COMPONENT,
                ...constants_1.MOCK_COMPONENT_WITH_DATA_MANAGER
            });
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
            expect(updatedComponentResp).toEqual({
                errors: [],
                success: true,
                data: {
                    component: constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER
                }
            });
        });
        test('detaches data manager if one is specified as {}', async () => {
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER);
            const updatedComponentResp = await compassApp.updateComponent({
                id: constants_1.MOCK_COMPONENT_ID,
                currentComponent: constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER,
                ...constants_1.MOCK_COMPONENT_WITH_EMPTY_DATA_MANAGER
            });
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
            expect(updatedComponentResp).toEqual({
                errors: [],
                success: true,
                data: {
                    component: constants_1.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER
                }
            });
        });
        test('detaches data manager if one is specified as null', async () => {
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER);
            const updatedComponentResp = await compassApp.updateComponent({
                id: constants_1.MOCK_COMPONENT_ID,
                currentComponent: constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER,
                ...constants_1.MOCK_COMPONENT_WITH_NULL_DATA_MANAGER
            });
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
            expect(updatedComponentResp).toEqual({
                errors: [],
                success: true,
                data: {
                    component: constants_1.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER
                }
            });
        });
        test('does not try to attach/detach if old component did not have a data manager and new data manager is empty', async () => {
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER);
            const updatedComponentResp = await compassApp.updateComponent({
                id: constants_1.MOCK_COMPONENT_ID,
                currentComponent: constants_1.MOCK_GET_COMPLEX_COMPONENT,
                ...constants_1.MOCK_COMPONENT_WITH_EMPTY_DATA_MANAGER
            });
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
            expect(updatedComponentResp).toEqual({
                errors: [],
                success: true,
                data: {
                    component: constants_1.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER
                }
            });
        });
        test('does not attach/detach (but does update) if old component did have data manager and new manager is empty', async () => {
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER);
            const updatedComponentResp = await compassApp.updateComponent({
                id: constants_1.MOCK_COMPONENT_ID,
                currentComponent: constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER,
                ...constants_1.MOCK_COMPLEX_COMPONENT
            });
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
            expect(updatedComponentResp).toEqual({
                errors: [],
                success: true,
                data: {
                    component: constants_1.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER
                }
            });
        });
    });
});
//# sourceMappingURL=updateComponent.js.map