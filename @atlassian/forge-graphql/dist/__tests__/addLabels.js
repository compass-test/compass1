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
describe('addLabels', () => {
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
        const resp = await compassApp.addLabels({
            componentId: constants_1.MOCK_COMPONENT_ID,
            labelNames: [constants_1.MOCK_LABEL]
        });
        expect(resp).toMatchSnapshot();
    });
    test('transforms MutationErrors', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [], {
            compass: {
                addComponentLabels: {
                    addedLabels: null,
                    errors: [constants_1.MOCK_MUTATION_ERROR]
                }
            }
        });
        const resp = await compassApp.addLabels({
            componentId: constants_1.MOCK_COMPONENT_ID,
            labelNames: [constants_1.MOCK_LABEL]
        });
        expect(resp).toMatchSnapshot();
    });
    test('successfully returns added labels', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [], {
            compass: {
                addComponentLabels: {
                    addedLabels: [constants_1.MOCK_LABEL]
                }
            }
        });
        const resp = await compassApp.addLabels({
            componentId: constants_1.MOCK_COMPONENT_ID,
            labelNames: [constants_1.MOCK_LABEL]
        });
        expect(resp).toMatchSnapshot();
    });
    test('errors if response cannot be parsed', async () => {
        (0, requestMocks_1.mockRequestGraph)(requestGraphSpy, [], {
            invalid_response: 'hello world'
        });
        const resp = await compassApp.addLabels({
            componentId: constants_1.MOCK_COMPONENT_ID,
            labelNames: [constants_1.MOCK_LABEL]
        });
        expect(resp).toMatchSnapshot();
    });
});
//# sourceMappingURL=addLabels.js.map