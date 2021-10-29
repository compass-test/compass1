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
const compassApp = index_1.default.compass.asApp();
// @ts-ignore
const requestGraphSpy = jest.spyOn(compassApp.api, 'requestGraph');
describe('getComponentByExternalAlias', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('transforms GqlErrors', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [{
                message: constants_1.MOCK_ERROR_MESSAGE,
                extensions: {
                    errorSource: helpers_1.GRAPHQL_GATEWAY_SOURCE,
                    classification: constants_1.MOCK_ERROR_TYPE
                }
            }]);
        const resp = await compassApp.getComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_EXTERNAL_ALIAS
        });
        expect(resp).toMatchSnapshot();
    });
    test('transform component QueryErrors', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [], {
            compass: {
                component: constants_1.MOCK_QUERY_ERROR
            }
        });
        const resp = await compassApp.getComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_EXTERNAL_ALIAS
        });
        expect(resp).toMatchSnapshot();
    });
    test('transform component relationships QueryErrors', async () => {
        requestGraphSpy.mockResolvedValue({
            json: async () => {
                return {
                    errors: [],
                    data: {
                        compass: {
                            component: {
                                __typename: 'CompassComponent',
                                relationships: constants_1.MOCK_QUERY_ERROR
                            }
                        }
                    }
                };
            }
        });
        const resp = await compassApp.getComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_EXTERNAL_ALIAS
        });
        expect(resp).toMatchSnapshot();
    });
    test('transform successful component result', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [], {
            compass: {
                component: constants_1.MOCK_COMPONENT_AGG
            }
        });
        const resp = await compassApp.getComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_EXTERNAL_ALIAS
        });
        expect(resp).toMatchSnapshot();
    });
    test('errors if component cannot be transformed', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [], {
            invalid_response: 'hello world'
        });
        const resp = await compassApp.getComponentByExternalAlias({
            cloudId: constants_1.MOCK_CLOUD_ID,
            ...constants_1.MOCK_EXTERNAL_ALIAS
        });
        expect(resp).toMatchSnapshot();
    });
});
//# sourceMappingURL=getComponentByExternalAlias.js.map