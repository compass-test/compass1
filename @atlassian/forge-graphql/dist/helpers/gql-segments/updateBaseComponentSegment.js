"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateMutationGql_1 = __importDefault(require("../generateMutationGql"));
const UpdateComponentMutation_1 = require("../../graphQL/UpdateComponentMutation");
const transformFields_1 = require("../transformFields");
function updateBaseComponentSegment(input) {
    const { id, name, description, ownerId, fields } = input;
    const { mutationGql: mutation, params: parameters, inputId, } = (0, generateMutationGql_1.default)(UpdateComponentMutation_1.UpdateCompassComponent, 'updateComponent');
    const variables = {};
    variables[inputId] = {
        id,
        name: name,
        description: description,
        ownerId: ownerId,
        fields: fields ? (0, transformFields_1.transformFieldsToGql)(fields) : fields,
    };
    return {
        mutation,
        variables,
        parameters,
    };
}
exports.default = updateBaseComponentSegment;
//# sourceMappingURL=updateBaseComponentSegment.js.map