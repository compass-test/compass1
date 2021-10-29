"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uniqueId() {
    return Math.floor(Math.random() * 10000000000).toString();
}
function segment(startMatch, endMatch, seg) {
    const startIndex = seg.search(startMatch);
    const endIndex = seg.search(endMatch);
    return seg.substring(startIndex + startMatch.toString().length - 2, endIndex);
}
function generateMutationGql(fullGql, mutationName) {
    const mutationUniqueId = `${mutationName}_${uniqueId()}`;
    const mutationFunctionName = segment(/compass {\n/, /\(input/, fullGql).trim();
    const mutation = `${mutationUniqueId}: ${mutationFunctionName}(input: $${mutationUniqueId}) {
      success
      errors {
        message
      }
    }
  `;
    const inputType = segment(/input: /, /\) \{/, fullGql).replace('\n', '');
    return {
        mutationGql: mutation,
        params: [`$${mutationUniqueId}: ${inputType}`],
        inputId: mutationUniqueId,
    };
}
exports.default = generateMutationGql;
//# sourceMappingURL=generateMutationGql.js.map