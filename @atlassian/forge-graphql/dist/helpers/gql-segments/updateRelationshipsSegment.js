"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constructGqlSegmentFromArray_1 = __importDefault(require("../constructGqlSegmentFromArray"));
const generateMutationGql_1 = __importDefault(require("../generateMutationGql"));
const CreateComponentRelationshipMutation_1 = require("../../graphQL/CreateComponentRelationshipMutation");
const DeleteComponentRelationshipMutation_1 = require("../../graphQL/DeleteComponentRelationshipMutation");
function isRelationshipEqual(a, b) {
    return a.type === b.type && a.nodeId === b.nodeId;
}
function transformIntoDeleteRelationshipInput(item, componentId) {
    const { type, nodeId } = item;
    return {
        type,
        startNodeId: componentId,
        endNodeId: nodeId,
    };
}
function transformIntoCreateRelationshipInput(item, componentId) {
    const { type, nodeId } = item;
    return {
        type,
        startNodeId: componentId,
        endNodeId: nodeId,
    };
}
function updateRelationshipsSegment(componentId, oldRelationships = [], newRelationships) {
    let segmentAcc = {
        mutation: '',
        parameters: [],
        variables: {},
    };
    // if newRelationships is null, remove existing relationships
    if (newRelationships === undefined) {
        return segmentAcc;
    }
    newRelationships = newRelationships || [];
    const relationshipsInBoth = oldRelationships.filter((existingRelationship) => newRelationships.some((newRelationship) => isRelationshipEqual(newRelationship, existingRelationship)));
    const toBeCreated = newRelationships.filter((newRelationship) => !relationshipsInBoth.some((overlapRelationship) => isRelationshipEqual(overlapRelationship, newRelationship)));
    const toBeRemoved = oldRelationships.filter((oldRelationship) => !relationshipsInBoth.some((overlapRelationship) => isRelationshipEqual(overlapRelationship, oldRelationship)));
    const createRelationshipGqlSegment = () => (0, generateMutationGql_1.default)(CreateComponentRelationshipMutation_1.CreateCompassComponentRelationship, 'createRelationship');
    const deleteRelationshipGqlSegment = () => (0, generateMutationGql_1.default)(DeleteComponentRelationshipMutation_1.DeleteCompassComponentRelationship, 'deleteRelationship');
    if (toBeRemoved.length > 0) {
        segmentAcc = (0, constructGqlSegmentFromArray_1.default)(toBeRemoved, deleteRelationshipGqlSegment, transformIntoDeleteRelationshipInput, segmentAcc, componentId);
    }
    if (toBeCreated.length > 0) {
        segmentAcc = (0, constructGqlSegmentFromArray_1.default)(toBeCreated, createRelationshipGqlSegment, transformIntoCreateRelationshipInput, segmentAcc, componentId);
    }
    return segmentAcc;
}
exports.default = updateRelationshipsSegment;
//# sourceMappingURL=updateRelationshipsSegment.js.map