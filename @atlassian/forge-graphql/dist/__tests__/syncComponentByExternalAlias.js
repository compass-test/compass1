"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./helpers/mockRequestAtlassian");
const index_1 = __importDefault(require("../index"));
const constants_1 = require("./helpers/constants");
const requestMocks_1 = require("./helpers/requestMocks");
const matchGql_1 = require("./helpers/matchGql");
const helpers_1 = require("../helpers");
const compassApp = index_1.default.compass.asApp();
const getComponentByExternalAliasSpy = jest.spyOn(compassApp, 'getComponentByExternalAlias');
const createBaseComponentSpy = jest.spyOn(compassApp, 'createBaseComponent');
const createExternalAliasSpy = jest.spyOn(compassApp, 'createExternalAlias');
const getComponentSpy = jest.spyOn(compassApp, 'getComponent');
const updateComponentSpy = jest.spyOn(compassApp, 'updateComponent');
// @ts-ignore
const requestGraphSpy = jest.spyOn(compassApp.api, 'requestGraph');
describe('syncComponentByExternalAlias', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(global.Math, 'random').mockReturnValue(0.0000000001);
    });
    test('creates component if external alias does not exist', async () => {
        (0, requestMocks_1.mockGetComponentByExternalAlias)(getComponentByExternalAliasSpy, false);
        (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy);
        (0, requestMocks_1.mockCreateExternalAlias)(createExternalAliasSpy);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_BASE_COMPONENT_WITH_ID);
        const resp = await compassApp.syncComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_BASE_COMPONENT,
            externalAlias: constants_1.MOCK_EXTERNAL_ALIAS,
            options: {
                createComponentIfNotFound: true
            }
        });
        expect(createExternalAliasSpy).toMatchSnapshot();
        expect(updateComponentSpy).not.toHaveBeenCalled();
        expect(resp).toEqual({
            errors: [],
            success: true,
            data: {
                component: constants_1.MOCK_BASE_COMPONENT_WITH_ID
            }
        });
    });
    test('returns error if createComponentIfNotFound is false and component does not exist', async () => {
        (0, requestMocks_1.mockGetComponentByExternalAlias)(getComponentByExternalAliasSpy, false);
        const resp = await compassApp.syncComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_BASE_COMPONENT,
            externalAlias: constants_1.MOCK_EXTERNAL_ALIAS
        });
        expect(createBaseComponentSpy).not.toHaveBeenCalled();
        expect(resp).toEqual({
            errors: [
                {
                    message: `Component with external alias id ${constants_1.MOCK_EXTERNAL_ALIAS.externalId} could not be found`,
                    errorSource: helpers_1.FORGE_GRAPHQL_SDK_ERROR_SOURCE,
                    errorType: helpers_1.NOT_FOUND_ERROR_TYPE,
                    statusCode: 404
                }
            ],
            success: false,
            data: { component: {} }
        });
    });
    test('updates component if external alias is found', async () => {
        (0, requestMocks_1.mockGetComponentByExternalAlias)(getComponentByExternalAliasSpy, true, constants_1.MOCK_BASE_COMPONENT_WITH_ID);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_BASE_COMPONENT_WITH_ID);
        await compassApp.syncComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_BASE_COMPONENT,
            externalAlias: constants_1.MOCK_EXTERNAL_ALIAS
        });
        expect(createBaseComponentSpy).not.toHaveBeenCalled();
        expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
    });
    test('returns error if there is an error when looking up external alias', async () => {
        const invalidAriError = 'ARI is not valid';
        (0, requestMocks_1.mockGetComponentByExternalAlias)(getComponentByExternalAliasSpy, true, constants_1.MOCK_BASE_COMPONENT_WITH_ID, [invalidAriError]);
        const resp = await compassApp.syncComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_BASE_COMPONENT,
            externalAlias: constants_1.MOCK_EXTERNAL_ALIAS
        });
        expect(createBaseComponentSpy).not.toHaveBeenCalled();
        expect(updateComponentSpy).not.toHaveBeenCalled();
        expect(resp).toEqual({
            errors: [invalidAriError],
            success: false,
            data: { component: {} }
        });
    });
    test('returns error if there is an error when creating component', async () => {
        const createComponentError = 'Could not create component';
        (0, requestMocks_1.mockGetComponentByExternalAlias)(getComponentByExternalAliasSpy, false);
        (0, requestMocks_1.mockCreateBaseComponent)(createBaseComponentSpy, [{ message: createComponentError }]);
        const resp = await compassApp.syncComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_BASE_COMPONENT,
            externalAlias: constants_1.MOCK_EXTERNAL_ALIAS,
            options: {
                createComponentIfNotFound: true
            }
        });
        expect(createBaseComponentSpy).toMatchSnapshot();
        expect(updateComponentSpy).not.toHaveBeenCalled();
        expect(getComponentSpy).not.toHaveBeenCalled();
        expect(resp).toEqual({
            errors: [{ message: createComponentError }],
            success: false,
            data: { component: {} }
        });
    });
    test('returns error if there is an error when updating component', async () => {
        const updateComponentError = 'Could not update component';
        (0, requestMocks_1.mockGetComponentByExternalAlias)(getComponentByExternalAliasSpy);
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [{ message: updateComponentError }]);
        (0, requestMocks_1.mockGetComponent)(getComponentSpy, constants_1.MOCK_BASE_COMPONENT_WITH_ID);
        const resp = await compassApp.syncComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_BASE_COMPONENT,
            externalAlias: constants_1.MOCK_EXTERNAL_ALIAS,
        });
        expect((0, matchGql_1.findCall)(requestGraphSpy, helpers_1.COMPOUND_MUTATION_NAME)).toMatchSnapshot();
        expect(createBaseComponentSpy).not.toHaveBeenCalled();
        expect(resp).toEqual({
            errors: [{
                    message: updateComponentError,
                    errorSource: helpers_1.FORGE_GRAPHQL_SDK_ERROR_SOURCE,
                    errorType: helpers_1.INTERNAL_SERVER_ERROR_TYPE
                }],
            success: false,
            data: { component: constants_1.MOCK_BASE_COMPONENT_WITH_ID }
        });
    });
});
//# sourceMappingURL=syncComponentByExternalAlias.js.map