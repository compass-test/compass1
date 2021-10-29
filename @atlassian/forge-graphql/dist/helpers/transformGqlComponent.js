"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformFields_1 = require("./transformFields");
function transformRelationships(relationships) {
    return relationships.map((r) => ({
        type: r.type,
        nodeId: r.endNode.id,
    }));
}
function transformGqlComponent(component) {
    const { id, name, type, description, ownerId, fields, labels, links, relationships, dataManager, eventSources, externalAliases } = component;
    return {
        id,
        name,
        type: type,
        description,
        ownerId,
        fields: (0, transformFields_1.transformEnumGqlFields)(fields),
        labels: (labels || []).map((label) => label.name),
        links,
        relationships: transformRelationships((relationships || {}).nodes || []),
        dataManager,
        eventSources: eventSources,
        externalAliases,
    };
}
exports.default = transformGqlComponent;
//# sourceMappingURL=transformGqlComponent.js.map