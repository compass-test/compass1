"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./helpers/mockRequestAtlassian");
const index_1 = __importDefault(require("../index"));
const helpers_1 = require("../helpers");
const constants_1 = require("./helpers/constants");
const matchGql_1 = require("./helpers/matchGql");
const requestMocks_1 = require("./helpers/requestMocks");
const constants_2 = require("../helpers/constants");
const compassApp = index_1.default.compass.asApp();
const getComponentSpy = jest.spyOn(compassApp, 'getComponent');
const createBaseComponentSpy = jest.spyOn(compassApp, 'createBaseComponent');
const createExternalAliasSpy = jest.spyOn(compassApp, 'createExternalAlias');
const deleteComponentSpy = jest.spyOn(compassApp, 'deleteComponent');
const updateDataManagerSpy = jest.spyOn(compassApp, 'updateDataManager');
// @ts-ignore
const requestGraphSpy = jest.spyOn(compassApp.api, 'requestGraph');
describe('createComponent', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(global.Math, 'random').mockReturnValue(0.0000000001);
    });
    describe('Creation of base component', () => {
        test('successfully creates component', async () => {
            (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy);
            const createComponentResp = await compassApp.createComponent({
                cloudId: constants_1.MOCK_CLOUD_ID,
                ...constants_1.MOCK_BASE_COMPONENT,
            });
            expect(createBaseComponentSpy).toMatchSnapshot();
            expect(createExternalAliasSpy).not.toHaveBeenCalled();
            expect(deleteComponentSpy).not.toHaveBeenCalled();
            expect(requestGraphSpy).not.toBeCalled();
            expect(updateDataManagerSpy).not.toHaveBeenCalled();
            expect(getComponentSpy).toHaveBeenCalledWith({ componentId: constants_1.MOCK_COMPONENT_ID });
            expect(createComponentResp).toEqual({
                errors: [],
                success: true,
                data: { component: constants_1.MOCK_BASE_COMPONENT_WITH_ID },
            });
        });
        test('successfully creates component with external alias specified', async () => {
            (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
            (0, requestMocks_1.mockCreateExternalAlias)(createExternalAliasSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_BASE_COMPONENT_WITH_EXTERNAL_ALIAS);
            const createComponentResp = await compassApp.createComponent({
                cloudId: constants_1.MOCK_CLOUD_ID,
                externalAlias: {
                    ...constants_1.MOCK_EXTERNAL_ALIAS
                },
                ...constants_1.MOCK_BASE_COMPONENT,
            });
            expect(createBaseComponentSpy).toMatchSnapshot();
            expect(createExternalAliasSpy).toMatchSnapshot();
            expect(deleteComponentSpy).not.toHaveBeenCalled();
            expect(createComponentResp).toEqual({
                errors: [],
                success: true,
                data: { component: constants_1.MOCK_GET_BASE_COMPONENT_WITH_EXTERNAL_ALIAS },
            });
        });
        test('does not add fields to createBaseComponent input if none specified', async () => {
            (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
            (0, requestMocks_1.mockCreateExternalAlias)(createExternalAliasSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy, { id: constants_1.MOCK_COMPONENT_ID, ...constants_1.MOCK_BASE_COMPONENT_WITHOUT_FIELDS });
            const createComponentResp = await compassApp.createComponent({
                cloudId: constants_1.MOCK_CLOUD_ID,
                ...constants_1.MOCK_BASE_COMPONENT_WITHOUT_FIELDS,
            });
            expect(createBaseComponentSpy).toMatchSnapshot();
            expect(createExternalAliasSpy).not.toHaveBeenCalled();
            expect(deleteComponentSpy).not.toHaveBeenCalled();
            expect(createComponentResp).toEqual({
                errors: [],
                success: true,
                data: { component: { id: constants_1.MOCK_COMPONENT_ID, ...constants_1.MOCK_BASE_COMPONENT_WITHOUT_FIELDS } },
            });
        });
        test('rolls back creation of component if external alias could not be created', async () => {
            const createExternalAliasErrorMsg = 'Could not create external alias for component';
            (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
            (0, requestMocks_1.mockCreateExternalAlias)(createExternalAliasSpy, [{ message: createExternalAliasErrorMsg }]);
            (0, requestMocks_1.mockDeleteComponent)(deleteComponentSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy);
            const createComponentResp = await compassApp.createComponent({
                cloudId: constants_1.MOCK_CLOUD_ID,
                ...constants_1.MOCK_BASE_COMPONENT,
                externalAlias: {
                    ...constants_1.MOCK_EXTERNAL_ALIAS
                },
            });
            expect(createBaseComponentSpy).toMatchSnapshot();
            expect(createExternalAliasSpy).toMatchSnapshot();
            expect(deleteComponentSpy).toMatchSnapshot();
            expect(createComponentResp).toEqual({
                errors: [{ message: createExternalAliasErrorMsg }],
                success: false,
                data: { component: constants_1.MOCK_BASE_COMPONENT_WITH_ID },
            });
        });
        test('fails to create base component', async () => {
            const createBaseComponentErrorMsg = 'Could not create component';
            (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy, [{ message: createBaseComponentErrorMsg }]);
            const createComponentResp = await compassApp.createComponent({
                cloudId: constants_1.MOCK_CLOUD_ID,
                ...constants_1.MOCK_COMPLEX_COMPONENT,
            });
            expect(createExternalAliasSpy).not.toBeCalled();
            expect(deleteComponentSpy).not.toBeCalled();
            expect(requestGraphSpy).not.toBeCalled();
            expect(getComponentSpy).not.toBeCalled();
            expect(createComponentResp).toEqual({
                errors: [{ message: createBaseComponentErrorMsg }],
                success: false,
                data: { component: {} },
            });
        });
    });
    describe('Generates segments to add properties to base component', () => {
        test('Adds data manager, links, relationships, and labels', async () => {
            (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
            (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy);
            const createComponentResp = await compassApp.createComponent({
                cloudId: constants_1.MOCK_CLOUD_ID,
                ...constants_1.MOCK_COMPONENT_WITH_DATA_MANAGER,
            });
            expect(createBaseComponentSpy).toMatchSnapshot();
            expect(createExternalAliasSpy).toMatchSnapshot();
            expect(deleteComponentSpy).not.toHaveBeenCalled();
            expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
            expect(updateDataManagerSpy).toMatchSnapshot();
            expect(createComponentResp).toEqual({
                errors: [],
                success: true,
                data: { component: constants_1.MOCK_BASE_COMPONENT_WITH_ID },
            });
        });
        test('Fails when making AGG request', async () => {
            (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [constants_1.MOCK_GQL_ERROR]);
            (0, requestMocks_1.mockGetComponent)(getComponentSpy);
            const createComponentResp = await compassApp.createComponent({
                cloudId: constants_1.MOCK_CLOUD_ID,
                ...constants_1.MOCK_COMPLEX_COMPONENT,
            });
            expect(createComponentResp).toMatchSnapshot();
        });
        test('Fails on one segment', async () => {
            (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
            (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [], {
                compass: {
                    createComponentLink_1: {
                        errors: [constants_1.MOCK_MUTATION_ERROR]
                    }
                }
            });
            (0, requestMocks_1.mockGetComponent)(getComponentSpy);
            const createComponentResp = await compassApp.createComponent({
                cloudId: constants_1.MOCK_CLOUD_ID,
                ...constants_1.MOCK_COMPLEX_COMPONENT,
            });
            expect(createComponentResp).toMatchSnapshot();
        });
    });
    test('Fails in multiple requests', async () => {
        (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [constants_1.MOCK_GQL_ERROR]);
        (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy, [constants_1.MOCK_GQL_ERROR]);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy);
        const createComponentResp = await compassApp.createComponent({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_COMPONENT_WITH_DATA_MANAGER,
        });
        expect(createComponentResp).toMatchSnapshot();
    });
    test('Returns error when trying to add event source', async () => {
        (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_BASE_COMPONENT_WITH_ID);
        const createComponentResp = await compassApp.createComponent({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_COMPONENT_WITH_EVENT_SOURCE,
        });
        expect(createComponentResp).toEqual({
            errors: [{
                    message: helpers_1.EVENTS_UNIMPLEMENTED,
                    errorSource: helpers_1.FORGE_GRAPHQL_SDK_ERROR_SOURCE,
                    errorType: helpers_1.NOT_IMPLEMENTED_ERROR_TYPE,
                    statusCode: 405
                }],
            success: false,
            data: { component: constants_1.MOCK_BASE_COMPONENT_WITH_ID },
        });
    });
    test('Returns error when trying to make a component with empty tier', async () => {
        (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_BASE_COMPONENT_WITH_ID);
        const createComponentResp = await compassApp.createComponent({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_BASE_COMPONENT_WITH_ID,
            fields: { tier: [] }
        });
        expect(createComponentResp).toEqual({
            errors: [constants_2.TIER_MISSING_VALUE],
            success: false,
            data: { component: {} },
        });
    });
    test('Returns error when trying to make a component with undefined tier', async () => {
        (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_BASE_COMPONENT_WITH_ID);
        const createComponentResp = await compassApp.createComponent({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_BASE_COMPONENT_WITH_ID,
            fields: { tier: undefined }
        });
        expect(createComponentResp).toEqual({
            errors: [constants_2.TIER_MISSING_VALUE],
            success: false,
            data: { component: {} },
        });
    });
    test('Updates data manager with errors if it exists', async () => {
        const requestGraphErrorMessage = 'id is not a valid ARI';
        (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
        (0, requestMocks_1.mockUpdateDataManager)(updateDataManagerSpy);
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [{
                message: requestGraphErrorMessage,
            }]);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER);
        const createComponentResp = await compassApp.createComponent({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_COMPONENT_WITH_DATA_MANAGER,
        });
        expect(updateDataManagerSpy).toMatchSnapshot();
        expect(createComponentResp).toEqual({
            errors: [{
                    message: requestGraphErrorMessage,
                    errorType: helpers_1.INTERNAL_SERVER_ERROR_TYPE,
                    errorSource: helpers_1.FORGE_GRAPHQL_SDK_ERROR_SOURCE
                }],
            success: false,
            data: { component: constants_1.MOCK_GET_COMPONENT_WITH_DATA_MANAGER },
        });
    });
});
//# sourceMappingURL=createComponent.js.map