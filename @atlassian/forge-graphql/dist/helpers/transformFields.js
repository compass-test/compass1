"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformEnumGqlFields = exports.transformFieldsToGql = void 0;
const constants_1 = require("./constants");
const fieldKeyToCompassDefinitionId = {
    tier: 'compass:tier',
};
function isFieldKey(value) {
    return value in fieldKeyToCompassDefinitionId;
}
function mapFieldKeyToCompassDefinitionId(fieldKey) {
    if (!isFieldKey(fieldKey)) {
        return undefined;
    }
    return fieldKeyToCompassDefinitionId[fieldKey];
}
function transformFieldsToGql(fields = {}) {
    const gqlFields = [];
    for (const [key, value] of Object.entries(fields)) {
        const definitionId = mapFieldKeyToCompassDefinitionId(key);
        if (definitionId) {
            if (definitionId === fieldKeyToCompassDefinitionId.tier) {
                // Only one tier is allowed. Grab the first entry of the enum
                if (!value || value.length == 0) {
                    throw Error(constants_1.TIER_MISSING_VALUE);
                }
                gqlFields.push({
                    definition: definitionId,
                    value: {
                        enum: {
                            value: [value[0]]
                        }
                    }
                });
            }
            else {
                gqlFields.push({
                    definition: definitionId,
                    value: {
                        enum: {
                            value,
                        }
                    }
                });
            }
        }
    }
    return gqlFields;
}
exports.transformFieldsToGql = transformFieldsToGql;
// This needs to be revisited if more field types are added. Right now there is only the
// CompassEnumField type, an implementation of CompassField. We are not sure what other
// types will be added so we are going to try to do this conversion and if it does not
// work then we will skip transforming that field. COMPASS-4703 tracks surfacing this error
// in a better way.
function transformEnumGqlFields(fields = []) {
    const obj = {};
    for (let field of fields) {
        try {
            const a = field.definition.id;
            if (field.definition) {
                obj[a] = field.value;
            }
        }
        catch {
            console.log(`Encountered unexpected field structure. Skipping field ${field}`);
        }
    }
    return obj;
}
exports.transformEnumGqlFields = transformEnumGqlFields;
//# sourceMappingURL=transformFields.js.map