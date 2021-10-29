"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prefixMutation(mutations, mutationName, parameters) {
    return `
mutation ${mutationName}(
  ${parameters.join(', ')}
) {
  compass {
  ${mutations}
  }
}
`;
}
exports.default = prefixMutation;
//# sourceMappingURL=prefixMutation.js.map