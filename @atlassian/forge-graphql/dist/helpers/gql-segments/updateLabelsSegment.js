"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateMutationGql_1 = __importDefault(require("../generateMutationGql"));
const AddComponentLabelsMutation_1 = require("../../graphQL/AddComponentLabelsMutation");
const RemoveComponentLabelsMutation_1 = require("../../graphQL/RemoveComponentLabelsMutation");
function updateLabelsSegment(componentId, oldLabels = [], newLabels) {
    let segmentAcc = {
        mutation: '',
        parameters: [],
        variables: {},
    };
    // if newLabels is null, remove existing labels
    if (newLabels === undefined) {
        return segmentAcc;
    }
    newLabels = newLabels || [];
    const labelsInBoth = oldLabels.filter((existingLabel) => newLabels.some((newLabel) => newLabel === existingLabel));
    const toBeAdded = newLabels.filter((newLabel) => !labelsInBoth.some((overlapLabel) => newLabel === overlapLabel));
    const toBeRemoved = oldLabels.filter((oldLabel) => !labelsInBoth.some((overlapLabel) => oldLabel === overlapLabel));
    if (toBeAdded.length > 0) {
        const { mutationGql: addLabelsMutation, params: addLabelsParams, inputId: addLabelsInputId, } = (0, generateMutationGql_1.default)(AddComponentLabelsMutation_1.AddComponentLabels, 'addComponentLabels');
        const variables = {};
        variables[addLabelsInputId] = {
            componentId,
            labelNames: toBeAdded,
        };
        segmentAcc = {
            mutation: addLabelsMutation,
            parameters: addLabelsParams,
            variables,
        };
    }
    if (toBeRemoved.length > 0) {
        const { mutationGql: removeLabelsMutation, params: removeLabelsParams, inputId: removeLabelsInputId, } = (0, generateMutationGql_1.default)(RemoveComponentLabelsMutation_1.RemoveComponentLabels, 'removeComponentLabels');
        const variables = {};
        variables[removeLabelsInputId] = {
            componentId,
            labelNames: toBeRemoved,
        };
        segmentAcc = {
            mutation: segmentAcc.mutation + removeLabelsMutation,
            parameters: [...segmentAcc.parameters, ...removeLabelsParams],
            variables: {
                ...segmentAcc.variables,
                ...variables,
            },
        };
    }
    return segmentAcc;
}
exports.default = updateLabelsSegment;
//# sourceMappingURL=updateLabelsSegment.js.map