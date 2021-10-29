"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveComponentLabels = void 0;
exports.RemoveComponentLabels = `
    mutation removeComponentLabels($input: RemoveCompassComponentLabelsInput!) {
  compass {
    removeComponentLabels(input: $input) {
      success
      removedLabelNames
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
    }
  }
}
    `;
//# sourceMappingURL=RemoveComponentLabelsMutation.js.map